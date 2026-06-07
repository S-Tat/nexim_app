import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";
import { GuideArticleBody } from "@/components/GuideArticleBody";
import { fetchGuideByParams } from "@/lib/guides-repository";
import { getCountryName } from "@/lib/countries";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import {
  getSeoGuideCountryBySlug,
  getSeoGuideProfessionBySlug,
  isSeoGuideLocale,
} from "@/lib/seo-guides-catalog";
import { isRtlLocale, locales, type Locale } from "@/routing";

type Params = {
  locale: string;
  country: string;
  profession: string;
};

type Props = { params: Params };

export const dynamic = "force-dynamic";

function fallbackDescription(
  countryName: string,
  professionName: string,
  locale: Locale,
): string {
  const templates: Record<Locale, string> = {
    en: `Relocation guide for ${professionName} professionals moving to ${countryName}: visas, salaries, job market, and cost of living.`,
    ru: `Гид по переезду для специалистов ${professionName} в ${countryName}: визы, зарплаты, рынок труда и стоимость жизни.`,
    de: `Relocation-Guide für ${professionName} nach ${countryName}: Visa, Gehälter, Arbeitsmarkt und Lebenshaltungskosten.`,
    ar: `دليل انتقال لمتخصصي ${professionName} إلى ${countryName}: التأشيرات والرواتب وسوق العمل وتكلفة المعيشة.`,
    fa: `راهنمای مهاجرت برای ${professionName} به ${countryName}: ویزا، حقوق، بازار کار و هزینه زندگی.`,
    zh: `${professionName} 前往 ${countryName} 的移居指南：签证、薪资、就业市场与生活成本。`,
    hi: `${countryName} में ${professionName} के लिए रिलोकेशन गाइड: वीज़ा, वेतन, जॉब मार्केट और जीवन लागत।`,
  };
  return templates[locale];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSeoGuideLocale(params.locale)) return {};

  const country = getSeoGuideCountryBySlug(params.country);
  const profession = getSeoGuideProfessionBySlug(params.profession);
  if (!country || !profession) return {};

  const locale = params.locale as Locale;
  const t = await getTranslations({
    locale,
    namespace: "questionnaire.extended",
  });
  const professionName = t(profession.translationKey as never);
  const countryName = getCountryName(country.code, locale) ?? country.name;
  const guide = await fetchGuideByParams(params.locale, params.country, params.profession);

  if (guide) {
    const excerpt = guide.content.replace(/\s+/g, " ").trim().slice(0, 160);
    return buildSubpageMetadata(guide.title, excerpt);
  }

  const tGuides = await getTranslations({ locale, namespace: "guides" });
  const title = tGuides("metaTitle", {
    profession: professionName,
    country: countryName,
  });
  return buildSubpageMetadata(
    title,
    fallbackDescription(countryName, professionName, locale),
  );
}

export default async function SeoGuidePage({ params }: Props) {
  if (!(locales as readonly string[]).includes(params.locale)) {
    notFound();
  }

  const country = getSeoGuideCountryBySlug(params.country);
  const profession = getSeoGuideProfessionBySlug(params.profession);

  if (!country || !profession) {
    notFound();
  }

  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "questionnaire.extended",
  });
  const tGuides = await getTranslations({ locale, namespace: "guides" });
  const professionName = t(profession.translationKey as never);
  const countryName = getCountryName(country.code, locale) ?? country.name;
  const rtl = isRtlLocale(locale);

  const guide = await fetchGuideByParams(params.locale, params.country, params.profession);

  if (guide) {
    return (
      <GuideArticleBody
        guide={guide}
        locale={locale}
        tryFreeLabel={tGuides("tryFree")}
      />
    );
  }

  return (
    <section className="relative flex flex-1 flex-col px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-[#fbbf24]/[0.08] blur-[100px]" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-nexim-muted md:text-xs">
          {tGuides("badge")}
        </p>
        <h1
          className={`font-display text-3xl font-semibold leading-tight text-white md:text-4xl ${rtl ? "rtl:font-arabic" : ""}`}
        >
          {tGuides("metaTitle", {
            profession: professionName,
            country: countryName,
          })}
        </h1>
        <p className="text-base leading-relaxed text-nexim-muted md:text-lg">
          {tGuides("comingSoon")}
        </p>
        <Link
          href="/"
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110${rtl ? " rtl:font-arabic" : ""}`}
        >
          {tGuides("tryFree")}
        </Link>
      </div>
    </section>
  );
}
