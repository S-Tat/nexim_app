import type { MetadataRoute } from "next";
import { getAllBlogPostParams } from "@/lib/blog-posts";
import { fetchAllGuideSitemapEntries } from "@/lib/guides-repository";
import { locales } from "@/routing";

const BASE_URL = "https://nexim.world";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const languageList = [...locales];

  const homePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...languageList.map((lang) => ({
      url: `${BASE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    })),
  ];

  const blogIndexPages: MetadataRoute.Sitemap = languageList.map((lang) => ({
    url: `${BASE_URL}/${lang}/blog`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guidesIndexPages: MetadataRoute.Sitemap = languageList.map((lang) => ({
    url: `${BASE_URL}/${lang}/guides`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogArticles: MetadataRoute.Sitemap = getAllBlogPostParams().map(
    ({ locale, slug }) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  const guideEntries = await fetchAllGuideSitemapEntries();
  const guidePages: MetadataRoute.Sitemap = guideEntries.map((guide) => ({
    url: `${BASE_URL}/${guide.lang}/guides/${guide.country}/${guide.profession}`,
    lastModified: guide.created_at ? new Date(guide.created_at) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...homePages,
    ...blogIndexPages,
    ...guidesIndexPages,
    ...blogArticles,
    ...guidePages,
  ];
}
