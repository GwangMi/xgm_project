"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

type Project = {
  title: string;
  subtitle: string;
  tags: string[];
  bullets: string[];
};

const BORDER_COLORS = ["border-teal", "border-coral"];
const SHADOW_COLORS = ["hover:brutal-shadow-teal", "hover:brutal-shadow-coral"];

export function Projects() {
  const t = useTranslations();
  const tNav = useTranslations("nav");
  const projects = t.raw("projects") as Project[];

  return (
    <AnimatedSection
      id="projects"
      className="bg-dots bg-ink px-6 py-24 sm:py-28"
      style={{ ["--dot-color" as string]: "rgba(244,242,234,0.14)" }}
    >
      <div className="mx-auto max-w-6xl">
        <span className="text-sm font-bold tracking-[0.25em] text-teal uppercase">
          Work
        </span>
        <h2 className="text-stroke font-display mb-14 text-5xl text-teal sm:text-7xl">
          {tNav("projects")}
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {projects.map((project, i) => (
            <AnimatedItem key={project.title} delay={i * 0.1} className="relative pt-4">
              <span
                className={`font-display absolute top-0 left-4 -rotate-3 border-2 bg-ink px-3 py-1 text-xs text-paper ${BORDER_COLORS[i % 2]}`}
              >
                {project.subtitle}
              </span>
              <div
                className={`flex h-full flex-col border-2 bg-ink p-6 pt-8 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 sm:p-8 sm:pt-9 ${BORDER_COLORS[i % 2]} ${SHADOW_COLORS[i % 2]}`}
              >
                <h3 className="font-display text-2xl text-paper">
                  {project.title}
                </h3>
                <ul className="mt-5 flex-1 space-y-1.5">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm text-muted-dark"
                    >
                      <span
                        className={`mt-2 size-1.5 shrink-0 ${
                          i % 2 === 0 ? "bg-teal" : "bg-coral"
                        }`}
                      />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-paper/40 px-2.5 py-1 text-xs font-bold text-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
