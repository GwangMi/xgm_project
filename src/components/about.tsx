"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type Highlight = { title: string; body: string };

export function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as Highlight[];

  return (
    <AnimatedSection
      id="about"
      className="mx-auto max-w-6xl px-6 py-24 sm:py-28"
    >
      <SectionHeading eyebrow="About" title={t("heading")} />
      <p className="text-base leading-relaxed text-ink sm:text-lg">
        {t("intro")}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {highlights.map((item, i) => (
          <AnimatedItem
            key={item.title}
            delay={i * 0.1}
            className="border-2 border-ink bg-card p-6 brutal-shadow-sm transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <h3 className="font-display whitespace-pre-line text-lg text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </AnimatedItem>
        ))}
      </div>
      <p className="mt-12 border-l-4 border-coral bg-card p-6 text-base leading-relaxed font-bold text-ink">
        {t("closing")}
      </p>
    </AnimatedSection>
  );
}
