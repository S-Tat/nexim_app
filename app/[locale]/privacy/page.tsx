import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  return buildSubpageMetadata(t("privacyTitle"), t("privacyP_intro"));
}

export default async function PrivacyPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("legal");

  return (
    <LegalArticle title={t("privacyTitle")} updated={t("privacyUpdated")}>
      <LegalBlock heading={t("privacyH2_intro")}>
        <p>{t("privacyP_intro")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_collect")}>
        <p>{t("privacyP_collect")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_email")}>
        <p>{t("privacyP_email")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_processing")}>
        <p>{t("privacyP_processing")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_legalBasis")}>
        <p>{t("privacyP_legalBasis")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_retention")}>
        <p>{t("privacyP_retention")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_rights")}>
        <p>{t("privacyP_rights")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_transfers")}>
        <p>{t("privacyP_transfers")}</p>
      </LegalBlock>
      <LegalBlock heading={t("privacyH2_contact")}>
        <p>{t("privacyP_contact")}</p>
      </LegalBlock>
    </LegalArticle>
  );
}
