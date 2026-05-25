import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import { GuideLinkIndex } from "@/components/GuideLinkIndex";
import { NeximFreshNavLink } from "@/components/NeximFreshNavLink";
import { PricingCheckoutButton } from "@/components/PricingCheckoutButton";
import type { Locale } from "@/routing";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "hero" });

  return buildSubpageMetadata(t("tiersSectionTitle"), t("tiersIntroLead"));
}

export default async function PricingPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "hero" });

  const tierLinkClass =
    "group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-start shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-300 ease-out hover:z-[1] hover:-translate-y-1.5 hover:border-[#fbbf24]/55 hover:bg-[#fbbf24]/[0.07] hover:shadow-[0_12px_48px_-12px_rgba(251,191,36,0.45),0_0_0_1px_rgba(251,191,36,0.2)] md:p-8";

  return (
    <>
      <section className="relative flex flex-1 flex-col px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#fbbf24]/[0.07] blur-[100px]" />
        <div className="relative mx-auto w-full max-w-screen-2xl">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-nexim-muted md:text-xs">
              Nexim.world
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t("tiersSectionTitle")}
            </h1>
            <p className="mt-4 text-balance text-base leading-relaxed text-nexim-muted md:text-lg">
              {t("tiersIntroLead")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <NeximFreshNavLink
              href={{ pathname: "/questionnaire", query: { tier: "lite" } }}
              className={tierLinkClass}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                {t("tierLiteBadge")}
              </span>
              <span className="mt-1 text-lg font-bold tabular-nums text-amber-100 md:text-xl">
                {t("tierLitePrice")}
              </span>
              <span className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                {t("tierLiteTitle")}
              </span>
              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-nexim-muted md:text-base">
                {t("tierLiteDesc")}
              </p>
              <span className="mt-6 text-sm font-semibold text-[#fbbf24] group-hover:underline">
                {t("tierCtaLite")}
              </span>
            </NeximFreshNavLink>

            <PricingCheckoutButton tier="basic" className={tierLinkClass}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#fbbf24]">
                {t("tierBasicBadge")}
              </span>
              <span className="mt-1 text-lg font-bold tabular-nums text-amber-100 md:text-xl">
                {t("tierBasicPrice")}
              </span>
              <span className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                {t("tierBasicTitle")}
              </span>
              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-nexim-muted md:text-base">
                {t("tierBasicDesc")}
              </p>
              <span className="mt-6 text-sm font-semibold text-[#fbbf24] group-hover:underline">
                {t("tierCta")}
              </span>
            </PricingCheckoutButton>

            <PricingCheckoutButton tier="professional" className={tierLinkClass}>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-200">
                {t("tierProBadge")}
              </span>
              <span className="mt-1 text-lg font-bold tabular-nums text-amber-100 md:text-xl">
                {t("tierProPrice")}
              </span>
              <span className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                {t("tierProTitle")}
              </span>
              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-nexim-muted md:text-base">
                {t("tierProDesc")}
              </p>
              <span className="mt-6 text-sm font-semibold text-[#fbbf24] group-hover:underline">
                {t("tierCta")}
              </span>
            </PricingCheckoutButton>
          </div>
        </div>
      </section>

      <GuideLinkIndex locale={params.locale as Locale} variant="full" />
    </>
  );
}
