"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import {
  CertificateModal,
  type CertificateInfo,
} from "@/components/certificate-modal";

type EduItem = { school: string; period: string };
type Course = {
  name: string;
  period: string;
  sortDate: string;
  certificateFile: string;
  bullets: string[];
};

export function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as EduItem[];
  const courses = (t.raw("courses") as Course[])
    .slice()
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  const certifications = t.raw("certifications") as string[];
  const [openCertificate, setOpenCertificate] =
    useState<CertificateInfo | null>(null);

  return (
    <>
      <AnimatedSection
        id="education"
        className="mx-auto max-w-6xl px-6 py-24 sm:py-28"
      >
        <SectionHeading eyebrow="Education" title={t("heading")} />

        <div className="space-y-4">
          {items.map((item) => (
            <AnimatedItem
              key={item.school}
              className="flex flex-col justify-between gap-1 border-2 border-ink bg-card p-6 sm:flex-row sm:items-center"
            >
              <h3 className="font-display text-lg text-ink">{item.school}</h3>
              <span className="text-sm font-bold text-muted">
                {item.period}
              </span>
            </AnimatedItem>
          ))}
        </div>

        <h3 className="mt-14 mb-4 text-sm font-bold tracking-wide text-coral uppercase">
          {t("coursesHeading")}
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {courses.map((course, i) => (
            <AnimatedItem
              key={course.name}
              delay={i * 0.1}
              className="border-2 border-ink bg-card p-6 brutal-shadow-sm transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-display text-base text-ink">
                  {course.name}
                </h4>
                <span className="shrink-0 text-xs font-bold text-muted">
                  {course.period}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {course.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed text-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  setOpenCertificate({
                    title: course.name,
                    image: course.certificateFile,
                  })
                }
                className="mt-4 inline-flex items-center gap-1 border-2 border-ink px-3 py-1.5 text-xs font-bold text-ink hover:bg-ink hover:text-paper"
              >
                {t("certificateLabel")}
                <span aria-hidden>↗</span>
              </button>
            </AnimatedItem>
          ))}
        </div>

        <h3 className="mt-14 mb-4 text-sm font-bold tracking-wide text-coral uppercase">
          {t("certificationsHeading")}
        </h3>
        <ul className="space-y-2">
          {certifications.map((cert) => (
            <li key={cert} className="text-sm font-bold text-ink">
              {cert}
            </li>
          ))}
        </ul>
      </AnimatedSection>
      <CertificateModal
        certificate={openCertificate}
        onClose={() => setOpenCertificate(null)}
      />
    </>
  );
}
