"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { PosterLabel } from "@/components/poster-label";

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
    <AnimatedSection id="experience" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex justify-end">
          <PosterLabel text={tNav("experience")} align="right" />
        </div>
        <div className="space-y-14 border-l-4 border-ink pl-6 sm:pl-10">
          {jobs.map((job) => (
            <AnimatedItem key={job.org} className="relative">
              <span
                aria-hidden
                className="absolute top-1 -left-[34px] size-4 rounded-full border-4 border-coral bg-paper sm:-left-[50px]"
              />
              <div className="border-2 border-ink bg-card p-6 brutal-shadow-sm sm:p-8">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-display text-xl text-ink">
                    {job.org}
                  </h3>
                  <span className="text-sm font-bold text-muted">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-coral">
                  {job.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  {job.summary}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {job.projects.map((project) => (
                    <div
                      key={project.title}
                      className="border-2 border-teal/60 p-4"
                    >
                      <h4 className="text-sm font-bold text-ink">
                        {project.title}
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {project.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2 text-sm text-muted"
                          >
                            <span className="mt-2 size-1.5 shrink-0 bg-teal" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs font-bold text-muted">
                  {job.footnote}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
