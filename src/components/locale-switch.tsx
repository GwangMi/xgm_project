"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center rounded-full border border-border p-0.5 text-xs font-medium">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === loc
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-current={locale === loc}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
