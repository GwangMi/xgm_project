"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type Category = { name: string; items: string[] };

export function Skills() {
  const t = useTranslations("skills");
  const categories = t.raw("categories") as Category[];

  return (
    <AnimatedSection id="skills" className="bg-muted/50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Skills" title={t("heading")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <AnimatedItem
              key={category.name}
              delay={i * 0.08}
              tilt
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
            >
              <h3 className="font-display text-sm font-semibold tracking-wide text-accent">
                {category.name}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
