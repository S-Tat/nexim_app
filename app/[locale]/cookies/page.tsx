import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  return buildSubpageMetadata(t("cookiesTitle"), t("cookiesP_intro"));
}

export default async function CookiesPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("legal");

  return (
    <LegalArticle title={t("cookiesTitle")} updated={t("cookiesUpdated")}>
      <LegalBlock heading={t("cookiesH2_intro")}>
        <p>{t("cookiesP_intro")}</p>
      </LegalBlock>
      <LegalBlock heading={t("cookiesH2_essential")}>
        <p>{t("cookiesP_essential")}</p>
      </LegalBlock>
      <LegalBlock heading={t("cookiesH2_analytics")}>
        <p>{t("cookiesP_analytics")}</p>
      </LegalBlock>
      <LegalBlock heading={t("cookiesH2_manage")}>
        <p>{t("cookiesP_manage")}</p>
      </LegalBlock>
      <LegalBlock heading={t("cookiesH2_more")}>
        <p>{t("cookiesP_more")}</p>
      </LegalBlock>
    </LegalArticle>
  );
}
