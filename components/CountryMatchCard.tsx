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
  showProDetails = false,
}: {
  country: CountryMatch;
  rank: number;
  expanded: boolean;
  onToggle: () => void;
  locale: string;
  /** Lite tier: hide step-by-step roadmap affordance */
  showRoadmap?: boolean;
  /** Pro tier: show weak_points and document_table */
  showProDetails?: boolean;
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
    <div className={`${glass} flex h-full min-w-0 flex-col overflow-hidden transition-all`}>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-2xl">{medal}</span>
          <div className="min-w-0 flex-1">
            <h3 className="break-words text-lg font-semibold leading-snug text-white whitespace-normal">
              {flag} {displayName}
            </h3>
            <p className="mt-0.5 break-words text-xs leading-relaxed text-nexim-muted whitespace-normal">
              {country.visa_name}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-3xl font-bold tabular-nums text-[#fbbf24]">
              {country.match_score}%
            </p>
            <p className="text-[10px] uppercase tracking-wider text-nexim-muted">
              {t("matchLabel")}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {t("prosLabel")}
            </p>
            <ul className="mt-2 space-y-1.5">
              {country.pros.map((p, i) => (
                <li
                  key={i}
                  className="break-words text-xs leading-relaxed text-nexim-text whitespace-normal"
                >
                  + {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              {t("consLabel")}
            </p>
            <ul className="mt-2 space-y-1.5">
              {country.cons.map((c, i) => (
                <li
                  key={i}
                  className="break-words text-xs leading-relaxed text-nexim-text whitespace-normal"
                >
                  − {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {country.gap_analysis.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#fbbf24]">
              {t("gapLabel")}
            </p>
            <ul className="mt-2 space-y-1.5">
              {country.gap_analysis.map((g, i) => (
                <li
                  key={i}
                  className="break-words text-xs leading-relaxed text-nexim-text whitespace-normal"
                >
                  ⚠ {g}
                </li>
              ))}
            </ul>
          </div>
        )}

{showProDetails && country.weak_points && country.weak_points.length > 0 && (
          <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              {t("weakPointsLabel")}
            </p>
            <ul className="mt-2 space-y-1.5">
              {country.weak_points.map((w, i) => (
                <li key={i} className="break-words text-xs leading-relaxed text-nexim-text whitespace-normal">
                  → {w}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showRoadmap ? (
          <>
            <button
              type="button"
              onClick={onToggle}
              className="mt-4 text-left text-xs font-semibold text-[#fbbf24] underline-offset-4 transition hover:underline"
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
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-medium text-white whitespace-normal">
                    {s.title}
                  </p>
                  <p className="mt-0.5 break-words text-xs text-nexim-muted whitespace-normal">
                    {s.deadline}
                  </p>
                  <p className="mt-1 break-words text-xs leading-relaxed text-nexim-text whitespace-normal">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
 )}

 {showProDetails && country.document_table && (
   <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-5">
     <h4 className="text-sm font-semibold text-white mb-3">{t("docTableLabel")}</h4>
     <div className="overflow-x-auto">
       <table className="w-full text-xs text-nexim-text">
         <tbody>
           {country.document_table
             .split("\n")
             .filter((row) => row.trim() && !row.match(/^\|[-| ]+\|$/))
             .map((row, i) => (
               <tr key={i} className={i === 0 ? "text-nexim-muted font-semibold" : "border-t border-white/[0.04]"}>
                 {row
                   .split("|")
                   .filter((_, ci) => ci > 0 && ci < row.split("|").length - 1)
                   .map((cell, ci) => (
                     <td key={ci} className="py-2 pr-4 align-top break-words">
                       {cell.trim()}
                     </td>
                   ))}
               </tr>
             ))}
         </tbody>
       </table>
     </div>
   </div>
 )}
</div>
);
}
