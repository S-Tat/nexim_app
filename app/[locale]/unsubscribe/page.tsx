import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import { isRtlLocale } from "@/routing";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "unsubscribe" });
  return buildSubpageMetadata(t("title"), t("message"));
}

export default async function UnsubscribePage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("unsubscribe");
  const rtl = isRtlLocale(params.locale);
  const rtlClass = rtl ? " rtl:font-arabic" : "";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center md:px-10">
      <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-10">
        <h1 className={`font-display text-2xl font-semibold text-white md:text-3xl${rtlClass}`}>
          {t("title")}
        </h1>
        <p className={`mt-4 text-sm leading-relaxed text-nexim-muted md:text-base${rtlClass}`}>
          {t("message")}
        </p>
        <Link
          href="/"
          className={`mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110${rtlClass}`}
        >
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
