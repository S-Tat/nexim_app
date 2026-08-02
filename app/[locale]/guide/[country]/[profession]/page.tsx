import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";
import { FeedbackForm } from "@/components/FeedbackForm";
import {
  GUIDE_COUNTRIES,
  GUIDE_PROFESSIONS,
  getGuideCopy,
  getGuideCountryBySlug,
  getGuideCountryName,
  getGuideProfessionBySlug,
  getGuideRequirementList,
} from "@/lib/programmatic-guides";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/seo";
import { isRtlLocale, locales, type Locale } from "@/routing";

type Params = {
  locale: string;
  country: string;
  profession: string;
};

type Props = {
  params: Params;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    GUIDE_COUNTRIES.flatMap((country) =>
      GUIDE_PROFESSIONS.map((profession) => ({
        locale,
        country: country.slug,
        profession: profession.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const country = getGuideCountryBySlug(params.country);
  const profession = getGuideProfessionBySlug(params.profession);

  if (!(locales as readonly string[]).includes(params.locale) || !country || !profession) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "questionnaire.extended",
  });
  const countryName = getGuideCountryName(country.code, locale);
  const professionName = t(profession.translationKey as never);
  const copy = getGuideCopy(locale);

  const pageTitle = copy.h1(countryName, professionName);
  const description = copy.description(countryName, professionName);

  return buildSubpageMetadata(pageTitle, description);
}

export default async function GuidePage({ params }: Props) {
  const locale = params.locale as Locale;

  if (!(locales as readonly string[]).includes(params.locale)) {
    notFound();
  }

  const country = getGuideCountryBySlug(params.country);
  const profession = getGuideProfessionBySlug(params.profession);

  if (!country || !profession) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "questionnaire.extended",
  });
  const countryName = getGuideCountryName(country.code, locale);
  const professionName = t(profession.translationKey as never);
  const copy = getGuideCopy(locale);
  const requirements = getGuideRequirementList(locale, country.slug);
  const rtl = isRtlLocale(locale);
  const pageUrl = `${getSiteUrl()}/${locale}/guide/${params.country}/${params.profession}`;
  const professionAnswerCode = profession.translationKey.replace(/^profession_/, "");

  return (
    <section className="relative flex flex-1 flex-col px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#fbbf24]/[0.08] blur-[100px]" />

      <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col gap-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-nexim-muted md:text-xs">
            {copy.badge}
          </p>
          <h1
            className={`max-w-5xl font-display text-3xl font-semibold leading-tight text-white md:text-5xl ${rtl ? "rtl:font-arabic" : ""}`}
          >
            {copy.h1(countryName, professionName)}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-nexim-muted md:text-lg">
            {copy.intro(countryName, professionName)}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-8">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              {copy.requirementsTitle(countryName)}
            </h2>
            <ul className="mt-6 grid gap-4">
              {requirements.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-sm leading-relaxed text-nexim-muted md:text-base"
                >
                  <span className="mr-3 inline-block h-2 w-2 rounded-full bg-[#fbbf24]" />
                  {item}
                </li>
              ))}
            </ul>
            <FeedbackForm pageUrl={pageUrl} className="mt-8 border-t border-white/[0.08] pt-8" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-8">
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                {copy.realChanceTitle(countryName)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-nexim-muted md:text-base">
                {copy.realChanceSubtitle}
              </p>
            </div>

            <div className="rounded-3xl border border-[#fbbf24]/20 bg-[#fbbf24]/[0.08] p-6 shadow-[0_16px_60px_-24px_rgba(251,191,36,0.55)] md:p-8">
              <h2 className="text-2xl font-semibold text-white">{copy.ctaTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-amber-50/85 md:text-base">
                {copy.ctaBody}
              </p>
              <Link
                href={{
                  pathname: "/my-plan",
                  query: {
                    country: country.code,
                    profession: professionAnswerCode,
                  },
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#fbbf24] px-6 py-4 text-center text-base font-semibold text-black transition hover:bg-[#fcd34d]"
              >
                {copy.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
