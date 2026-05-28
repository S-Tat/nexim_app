/**
 * Server-only Gemini analysis module.
 * API key: GOOGLE_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_API_KEY (first non-empty wins).
 * Uses Google AI Studio host https://generativelanguage.googleapis.com (not Vertex).
 */

// ── Local-dev TLS bypass ──
// Some Windows AV / corporate proxies intercept TLS and trip Node's
// certificate-revocation checks (CRYPT_E_NO_REVOCATION_CHECK), surfacing as
// `fetch failed` when calling generativelanguage.googleapis.com. We relax TLS
// verification ONLY in NODE_ENV=development so production keeps full chain
// validation. Belt-and-suspenders: env flag (affects Node's native fetch /
// undici default dispatcher) PLUS an explicit permissive global dispatcher so
// the @google/generative-ai SDK's outgoing fetches also bypass the intercept.
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  type UndiciShape = {
    setGlobalDispatcher: (d: unknown) => void;
    Agent: new (opts: { connect: { rejectUnauthorized: boolean } }) => unknown;
  };
  try {
    const req: NodeRequire = eval("require");
    const undici = req("undici") as UndiciShape;
    undici.setGlobalDispatcher(
      new undici.Agent({ connect: { rejectUnauthorized: false } }),
    );
    console.warn(
      "[GEMINI DEV] TLS verification disabled for local development (NODE_TLS_REJECT_UNAUTHORIZED=0 + permissive undici dispatcher). Production is unaffected.",
    );
  } catch {
    console.warn(
      "[GEMINI DEV] undici not available; relying on NODE_TLS_REJECT_UNAUTHORIZED=0 only.",
    );
  }
}

import { setDefaultResultOrder } from "node:dns";

import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  GoogleGenerativeAIResponseError,
  SchemaType,
  type Schema,
} from "@google/generative-ai";
import {
  strictOutputLanguageInstruction,
  localeLabelForPrompt,
  criticalLanguageInstruction,
  finalCriticalLanguageRule,
} from "@/lib/ai-locale-prompt";
import isoCountries from "i18n-iso-countries";

/** Prefer IPv4 first — avoids some Node 18+ / Windows DNS paths where IPv6 fails and fetch errors. */
if (process.env.NEXIM_GEMINI_DNS_IPV4_FIRST !== "false") {
  try {
    setDefaultResultOrder("ipv4first");
  } catch {
    /* Edge or minimal runtimes without node:dns */
  }
}

/** Google AI Studio Generative Language API (Vertex uses a different host). */
const GEMINI_AI_STUDIO_BASE_URL = "https://generativelanguage.googleapis.com";

function stripWrappingQuotes(raw: string): string {
  let v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function normalizeGeminiEnvValue(raw: string | undefined): string | undefined {
  if (raw == null) return undefined;
  const v = stripWrappingQuotes(raw);
  return v.length > 0 ? v : undefined;
}

function resolveGeminiApiKey(): string | undefined {
  return (
    normalizeGeminiEnvValue(process.env.GOOGLE_API_KEY) ??
    normalizeGeminiEnvValue(process.env.GOOGLE_GENERATIVE_AI_API_KEY) ??
    normalizeGeminiEnvValue(process.env.GEMINI_API_KEY) ??
    normalizeGeminiEnvValue(process.env.GOOGLE_AI_KEY)
  );
}

function normalizeCountryCode(raw: unknown): string {
  const s = String(raw ?? "XX")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  if (s.length === 2) return s;
  if (s.length === 3) {
    const alpha2 = isoCountries.alpha3ToAlpha2(s);
    if (alpha2) return alpha2;
  }
  return (s.slice(0, 2) || "XX").padEnd(2, "X").slice(0, 2);
}

function logGeminiRawError(err: unknown): void {
  console.error("GEMINI RAW ERROR DETAILS:", err);
}

export class GeminiAnalysisError extends Error {
  readonly statusCode: number;
  /** Stable error code for client-side localization (e.g. "rate_limited"). */
  readonly code: string | null;
  constructor(message: string, statusCode = 502, code: string | null = null) {
    super(message);
    this.name = "GeminiAnalysisError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

/* ── New strategy-based types ── */

export type CountryMatch = {
  country_code: string;
  country_name: string;
  match_score: number;
  visa_name: string;
  pros: string[];
  cons: string[];
  gap_analysis: string[];
  roadmap: RoadmapStep[];
  /** Pro: Markdown table of required documents */
  document_table?: string;
  /** Pro: identified weak points for this country */
  weak_points?: string[];
};

export type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  deadline: string;
};

export type GeminiResult = {
  mode: "ai";
  analysis: string;
  top_countries: CountryMatch[];
  /** Set when unresolved legal violations make country matching impossible. */
  legalRelocationBlocked?: boolean;
  /** Pro tier: global expert blocks (not shown for Basic/Lite). */
  tax_legal_audit?: string;
  job_market_overview?: string;
  document_checklist?: string;
};

/**
 * Static fallback chain. Tried in order; ListModels for the API key is
 * consulted only if every static ID 404s.
 *
 * Order rationale:
 *   1. `*-latest` aliases first — Google guarantees these resolve to a
 *      currently-available model id for any active Studio key, so they almost
 *      never 404.
 *   2. Pinned 1.5 / 2.x ids next as targeted upgrades.
 *   3. Retired ids (`gemini-1.0-pro`, bare `gemini-pro`) are intentionally
 *      omitted — they consistently 404 against current Studio keys and just
 *      slow down the fallback loop.
 */
/** Production primary model; fallbacks used only if this id is unavailable. */
export const PRODUCTION_GEMINI_MODEL = "gemini-1.5-flash-latest";

const fallbackModels = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro",
] as const;

type ListModelsDebugResult = {
  ok: boolean;
  httpStatus?: number;
  errorSnippet?: string;
  /** Short ids suitable for getGenerativeModel({ model }) */
  generateContentModelIds: string[];
};

/**
 * Lists models for this API key (same endpoint as the SDK). Use when every static
 * model id 404s — often wrong key type (Vertex vs AI Studio) or API not enabled.
 */
async function fetchWithBriefRetry(
  url: string,
  init: RequestInit,
  attempts = 3,
): Promise<Response> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url, init);
    } catch (e) {
      last = e;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 350 * (i + 1)));
      }
    }
  }
  throw last;
}

async function listGeminiModelsForDebug(
  apiKey: string,
): Promise<ListModelsDebugResult> {
  const url =
    `${GEMINI_AI_STUDIO_BASE_URL}/v1beta/models` +
    `?pageSize=100&key=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetchWithBriefRetry(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(45_000),
    });
    const text = await res.text();
    if (!res.ok) {
      return {
        ok: false,
        httpStatus: res.status,
        errorSnippet: text.slice(0, 800),
        generateContentModelIds: [],
      };
    }
    const data = JSON.parse(text) as {
      models?: Array<{
        name?: string;
        supportedGenerationMethods?: string[];
      }>;
    };
    const ids: string[] = [];
    for (const m of data.models ?? []) {
      const methods = m.supportedGenerationMethods;
      if (!Array.isArray(methods) || !methods.includes("generateContent")) {
        continue;
      }
      const short = (m.name ?? "").replace(/^models\//, "").trim();
      if (short) ids.push(short);
    }
    return {
      ok: true,
      httpStatus: res.status,
      generateContentModelIds: Array.from(new Set(ids)),
    };
  } catch (e) {
    return {
      ok: false,
      errorSnippet: e instanceof Error ? e.message : String(e),
      generateContentModelIds: [],
    };
  }
}

/** Structured JSON schema: 1.5+ / 2.x; omit for legacy bare ids that reject schema. */
function shouldUseResponseSchema(modelId: string): boolean {
  const id = modelId.toLowerCase();
  if (id === "gemini-pro" || id === "gemini-1.0-pro") return false;
  return true;
}

function throwIfRateLimited(apiErr: GoogleGenerativeAIFetchError): never {
  const st = apiErr.status;
  if (st === 429 || st === 503) {
    throw new GeminiAnalysisError(
      `Gemini API rate limited (${st}): ${apiErr.message}`,
      429,
      "rate_limited",
    );
  }
  throw apiErr;
}

/* ── Legacy single-country types (kept for old data compat) ── */

export type GeminiScores = {
  overall: number;
  visa: number;
  market: number;
  integration: number;
};

export type GeminiTask = {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium";
  deadline_days: number;
};

/* ── Prompt builder ── */

function sanitizeAnswers(answers: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(answers).map(([k, v]) => [
      k,
      typeof v === "string" ? v.slice(0, 500) : v,
    ]),
  );
}

function buildPromptLite(
  sanitized: Record<string, unknown>,
  locale: string,
): string {
  const languageName = localeLabelForPrompt(locale);
  const criticalLang = criticalLanguageInstruction(languageName);
  const langInstruction = strictOutputLanguageInstruction(languageName);
  const finalRule = finalCriticalLanguageRule(languageName);
  return `${criticalLang}

You are Nexim — a migration assistant.

Task (Lite tier): Based ONLY on the user's age, citizenship (passport country), and passport validity info in the profile, name exactly 3 suitable countries for living abroad. Be practical and brief.

User profile:
${JSON.stringify(sanitized, null, 2)}

Return JSON with:
- "legal_relocation_blocked": false (always for Lite — no legal field in this tier)
- "analysis": string — very brief overview only (2–4 short sentences total for all three countries). No tax detail, no step-by-step roadmap narrative.
- "top_countries": array of exactly 3 objects:
  - "country_code", "country_name", "match_score" (0-100), "visa_name" (brief),
  - "pros": string[] (exactly 2 items) — only high-level advantages / opportunities,
  - "cons": string[] (exactly 1 item) — main risk or downside,
  - "gap_analysis": string[] (exactly 1 item) — one concise risk/gap line,
  - "roadmap": MUST be an empty array [] — Lite does not include step-by-step plans (users upgrade for that).

CRITICAL — OUTPUT FORMAT: You MUST return the response ONLY as a valid JSON object with exactly these top-level keys: "legal_relocation_blocked", "analysis", "top_countries". Do not include markdown code blocks, backticks, or any text before or after the JSON.

${langInstruction}
Return ONLY valid JSON, no markdown fences.

${finalRule}`;
}

function buildPromptBasic(
  sanitized: Record<string, unknown>,
  locale: string,
): string {
  const languageName = localeLabelForPrompt(locale);
  const criticalLang = criticalLanguageInstruction(languageName);
  const langInstruction = strictOutputLanguageInstruction(languageName);
  const finalRule = finalCriticalLanguageRule(languageName);
  const legal = sanitized.unresolvedLegalViolations;
  const legalNote =
    legal === "yes" || legal === true
      ? `NOTE: The user indicated unresolved legal issues in their country of residence. Still recommend 5 countries with realistic visa paths, but mention elevated compliance risk briefly in the overall analysis. Do NOT return an empty top_countries list. Set "legal_relocation_blocked": false.`
      : `Set "legal_relocation_blocked": false.`;

  return `${criticalLang}

You are Nexim — a Global Migration Consultant AI.

Task (Basic tier): Analysis using the 8 parameters in the user profile (age, citizenship, passport validity, education, English level, legal/criminal issues flag, family situation, relocation budget). Recommend exactly 5 countries. Give a concise visa-program guide and general next-step recommendations in the "analysis" field.

${legalNote}

User profile:
${JSON.stringify(sanitized, null, 2)}

Return JSON:
- "legal_relocation_blocked": boolean (false for normal output)
- "analysis": string — overview + brief visa guide + recommendations (compact paragraphs).
- "top_countries": array of exactly 5 objects:
  - "country_code", "country_name", "match_score" (0-100), "visa_name"
  - "pros": string[] (2 items), "cons": string[] (2 items), "gap_analysis": string[] (2 items)
  - "roadmap": 3-4 steps with step, title, description, deadline

After the analysis text, add one short line inviting upgrade to Pro for tax detail, full checklists, labor-market deep-dive, and a full step-by-step plan.

CRITICAL — OUTPUT FORMAT: You MUST return the response ONLY as a valid JSON object with exactly these top-level keys: "legal_relocation_blocked", "analysis", "top_countries". Do not include markdown code blocks, backticks, or any text before or after the JSON.

${langInstruction}
Return ONLY valid JSON, no markdown fences.

${finalRule}`;
}

function buildPromptProfessional(
  sanitized: Record<string, unknown>,
  locale: string,
): string {
  const languageName = localeLabelForPrompt(locale);
  const criticalLang = criticalLanguageInstruction(languageName);
  const langInstruction = strictOutputLanguageInstruction(languageName);
  const finalRule = finalCriticalLanguageRule(languageName);

  const strategy = String(sanitized.strategy ?? "career");
  const isCareer = strategy === "career";
  const aiSuggestsCountry =
    sanitized.countryCode === "AI_SUGGEST" || !sanitized.countryCode;

  const strategyBlock = isCareer
    ? `Primary focus: WORK AND CAREER — shortage lists, skilled work visas, employability, salary vs cost of living.`
    : `Primary focus: LIFESTYLE / REMOTE / PASSIVE INCOME — nomad visas, D7-type routes, financial requirements, quality of life.`;

  const countryNote = aiSuggestsCountry
    ? `User did not specify a destination country — choose the top 3 best objective fits.`
    : `User preference country code: ${sanitized.countryCode} — weight heavily but rank by fit.`;

  const legal = sanitized.unresolvedLegalViolations;
  const legalNote =
    legal === "yes" || legal === true
      ? `If "unresolvedLegalViolations" is yes: still return exactly 3 countries with honest visa assessment; flag higher refusal/compliance risk in analysis and per-country cons. Never use an empty top_countries array. Set "legal_relocation_blocked": false.`
      : ``;

  const diplomaAuthorityRule = `For document_table: use the correct local authority per destination country, or the generic "Local degree legalization / Apostille" if unsure.`;

  return `${criticalLang}

You are Nexim — expert relocation consultant (Pro tier).

As a high-level relocation expert, deliver a comprehensive tax breakdown, a professional job-market analysis for the user's specific field and education level, and a detailed document checklist. Put these in the JSON string fields "tax_legal_audit", "job_market_overview", and "document_checklist" (Markdown tables and headings allowed inside those strings). The overall "analysis" field is a shorter executive summary.

Task: Full expert audit across all questionnaire fields. Cross-reference \`educationLevel\`, \`professionMain\`, \`professionOtherDetail\`, \`workExperience\`, languages, funds, legal flags, and refusal history. Each top country needs a concrete step-by-step roadmap in "roadmap".

${legalNote}

${diplomaAuthorityRule}

${countryNote}
${strategyBlock}

User profile:
${JSON.stringify(sanitized, null, 2)}

Return JSON:
- "legal_relocation_blocked": false (Pro always delivers matches; UI handles legal warnings separately)
- "analysis": string — executive summary: timeline, risks, priorities (refer to Pro sections; do not repeat everything).
- "tax_legal_audit": string — **Detailed tax report** (Markdown): for **each of the 3 countries** you recommend, use a ### CountryName heading, then a **markdown table or bullet list of indicative income-tax brackets / marginal rates** (employed and, if relevant, self-employed or dividend regimes). Add tax-residency triggers, notable reliefs, and **right to work / permit** basics. Tailor to this user's citizenship, residence, and income answers.
- "job_market_overview": string — **Professional audit** (Markdown): job-market demand based on the user's **educationLevel** and **profession** (and professionOtherDetail when "other"). For **each** destination, cover shortage lists / skill needs, realistic visa or work routes for that profile, and salary vs living-cost hints. Compare countries.
- "document_checklist": string — **Personalized document checklist** (Markdown): grouped sections (e.g. Passport & identity, Criminal records, Diplomas & credential evaluation, Bank statements & proof of funds, Employment/freelance contracts, Insurance, Apostilles & sworn translations). Tie each item to concrete fields from the user's answers (passport validity, apostillesReadiness, visaRefusalHistory, energyLevelAdaptation, etc.).
- "top_countries": array of exactly 3 objects:
  - "country_code", "country_name", "match_score" (0-100), "visa_name"
  - "pros": string[] (3-5), "cons": string[] (3-4), "gap_analysis": string[] (3-5)
  - "document_table": string — Markdown table: Document | Required/Recommended | Notes (8-12 rows) for visa/residence for this country and this user's profile
  - "weak_points": string[] — 3-5 actionable profile weak spots for this country
  - "roadmap": 5-7 steps with step, title, description, deadline

${langInstruction}
Return ONLY valid JSON, no markdown fences.

${finalRule}

CRITICAL INSTRUCTION: Your response must be highly concentrated and concise. Avoid long introductory or concluding paragraphs. Use extremely short, punchy bullet points for checklists and tax analysis. You must strictly fit the entire response within the token limit to avoid JSON truncation. Prioritize data density over text volume.`;
}

function buildPrompt(
  answers: Record<string, unknown>,
  locale: string,
  tier: string,
): string {
  const sanitized = sanitizeAnswers(answers);
  if (tier === "lite") return buildPromptLite(sanitized, locale);
  if (tier === "basic") return buildPromptBasic(sanitized, locale);
  return buildPromptProfessional(sanitized, locale);
}

/* ── Response JSON schema (structured output for Lite/Basic/Pro) ── */

const roadmapStepSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    step: { type: SchemaType.NUMBER },
    title: { type: SchemaType.STRING },
    description: { type: SchemaType.STRING },
    deadline: { type: SchemaType.STRING },
  },
  required: ["step", "title", "description", "deadline"],
};

function countrySchemaForTier(tier: string): Schema {
  const lite = tier === "lite";
  const pro = tier === "professional";
  const properties: Record<string, Schema> = {
    country_code: { type: SchemaType.STRING },
    country_name: { type: SchemaType.STRING },
    match_score: { type: SchemaType.NUMBER },
    visa_name: { type: SchemaType.STRING },
    pros: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    cons: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    gap_analysis: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    roadmap: lite
      ? {
          type: SchemaType.ARRAY,
          items: roadmapStepSchema,
          minItems: 0,
          maxItems: 0,
        }
      : { type: SchemaType.ARRAY, items: roadmapStepSchema },
  };
  const required = [
    "country_code",
    "country_name",
    "match_score",
    "visa_name",
    "pros",
    "cons",
    "gap_analysis",
    "roadmap",
  ];
  if (pro) {
    properties.document_table = { type: SchemaType.STRING };
    properties.weak_points = { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } };
    required.push("document_table", "weak_points");
  }
  return { type: SchemaType.OBJECT, properties, required };
}

function maxCountriesForTier(tier: string): number {
  return tier === "basic" ? 5 : 3;
}

function responseSchemaForTier(tier: string): Schema {
  const maxCountries = maxCountriesForTier(tier);
  const pro = tier === "professional";
  const properties: Record<string, Schema> = {
    legal_relocation_blocked: { type: SchemaType.BOOLEAN },
    analysis: { type: SchemaType.STRING },
    top_countries: {
      type: SchemaType.ARRAY,
      items: countrySchemaForTier(tier),
      minItems: maxCountries,
      maxItems: maxCountries,
    },
  };
  const required = [
    "legal_relocation_blocked",
    "analysis",
    "top_countries",
  ] as string[];
  if (pro) {
    properties.tax_legal_audit = { type: SchemaType.STRING };
    properties.job_market_overview = { type: SchemaType.STRING };
    properties.document_checklist = { type: SchemaType.STRING };
    required.push("tax_legal_audit", "job_market_overview", "document_checklist");
  }
  return {
    type: SchemaType.OBJECT,
    properties,
    required,
  };
}

/* ── Main entry ── */

export async function runGeminiAnalysis(opts: {
  answers: Record<string, unknown>;
  locale: string;
  tier: string;
  /** When set, tried first before the static fallback chain. */
  model?: string;
}): Promise<GeminiResult> {
  const { answers, locale, tier, model: preferredModel } = opts;
  const apiKey = resolveGeminiApiKey();

  console.log(
    "DEBUG: Gemini API key resolved from env:",
    !!apiKey,
  );

  const modelChain = [
    ...(preferredModel ? [preferredModel] : []),
    ...fallbackModels,
  ].filter((id, idx, arr) => arr.indexOf(id) === idx);

  console.log("DEBUG: Gemini model chain:", modelChain.join(" → "));

  if (!apiKey) {
    throw new GeminiAnalysisError(
      "AI analysis is not configured (set GOOGLE_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or GEMINI_API_KEY)",
      503,
    );
  }

  const prompt = buildPrompt(answers, locale, tier);

  const maxOut = 8192;

  const geminiRequestOptions = {
    baseUrl: GEMINI_AI_STUDIO_BASE_URL,
    apiVersion: "v1beta" as const,
    timeout: tier === "professional" ? 180_000 : 90_000,
  };

  const genAI = new GoogleGenerativeAI(apiKey);

  async function generateWithModel(
    modelId: string,
    structured: boolean,
  ): Promise<string> {
    const model = genAI.getGenerativeModel(
      {
        model: modelId,
        generationConfig: structured
          ? {
              temperature: 0.35,
              maxOutputTokens: maxOut,
              responseMimeType: "application/json",
              responseSchema: responseSchemaForTier(tier),
            }
          : {
              temperature: 0.35,
              maxOutputTokens: maxOut,
              responseMimeType: "application/json",
            },
      },
      geminiRequestOptions,
    );
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  console.log("DEBUG: Gemini static fallback chain:", [...fallbackModels].join(" → "));

  try {
    let rawText: string | undefined;
    let lastFailure: unknown;
    const triedModels = new Set<string>();

    type AttemptNext = "success" | "continue";

    const runAttempt = async (currentModel: string): Promise<AttemptNext> => {
      if (triedModels.has(currentModel)) return "continue";
      triedModels.add(currentModel);
      const structured = shouldUseResponseSchema(currentModel);
      try {
        rawText = await generateWithModel(currentModel, structured);
        if (rawText.trim()) {
          console.log("[GEMINI DEBUG] Success with model:", currentModel);
          return "success";
        }
        lastFailure = new Error("Empty text from Gemini response");
        console.warn(
          `[GEMINI DEBUG] Model ${currentModel} returned empty body, trying next…`,
        );
        return "continue";
      } catch (e: unknown) {
        lastFailure = e;
        if (e instanceof GoogleGenerativeAIFetchError) {
          const st = e.status ?? "?";
          if (st === 429 || st === 503) {
            throwIfRateLimited(e);
          }
          console.warn(
            `[GEMINI DEBUG] Model ${currentModel} failed (HTTP ${st}), trying next…`,
            e.message,
          );
          return "continue";
        }
        if (e instanceof GoogleGenerativeAIResponseError) {
          console.warn(
            `[GEMINI DEBUG] Model ${currentModel} response error, trying next…`,
            e.message,
          );
          return "continue";
        }
        if (e instanceof GeminiAnalysisError) {
          throw e;
        }
        console.warn(`[GEMINI DEBUG] Model ${currentModel} failed, trying next…`, e);
        return "continue";
      }
    };

    for (const currentModel of modelChain) {
      const step = await runAttempt(currentModel);
      if (step === "success") break;
    }

    let listDebug: ListModelsDebugResult = {
      ok: false,
      generateContentModelIds: [],
    };

    if (!rawText?.trim()) {
      listDebug = await listGeminiModelsForDebug(apiKey);
      console.error("[GEMINI DEBUG] ListModels (v1beta) for this API key:", {
        ok: listDebug.ok,
        httpStatus: listDebug.httpStatus,
        errorSnippet: listDebug.errorSnippet,
        generateContentCount: listDebug.generateContentModelIds.length,
        generateContentModelIds: listDebug.generateContentModelIds,
      });

      for (const currentModel of listDebug.generateContentModelIds) {
        const step = await runAttempt(currentModel);
        if (step === "success") break;
      }
    }

    if (!rawText?.trim()) {
      logGeminiRawError(lastFailure ?? new Error("All Gemini models failed"));
      const summary =
        lastFailure instanceof Error
          ? lastFailure.message
          : String(lastFailure);

      let listSection: string;
      if (listDebug.ok) {
        listSection =
          listDebug.generateContentModelIds.length > 0
            ? listDebug.generateContentModelIds.join(", ")
            : "(ListModels succeeded but no models list generateContent — check API key project.)";
      } else {
        listSection = [
          `ListModels request failed`,
          listDebug.httpStatus != null ? `HTTP ${listDebug.httpStatus}` : "",
          listDebug.errorSnippet ?? "",
        ]
          .filter(Boolean)
          .join(". ");
      }

      const hint =
        "Create an API key in Google AI Studio (https://aistudio.google.com/apikey) for the Generative Language API. Vertex AI keys use a different host and will 404 here.";

      console.error("[GEMINI DEBUG] All attempts exhausted.", {
        summary: summary.slice(0, 500),
        listSection: listSection.slice(0, 1500),
        triedCount: triedModels.size,
        triedSample: Array.from(triedModels).slice(0, 20),
      });

      throw new GeminiAnalysisError(
        [
          "All Gemini model fallbacks failed.",
          `Last error: ${summary}`,
          "",
          "DEBUG — models that report generateContent for this key:",
          listSection,
          "",
          hint,
        ].join("\n"),
        502,
      );
    }

    let parsed: Record<string, unknown>;
    try {
      const cleaned = rawText.replace(/```json\s*/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr: unknown) {
      logGeminiRawError(parseErr);
      const hint =
        parseErr instanceof Error ? parseErr.message : String(parseErr);
      throw new GeminiAnalysisError(
        `AI returned invalid JSON: ${hint}. Raw (truncated): ${rawText.slice(0, 400)}`,
        502,
      );
    }

    const analysis = typeof parsed.analysis === "string" ? parsed.analysis : "";
    if (!analysis.trim()) {
      logGeminiRawError(new Error("Missing analysis in parsed Gemini JSON"));
      throw new GeminiAnalysisError("AI response missing analysis text", 502);
    }

    const rawCountries = Array.isArray(parsed.top_countries) ? parsed.top_countries : [];

    const maxCountries = maxCountriesForTier(tier);

    if (rawCountries.length === 0) {
      logGeminiRawError(new Error("Empty top_countries in Gemini JSON"));
      throw new GeminiAnalysisError("AI did not return country recommendations", 502);
    }

    const top_countries: CountryMatch[] = rawCountries
      .slice(0, maxCountries)
      .map((c: unknown) => {
        const obj = c as Record<string, unknown>;
        const country: CountryMatch = {
          country_code: normalizeCountryCode(obj.country_code),
          country_name: String(obj.country_name ?? ""),
          match_score: Math.max(0, Math.min(100, Math.round(Number(obj.match_score) || 0))),
          visa_name: String(obj.visa_name ?? ""),
          pros: Array.isArray(obj.pros) ? obj.pros.filter((s): s is string => typeof s === "string") : [],
          cons: Array.isArray(obj.cons) ? obj.cons.filter((s): s is string => typeof s === "string") : [],
          gap_analysis: Array.isArray(obj.gap_analysis) ? obj.gap_analysis.filter((s): s is string => typeof s === "string") : [],
          roadmap: Array.isArray(obj.roadmap)
            ? (obj.roadmap as unknown[]).map((r, i) => {
                const ro = r as Record<string, unknown>;
                return {
                  step: Number(ro.step) || i + 1,
                  title: String(ro.title ?? ""),
                  description: String(ro.description ?? ""),
                  deadline: String(ro.deadline ?? ""),
                };
              })
            : [],
        };
        // Pro optional fields
        if (typeof obj.document_table === "string" && obj.document_table.trim()) {
          country.document_table = obj.document_table.trim();
        }
        if (Array.isArray(obj.weak_points)) {
          country.weak_points = (obj.weak_points as unknown[]).filter((s): s is string => typeof s === "string");
        }
        return country;
      });

    const legalRelocationBlocked = parsed.legal_relocation_blocked === true;
    const baseResult: GeminiResult = {
      mode: "ai",
      analysis,
      top_countries,
      ...(legalRelocationBlocked ? { legalRelocationBlocked: true } : {}),
    };

    if (tier === "professional") {
      const str = (k: string) =>
        typeof parsed[k] === "string" ? (parsed[k] as string).trim() : "";
      const tax = str("tax_legal_audit");
      const job = str("job_market_overview");
      const docs = str("document_checklist");
      return {
        ...baseResult,
        ...(tax ? { tax_legal_audit: tax } : {}),
        ...(job ? { job_market_overview: job } : {}),
        ...(docs ? { document_checklist: docs } : {}),
      };
    }

    return baseResult;
  } catch (err) {
    if (!(err instanceof GeminiAnalysisError)) {
      logGeminiRawError(err);
    }
    if (err instanceof GeminiAnalysisError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    throw new GeminiAnalysisError(`Unexpected Gemini error: ${msg}`, 502);
  }
}
