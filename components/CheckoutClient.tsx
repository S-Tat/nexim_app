"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { PaidPlanTier } from "@/lib/assessment-storage";

function normalizeTier(raw: string | null): PaidPlanTier | null {
  if (raw === "basic" || raw === "professional") return raw;
  return null;
}

export function CheckoutClient() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const tier = useMemo(() => normalizeTier(searchParams.get("tier")), [searchParams]);
  const flow = searchParams.get("flow") ?? undefined;
  const returnPath = searchParams.get("returnPath") ?? undefined;
  const destinationCountryCode = searchParams.get("country") ?? undefined;
  const destinationCountryName = searchParams.get("countryName") ?? undefined;
  const [invalidTier, setInvalidTier] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (tier === null) setInvalidTier(true);
  }, [tier]);

  async function startCheckout() {
    if (!tier) return;
    setBusy(true);
    setPaymentError(null);
    console.log("[CHECKOUT] Starting Stripe checkout", { tier, locale });
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          locale,
          ...(flow ? { flow } : {}),
          ...(returnPath ? { returnPath } : {}),
          ...(destinationCountryCode ? { destinationCountryCode } : {}),
          ...(destinationCountryName ? { destinationCountryName } : {}),
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { url?: string; error?: string; details?: string }
        | null;

      console.log("[CHECKOUT] /api/stripe/create-checkout-session response", {
        status: res.status,
        ok: res.ok,
        data,
      });

      if (res.ok && data && typeof data.url === "string" && data.url.length > 0) {
        window.location.assign(data.url);
        return;
      }

      console.error("[CHECKOUT] Stripe checkout failed", {
        status: res.status,
        error: data?.error,
        details: data?.details,
      });
      setPaymentError(
        data?.details || data?.error || `Checkout failed (HTTP ${res.status})`,
      );
    } catch (err) {
      console.error("[CHECKOUT] Stripe checkout network error:", err);
      setPaymentError(
        err instanceof Error ? err.message : "Network error contacting Stripe",
      );
    } finally {
      setBusy(false);
    }
    // NOTE: no questionnaire fallback. Paid tiers require a successful Stripe
    // session; otherwise we surface `paymentError` and stay on this page.
  }

  if (invalidTier || !tier) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="text-nexim-muted">{t("invalidTier")}</p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-[#fbbf24] underline-offset-4 hover:underline">
          {t("backHome")}
        </Link>
      </div>
    );
  }

  const proFeatures = [
    { icon: "🌍", title: t("proFeature1Title"), desc: t("proFeature1Desc") },
    { icon: "📊", title: t("proFeature2Title"), desc: t("proFeature2Desc") },
    { icon: "💼", title: t("proFeature3Title"), desc: t("proFeature3Desc") },
    { icon: "📋", title: t("proFeature4Title"), desc: t("proFeature4Desc") },
    { icon: "🗺️", title: t("proFeature5Title"), desc: t("proFeature5Desc") },
    { icon: "📄", title: t("proFeature6Title"), desc: t("proFeature6Desc") },
  ];
  const summaryLine =
    tier === "basic" ? t("summaryBasic") : t("summaryProfessional");
  const priceLine = tier === "basic" ? t("price_basic") : t("price_professional");

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col items-center px-6 py-16 md:px-10">
      <div
        className="w-full max-w-xl rounded-2xl border border-[#fbbf24]/25 bg-white/[0.04] p-8 text-center shadow-[0_0_80px_-30px_rgba(251,191,36,0.45)] backdrop-blur-xl md:p-12"
        role="region"
        aria-labelledby="checkout-title"
      >
        <h1
          id="checkout-title"
          className="font-display text-2xl font-bold uppercase tracking-tight text-transparent md:text-3xl bg-gradient-to-r from-[#fbbf24] to-amber-200 bg-clip-text"
        >
          {t("title")}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-nexim-muted md:text-base">{t("intro")}</p>
        <p className="mt-6 rounded-xl border border-white/10 bg-[#030712]/60 px-4 py-3 text-sm font-medium text-white">
          {summaryLine}
        </p>
        <p className="mt-4 text-lg font-semibold text-[#fbbf24]">{priceLine}</p>

        {tier === "professional" ? (
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#fbbf24]">
            {t("proCheckoutTitle")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {proFeatures.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                >
                  <span className="text-lg">{f.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{f.title}</p>
                    <p className="text-[11px] text-nexim-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-nexim-muted">
            {t("proCheckoutBadge")}
            </p>
          </div>
        ) : null}
        <p className="mt-2 text-xs text-nexim-muted">{t("afterPayHint")}</p>
        <button
          type="button"
          disabled={busy}
          onClick={() => void startCheckout()}
          className="mt-10 w-full rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-6 py-4 text-base font-bold text-[#030712] shadow-[0_0_48px_-8px_rgba(251,191,36,0.6)] transition enabled:hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? t("payStarting") : t("payCta")}
        </button>
        {paymentError ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200"
          >
            {paymentError}
          </p>
        ) : null}
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-nexim-muted underline-offset-4 hover:text-white hover:underline"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
