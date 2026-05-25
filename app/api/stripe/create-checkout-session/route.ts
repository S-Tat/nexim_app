// ── Local-dev TLS bypass ──
// Some Windows AV / corporate proxies intercept TLS and trip Node's
// certificate-revocation checks, surfacing as "An error occurred with our
// connection to Stripe. Request was retried 2 times.". We relax TLS
// verification ONLY in NODE_ENV=development so production keeps full chain
// validation. Must run before the Stripe SDK is loaded by `createTierCheckoutSession`.
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import { type NextRequest, NextResponse } from "next/server";
import { createTierCheckoutSession } from "@/lib/stripe-checkout";

/**
 * POST /api/stripe/create-checkout-session
 *
 * Legacy alias kept for the in-app `/checkout` page (`CheckoutClient`). New
 * call sites should use `/api/stripe/checkout`. Both delegate to the same
 * helper so behaviour cannot drift.
 *
 * The entire handler is wrapped in a top-level try/catch — any unexpected
 * crash is logged with `STRIPE API ERROR:` so the exact reason surfaces in
 * the dev terminal instead of bubbling up as a bare 500.
 */

export async function POST(req: NextRequest) {
  try {
    let body: { tier?: unknown; locale?: unknown };
    try {
      body = (await req.json()) as { tier?: unknown; locale?: unknown };
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const result = await createTierCheckoutSession(req, body.tier, body.locale);

    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.error,
          ...(result.fallback ? { fallback: true } : {}),
          ...(result.details ? { details: result.details } : {}),
        },
        { status: result.status },
      );
    }

    return NextResponse.json({ url: result.url, tier: result.tier });
  } catch (error) {
    console.error("STRIPE API ERROR:", error);
    const details = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "stripe_route_crashed", details },
      { status: 500 },
    );
  }
}
