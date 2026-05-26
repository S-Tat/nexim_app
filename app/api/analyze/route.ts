import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { GeminiAnalysisError, runGeminiAnalysis } from "@/lib/gemini-analysis";
import { isRelocationLegallyBlocked } from "@/lib/relocation-legal-block";
import {
  isSupportedAiLocale,
  localeLabelForPrompt,
  type SupportedAiLocale,
} from "@/lib/ai-locale-prompt";

// Увеличиваем лимит времени выполнения на серверах Vercel до 60 секунд.
// Это даст Gemini достаточно времени на глубокий анализ без обрыва связи.
export const maxDuration = 60;

/**
 * POST /api/analyze — production Gemini analysis with Stripe payment consumption lock.
 * Paid tiers require a verified Checkout Session; each session may consume one analysis.
 */

type AnalyzeRequest = {
  answers: Record<string, unknown>;
  locale: string;
  tier?: string;
  sessionId?: string;
  stripeSessionId?: string;
};

class PaymentConsumptionError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "PaymentConsumptionError";
    this.statusCode = statusCode;
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function stripEnvQuotes(raw: string | undefined): string {
  if (!raw) return "";
  let v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function resolveStripeSecret(): string {
  return stripEnvQuotes(process.env.STRIPE_SECRET_KEY);
}

function resolveSessionId(
  req: NextRequest,
  body: AnalyzeRequest,
  answers: Record<string, unknown>,
): string | null {
  const candidates = [
    body.sessionId,
    body.stripeSessionId,
    req.cookies.get("nexim_checkout_session")?.value,
    answers["stripeSessionId"],
    answers["sessionId"],
    answers["session_id"],
    answers["stripe_session_id"],
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length > 0) return c.trim();
  }
  return null;
}

/**
 * Enforces one-analysis-per-checkout for paid tiers.
 * Returns Stripe client + session when lock passes; null for free lite tier.
 */
async function enforcePaymentConsumptionLock(
  req: NextRequest,
  effectiveTier: string,
  body: AnalyzeRequest,
  answers: Record<string, unknown>,
): Promise<{ stripe: Stripe; sessionId: string; session: Stripe.Checkout.Session } | null> {
  if (effectiveTier === "lite") return null;

  const secret = resolveStripeSecret();
  if (!secret) {
    throw new PaymentConsumptionError("Stripe is not configured", 503);
  }

  const sessionId = resolveSessionId(req, body, answers);
  if (!sessionId) {
    throw new PaymentConsumptionError("Missing Stripe checkout session", 402);
  }

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new PaymentConsumptionError("Checkout session is not paid", 402);
  }

  const sessionTier = session.metadata?.tier;
  if (sessionTier !== effectiveTier) {
    throw new PaymentConsumptionError("Checkout session tier mismatch", 403);
  }

  if (session.metadata?.analysis_used === "true") {
    throw new PaymentConsumptionError(
      "This analysis has already been consumed.",
      409,
    );
  }

  return { stripe, sessionId, session };
}

async function markAnalysisConsumed(
  stripe: Stripe,
  sessionId: string,
  session: Stripe.Checkout.Session,
): Promise<void> {
  await stripe.checkout.sessions.update(sessionId, {
    metadata: {
      ...(session.metadata ?? {}),
      analysis_used: "true",
    },
  });
}

const RATE_LIMITED_MESSAGES: Record<string, string> = {
  ru: "Сервер занят. Попробуйте позже — запрос не повторяется автоматически.",
  en: "Server is busy. Please try again in a moment — we do not retry automatically.",
  de: "Server ausgelastet. Bitte später erneut versuchen — keine automatische Wiederholung.",
  zh: "服务器繁忙，请稍后再试；不会自动重试请求。",
  hi: "सर्वर व्यस्त है। बाद में पुनः प्रयास करें — स्वचालित पुनःप्रयास नहीं。",
  ar: "الخادم مشغول. حاول لاحقًا — لا يتم إعادة الإرسال تلقائيًا.",
  fa: "سرور شلوغ است. بعداً دوباره تلاش کنید — ارسال خودکار تکرار نمی‌شود.",
};

function rateLimitedMessage(locale: string): string {
  return RATE_LIMITED_MESSAGES[locale] ?? RATE_LIMITED_MESSAGES.en;
}

const DEDUP_WINDOW_MS = 5_000;
const DEDUP_MAX_ENTRIES = 500;
const recentRequests = new Map<string, number>();

function rememberRequest(key: string, now: number): void {
  recentRequests.set(key, now);
  if (recentRequests.size > DEDUP_MAX_ENTRIES) {
    recentRequests.forEach((ts, k) => {
      if (now - ts > DEDUP_WINDOW_MS) recentRequests.delete(k);
    });
  }
}

function isRecentDuplicate(key: string, now: number): boolean {
  const last = recentRequests.get(key);
  return typeof last === "number" && now - last < DEDUP_WINDOW_MS;
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function hashPayload(payload: unknown): string {
  const str = JSON.stringify(payload);
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

function ageMeaningful(answers: Record<string, unknown>): boolean {
  const age = answers["ageYears"];
  if (typeof age !== "string") return false;
  const n = Number(age);
  return age.trim() !== "" && Number.isFinite(n) && n >= 16 && n <= 100;
}

function isPayloadMeaningful(answers: Record<string, unknown>, tier: string): boolean {
  if (Object.keys(answers).length === 0) return false;
  const citizenshipCode = answers["citizenshipCode"];
  if (typeof citizenshipCode !== "string" || citizenshipCode.trim().length === 0)
    return false;

  if (tier === "lite") {
    if (!ageMeaningful(answers)) return false;
    const passport = answers["passportValidity"];
    return typeof passport === "string" && passport.trim().length > 0;
  }

  if (tier === "basic") {
    if (!ageMeaningful(answers)) return false;
    const passport = answers["passportValidity"];
    if (typeof passport !== "string" || passport.trim().length === 0) return false;
    for (const k of [
      "educationLevel",
      "englishLevel",
      "unresolvedLegalViolations",
      "familyMoving",
      "basicRelocationFunds",
    ] as const) {
      const v = answers[k];
      if (typeof v !== "string" || v.trim().length === 0) return false;
    }
    const legal = answers["unresolvedLegalViolations"];
    return legal === "yes" || legal === "no";
  }

  if (tier === "professional") {
    const legal = answers["unresolvedLegalViolations"];
    if (legal !== "yes" && legal !== "no") return false;
    if (!ageMeaningful(answers)) return false;
    const professionMain = answers["professionMain"];
    if (typeof professionMain !== "string" || professionMain.trim().length === 0)
      return false;
    if (professionMain === "other") {
      const detail = answers["professionOtherDetail"];
      if (typeof detail !== "string" || detail.trim().length < 2) return false;
    }
    for (const k of [
      "citizenshipCode",
      "residenceCode",
      "nativeLanguage",
      "familyMoving",
      "educationLevel",
      "workExperience",
      "professionGlobalDemand",
      "englishLevel",
      "passportValidity",
      "visaRefusalHistory",
      "apostillesReadiness",
      "energyLevelAdaptation",
      "remoteIncomeAbroad",
      "fundsSourceProvable",
      "idealEnvironment",
    ] as const) {
      const v = answers[k];
      if (typeof v !== "string" || v.trim().length === 0) return false;
    }
    const otherLang = answers["otherLanguagesText"];
    if (typeof otherLang !== "string" || otherLang.trim().length < 2) return false;
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  let body: AnalyzeRequest;
  try {
    body = (await req.json()) as AnalyzeRequest;
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const { answers, locale, tier: clientTier } = body;
  const effectiveTier =
    clientTier === "lite" || clientTier === "basic" || clientTier === "professional"
      ? clientTier
      : "basic";

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return jsonError("Missing answers", 400);
  }
  if (!isPayloadMeaningful(answers as Record<string, unknown>, effectiveTier)) {
    return jsonError("Empty or incomplete answers payload", 400);
  }

  const dedupKey = [clientIp(req), effectiveTier, hashPayload(answers)].join("|");
  const now = Date.now();
  if (isRecentDuplicate(dedupKey, now)) {
    return NextResponse.json(
      {
        error: rateLimitedMessage(locale ?? "en"),
        code: "duplicate_request",
      },
      { status: 429 },
    );
  }

  let paymentLock: {
    stripe: Stripe;
    sessionId: string;
    session: Stripe.Checkout.Session;
  } | null = null;

  try {
    paymentLock = await enforcePaymentConsumptionLock(
      req,
      effectiveTier,
      body,
      answers as Record<string, unknown>,
    );
  } catch (err) {
    if (err instanceof PaymentConsumptionError) {
      return jsonError(err.message, err.statusCode);
    }
    const message = err instanceof Error ? err.message : "Payment verification failed";
    return jsonError(message, 502);
  }

  const resolvedLocale: SupportedAiLocale = isSupportedAiLocale(locale)
    ? locale
    : "en";
  const resolvedLanguage = localeLabelForPrompt(resolvedLocale);

  console.log("[ANALYZE] Locale resolved", {
    incoming: locale ?? null,
    resolvedLocale,
    resolvedLanguage,
    tier: effectiveTier,
    stripeSession: paymentLock?.sessionId ?? null,
  });

  let result;
  try {
    result = await runGeminiAnalysis({
      answers,
      locale: resolvedLocale,
      tier: effectiveTier,
      model: "gemini-1.5-pro",
    });
  } catch (err) {
    if (err instanceof GeminiAnalysisError && err.code === "rate_limited") {
      return NextResponse.json(
        {
          error: rateLimitedMessage(locale ?? "en"),
          code: "rate_limited",
        },
        { status: 429 },
      );
    }
    const status = err instanceof GeminiAnalysisError ? err.statusCode : 502;
    const message = err instanceof Error ? err.message : "AI analysis failed";
    const details =
      err instanceof Error ? err.stack ?? err.message : JSON.stringify(err);
    return NextResponse.json({ error: message, details }, { status });
  }

  if (paymentLock) {
    try {
      await markAnalysisConsumed(
        paymentLock.stripe,
        paymentLock.sessionId,
        paymentLock.session,
      );
      console.log("[ANALYZE] Marked checkout session as consumed", {
        sessionId: paymentLock.sessionId,
      });
    } catch (err) {
      console.error("[ANALYZE] Failed to mark session consumed:", err);
      return jsonError("Analysis completed but payment lock update failed", 502);
    }
  }

  rememberRequest(dedupKey, Date.now());

  const legalIssuesWarning =
    (effectiveTier === "basic" || effectiveTier === "professional") &&
    isRelocationLegallyBlocked(answers as Record<string, unknown>);

  return NextResponse.json({
    mode: "ai",
    analysis: result.analysis,
    top_countries: result.top_countries,
    legalRelocationBlocked: result.legalRelocationBlocked === true,
    legalIssuesWarning,
    ...(effectiveTier === "professional"
      ? {
          tax_legal_audit: result.tax_legal_audit,
          job_market_overview: result.job_market_overview,
          document_checklist: result.document_checklist,
        }
      : {}),
  });
}