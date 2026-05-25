import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import { GuideLinkIndex } from "@/components/GuideLinkIndex";
import type { Locale } from "@/routing";

type Props = { params: { locale: string } };

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "legal",
  });
  return buildSubpageMetadata(
    t("termsPrivacyPageTitle"),
    t("termsDisclaimerOfLiabilityHeading"),
  );
}

export default async function TermsPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("legal");

  return (
    <>
      <div className="min-h-[60vh] bg-white text-neutral-900">
        <article className="mx-auto max-w-2xl px-6 py-12 md:px-10 md:py-16">
          <header className="border-b border-neutral-200 pb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              {t("termsPrivacyPageTitle")}
            </h1>
            <p className="mt-2 text-xs text-neutral-500">{t("termsPrivacyPageUpdated")}</p>
          </header>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-black">
              {t("termsDisclaimerOfLiabilityHeading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-800">
              {t("termsDisclaimerOfLiabilityBody")}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-black">
              {t("termsAiDataConsentHeading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-800">
              {t("termsAiDataConsentBody")}
            </p>
          </section>
        </article>
      </div>

      <GuideLinkIndex locale={params.locale as Locale} variant="full" />
    </>
  );
}
