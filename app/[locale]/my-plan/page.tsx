import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AssessmentWizard } from "@/components/AssessmentWizard";
import { getCountryOptions } from "@/lib/countries";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = {
  params: { locale: string };
  searchParams?: { country?: string; profession?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "metadata" });
  const tQ = await getTranslations({
    locale: params.locale,
    namespace: "questionnaire.extended",
  });
  return buildSubpageMetadata(t("pageQuestionnaire"), tQ("title"));
}

/**
 * My Plan: single-country questionnaire (no payment gate).
 * Optional `?country=` / `?profession=` prefill from guide entry.
 */
export default async function MyPlanPage({ params, searchParams }: Props) {
  setRequestLocale(params.locale);
  const tDashboard = await getTranslations({
    locale: params.locale,
    namespace: "dashboard",
  });
  const options = getCountryOptions(params.locale);

  const fallback = (
    <div className="flex min-h-[40vh] items-center justify-center bg-[#030712] px-6 text-nexim-muted">
      <p className="text-sm">{tDashboard("loadingData")}</p>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <AssessmentWizard
        countryOptions={options}
        prefillCountryCode={searchParams?.country}
        prefillProfession={searchParams?.profession}
      />
    </Suspense>
  );
}
