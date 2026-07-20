"use client";

import { useTranslations } from "next-intl";
import { LocaleSwitch } from "@/components/locale-switch";

export function Header() {
  const t = useTranslations("nav");

  const links: { href: string; label: string }[] = [
    { href: "#about", label: t("about") },
    { href: "#skills", label: t("skills") },
    { href: "#education", label: t("education") },
    { href: "#experience", label: t("experience") },
    { href: "#projects", label: t("projects") },
    { href: "#publications", label: t("publications") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display text-lg tracking-wide text-ink"
        >
          GM.
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-ink decoration-coral decoration-2 underline-offset-4 transition-colors hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <LocaleSwitch />
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t-2 border-ink px-6 py-2 md:hidden">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 text-xs font-bold text-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
