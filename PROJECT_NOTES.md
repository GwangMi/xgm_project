# 전광민 포트폴리오 사이트 — 작업 정리

최종 업데이트: 2026-07-23
용도: 나중에 이 프로젝트를 다시 고칠 때 참고용 기록. 코드 자체가 최신 진실이지만, "왜 이렇게 했는지" 배경은 여기 남겨둠.

## 기본 정보

- 로컬 경로: `C:\Users\wjsrh\Desktop\side_project\My_page`
- GitHub: https://github.com/GwangMi/xgm_project.git (main 브랜치, push하면 Vercel 자동 배포)
- 배포: Vercel 프로젝트 `gm-97/my-page` → https://xgmlab.com (www 리다이렉트 설정됨)
- 로컬 개발: `npm run dev` (포트 3000), 빌드 확인은 `npm run build`, 린트는 `npm run lint`
- 배포 상태 확인: `npx vercel ls my-page`

## 기술 스택

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4 (`@theme inline`, `@utility` 디렉티브 사용 — 일반 CSS 클래스로 만들면 `hover:` variant가 안 먹으므로 커스텀 유틸리티는 꼭 `@utility`로 선언)
- next-intl로 한/영 다국어 (`/ko`, `/en`), 라우팅 설정은 `src/i18n/routing.ts`, 프록시는 `src/proxy.ts` (Next 16에서 middleware → proxy로 이름 변경됨)
- Framer Motion (스크롤 애니메이션, 커서 이펙트)
- next/font/google: Anton, Black Han Sans (제목용), Dancing Script, Nanum Pen Script (필기체용)
- next-themes는 사용 안 함 — 네오브루탈 리디자인 이후 라이트/다크 토글 대신 섹션별 고정 배경(밝은/어두운 번갈아)으로 감

## 디자인 시스템 (네오브루탈리즘)

`src/app/globals.css`에 정의된 컬러 토큰:
- `--ink: #0a0a0a` (텍스트/테두리)
- `--paper: #f4f2ea` (배경)
- `--card: #ffffff` (카드)
- `--teal: #12b8a6` (포인트 컬러 1)
- `--coral: #ff5a36` (포인트 컬러 2)

공용 유틸리티: `brutal-shadow`, `brutal-shadow-teal`, `brutal-shadow-coral`, `brutal-shadow-sm` (오프셋 그림자), `.text-stroke` (아웃라인 텍스트, `-webkit-text-stroke` 사용 — `color: transparent`만 쓰면 `currentColor` fallback이 깨지니 `var(--stroke-color, var(--teal))`처럼 명시적 기본값 필요), `.bg-dots` (점 패턴 배경)

## 페이지 구조 (섹션 순서)

1. **Hero** (`hero.tsx`) — 스크롤하면 좌우로 빠지는 타이틀, CTA 버튼
2. **Profile / About** (`profile-intro.tsx`, id="about") — 프로필 사진 + HUMAN API 스티커, 이메일/GitHub/LinkedIn/이력서 pill 링크(중앙 정렬, 실제 주소 인라인 표시), 그 아래 소개 카드("사람이 쓰는 지점까지 생각하는 사람")
3. **How I Work** (`about.tsx`, id="how-i-work") — "HOW I WORK / 문제푸는 방식", 리드 문단 + 하이라이트 카드 3개
4. Skills, Education, Experience, Projects, Publications, Contact, Footer — 기존 섹션 유지

**주의**: 헤더 nav의 "소개/About" 링크는 `#about`이고, 이건 profile-intro 섹션을 가리킴 (about.tsx 섹션 아님). 두 섹션의 id가 헷갈리기 쉬우니 나중에 수정할 때 확인할 것.

## 인터랙션 기능

- **커서 트레일** (`cursor-trail.tsx` + globals.css의 `.pacman`): 마우스를 따라가는 코랄색 점 + 한 박자 늦게 쫓아오는 팩맨. 팩맨이 점을 따라잡으면(거리 12px 이내) 점이 파티클로 터지면서 사라지고, **실제로 마우스를 다시 움직이기 전까지는 재등장하지 않음** (고정 타이머 아님 — `waitingForMove` ref로 다음 pointermove 이벤트를 기다림). 입 벌어지는 각도는 `pacman-chomp` keyframes에서 조절 (닫힘 40°, 열림 120°).
- **클릭 버스트** (`click-burst.tsx`): 클릭 시 사각형 파티클 6개 튀는 효과
- **AI 챗봇** (`ai-chat.tsx` + `src/app/api/chat/route.ts`): 오른쪽 하단 플로팅 버튼. Google Gemini 무료 API로 구동, 포트폴리오 내용(경력/프로젝트/역량/학력/논문)만 답변 범위로 제한하고 범위 밖 질문은 정중히 거절 후 이메일 안내. 대화당 사용자 메시지 20개 제한.

## AI 챗봇 관련 중요 사항 (나중에 또 막히면 여기부터 확인)

- 시스템 프롬프트는 `src/app/api/chat/route.ts`의 `buildSystemPrompt()`가 `messages/en.json` 내용을 그대로 읽어서 조립함 → **이력서/경력/프로젝트 내용을 messages/en.json에서 바꾸면 챗봇 답변도 자동으로 최신화됨** (따로 손댈 필요 없음)
- 모델은 `gemini-3.1-flash-lite`로 **고정**되어 있음. `gemini-flash-latest` 같은 "-latest" alias는 쓰지 말 것 — 실제로 한 번 이걸 썼다가 Google이 내부적으로 모델 버전을 롤링하면서(`gemini-3.5-flash` → `gemini-3.6-flash`) `thinkingConfig.thinkingBudget: 0` 옵션을 더 이상 지원 안 해서 챗봇이 전부 에러나는 사고가 있었음. lite 모델은 애초에 extended thinking을 안 써서 그 옵션 자체가 필요 없음.
- `GEMINI_API_KEY` 환경변수 필요 — 로컬 `.env.local`과 Vercel(production/preview/development 전부)에 등록되어 있음. 키가 만료되거나 바뀌면:
  ```bash
  # Vercel에 새 키 등록 (환경별로 각각)
  printf '%s' "새키값" | npx vercel env add GEMINI_API_KEY production
  printf '%s' "새키값" | npx vercel env add GEMINI_API_KEY preview
  printf '%s' "새키값" | npx vercel env add GEMINI_API_KEY development
  npx vercel --prod --yes   # 새 env 반영해서 즉시 재배포
  ```
- 무료 티어라 요청량이 많아지면 429 rate limit 날 수 있음. 에러 시 `console.error`로 Vercel 로그에 남기게 해뒀으니 `vercel logs` 또는 대시보드에서 확인 가능.
- 챗봇 UI 텍스트(인사말, 플레이스홀더 등)는 `messages/ko.json`/`en.json`의 `chat` 네임스페이스에 있음.

## 다국어 콘텐츠

- `messages/ko.json`, `messages/en.json`이 전체 텍스트의 원천. 영문은 직역이 아니라 자연스럽게 로컬라이즈한 버전 (논문 인용은 원문 그대로 유지, 번역하지 않음 — 사용자가 명시적으로 요청한 부분).
- 이력서 PDF: `public/resume/resume-ko.pdf`, `public/resume/resume-en.pdf`. 나중에 이력서 갱신되면 같은 파일명으로 교체만 하면 됨 (경로는 `profile-intro.tsx`에서 `/resume/resume-${locale}.pdf`로 자동 매칭).
- 인증서 이미지: `public/certificates/*.jpg`

## 공용 모듈

- `src/lib/contact-info.ts` — EMAIL, GITHUB_URL, LINKEDIN_URL 상수. 연락처 바뀌면 여기 한 곳만 수정.
- `src/components/icons.tsx` — 공용 SVG 아이콘 (Mail, Github, Linkedin, Pin, Download, Chat, Close, Send)
- `src/components/section-heading.tsx` — eyebrow + title 섹션 제목 패턴 (라이트/다크 tone 지원)

## 알아두면 좋은 개발 환경 이슈

- **Turbopack dev 캐시 문제**: CSS/컴포넌트 수정했는데 브라우저에 반영이 안 되면 dev 서버 완전히 껐다가(`rm -rf .next`) 재시작할 것. 이 프로젝트에서 여러 번 반복된 이슈.
- **Windows 환경**: git bash 기준, `/tmp` 없음 — 임시 파일은 실제 존재하는 스크래치 경로 사용.
- **favicon**: `src/app/icon.png` (원형으로 크롭된 아바타), Python PIL로 생성했음 (`Desktop`의 anaconda python 사용).

## 남은 할 일 / 참고

- 특별히 남은 작업 없음 (2026-07-23 기준 요청사항 전부 반영 완료).
- 향후 자주 바뀔 만한 것들: 경력/프로젝트 내용 추가(experience/projects 배열에 항목 추가), 학력/자격증 갱신(education.courses/certifications), 논문 추가(publications.items).
