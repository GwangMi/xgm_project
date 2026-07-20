"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center border-2 border-ink text-xs font-bold">
      {routing.locales.map((loc, i) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`px-2.5 py-1 uppercase transition-colors ${
            i === 1 ? "border-l-2 border-ink" : ""
          } ${
            locale === loc
              ? "bg-ink text-paper"
              : "bg-paper text-ink hover:bg-ink/10"
          }`}
          aria-current={locale === loc}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
