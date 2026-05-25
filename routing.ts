import { defineRouting } from "next-intl/routing";

/** Keep in sync with `i18n/request.ts` and `generateStaticParams` under `app/[locale]`. */
const localeList = ["ru", "en", "de", "ar", "fa", "zh", "hi"] as const;
export type Locale = (typeof localeList)[number];

export const rtlLocales = ["ar", "fa"] as const;

export function isRtlLocale(locale: string): boolean {
  return (rtlLocales as readonly string[]).includes(locale);
}

export const routing = defineRouting({
  locales: [...localeList],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
});

export const locales = localeList;
