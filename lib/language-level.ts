/** Stored in assessment JSON; labels = assessment.lang_* in messages */

export const LANGUAGE_LEVEL_VALUES = [
  "none",
  "elementary",
  "intermediate",
  "advanced",
  "native",
] as const;

export type LanguageLevelValue = (typeof LANGUAGE_LEVEL_VALUES)[number];

const LEGACY_TO_NEW: Record<string, LanguageLevelValue> = {
  none: "none",
  a1: "elementary",
  a2: "elementary",
  b1: "intermediate",
  b2: "intermediate",
  c1: "advanced",
  c2: "advanced",
  native: "native",
};

export function migrateStoredLanguageLevel(raw: string | undefined): string {
  if (!raw || raw.trim() === "") return "";
  if (LEGACY_TO_NEW[raw]) return LEGACY_TO_NEW[raw];
  if ((LANGUAGE_LEVEL_VALUES as readonly string[]).includes(raw)) return raw;
  return "";
}
