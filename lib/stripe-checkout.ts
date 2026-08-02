// ── Local-dev TLS bypass ──
// Belt-and-suspenders with the per-route declaration: setting this here too
// guarantees the env var is present when the `stripe` SDK is first loaded,
// even if this module ends up imported before any route handler boots.
// Production is unaffected (NODE_ENV check).
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import type { NextRequest } from "next/server";
import Stripe from "stripe";
import type { Locale } from "@/routing";
import { locales } from "@/routing";
import type { PaidPlanTier } from "@/lib/assessment-storage";

/**
 * Shared Stripe Checkout helpers. Used by both
 * `/api/stripe/checkout` (canonical) and the legacy
 * `/api/stripe/create-checkout-session` route so behaviour can't drift.
 */

export const STRIPE_AMOUNT_CENTS: Record<PaidPlanTier, number> = {
  basic: 400,
  professional: 700,
};

export const STRIPE_PRODUCT_NAME: Record<PaidPlanTier, string> = {
  basic: "Nexim Basic",
  professional: "Nexim Pro",
};

export const STRIPE_PRODUCT_DESC: Record<PaidPlanTier, string> = {
  basic: "Core country matching analysis",
  professional: "Full expert audit with document table",
};

export function isValidLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s);
}

export function isPaidTier(s: unknown): s is PaidPlanTier {
  return s === "basic" || s === "professional";
}

export function stripWrappingQuotes(raw: string): string {
  let v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

/**
 * Resolve the public origin that Stripe should redirect back to.
 *
 * Priority (highest → lowest):
 *   1. `Origin` header of the incoming request — matches whichever port Next
 *      dev actually settled on (3000 / 3001 / 3002 …).
 *   2. `NEXT_PUBLIC_APP_URL` → `NEXT_PUBLIC_BASE_URL` → `NEXT_PUBLIC_SITE_URL`.
 *   3. `req.nextUrl.origin` as last-resort fallback.
 */
export function resolveAppOrigin(req: NextRequest): string {
  const sanitize = (raw: string | null | undefined): string | null => {
    if (!raw) return null;
    const v = stripWrappingQuotes(raw).replace(/\/$/, "");
    if (!v) return null;
    if (!/^https?:\/\//i.test(v)) return null;
    return v;
  };

  const fromHeader = sanitize(req.headers.get("origin"));
  if (fromHeader) return fromHeader;

  const fromEnv =
    sanitize(process.env.NEXT_PUBLIC_APP_URL) ??
    sanitize(process.env.NEXT_PUBLIC_BASE_URL) ??
    sanitize(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  return req.nextUrl.origin;
}

export type CheckoutSessionResult =
  | { ok: true; url: string; tier: PaidPlanTier }
  | { ok: false; status: number; error: string; fallback?: boolean; details?: string };

/**
 * Create a Stripe Checkout Session for the given tier. Returns a structured
 * result instead of throwing so route handlers can map it cleanly to HTTP.
 * All exceptions are caught and logged with `STRIPE API ERROR:` so the exact
 * reason surfaces in the terminal.
 */
export async function createTierCheckoutSession(
  req: NextRequest,
  rawTier: unknown,
  rawLocale: unknown,
  options?: {
    returnPath?: string; // e.g. "/my-plan" — return path after payment
    flow?: string; // e.g. "single" — flow label
    destinationCountryCode?: string; // e.g. "DE"
    destinationCountryName?: string; // e.g. "Germany"
  },
): Promise<CheckoutSessionResult> {
  const secret = stripWrappingQuotes(process.env.STRIPE_SECRET_KEY ?? "");
  if (!secret) {
    return {
      ok: false,
      status: 503,
      error: "stripe_not_configured",
      fallback: true,
    };
  }

  if (!isPaidTier(rawTier)) {
    return { ok: false, status: 400, error: "Invalid tier" };
  }
  const tier: PaidPlanTier = rawTier;

  const localeRaw = typeof rawLocale === "string" ? rawLocale : "en";
  const locale: Locale = isValidLocale(localeRaw) ? (localeRaw as Locale) : "en";

  const origin = resolveAppOrigin(req);
  const rawReturnPath = options?.returnPath;
  // Only allow internal paths starting with a single "/", no protocol/scheme
  const safeReturnPath =
    typeof rawReturnPath === "string" &&
    /^\/[A-Za-z0-9\-_/]*$/.test(rawReturnPath)
      ? rawReturnPath
      : "/questionnaire";
  const successUrl =
    `${origin}/${locale}${safeReturnPath}` +
    `?checkout=success&session_id={CHECKOUT_SESSION_ID}` +
    `&tier=${encodeURIComponent(tier)}` +
    (options?.flow ? `&flow=${encodeURIComponent(options.flow)}` : "");
  const cancelUrl =
    `${origin}/${locale}/pricing?checkout=cancelled&tier=${encodeURIComponent(tier)}`;

  console.log("[STRIPE] Creating checkout session", {
    tier,
    locale,
    origin,
    successUrl,
    cancelUrl,
  });

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: STRIPE_AMOUNT_CENTS[tier],
            product_data: {
              name: STRIPE_PRODUCT_NAME[tier],
              description: STRIPE_PRODUCT_DESC[tier],
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        tier,
        ...(options?.flow ? { flow: options.flow } : {}),
        ...(options?.destinationCountryCode
          ? { destinationCountryCode: options.destinationCountryCode }
          : {}),
        ...(options?.destinationCountryName
          ? { destinationCountryName: options.destinationCountryName }
          : {}),
      },
    });

    if (!session.url) {
      console.error(
        "STRIPE API ERROR: session created without url",
        session.id,
      );
      return {
        ok: false,
        status: 502,
        error: "No checkout URL returned from Stripe",
      };
    }

    return { ok: true, url: session.url, tier };
  } catch (error) {
    console.error("STRIPE API ERROR:", error);
    const details =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error);
    return {
      ok: false,
      status: 502,
      error: "stripe_session_failed",
      details,
    };
  }
}
