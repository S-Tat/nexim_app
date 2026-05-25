"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

type Props = {
  part1: string;
  part2: string;
  /** When true, render rotating country name first (e.g. Hindi). */
  countryFirst: boolean;
  countries: string[];
};

const ROTATE_MS = 1200;

const gradientCountry =
  "bg-gradient-to-b from-[#fbbf24] via-amber-200 to-amber-400 bg-clip-text text-transparent";
const staticLine = "text-white/95";

export function HeroSeoHeadline({ part1, part2, countryFirst, countries }: Props) {
  const locale = useLocale();
  const countryGap = locale === "zh" ? "" : "mx-1 sm:mx-2";

  const list = useMemo(
    () => (countries.length > 0 ? countries : ["—"]),
    [countries],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [list.length]);

  const i = index % list.length;
  const name = list[i];

  const countryEl = (
    <span
      key={i}
      className={`hero-ticker-country inline-block ${gradientCountry} ${countryFirst ? "" : countryGap}`}
    >
      {name}
    </span>
  );

  const headlineTracking =
    locale === "zh" || locale === "hi" ? "tracking-normal" : "tracking-tight";

  return (
    <h1
      className={`font-display text-2xl font-bold leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl rtl:font-arabic ${headlineTracking}`}
    >
      {countryFirst ? (
        <span className="inline-block max-w-full">
          {countryEl}
          {part2 ? (
            <span className={`${staticLine} ms-1 inline sm:ms-2`}>{part2}</span>
          ) : null}
        </span>
      ) : (
        <span className="inline-block max-w-full">
          {part1 ? (
            <span className={`${staticLine} inline`}>{part1}</span>
          ) : null}
          {countryEl}
          {part2 ? (
            <span className={`${staticLine} inline`}>{part2}</span>
          ) : null}
        </span>
      )}
    </h1>
  );
}
