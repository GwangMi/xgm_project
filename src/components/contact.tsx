"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

const EMAIL = "wjsrhkdals97@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/gm97";
const GITHUB_URL = "https://github.com/GwangMi";

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 15 15 9M10 6l1.5-1.5a4 4 0 0 1 5.7 5.7L15.5 12M14 18l-1.5 1.5a4 4 0 0 1-5.7-5.7L8.5 12" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Contact() {
  const t = useTranslations("contact");

  const rows = [
    { icon: <IconMail />, label: t("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <IconLink />, label: t("linkedinLabel"), value: "linkedin.com/in/gm97", href: LINKEDIN_URL },
    { icon: <IconCode />, label: t("githubLabel"), value: "github.com/GwangMi", href: GITHUB_URL },
    { icon: <IconPin />, label: t("locationLabel"), value: t("location"), href: null },
  ];

  return (
    <AnimatedSection
      id="contact"
      className="bg-dots bg-ink px-6 py-24 text-paper sm:py-28"
      style={{ ["--dot-color" as string]: "rgba(244,242,234,0.14)" }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Contact" title={t("heading")} tone="dark" />
        <AnimatedItem className="border-2 border-paper bg-ink p-8 sm:p-10">
          <p className="max-w-xl text-base leading-relaxed text-muted-dark">
            {t("body")}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <span className="mt-0.5 text-teal">{row.icon}</span>
                <div>
                  <p className="text-xs font-bold tracking-wide text-muted-dark uppercase">
                    {row.label}
                  </p>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="mt-1 block text-sm font-bold text-paper hover:text-teal"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-paper">{row.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
