/**
 * Curated “top tier” destinations for which models are tuned (non‑beta).
 * Any other valid ISO alpha-2 code shows the Beta AI disclaimer.
 */
export const TOP_TIER_COUNTRY_CODES: ReadonlySet<string> = new Set([
  "AE",
  "AR",
  "AT",
  "AU",
  "BE",
  "BR",
  "CA",
  "CH",
  "CL",
  "CN",
  "CO",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HK",
  "HU",
  "IE",
  "IL",
  "IN",
  "IS",
  "IT",
  "JP",
  "KR",
  "KW",
  "MX",
  "MY",
  "NL",
  "NO",
  "NZ",
  "PH",
  "PL",
  "PT",
  "QA",
  "SA",
  "SE",
  "SG",
  "SK",
  "TH",
  "TR",
  "TW",
  "UA",
  "US",
  "VN",
  "ZA",
]);

export function isBetaDestinationCountry(code: string): boolean {
  const c = code.trim().toUpperCase();
  if (c.length !== 2) return true;
  return !TOP_TIER_COUNTRY_CODES.has(c);
}
