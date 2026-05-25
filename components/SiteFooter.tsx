import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { getGuideCountryName } from "@/lib/programmatic-guides";
import type { Locale } from "@/routing";

type Props = {
  locale: Locale;
};

export async function SiteFooter({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tQuestionnaire = await getTranslations({
    locale,
    namespace: "questionnaire.extended",
  });

  const footerGuideCopy: Record<Locale, string> = {
    en: "Popular guides",
    ru: "Популярные гайды",
    de: "Beliebte Guides",
    ar: "أدلة شائعة",
    fa: "راهنماهای محبوب",
    zh: "热门指南",
    hi: "लोकप्रिय गाइड्स",
  };
  const featuredGuides = [
    {
      countryCode: "DE",
      countrySlug: "germany",
      professionSlug: "it-software",
      professionLabel: tQuestionnaire("profession_it_software"),
    },
    {
      countryCode: "PT",
      countrySlug: "portugal",
      professionSlug: "engineering",
      professionLabel: tQuestionnaire("profession_engineering"),
    },
    {
      countryCode: "CA",
      countrySlug: "canada",
      professionSlug: "medicine",
      professionLabel: tQuestionnaire("profession_medicine"),
    },
    {
      countryCode: "AE",
      countrySlug: "united-arab-emirates",
      professionSlug: "finance",
      professionLabel: tQuestionnaire("profession_finance"),
    },
  ].map((guide) => ({
    ...guide,
    countryLabel: getGuideCountryName(guide.countryCode, locale),
  }));

  const subLink =
    "text-[11px] text-white/40 transition hover:text-white/65 hover:underline underline-offset-2";

  return (
    <footer className="border-t border-white/[0.06] bg-black/40 px-6 py-10 md:px-10 print:hidden">
      <div className="mx-auto max-w-screen-2xl">
        <p className="text-sm leading-relaxed text-nexim-muted">{t("disclaimer")}</p>

        <nav
          aria-label={t("legalNavLabel")}
          className="mt-8 border-t border-white/[0.05] pt-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center md:justify-start">
            <Link href="/terms" className={subLink}>
              {t("termsLink")}
            </Link>
            <span className="px-1.5 text-[10px] text-white/20 select-none" aria-hidden>
              ·
            </span>
            <Link href="/privacy" className={subLink}>
              {t("privacyLink")}
            </Link>
            <span className="px-1.5 text-[10px] text-white/20 select-none" aria-hidden>
              ·
            </span>
            <Link href="/cookies" className={subLink}>
              {t("cookiesLink")}
            </Link>
            <span className="px-1.5 text-[10px] text-white/20 select-none" aria-hidden>
              ·
            </span>
            <Link href="/impressum" className={subLink}>
              {t("impressumLink")}
            </Link>
          </div>
        </nav>

        <div className="mt-6 border-t border-white/[0.05] pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
            {footerGuideCopy[locale]}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {featuredGuides.map((guide) => (
              <Link
                key={`${guide.countrySlug}-${guide.professionSlug}`}
                href={`/guide/${guide.countrySlug}/${guide.professionSlug}`}
                className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-amber-100/85 transition hover:border-[#fbbf24]/45 hover:text-[#fbbf24]"
              >
                {guide.professionLabel} · {guide.countryLabel}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 flex justify-center md:justify-start">
          <Link
            href="/terms"
            className="text-[10px] text-white/35 transition hover:text-white/55 hover:underline underline-offset-2"
          >
            {t("termsPrivacyCombined")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
