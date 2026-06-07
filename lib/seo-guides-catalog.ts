import type { Locale } from "@/routing";

export const SEO_GUIDE_LANGS = ["en", "ru", "de", "ar", "fa", "zh", "hi"] as const;
export type SeoGuideLang = (typeof SEO_GUIDE_LANGS)[number];

export const SEO_GUIDE_COUNTRIES = [
  { slug: "germany", name: "Germany", code: "DE" },
  { slug: "usa", name: "United States of America", code: "US" },
  { slug: "uae", name: "United Arab Emirates", code: "AE" },
  { slug: "spain", name: "Spain", code: "ES" },
  { slug: "canada", name: "Canada", code: "CA" },
  { slug: "japan", name: "Japan", code: "JP" },
  { slug: "portugal", name: "Portugal", code: "PT" },
  { slug: "uk", name: "United Kingdom", code: "GB" },
  { slug: "australia", name: "Australia", code: "AU" },
  { slug: "new-zealand", name: "New Zealand", code: "NZ" },
] as const;

export const SEO_GUIDE_PROFESSIONS = [
  { slug: "it-software", name: "IT / Software", translationKey: "profession_it_software" },
  { slug: "data-science", name: "Data Science", translationKey: "profession_data_science" },
  { slug: "medicine", name: "Medicine", translationKey: "profession_medicine" },
  { slug: "nursing", name: "Nursing / Caregiving", translationKey: "profession_nursing_care" },
  { slug: "education", name: "Education", translationKey: "profession_education" },
  { slug: "engineering", name: "Engineering", translationKey: "profession_engineering" },
  { slug: "design", name: "Design", translationKey: "profession_design" },
  { slug: "marketing", name: "Marketing / PR", translationKey: "profession_marketing_pr" },
  { slug: "sales", name: "Sales / Business", translationKey: "profession_sales_business" },
  {
    slug: "product-management",
    name: "Product / Project Management",
    translationKey: "profession_product_pm",
  },
  { slug: "finance", name: "Finance", translationKey: "profession_finance" },
  { slug: "entrepreneurship", name: "Entrepreneurship", translationKey: "profession_entrepreneurship" },
  { slug: "hr", name: "HR", translationKey: "profession_hr" },
  { slug: "construction", name: "Construction", translationKey: "profession_construction" },
  { slug: "hospitality", name: "Hospitality", translationKey: "profession_hospitality" },
  { slug: "logistics", name: "Logistics", translationKey: "profession_logistics" },
  { slug: "legal", name: "Legal", translationKey: "profession_legal" },
  { slug: "creative-arts", name: "Creative / Arts", translationKey: "profession_creative_arts" },
  { slug: "science", name: "Science", translationKey: "profession_science" },
  { slug: "other", name: "Other", translationKey: "profession_other" },
] as const;

export type SeoGuideCountrySlug = (typeof SEO_GUIDE_COUNTRIES)[number]["slug"];
export type SeoGuideProfessionSlug = (typeof SEO_GUIDE_PROFESSIONS)[number]["slug"];

const LANGUAGE_LABELS: Record<SeoGuideLang, string> = {
  en: "English",
  ru: "Russian",
  de: "German",
  ar: "Arabic",
  fa: "Persian (Farsi)",
  zh: "Chinese",
  hi: "Hindi",
};

export function buildGuideSlug(country: string, profession: string, lang: string): string {
  return `${country}-${profession}-${lang}`;
}

export function getLanguageLabelForPrompt(lang: string): string {
  return LANGUAGE_LABELS[lang as SeoGuideLang] ?? lang;
}

export function getSeoGuideCountryBySlug(slug: string) {
  return SEO_GUIDE_COUNTRIES.find((country) => country.slug === slug);
}

export function getSeoGuideProfessionBySlug(slug: string) {
  return SEO_GUIDE_PROFESSIONS.find((profession) => profession.slug === slug);
}

export function isSeoGuideLocale(locale: string): locale is Locale {
  return (SEO_GUIDE_LANGS as readonly string[]).includes(locale);
}
