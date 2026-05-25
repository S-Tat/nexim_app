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
 * POST /api/stripe/checkout
 *
 * Canonical Stripe Checkout entry point used by the pricing buttons.
 * Delegates to the shared `createTierCheckoutSession` helper so it stays in
 * lock-step with the legacy `/api/stripe/create-checkout-session` route.
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
