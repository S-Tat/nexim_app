import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuideLinkIndex } from "@/components/GuideLinkIndex";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import type { Locale } from "@/routing";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "nav" });
  const tGuides = await getTranslations({ locale: params.locale, namespace: "guides" });
  return buildSubpageMetadata(t("guides"), tGuides("indexDescription"));
}

export default async function GuidesIndexPage({ params }: Props) {
  setRequestLocale(params.locale);

  return <GuideLinkIndex locale={params.locale as Locale} variant="full" />;
}
