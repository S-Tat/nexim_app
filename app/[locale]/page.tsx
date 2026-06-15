import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  LiveRegulatoryFeed,
  type RegulatoryFeedItem,
} from "@/components/LiveRegulatoryFeed";
import { GuideLinkIndex } from "@/components/GuideLinkIndex";
import { NeximFreshNavLink } from "@/components/NeximFreshNavLink";
import type { Locale } from "@/routing";

type Props = {
  params: { locale: string };
};

function parseRegulatoryFeedItems(raw: unknown): RegulatoryFeedItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (x): x is RegulatoryFeedItem =>
      typeof x === "object" &&
      x !== null &&
      typeof (x as RegulatoryFeedItem).country === "string" &&
      typeof (x as RegulatoryFeedItem).headline === "string",
  );
}

export default async function HomePage({ params }: Props) {
  setRequestLocale(params.locale);
  const tHero = await getTranslations("hero");
  const feedItems = parseRegulatoryFeedItems(tHero.raw("regulatoryFeedItems"));
  const headlineTracking =
    params.locale === "zh" || params.locale === "hi" ? "tracking-normal" : "tracking-tight";

  const tierLinkClass =
    "group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-start shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-300 ease-out hover:z-[1] hover:-translate-y-1.5 hover:border-[#fbbf24]/55 hover:bg-[#fbbf24]/[0.07] hover:shadow-[0_12px_48px_-12px_rgba(251,191,36,0.45),0_0_0_1px_rgba(251,191,36,0.2)] md:p-8";

  return (
    <>
      <section className="relative flex flex-1 flex-col items-center px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#fbbf24]/[0.07] blur-[100px]" />
        <div className="relative mx-auto w-full max-w-screen-2xl text-center">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-nexim-muted md:text-xs">
            Nexim.world
          </p>
          <h1
            className={`font-display text-2xl font-bold leading-[1.2] text-white/95 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl rtl:font-arabic ${headlineTracking}`}
          >
            {tHero("heroH1Static")}
          </h1>
          <p className="mx-auto mt-8 max-w-full text-balance text-base leading-relaxed text-nexim-muted md:text-lg lg:text-xl">
            {tHero("h2")}
          </p>

          <LiveRegulatoryFeed
            title={tHero("regulatoryFeedTitle")}
            liveBadge={tHero("regulatoryFeedLiveBadge")}
            statusPrefix={tHero("regulatoryFeedStatusPrefix")}
            items={feedItems}
          />
        </div>
      </section>

      <section
        aria-labelledby="access-tiers-heading"
        className="border-t border-white/[0.06] bg-black/20 px-6 py-16 md:px-10 md:py-24"
      >
        <h2
          id="access-tiers-heading"
          className="mx-auto mb-10 max-w-2xl text-balance text-center font-display text-xl font-semibold tracking-tight text-white md:mb-14 md:text-2xl"
        >
          {tHero("tiersIntroLead")}
        </h2>
        <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-[#fbbf24]/25 bg-[#fbbf24]/[0.06] px-6 py-5 text-center backdrop-blur-xl md:mb-14">
          <p className="text-pretty text-sm leading-relaxed text-amber-50/85 md:text-base">
            <span className="font-semibold text-white">{tHero("tierAnchorLead")}</span>{" "}
            {tHero("tierAnchorRest")}
          </p>
        </div>
        <div className="mx-auto grid max-w-screen-2xl gap-6 md:grid-cols-3 md:gap-8">
          <NeximFreshNavLink
            href={{ pathname: "/questionnaire", query: { tier: "lite" } }}
            className={tierLinkClass}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              {tHero("tierLiteBadge")}
            </span>
            <span className="mt-1 text-lg font-bold tabular-nums text-amber-100 md:text-xl">
              {tHero("tierLitePrice")}
            </span>
            <span className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              {tHero("tierLiteTitle")}
            </span>
            <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-nexim-muted md:text-base">
              {tHero("tierLiteDesc")}
            </p>
            <span className="mt-6 text-sm font-semibold text-[#fbbf24] group-hover:underline">
              {tHero("tierCtaLite")}
            </span>
          </NeximFreshNavLink>

          <NeximFreshNavLink
            href={{ pathname: "/checkout", query: { tier: "basic" } }}
            className={tierLinkClass}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#fbbf24]">
              {tHero("tierBasicBadge")}
            </span>
            <span className="mt-1 text-lg font-bold tabular-nums text-amber-100 md:text-xl">
              {tHero("tierBasicPrice")}
            </span>
            <span className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              {tHero("tierBasicTitle")}
            </span>
            <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-nexim-muted md:text-base">
              {tHero("tierBasicDesc")}
            </p>
            <span className="mt-6 text-sm font-semibold text-[#fbbf24] group-hover:underline">
              {tHero("tierCta")}
            </span>
          </NeximFreshNavLink>

          <NeximFreshNavLink
            href={{ pathname: "/checkout", query: { tier: "professional" } }}
            className={tierLinkClass}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-amber-200">
              {tHero("tierProBadge")}
            </span>
            <span className="mt-1 text-lg font-bold tabular-nums text-amber-100 md:text-xl">
              {tHero("tierProPrice")}
            </span>
            <span className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              {tHero("tierProTitle")}
            </span>
            <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-nexim-muted md:text-base">
              {tHero("tierProDesc")}
            </p>
            <span className="mt-6 text-sm font-semibold text-[#fbbf24] group-hover:underline">
              {tHero("tierCta")}
            </span>
          </NeximFreshNavLink>
        </div>
      </section>

      <GuideLinkIndex locale={params.locale as Locale} variant="featured" />

    </>
  );
}
