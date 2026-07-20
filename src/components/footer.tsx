"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-ink px-6 py-8 text-paper">
      <p className="mx-auto max-w-6xl text-center text-xs font-bold">
        © {year} {t("rights")}
      </p>
    </footer>
  );
}
