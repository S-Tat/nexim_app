"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/navigation";
import { locales, type Locale } from "@/routing";

const localeLabel: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  de: "DE",
  ar: "AR",
  fa: "FA",
  zh: "中文",
  hi: "हिन्दी",
};

type Props = {
  currentLocale: Locale;
};

/** Inline language links — no dropdown. */
export function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const orderedLocales: Locale[] = [
    "en",
    "de",
    "ru",
    ...locales.filter((loc) => !["en", "de", "ru"].includes(loc)),
  ];

  return (
    <nav
      aria-label="Language"
      className="flex flex-wrap items-center justify-end gap-x-0.5 gap-y-0.5 print:hidden md:gap-x-1"
    >
      {orderedLocales.map((loc) => {
        const active = loc === currentLocale;
        return (
          <button
            key={loc}
            type="button"
            disabled={isPending}
            onClick={() => {
              if (active) return;
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
            className={`min-h-[36px] min-w-[36px] rounded-md px-1.5 py-1.5 text-[11px] font-semibold tracking-wide transition md:min-h-[40px] md:min-w-[40px] md:px-2 md:py-2 md:text-sm ${
              active
                ? "cursor-default bg-[#fbbf24]/10 text-[#fbbf24]"
                : "text-nexim-muted hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {localeLabel[loc]}
          </button>
        );
      })}
    </nav>
  );
}
