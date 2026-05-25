/**
 * Locale → output-language helpers for the Gemini prompt builders.
 *
 * Exactly seven languages are supported by the product; anything else
 * falls back to English so the model can never silently emit a language
 * the UI cannot render correctly.
 */

/** The seven locale codes the product UI ships with. */
export const SUPPORTED_AI_LOCALES = [
  "en",
  "ru",
  "de",
  "ar",
  "fa",
  "zh",
  "hi",
] as const;

export type SupportedAiLocale = (typeof SUPPORTED_AI_LOCALES)[number];

/** Strict locale → human-readable language name for the Gemini prompt. */
const LOCALE_TO_LANGUAGE: Record<SupportedAiLocale, string> = {
  en: "English",
  ru: "Russian",
  de: "German",
  ar: "Arabic",
  fa: "Persian (Farsi)",
  zh: "Chinese (Simplified, Putonghua)",
  hi: "Hindi (Devanagari)",
};

export function isSupportedAiLocale(s: unknown): s is SupportedAiLocale {
  return (
    typeof s === "string" &&
    (SUPPORTED_AI_LOCALES as readonly string[]).includes(s)
  );
}

/**
 * Map a locale code to its full English language name. Unknown / missing
 * inputs fall back to "English" so the model output language is always one
 * of the seven supported targets.
 */
export function localeLabelForPrompt(locale: string | null | undefined): string {
  if (isSupportedAiLocale(locale)) return LOCALE_TO_LANGUAGE[locale];
  return LOCALE_TO_LANGUAGE.en;
}

/**
 * The non-negotiable language-lock instruction injected at the top of every
 * Gemini prompt. The model MUST emit its entire response in the resolved
 * language, while preserving the JSON schema the route handler parses.
 */
export function criticalLanguageInstruction(languageName: string): string {
  return (
    `CRITICAL INSTRUCTION: You MUST translate and generate your ENTIRE response ` +
    `(including the summary, country names, advantages, and risks) in the ` +
    `following language: ${languageName}. The output format MUST remain valid ` +
    `JSON with the exact same structure.`
  );
}

/**
 * Legacy soft instruction kept for the tail of each prompt — reinforces the
 * language lock without redefining the JSON contract.
 */
export function strictOutputLanguageInstruction(languageName: string): string {
  return `You must provide the analysis and recommendations STRICTLY in the following language: ${languageName}.`;
}

/**
 * The non-negotiable closing rule appended at the VERY END of every Gemini
 * prompt. LLMs weight end-of-prompt instructions most heavily, so the
 * language lock is repeated here verbatim while clarifying that JSON KEYS
 * stay in English and only the VALUES are translated.
 */
export function finalCriticalLanguageRule(languageName: string): string {
  return (
    `FINAL CRITICAL RULE: You MUST translate the ENTIRE JSON content ` +
    `(including lists, pros, and cons) into the following language: ${languageName}. ` +
    `Only the JSON keys must remain in English.`
  );
}
