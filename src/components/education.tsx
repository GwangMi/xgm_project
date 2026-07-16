"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type EduItem = { school: string; period: string };
type Course = { name: string; period: string; bullets: string[] };

export function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as EduItem[];
  const courses = t.raw("courses") as Course[];
  const certifications = t.raw("certifications") as string[];

  return (
    <AnimatedSection id="education" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Education" title={t("heading")} />

      <div className="space-y-4">
        {items.map((item) => (
          <AnimatedItem
            key={item.school}
            tilt
            className="flex flex-col justify-between gap-1 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60 sm:flex-row sm:items-center"
          >
            <h3 className="font-display text-base font-medium">{item.school}</h3>
            <span className="text-sm text-muted-foreground">
              {item.period}
            </span>
          </AnimatedItem>
        ))}
      </div>

      <h3 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t("coursesHeading")}
      </h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {courses.map((course, i) => (
          <AnimatedItem
            key={course.name}
            delay={i * 0.1}
            tilt
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="font-display text-sm font-semibold">{course.name}</h4>
              <span className="shrink-0 text-xs text-muted-foreground">
                {course.period}
              </span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {course.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </AnimatedItem>
        ))}
      </div>

      <h3 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t("certificationsHeading")}
      </h3>
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li key={cert} className="text-sm text-muted-foreground">
            {cert}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
