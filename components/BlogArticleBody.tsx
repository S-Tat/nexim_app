import { LegalArticle, LegalBlock } from "@/components/LegalArticle";
import { ArticleConversionLayout } from "@/components/ConversionBanner";
import { Link } from "@/navigation";
import type { BlogPost } from "@/lib/blog-posts";
import { getBlogPostsForLocale } from "@/lib/blog-posts";
import { isRtlLocale } from "@/routing";

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

type Props = {
  post: BlogPost;
};

export function BlogArticleBody({ post }: Props) {
  const rtl = isRtlLocale(post.locale);
  const relatedPosts = getBlogPostsForLocale(post.locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <ArticleConversionLayout>
      <LegalArticle title={post.title} updated={post.updated}>
      <div className="space-y-3 text-nexim-muted">
        <p>{post.intro}</p>
      </div>

      <section>
        <h2
          className={`text-base font-semibold text-white md:text-lg${rtl ? " rtl:font-arabic" : ""}`}
        >
          {post.countriesHeading}
        </h2>
        <ul className="mt-6 space-y-4">
          {post.countries.map((country) => (
            <li key={country.name} className={GLASS_CARD}>
              <h3
                className={`font-display text-base font-semibold text-[#fbbf24] md:text-lg${rtl ? " rtl:font-arabic" : ""}`}
              >
                {country.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-nexim-muted">
                {country.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <LegalBlock heading={post.aiHeading}>
        <p>{post.aiBody}</p>
      </LegalBlock>

      <div className="border-t border-white/[0.08] pt-10">
        <Link
          href="/questionnaire?tier=lite"
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110${rtl ? " rtl:font-arabic" : ""}`}
        >
          {post.ctaLabel}
        </Link>
      </div>

      {relatedPosts.length > 0 && (
        <section className="border-t border-white/[0.08] pt-10">
          <h2 className={`text-base font-semibold text-white md:text-lg${rtl ? " rtl:font-arabic" : ""}`}>
            {rtl ? "مقالات ذات صلة" : "Read more"}
          </h2>
          <ul className="mt-4 space-y-3">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/blog/${related.slug}`}
                  className={`text-sm text-[#fbbf24] underline-offset-4 hover:underline${rtl ? " rtl:font-arabic" : ""}`}
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </LegalArticle>
    </ArticleConversionLayout>
  );
}
