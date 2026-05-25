import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckoutClient } from "@/components/CheckoutClient";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "checkout" });
  return buildSubpageMetadata(t("title"), t("intro"));
}

export default async function CheckoutPage({ params }: Props) {
  setRequestLocale(params.locale);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center bg-[#030712] px-6 text-nexim-muted">
          <p className="text-sm">…</p>
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
