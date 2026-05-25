import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales } from "@/routing";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import { AssessmentResultsClient } from "./AssessmentResultsClient";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "result" });
  return buildSubpageMetadata(t("title"), t("empty"));
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function ResultsPageFallback() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-2xl items-center justify-center px-6 text-sm text-nexim-muted md:px-10">
      …
    </div>
  );
}

export default function AssessmentResultsPage() {
  return (
    <Suspense fallback={<ResultsPageFallback />}>
      <AssessmentResultsClient />
    </Suspense>
  );
}
