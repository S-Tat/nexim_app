import { type NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createServerClient } from "@/lib/supabase";

/**
 * POST /api/webhooks/stripe
 *
 * Verifies Stripe signature and optionally records payment in Supabase.
 */

function verifyStripeSignature(
  payload: string,
  sigHeader: string,
  secret: string,
): boolean {
  const parts = sigHeader.split(",");
  const tsEntry = parts.find((p) => p.startsWith("t="));
  const sigEntry = parts.find((p) => p.startsWith("v1="));
  if (!tsEntry || !sigEntry) return false;

  const timestamp = tsEntry.slice(2);
  const expectedSig = sigEntry.slice(3);
  const signedPayload = `${timestamp}.${payload}`;
  const computedSig = createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  const a = Buffer.from(computedSig, "hex");
  const b = Buffer.from(expectedSig, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const sigHeader = req.headers.get("stripe-signature");
    if (!sigHeader) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const body = await req.text();

    if (!verifyStripeSignature(body, sigHeader, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    let event: { type: string; data: { object: Record<string, unknown> } };
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email =
        typeof session.customer_email === "string" ? session.customer_email : "";
      const metadata = session.metadata as Record<string, unknown> | null;
      const tierRaw =
        metadata && typeof metadata.tier === "string" ? metadata.tier : "basic";
      const tier =
        tierRaw === "professional" ? "professional" : "basic";
      const amountTotal =
        typeof session.amount_total === "number" ? session.amount_total : null;
      const currency =
        typeof session.currency === "string" ? session.currency : "usd";
      const sessionId =
        typeof session.id === "string" ? session.id : null;

      if (email) {
        try {
          const sb = createServerClient();
          await sb.from("payments").insert({
            email: email.toLowerCase().trim(),
            tier,
            stripe_session_id: sessionId,
            amount_cents: amountTotal,
            currency,
            status: "confirmed",
          });
        } catch {
          /* payment row optional if Supabase misconfigured */
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
