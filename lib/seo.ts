import { locales, routing, type Locale } from "@/routing";

const FALLBACK_SITE_URL = "https://nexim.world";
const LOCALE_PREFIX_RE = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

export const SEO_ROUTE_SEGMENTS = ["", "pricing", "questionnaire"] as const;
export const DEFAULT_LOCALE = routing.defaultLocale as Locale;

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    FALLBACK_SITE_URL
  ).replace(/\/$/, "");
}

function normalizeRouteSuffix(pathname: string): string {
  const normalizedPath = pathname.trim() || "/";
  const withoutLocale = normalizedPath.replace(LOCALE_PREFIX_RE, "");
  const withoutTrailingSlash = withoutLocale.replace(/\/+$/, "");

  return withoutTrailingSlash === "/" ? "" : withoutTrailingSlash;
}

export function getLocalizedPath(locale: Locale, pathname = "/"): string {
  const suffix = normalizeRouteSuffix(pathname);
  return suffix ? `/${locale}${suffix}` : `/${locale}`;
}

export function getLocalizedUrl(locale: Locale, pathname = "/"): string {
  return `${getSiteUrl()}${getLocalizedPath(locale, pathname)}`;
}

export function getHreflangAlternates(pathname = "/"): Record<string, string> {
  return Object.fromEntries([
    ...locales.map((locale) => [locale, getLocalizedUrl(locale, pathname)]),
    ["x-default", getLocalizedUrl(DEFAULT_LOCALE, pathname)],
  ]);
}

/** Open Graph / social preview image (add `public/og-image.png` when available). */
export const OG_IMAGE_PATH = "/og-image.png";
