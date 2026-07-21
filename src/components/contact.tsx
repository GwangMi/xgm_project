"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { IconMail, IconLinkedin, IconGithub, IconPin } from "@/components/icons";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/contact-info";

export function Contact() {
  const t = useTranslations("contact");

  const rows = [
    { icon: <IconMail />, label: t("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <IconLinkedin />, label: t("linkedinLabel"), value: "linkedin.com/in/gm97", href: LINKEDIN_URL },
    { icon: <IconGithub />, label: t("githubLabel"), value: "github.com/GwangMi", href: GITHUB_URL },
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
