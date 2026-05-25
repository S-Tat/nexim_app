"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { clearNeximQuestionnaireDraftAndResults } from "@/lib/assessment-storage";
import type { PaidPlanTier } from "@/lib/assessment-storage";

type Props = {
  tier: PaidPlanTier;
  className?: string;
  children: ReactNode;
};

/**
 * Pricing-page CTA for paid tiers (Basic, Pro).
 *
 * STRICT contract: clicking this button MUST hit Stripe Checkout. On any
 * failure path we surface the error in-place — we never grant access to the
 * questionnaire or any in-app fallback page, because that would let users
 * past the paywall.
 */
export function PricingCheckoutButton({ tier, className, children }: Props) {
  const locale = useLocale();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (busy) return;
    setBusy(true);
    setError(null);
    clearNeximQuestionnaireDraftAndResults();
    console.log("[PRICING] Starting Stripe checkout", { tier, locale });

    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, locale }),
      });

      const data = (await res.json().catch(() => null)) as
        | { url?: string; error?: string; details?: string }
        | null;

      console.log("[PRICING] /api/stripe/create-checkout-session response", {
        status: res.status,
        ok: res.ok,
        data,
      });

      if (res.ok && data && typeof data.url === "string" && data.url.length > 0) {
        window.location.assign(data.url);
        return;
      }

      console.error("[PRICING] Stripe checkout failed", {
        status: res.status,
        error: data?.error,
        details: data?.details,
      });
      const message =
        data?.details || data?.error || `Checkout failed (HTTP ${res.status})`;
      setError(message);
    } catch (err) {
      console.error("[PRICING] Stripe checkout network error:", err);
      setError(
        err instanceof Error ? err.message : "Network error contacting Stripe",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void start()}
      disabled={busy}
      className={className}
      data-tier={tier}
      aria-busy={busy}
    >
      {children}
      {error ? (
        <span
          role="alert"
          className="mt-3 block w-full rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200"
        >
          {error}
        </span>
      ) : null}
    </button>
  );
}
