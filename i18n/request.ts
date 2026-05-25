/**
 * next-intl request config (App Router).
 * Resolved automatically by `require('next-intl/plugin')()` as `./i18n/request.ts`.
 */
import { getRequestConfig } from "next-intl/server";
import { locales, routing } from "../routing";

/** Supported locales: ru, en, de, ar, fa (see `routing.ts`). */

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    typeof requested === "string" &&
    (locales as readonly string[]).includes(requested)
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
