"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type Category = { name: string; items: string[] };

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function Skills() {
  const t = useTranslations("skills");
  const categories = t.raw("categories") as Category[];

  return (
    <AnimatedSection
      id="skills"
      className="bg-dots bg-ink px-6 py-24 sm:py-28"
      style={{ ["--dot-color" as string]: "rgba(244,242,234,0.14)" }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title={t("heading")} tone="dark" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <AnimatedItem
              key={category.name}
              delay={i * 0.08}
              className={`${ROTATIONS[i % ROTATIONS.length]} border-2 border-teal bg-paper p-5 text-ink transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105`}
            >
              <h3 className="font-display text-base text-ink">
                {category.name}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-muted"
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
