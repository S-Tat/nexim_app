import type { MetadataRoute } from "next";
import { GUIDE_COUNTRIES, GUIDE_PROFESSIONS } from "@/lib/programmatic-guides";
import { getHreflangAlternates, getLocalizedUrl, SEO_ROUTE_SEGMENTS } from "@/lib/seo";
import { locales } from "@/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const coreRoutes = SEO_ROUTE_SEGMENTS.flatMap((segment) =>
    locales.map((locale) => {
      const pathname = segment ? `/${segment}` : "/";

      return {
        url: getLocalizedUrl(locale, pathname),
        lastModified,
        alternates: {
          languages: getHreflangAlternates(pathname),
        },
      };
    }),
  );

  const guideRoutes = locales.flatMap((locale) =>
    GUIDE_COUNTRIES.flatMap((country) =>
      GUIDE_PROFESSIONS.map((profession) => {
        const pathname = `/guide/${country.slug}/${profession.slug}`;

        return {
          url: getLocalizedUrl(locale, pathname),
          lastModified,
          alternates: {
            languages: getHreflangAlternates(pathname),
          },
        };
      }),
    ),
  );

  return [...coreRoutes, ...guideRoutes];
}
