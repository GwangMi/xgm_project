"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

const EMAIL = "wjsrhkdals97@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/gm97";
const GITHUB_URL = "https://github.com/GwangMi";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <AnimatedSection id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Contact" title={t("heading")} />
      <AnimatedItem tilt className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-accent/60 sm:p-10">
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("body")}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("emailLabel")}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 block text-sm font-medium text-accent hover:underline"
            >
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("linkedinLabel")}
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 block text-sm font-medium text-accent hover:underline"
            >
              linkedin.com/in/gm97
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("githubLabel")}
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 block text-sm font-medium text-accent hover:underline"
            >
              github.com/GwangMi
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("locationLabel")}
            </p>
            <p className="mt-1 text-sm font-medium">{t("location")}</p>
          </div>
        </div>
      </AnimatedItem>
    </AnimatedSection>
  );
}
