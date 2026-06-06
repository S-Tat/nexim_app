import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getHreflangAlternates,
  getLocalizedUrl,
  getSiteUrl,
  OG_IMAGE_PATH,
} from "@/lib/seo";
import { isRtlLocale, locales, routing, type Locale } from "@/routing";

import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const requestHeaders = headers();
  const currentPathname = requestHeaders.get("x-current-path") ?? `/${locale}`;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = getSiteUrl();
  const canonicalUrl = getLocalizedUrl(locale as Locale, currentPathname);
  const keywords = t("keywords")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s | Nexim`,
    },
    description: t("description"),
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(currentPathname),
    },
    openGraph: {
      type: "website",
      locale,
      url: canonicalUrl,
      siteName: "Nexim",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE_PATH],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const metaT = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = getSiteUrl();

  const rtl = isRtlLocale(locale);

  return (
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <SeoJsonLd
          name="Nexim"
          description={metaT("description")}
          url={siteUrl}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <div
              className="pointer-events-none fixed inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden
            />
            <Header locale={locale as Locale} />
            <main className="relative z-10 flex flex-1 flex-col">{children}</main>
            <SiteFooter locale={locale as Locale} />
            <CookieBanner />
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
