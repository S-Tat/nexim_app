import { LegalArticle } from "@/components/LegalArticle";
import { ArticleConversionLayout } from "@/components/ConversionBanner";
import { GuideFormattedContent } from "@/components/GuideFormattedContent";
import { Link } from "@/navigation";
import type { GuideRow } from "@/lib/guides-repository";
import { isRtlLocale, type Locale } from "@/routing";

type Props = {
  guide: GuideRow;
  locale: Locale;
  tryFreeLabel: string;
};

export function GuideArticleBody({ guide, locale, tryFreeLabel }: Props) {
  const rtl = isRtlLocale(locale);
  const updated = new Date(guide.created_at).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
  });

  return (
    <ArticleConversionLayout>
      <LegalArticle title={guide.title} updated={updated}>
      <GuideFormattedContent content={guide.content} rtl={rtl} />

      <div className="border-t border-white/[0.08] pt-10">
        <Link
          href="/"
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110${rtl ? " rtl:font-arabic" : ""}`}
        >
          {tryFreeLabel}
        </Link>
      </div>
    </LegalArticle>
    </ArticleConversionLayout>
  );
}
