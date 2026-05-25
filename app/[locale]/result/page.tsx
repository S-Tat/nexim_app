import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ResultView } from "@/components/ResultView";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "result" });
  return buildSubpageMetadata(t("title"), t("empty"));
}

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <ResultView />
    </div>
  );
}
