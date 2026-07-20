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
      className="mx-auto max-w-6xl px-6 py-24 sm:py-28"
    >
      <SectionHeading eyebrow="Research" title={t("heading")} />
      <ol className="space-y-4">
        {items.map((item, i) => (
          <AnimatedItem
            key={item}
            delay={i * 0.06}
            className="flex gap-4 border-2 border-ink bg-card p-5"
          >
            <span className="font-display shrink-0 text-lg text-coral">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-relaxed text-ink">{item}</p>
          </AnimatedItem>
        ))}
      </ol>
    </AnimatedSection>
  );
}
