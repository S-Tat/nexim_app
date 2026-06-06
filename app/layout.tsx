import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "Nexim",
  title: {
    default: "Nexim – AI Relocation Advisor | Find Your Perfect Country",
    template: "%s | Nexim",
  },
  description:
    "AI-powered relocation advisor. Answer a few questions and discover the best country to move to based on your lifestyle, budget and goals.",
  keywords: [
    "relocation",
    "where to move",
    "immigration",
    "AI advisor",
    "куда переехать",
    "umzug",
    "هجرة",
    "مهاجرت",
    "移民",
  ],
  alternates: {
    languages: {
      en: "https://nexim.world/en",
      de: "https://nexim.world/de",
      ru: "https://nexim.world/ru",
      fa: "https://nexim.world/fa",
      ar: "https://nexim.world/ar",
      zh: "https://nexim.world/zh",
      hi: "https://nexim.world/hi",
    },
  },
  openGraph: {
    title: "Nexim – AI Relocation Advisor",
    description: "Find your perfect country to move to with AI",
    url: "https://nexim.world",
    siteName: "Nexim",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
