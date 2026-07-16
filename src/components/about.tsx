"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type Highlight = { title: string; body: string };

export function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as Highlight[];

  return (
    <AnimatedSection id="about" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="About" title={t("heading")} />
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t("intro")}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {highlights.map((item, i) => (
          <AnimatedItem
            key={item.title}
            delay={i * 0.1}
            tilt
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
          >
            <h3 className="font-display text-base font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </AnimatedItem>
        ))}
      </div>
      <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-base italic leading-relaxed text-foreground">
        {t("closing")}
      </p>
    </AnimatedSection>
  );
}
