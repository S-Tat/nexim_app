import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["en", "de", "ru", "fa", "ar", "zh", "hi"];
  const baseUrl = "https://nexim.world";

  const routes = languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...routes,
  ];
}
