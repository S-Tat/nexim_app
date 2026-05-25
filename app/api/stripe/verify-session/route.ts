import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { PaidPlanTier } from "@/lib/assessment-storage";

export async function GET(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Not paid" }, { status: 402 });
  }

  const raw = session.metadata?.tier;
  const tier: PaidPlanTier =
    raw === "professional" ? "professional" : raw === "basic" ? "basic" : "basic";

  const res = NextResponse.json({ tier, ok: true });
  res.cookies.set("nexim_checkout_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return res;
}
