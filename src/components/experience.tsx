"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type SubProject = { title: string; bullets: string[] };
type Job = {
  org: string;
  role: string;
  period: string;
  summary: string;
  projects: SubProject[];
  footnote: string;
};

export function Experience() {
  const t = useTranslations();
  const tNav = useTranslations("nav");
  const jobs = t.raw("experience") as Job[];

  return (
    <AnimatedSection
      id="experience"
      className="bg-muted/50 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Career" title={tNav("experience")} />
        <div className="space-y-10">
          {jobs.map((job) => (
            <AnimatedItem
              key={job.org}
              tilt
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="font-display text-lg font-semibold">{job.org}</h3>
                <span className="text-sm text-muted-foreground">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-accent">
                {job.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {job.summary}
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {job.projects.map((project) => (
                  <div key={project.title}>
                    <h4 className="text-sm font-semibold">
                      {project.title}
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                      {project.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                {job.footnote}
              </p>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
