"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export function ProfileIntro() {
  const t = useTranslations("profile");

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-6 py-20">
      <AnimatedItem className="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <div className="brutal-shadow size-40 overflow-hidden border-2 border-ink sm:size-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              alt="GwangMin Jeon"
              className="size-full object-cover"
            />
          </div>
          <span className="font-display absolute -top-4 -right-6 -rotate-6 border-2 border-ink bg-coral px-3 py-1 text-xs text-ink">
            {t("tag")}
          </span>
        </div>
        <div className="border-2 border-ink bg-card p-6 sm:p-8">
          <p className="font-display text-xl text-ink sm:text-2xl">
            {t("lead")}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {t("body")}
          </p>
        </div>
      </AnimatedItem>
    </AnimatedSection>
  );
}
