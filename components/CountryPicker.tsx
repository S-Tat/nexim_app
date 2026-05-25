"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { countryFlagEmoji } from "@/lib/countries";

export type CountryOption = { code: string; name: string };

type Props = {
  options: CountryOption[];
  selected: CountryOption | null;
  onSelectedChange: (option: CountryOption | null) => void;
  /** Defaults to assessment-country (target country step). */
  inputId?: string;
};

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

const INITIAL_HINT_COUNT = 24;
const MAX_SEARCH_RESULTS = 200;

export function CountryPicker({
  options,
  selected,
  onSelectedChange,
  inputId = "assessment-country",
}: Props) {
  const t = useTranslations("questionnaire.extended");
  const [query, setQuery] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(selected?.name ?? "");
  }, [selected]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const filtered = useMemo(() => {
    const nq = normalizeQuery(query);
    if (!nq) {
      return options.slice(0, INITIAL_HINT_COUNT);
    }
    return options.filter((o) => o.name.toLowerCase().includes(nq)).slice(0, MAX_SEARCH_RESULTS);
  }, [options, query]);

  function pick(option: CountryOption) {
    onSelectedChange(option);
    setQuery(option.name);
    setOpen(false);
  }

  const showList = open;

  return (
    <div ref={rootRef} className="relative mt-3">
      <input
        id={inputId}
        name="countrySearch"
        type="text"
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (selected && e.target.value !== selected.name) {
            onSelectedChange(null);
          }
        }}
        onFocus={() => setOpen(true)}
        placeholder={t("countryInputPlaceholder")}
        aria-autocomplete="list"
        aria-controls={showList ? "country-suggestions" : undefined}
        className="min-h-[52px] w-full rounded-xl border border-white/10 bg-[#030712]/80 px-4 py-3.5 text-base text-white shadow-inner outline-none transition placeholder:text-nexim-muted focus:border-[#fbbf24]/50 focus:ring-2 focus:ring-[#fbbf24]/25 md:min-h-[56px] md:text-lg"
      />
      <p className="mt-2 text-sm text-nexim-muted">{t("countryHelp")}</p>
      <p className="mt-1 text-xs text-nexim-muted/90">{t("countrySearchHint")}</p>

      {showList && (
        <ul
          id="country-suggestions"
          role="listbox"
          className="absolute z-[50] mt-2 max-h-[min(70vh,28rem)] w-full overflow-auto rounded-xl border border-white/10 bg-[#030712] py-1 shadow-xl shadow-black/50 md:max-h-[min(65vh,32rem)]"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-4 text-base text-nexim-muted">{t("countryNoResults")}</li>
          ) : (
            filtered.map((o) => (
              <li key={o.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected?.code === o.code}
                  className="flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-start text-base text-white transition hover:bg-white/[0.06] md:min-h-[56px] md:gap-4 md:text-lg"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(o)}
                >
                  <span className="text-2xl leading-none md:text-[1.75rem]" aria-hidden>
                    {countryFlagEmoji(o.code)}
                  </span>
                  <span className="min-w-0 flex-1">{o.name}</span>
                  <span className="shrink-0 font-mono text-xs text-nexim-muted">{o.code}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
