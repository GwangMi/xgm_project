"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export function Publications() {
  const t = useTranslations("publications");
  const items = t.raw("items") as string[];

  return (
    <AnimatedSection
      id="publications"
      className="bg-muted/50 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Research" title={t("heading")} />
        <ol className="space-y-4">
          {items.map((item, i) => (
            <AnimatedItem
              key={item}
              delay={i * 0.06}
              tilt
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/60"
            >
              <span className="font-display text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </p>
            </AnimatedItem>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
