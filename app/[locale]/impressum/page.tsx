import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  return buildSubpageMetadata(t("impressumTitle"), t("impressumP_service"));
}

export default async function ImpressumPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("legal");
  const email = t("impressumEmail");

  return (
    <LegalArticle title={t("impressumTitle")} updated={t("impressumUpdated")}>
      <LegalBlock heading={t("impressumH2_operator")}>
        <p className="text-nexim-text">{t("impressumP_operatorName")}</p>
        <p className="whitespace-pre-line text-nexim-text">{t("impressumAddress")}</p>
        <p className="pt-1">
          <span className="text-nexim-muted">{t("impressumEmailPrefix")} </span>
          <a
            href={`mailto:${email}`}
            className="text-[#fbbf24]/90 underline-offset-2 hover:text-amber-200 hover:underline"
          >
            {email}
          </a>
        </p>
      </LegalBlock>
      <LegalBlock heading={t("impressumH2_service")}>
        <p>{t("impressumP_service")}</p>
      </LegalBlock>
      <LegalBlock heading={t("impressumH2_contentLaw")}>
        <p className="text-nexim-text">{t("impressumRStV")}</p>
      </LegalBlock>
    </LegalArticle>
  );
}
