"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { IconMail, IconGithub, IconLinkedin, IconDownload } from "@/components/icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact-info";

export function ProfileIntro() {
  const t = useTranslations("profile");
  const locale = useLocale();

  const links = [
    { icon: <IconMail />, label: t("links.email"), value: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: <IconGithub />,
      label: "GitHub",
      value: "github.com/GwangMi",
      href: GITHUB_URL,
      external: true,
    },
    {
      icon: <IconLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/gm97",
      href: LINKEDIN_URL,
      external: true,
    },
    {
      icon: <IconDownload />,
      label: t("links.resume"),
      href: `/resume/resume-${locale}.pdf`,
      download: true,
    },
  ];

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 py-20">
      <AnimatedItem className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
        <div className="relative shrink-0">
          <div className="brutal-shadow size-40 overflow-hidden border-2 border-ink sm:size-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              alt="GwangMin Jeon"
              className="size-full object-cover"
            />
          </div>
          <span className="font-display absolute -top-4 -right-6 -rotate-6 border-2 border-ink bg-coral px-3 py-1 text-xs text-ink">
            {t("tag")}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              download={link.download || undefined}
              className="brutal-shadow-sm flex items-center gap-3 border-2 border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-teal hover:text-ink"
            >
              {link.icon}
              <span>
                <span className="font-bold">{link.label}</span>
                {link.value && <span className="ml-2 opacity-70">{link.value}</span>}
              </span>
            </a>
          ))}
        </div>
      </AnimatedItem>
      <AnimatedItem className="mt-10 border-2 border-ink bg-card p-6 sm:p-8">
        <p className="font-display text-xl text-ink sm:text-2xl">
          {t("lead")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t("body")}
        </p>
      </AnimatedItem>
    </AnimatedSection>
  );
}
