"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground"
        >
          <svg viewBox="0 0 24 24" className="size-3 rotate-45 fill-accent" aria-hidden>
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
          GwangMin Jeon
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitch />
          <ThemeToggle />
        </div>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-border px-6 py-2 md:hidden">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
