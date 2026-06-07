/**
 * One-time SEO guide generator.
 * Run: npx ts-node --project tsconfig.scripts.json scripts/generate-guides.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

// ── Catalog (self-contained — no @/ path aliases) ──

const SEO_GUIDE_LANGS = ["en", "ru", "de", "ar", "fa", "zh", "hi"] as const;

const SEO_GUIDE_COUNTRIES = [
  { slug: "germany", name: "Germany" },
  { slug: "usa", name: "United States of America" },
  { slug: "uae", name: "United Arab Emirates" },
  { slug: "spain", name: "Spain" },
  { slug: "canada", name: "Canada" },
  { slug: "japan", name: "Japan" },
  { slug: "portugal", name: "Portugal" },
  { slug: "uk", name: "United Kingdom" },
  { slug: "australia", name: "Australia" },
  { slug: "new-zealand", name: "New Zealand" },
] as const;

const SEO_GUIDE_PROFESSIONS = [
  { slug: "it-software", name: "IT / Software" },
  { slug: "data-science", name: "Data Science" },
  { slug: "medicine", name: "Medicine" },
  { slug: "nursing", name: "Nursing / Caregiving" },
  { slug: "education", name: "Education" },
  { slug: "engineering", name: "Engineering" },
  { slug: "design", name: "Design" },
  { slug: "marketing", name: "Marketing / PR" },
  { slug: "sales", name: "Sales / Business" },
  { slug: "product-management", name: "Product / Project Management" },
  { slug: "finance", name: "Finance" },
  { slug: "entrepreneurship", name: "Entrepreneurship" },
  { slug: "hr", name: "HR" },
  { slug: "construction", name: "Construction" },
  { slug: "hospitality", name: "Hospitality" },
  { slug: "logistics", name: "Logistics" },
  { slug: "legal", name: "Legal" },
  { slug: "creative-arts", name: "Creative / Arts" },
  { slug: "science", name: "Science" },
  { slug: "other", name: "Other" },
] as const;

const LANGUAGE_LABELS: Record<(typeof SEO_GUIDE_LANGS)[number], string> = {
  en: "English",
  ru: "Russian",
  de: "German",
  ar: "Arabic",
  fa: "Persian (Farsi)",
  zh: "Chinese",
  hi: "Hindi",
};

function buildGuideSlug(country: string, profession: string, lang: string): string {
  return `${country}-${profession}-${lang}`;
}

function getLanguageLabelForPrompt(lang: string): string {
  return LANGUAGE_LABELS[lang as (typeof SEO_GUIDE_LANGS)[number]] ?? lang;
}

const GEMINI_MODEL = "gemini-2.5-flash";
const PAUSE_MS = 1000;

function loadEnvFiles() {
  for (const file of [".env.local", ".env"]) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

function getGeminiApiKey(): string {
  const key =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "Missing Gemini API key. Set GOOGLE_GENERATIVE_AI_API_KEY in .env.local",
    );
  }
  return key;
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

function stripJsonFences(raw: string): string {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  return text.trim();
}

function buildPrompt(countryName: string, professionName: string, languageLabel: string) {
  return `Write a helpful relocation guide article for ${professionName} professionals who want to move to ${countryName}.
Language: ${languageLabel}
Include: visa requirements, average salaries, job market, cost of living, tips for getting started.
Length: 400-500 words.
Return JSON: {title: string, content: string}`;
}

async function generateArticle(
  genAI: GoogleGenerativeAI,
  countryName: string,
  professionName: string,
  languageLabel: string,
): Promise<{ title: string; content: string }> {
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          content: { type: SchemaType.STRING },
        },
        required: ["title", "content"],
      },
    },
  });

  const result = await model.generateContent(
    buildPrompt(countryName, professionName, languageLabel),
  );
  const text = result.response.text();
  const parsed = JSON.parse(stripJsonFences(text)) as {
    title?: string;
    content?: string;
  };

  if (!parsed.title?.trim() || !parsed.content?.trim()) {
    throw new Error("Gemini returned empty title or content");
  }

  return { title: parsed.title.trim(), content: parsed.content.trim() };
}

function sleep(ms: number) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

async function main() {
  loadEnvFiles();

  const supabase = getSupabaseClient();
  const genAI = new GoogleGenerativeAI(getGeminiApiKey());

  const total =
    SEO_GUIDE_COUNTRIES.length * SEO_GUIDE_PROFESSIONS.length * SEO_GUIDE_LANGS.length;
  let processed = 0;
  let created = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`Starting guide generation (${total} combinations)...`);

  for (const country of SEO_GUIDE_COUNTRIES) {
    for (const profession of SEO_GUIDE_PROFESSIONS) {
      for (const lang of SEO_GUIDE_LANGS) {
        processed += 1;
        const label = `${lang}/${country.slug}/${profession.slug}`;

        const { data: existing, error: lookupError } = await supabase
          .from("guides")
          .select("id")
          .eq("lang", lang)
          .eq("country", country.slug)
          .eq("profession", profession.slug)
          .maybeSingle();

        if (lookupError) {
          failed += 1;
          console.error(`[${processed}/${total}] ${label} lookup failed:`, lookupError.message);
          await sleep(PAUSE_MS);
          continue;
        }

        if (existing) {
          skipped += 1;
          console.log(`[${processed}/${total}] ${label} — skipped (exists)`);
          await sleep(PAUSE_MS);
          continue;
        }

        try {
          const languageLabel = getLanguageLabelForPrompt(lang);
          const article = await generateArticle(
            genAI,
            country.name,
            profession.name,
            languageLabel,
          );

          const slug = buildGuideSlug(country.slug, profession.slug, lang);
          const { error: insertError } = await supabase.from("guides").insert({
            country: country.slug,
            profession: profession.slug,
            lang,
            title: article.title,
            content: article.content,
            slug,
          });

          if (insertError) {
            throw new Error(insertError.message);
          }

          created += 1;
          console.log(`[${processed}/${total}] ${label} — created: ${article.title}`);
        } catch (err) {
          failed += 1;
          const message = err instanceof Error ? err.message : String(err);
          console.error(`[${processed}/${total}] ${label} — failed: ${message}`);
        }

        await sleep(PAUSE_MS);
      }
    }
  }

  console.log(
    `\nDone. Processed: ${processed}, created: ${created}, skipped: ${skipped}, failed: ${failed}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
