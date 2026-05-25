import countries from "i18n-iso-countries";

const LANG_BY_APP_LOCALE: Record<string, string> = {
  en: "en",
  ru: "ru",
  de: "de",
  ar: "ar",
  fa: "fa",
  zh: "zh",
  hi: "hi",
};

export function resolveCountryLang(appLocale: string): string {
  return LANG_BY_APP_LOCALE[appLocale] ?? "en";
}

function normalizeName(
  raw: string | string[] | undefined,
): string | undefined {
  if (raw == null) return undefined;
  return Array.isArray(raw) ? raw[0] : raw;
}

export function getCountryOptions(appLocale: string): { code: string; name: string }[] {
  const lang = resolveCountryLang(appLocale);
  const names = countries.getNames(lang, { select: "official" });

  return Object.entries(names)
    .map(([code, raw]) => {
      const name = normalizeName(raw as string | string[]);
      return name ? { code, name } : null;
    })
    .filter((x): x is { code: string; name: string } => x !== null)
    .sort((a, b) =>
      a.name.localeCompare(b.name, lang, { sensitivity: "base" }),
    );
}

export function getCountryName(
  alpha2: string,
  appLocale: string,
): string | undefined {
  const lang = resolveCountryLang(appLocale);
  const raw = countries.getName(alpha2.toUpperCase(), lang, {
    select: "official",
  });
  return normalizeName(raw as string | string[] | undefined);
}

export function isValidAlpha2(code: string): boolean {
  if (code.length !== 2) return false;
  return Object.prototype.hasOwnProperty.call(
    countries.getAlpha2Codes(),
    code.toUpperCase(),
  );
}

/** Regional-indicator flag emoji from ISO 3166-1 alpha-2 (e.g. DE → 🇩🇪). */
export function countryFlagEmoji(alpha2: string): string {
  const c = alpha2.toUpperCase();
  if (c.length !== 2 || !/^[A-Z]{2}$/.test(c)) return "🌐";
  if (!isValidAlpha2(c)) return "🌐";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + c.charCodeAt(0) - 65, A + c.charCodeAt(1) - 65);
}
