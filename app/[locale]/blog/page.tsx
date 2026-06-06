import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import { getBlogPostsForLocale } from "@/lib/blog-posts";
import { buildSubpageMetadata } from "@/lib/page-metadata";
import { isRtlLocale } from "@/routing";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });
  return buildSubpageMetadata(t("listTitle"), t("listDescription"));
}

export default async function BlogIndexPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations("blog");
  const posts = getBlogPostsForLocale(params.locale);
  const rtl = isRtlLocale(params.locale);

  const cardClass =
    "group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#fbbf24]/40 hover:bg-[#fbbf24]/[0.05] md:p-8";

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10 md:py-16">
      <header className="max-w-2xl border-b border-white/[0.08] pb-8">
        <h1
          className={`font-display text-2xl font-semibold tracking-tight text-white md:text-3xl${rtl ? " rtl:font-arabic" : ""}`}
        >
          {t("listTitle")}
        </h1>
        <p className={`mt-3 text-sm leading-relaxed text-nexim-muted${rtl ? " rtl:font-arabic" : ""}`}>
          {t("listDescription")}
        </p>
      </header>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={cardClass}>
              <h2
                className={`font-display text-lg font-semibold text-white transition group-hover:text-[#fbbf24] md:text-xl${rtl ? " rtl:font-arabic" : ""}`}
              >
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-nexim-muted">
                {post.description}
              </p>
              <span
                className={`mt-5 inline-block text-sm font-semibold text-[#fbbf24]${rtl ? " rtl:font-arabic" : ""}`}
              >
                {t("readMore")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
