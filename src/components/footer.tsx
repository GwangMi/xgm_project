"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <p className="mx-auto max-w-5xl text-center text-xs text-muted-foreground">
        © {year} {t("rights")}
      </p>
    </footer>
  );
}
