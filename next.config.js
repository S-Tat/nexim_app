const locales = ["ru", "en", "de", "ar", "fa", "zh", "hi"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const perLocale = locales.map((locale) => ({
      source: `/${locale}/assessment`,
      destination: `/${locale}/questionnaire`,
      permanent: false,
    }));
    const guideToGuides = locales.map((locale) => ({
      source: `/${locale}/guide/:path*`,
      destination: `/${locale}/guides/:path*`,
      permanent: true,
    }));
    return [
      { source: "/assessment", destination: "/en/questionnaire", permanent: false },
      ...perLocale,
      ...guideToGuides,
    ];
  },
  experimental: {
    /** Load from node_modules on the server to avoid flaky webpack vendor chunks for this package. */
    serverComponentsExternalPackages: ["i18n-iso-countries"],
  },
  // Disable React StrictMode: in development it double-invokes Effects and
  // render functions which can trigger the payment-gate redirect twice and
  // confuse the submit-lock guards. Turn off so behavior matches production.
  reactStrictMode: false,
  transpilePackages: [
    "next-intl",
    "@formatjs/intl",
    "@formatjs/intl-localematcher",
    "use-intl",
    "intl-messageformat",
  ],
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
