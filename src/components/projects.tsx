"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

type Project = {
  title: string;
  subtitle: string;
  tags: string[];
  bullets: string[];
};

export function Projects() {
  const t = useTranslations();
  const tNav = useTranslations("nav");
  const projects = t.raw("projects") as Project[];

  return (
    <AnimatedSection id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Work" title={tNav("projects")} />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <AnimatedItem
            key={project.title}
            delay={i * 0.1}
            tilt
            className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60 sm:p-8"
          >
            <h3 className="font-display text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
            <ul className="mt-5 flex-1 space-y-1.5">
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
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
