"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { AnalyzeResponse, CountryMatch } from "@/lib/analyze-client";
import {
  NEXIM_RESULT_TIER_KEY,
  NEXIM_STRATEGY_RESULT_KEY,
  clearNeximQuestionnaireDraftAndResults,
} from "@/lib/assessment-storage";
import {
  NEXIM_ACTIVE_TIER_KEY,
  NEXIM_PAYMENT_GATE_KEY,
  NEXIM_SELECTED_TIER_KEY,
} from "@/lib/nexim-payment-gate";
import { CountryMatchCard } from "@/components/CountryMatchCard";
import { MarkdownDocumentTable, MarkdownSection } from "@/components/MarkdownDocumentTable";

const RESULT_KEY = NEXIM_STRATEGY_RESULT_KEY;
const TIER_KEY = NEXIM_RESULT_TIER_KEY;

function navClear(): void {
  clearNeximQuestionnaireDraftAndResults();
}

function startNewAnalysis(): void {
  clearNeximQuestionnaireDraftAndResults();
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(NEXIM_PAYMENT_GATE_KEY);
    window.sessionStorage.setItem(NEXIM_ACTIVE_TIER_KEY, "lite");
    window.localStorage.setItem(NEXIM_SELECTED_TIER_KEY, "lite");
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch {
    /* ignore */
  }
}

function readStoredResult(): { data: AnalyzeResponse | null; tier: string } {
  if (typeof window === "undefined") return { data: null, tier: "basic" };
  try {
    const raw = window.sessionStorage.getItem(RESULT_KEY);
    const tierRaw = window.sessionStorage.getItem(TIER_KEY);
    if (!raw) return { data: null, tier: tierRaw ?? "basic" };
    const parsed = JSON.parse(raw) as AnalyzeResponse;
    if (!parsed || parsed.mode !== "ai") return { data: null, tier: tierRaw ?? "basic" };
    const blocked = parsed.legalRelocationBlocked === true;
    const hasCountries = Array.isArray(parsed.top_countries) && parsed.top_countries.length > 0;
    if (!blocked && !hasCountries) return { data: null, tier: tierRaw ?? "basic" };
    return { data: parsed, tier: tierRaw ?? "basic" };
  } catch {
    return { data: null, tier: "basic" };
  }
}

export function ResultView() {
  const t = useTranslations("result");
  const td = useTranslations("dashboard");
  const locale = useLocale();
  const [payload, setPayload] = useState<{ data: AnalyzeResponse | null; tier: string } | null>(
    null,
  );
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    setPayload(readStoredResult());
  }, []);

  if (payload === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-sm text-nexim-muted">
        {td("loadingData")}
      </div>
    );
  }

  const { data, tier } = payload;
  const countries: CountryMatch[] = data?.top_countries ?? [];
  const legallyBlocked = data?.legalRelocationBlocked === true;
  const isPro = tier === "professional";
  const isLite = tier === "lite";
  const isBasic = tier === "basic";
  const isExtended = isPro;
  const showLegalIssuesWarning = data?.legalIssuesWarning === true;

  const glass =
    "rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

  if (!data) {
    return (
      <div className="mx-auto max-w-screen-md px-6 py-16 text-center md:py-24">
        <div className={`${glass} p-8 md:p-10`}>
          <p className="text-nexim-muted">{t("empty")}</p>
          <Link
            href="/"
            onClick={navClear}
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
          >
            {td("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  if (!legallyBlocked && countries.length === 0) {
    return (
      <div className="mx-auto max-w-screen-md px-6 py-16 text-center md:py-24">
        <div className={`${glass} p-8 md:p-10`}>
          <p className="text-nexim-muted">{t("emptyNoCountries")}</p>
          <Link
            href="/questionnaire"
            onClick={startNewAnalysis}
            className="mt-6 inline-block rounded-full border border-[#fbbf24]/50 bg-[#fbbf24]/10 px-8 py-3 text-sm font-semibold text-[#fbbf24] transition hover:bg-[#fbbf24]/20"
          >
            {t("takeTest")}
          </Link>
        </div>
      </div>
    );
  }

  if (legallyBlocked) {
    return (
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
        <h1 className="font-display text-2xl font-semibold text-white md:text-3xl">{t("title")}</h1>

        <div
          className={`mt-8 rounded-2xl border border-red-500/50 bg-red-950/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl md:p-8`}
          role="alert"
        >
          <h2 className="text-base font-semibold text-red-400">{t("legalRelocationCriticalTitle")}</h2>
          <p className="mt-2 text-sm text-red-200/90">{t("legalRelocationCriticalHint")}</p>
        </div>

        {data.analysis ? (
          <div className={`mt-8 ${glass} p-6 md:p-8`}>
            <h2 className="text-base font-semibold text-white">{td("aiSummaryTitle")}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-nexim-text">
              {data.analysis}
            </p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/questionnaire"
            onClick={startNewAnalysis}
            className="inline-flex items-center rounded-full border border-[#fbbf24]/50 bg-[#fbbf24]/10 px-6 py-3 text-sm font-semibold text-[#fbbf24] transition hover:bg-[#fbbf24]/20"
          >
            {t("takeTest")}
          </Link>
          <Link
            href="/"
            onClick={navClear}
            className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-nexim-muted transition hover:text-white"
          >
            {td("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10">
      <h1 className="font-display text-2xl font-semibold text-white md:text-3xl">{t("title")}</h1>

      {showLegalIssuesWarning ? (
        <div
          className="mt-8 rounded-2xl border border-red-600/60 bg-red-950/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl md:p-6"
          role="alert"
        >
          <p className="text-sm font-semibold leading-relaxed text-red-200">{t("legalIssuesWarning")}</p>
        </div>
      ) : null}

      {data.analysis ? (
        <div className={`mt-8 ${glass} p-6 md:p-8`}>
          <h2 className="text-base font-semibold text-white">{td("aiSummaryTitle")}</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-nexim-text">
            {data.analysis}
          </p>
        </div>
      ) : null}

      {isPro ? (
        <div className="mt-8 space-y-6">
          <div className={`${glass} p-6 md:p-8`}>
            <h2 className="text-base font-semibold text-[#fbbf24]">
              {t("proTaxLegalTitle")}
            </h2>
            <div className="mt-4 text-nexim-text">
              {data.tax_legal_audit?.trim() ? (
                <MarkdownSection source={data.tax_legal_audit} />
              ) : (
                <p className="text-sm text-nexim-muted">{t("proSectionPending")}</p>
              )}
            </div>
          </div>
          <div className={`${glass} p-6 md:p-8`}>
            <h2 className="text-base font-semibold text-[#fbbf24]">
              {t("proJobMarketTitle")}
            </h2>
            <div className="mt-4 text-nexim-text">
              {data.job_market_overview?.trim() ? (
                <MarkdownSection source={data.job_market_overview} />
              ) : (
                <p className="text-sm text-nexim-muted">{t("proSectionPending")}</p>
              )}
            </div>
          </div>
          <div className={`${glass} p-6 md:p-8`}>
            <h2 className="text-base font-semibold text-[#fbbf24]">
              {t("proDocChecklistTitle")}
            </h2>
            <div className="mt-4 text-nexim-text">
              {data.document_checklist?.trim() ? (
                <MarkdownSection source={data.document_checklist} />
              ) : (
                <p className="text-sm text-nexim-muted">{t("proSectionPending")}</p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {countries.map((c, i) => (
          <CountryMatchCard
            key={`${c.country_code}-${i}`}
            country={c}
            rank={i + 1}
            expanded={expandedIdx === i}
            onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
            locale={locale}
            showRoadmap={!isLite}
          />
        ))}
      </div>

      {isLite ? (
        <div className={`mt-8 ${glass} flex flex-col items-center gap-4 p-6 text-center md:flex-row md:text-left`}>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{t("liteRoadmapLocked")}</p>
            <p className="mt-1 text-xs text-nexim-muted">{t("liteRoadmapLockedHint")}</p>
          </div>
          <Link
            href={{ pathname: "/checkout", query: { tier: "professional" } }}
            className="shrink-0 rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-5 py-2.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
          >
            {t("upgradeToPro")}
          </Link>
        </div>
      ) : null}

      {isBasic ? (
        <div className={`mt-8 ${glass} flex flex-col items-center gap-4 p-6 text-center md:flex-row md:text-left`}>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{t("upsellBasicLead")}</p>
            <p className="mt-1 text-xs text-nexim-muted">{t("upsellBasicHint")}</p>
          </div>
          <Link
            href={{ pathname: "/checkout", query: { tier: "professional" } }}
            className="shrink-0 rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-5 py-2.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
          >
            {t("upgradePro")}
          </Link>
        </div>
      ) : null}

      {isExtended && countries[0]?.document_table ? (
        <div className={`mt-8 ${glass} p-6 md:p-8`}>
          <h2 className="text-base font-semibold text-white">
            {t("docTableTitle")} — {countries[0].country_name}
          </h2>
          <div className="mt-4">
            <MarkdownDocumentTable source={countries[0].document_table} />
          </div>
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/questionnaire"
          onClick={startNewAnalysis}
          className="inline-flex items-center rounded-full border border-[#fbbf24]/50 bg-[#fbbf24]/10 px-6 py-3 text-sm font-semibold text-[#fbbf24] transition hover:bg-[#fbbf24]/20"
        >
          {t("takeTest")}
        </Link>
        <Link
          href="/"
          onClick={navClear}
          className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-nexim-muted transition hover:text-white"
        >
          {td("backHome")}
        </Link>
      </div>
    </div>
  );
}
