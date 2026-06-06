import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BlogArticleBody } from "@/components/BlogArticleBody";
import {
  getAllBlogPostParams,
  getBlogPost,
} from "@/lib/blog-posts";
import { buildSubpageMetadata } from "@/lib/page-metadata";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return getAllBlogPostParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.locale, params.slug);
  if (!post) return {};
  return buildSubpageMetadata(post.title, post.description);
}

export default async function BlogPostPage({ params }: Props) {
  setRequestLocale(params.locale);
  const post = getBlogPost(params.locale, params.slug);
  if (!post) notFound();

  return <BlogArticleBody post={post} />;
}
