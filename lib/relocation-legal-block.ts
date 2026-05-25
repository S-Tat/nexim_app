import type { GeminiResult } from "./gemini-analysis";

const MESSAGES: Record<string, string> = {
  ru: "С незакрытыми правонарушениями легальный переезд практически невозможен. Закройте вопрос нарушения правопорядка в вашу пользу для увеличения шанса на переезд.",
  en: "With unresolved legal violations, legal relocation is practically impossible. Resolve the matter in your favour to improve your chances of moving.",
  de: "Bei ungeklärten Rechtsverstößen ist eine legale Auswanderung praktisch unmöglich. Klären Sie die Angelegenheit zu Ihren Gunsten, um Ihre Chancen zu erhöhen.",
  zh: "若有未了结的违法记录，合法移居几乎不可行。请先妥善解决相关法律问题，以提高移居可能性。",
  hi: "अनसुलझे कानूनी उल्लंघनों के साथ कानूनी पुनर्वास практिक रूप से असंभव है। स्थानांतरण की संभावना बढ़ाने के लिए मामले को अपने पक्ष में निपटाएँ।",
  ar: "مع مخالفات قانونية غير المسوّاة، الهجرة القانونية شبه مستحيلة. أغلق المسألة لصالحك لزيادة فرص الانتقال.",
  fa: "با تخلفات حقوقی باز، مهاجرت قانونی تقریباً ممکن نیست. برای افزایش شانس، موضوع را به نفع خودتان حل کنید.",
};

export function isRelocationLegallyBlocked(answers: Record<string, unknown>): boolean {
  const v = answers.unresolvedLegalViolations;
  return v === true || v === "yes" || v === "Yes";
}

/** Overall score shown when relocation is blocked (per product spec). */
export const LEGAL_BLOCK_MATCH_SCORE = 0.5;

export function relocationLegalBlockAnalysis(locale: string): string {
  const msg = MESSAGES[locale] ?? MESSAGES.en;
  return `Overall Match Score: ${LEGAL_BLOCK_MATCH_SCORE}%\n\nSuggested Countries: (none)\n\n${msg}`;
}

export function relocationLegalBlockResult(locale: string): GeminiResult {
  return {
    mode: "ai",
    analysis: relocationLegalBlockAnalysis(locale),
    top_countries: [],
    legalRelocationBlocked: true,
  };
}
