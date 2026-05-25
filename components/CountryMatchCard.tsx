"use client";

import { useTranslations } from "next-intl";
import type { CountryMatch } from "@/lib/analyze-client";
import { getCountryName, isValidAlpha2, countryFlagEmoji } from "@/lib/countries";

export function CountryMatchCard({
  country,
  rank,
  expanded,
  onToggle,
  locale,
  showRoadmap = true,
}: {
  country: CountryMatch;
  rank: number;
  expanded: boolean;
  onToggle: () => void;
  locale: string;
  /** Lite tier: hide step-by-step roadmap affordance */
  showRoadmap?: boolean;
}) {
  const t = useTranslations("dashboard");
  const displayName =
    isValidAlpha2(country.country_code)
      ? getCountryName(country.country_code, locale) ?? country.country_name
      : country.country_name;
  const flag = isValidAlpha2(country.country_code)
    ? countryFlagEmoji(country.country_code)
    : "";

  const glass =
    "rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";

  return (
    <div className={`${glass} overflow-hidden transition-all`}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{medal}</span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-white">
              {flag} {displayName}
            </h3>
            <p className="mt-0.5 text-xs text-nexim-muted">{country.visa_name}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-bold tabular-nums text-[#fbbf24]">
              {country.match_score}%
            </p>
            <p className="text-[10px] uppercase tracking-wider text-nexim-muted">
              {t("matchLabel")}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {t("prosLabel")}
            </p>
            <ul className="mt-2 space-y-1">
              {country.pros.map((p, i) => (
                <li key={i} className="text-xs leading-relaxed text-nexim-text">+ {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              {t("consLabel")}
            </p>
            <ul className="mt-2 space-y-1">
              {country.cons.map((c, i) => (
                <li key={i} className="text-xs leading-relaxed text-nexim-text">− {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {country.gap_analysis.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#fbbf24]">
              {t("gapLabel")}
            </p>
            <ul className="mt-2 space-y-1">
              {country.gap_analysis.map((g, i) => (
                <li key={i} className="text-xs text-nexim-text">⚠ {g}</li>
              ))}
            </ul>
          </div>
        )}

        {showRoadmap ? (
          <>
            <button
              type="button"
              onClick={onToggle}
              className="mt-4 text-xs font-semibold text-[#fbbf24] underline-offset-4 transition hover:underline"
            >
              {expanded ? t("hideRoadmap") : t("showRoadmap")}
            </button>
          </>
        ) : null}
      </div>

      {showRoadmap && expanded && country.roadmap.length > 0 && (
        <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-5">
          <h4 className="text-sm font-semibold text-white">{t("roadmapTitle")}</h4>
          <ol className="mt-4 space-y-4">
            {country.roadmap.map((s) => (
              <li key={s.step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fbbf24]/15 text-[10px] font-bold text-[#fbbf24]">
                  {s.step}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{s.title}</p>
                  <p className="mt-0.5 text-xs text-nexim-muted">{s.deadline}</p>
                  <p className="mt-1 text-xs leading-relaxed text-nexim-text">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
