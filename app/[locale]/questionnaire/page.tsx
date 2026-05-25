import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AssessmentEntryGate } from "@/components/AssessmentEntryGate";
import { PaymentReturnHandler } from "@/components/PaymentReturnHandler";
import { getCountryOptions } from "@/lib/countries";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = {
  params: { locale: string };
  searchParams?: { tier?: string };
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
 * Questionnaire: tier-aware wizard (`?tier=lite|basic|professional`).
 */
export default async function QuestionnairePage({ params }: Props) {
  setRequestLocale(params.locale);
  const tDashboard = await getTranslations({ locale: params.locale, namespace: "dashboard" });
  const options = getCountryOptions(params.locale);

  const fallback = (
    <div className="flex min-h-[40vh] items-center justify-center bg-[#030712] px-6 text-nexim-muted">
      <p className="text-sm">{tDashboard("loadingData")}</p>
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <PaymentReturnHandler>
        <AssessmentEntryGate countryOptions={options} />
      </PaymentReturnHandler>
    </Suspense>
  );
}
