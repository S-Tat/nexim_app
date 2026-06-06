import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Best Countries to Relocate with Children in 2026: AI Analysis",
  description:
    "Top countries for families with children in 2026: Portugal, Germany, UAE, Georgia, Thailand. How Nexim AI helps you choose the right country for relocation.",
  keywords: [
    "relocate with children",
    "family relocation",
    "best countries for families",
    "moving abroad with kids",
    "Nexim",
  ],
};

const COUNTRIES = [
  {
    name: "Portugal",
    text: "Safe country, warm climate, excellent international schools and relatively affordable cost of living compared to other Western European countries. The D7 visa allows relocation even without a local job offer.",
  },
  {
    name: "Germany",
    text: "Free education, excellent healthcare and a high standard of living make Germany very attractive for families. The downsides are high taxes and a challenging language barrier.",
  },
  {
    name: "UAE",
    text: "Dubai and Abu Dhabi offer world-class international schools, exceptional safety and a high quality of life. Best suited for families with higher incomes.",
  },
  {
    name: "Georgia",
    text: "An affordable country with a warm climate, a welcoming attitude toward expats and simple entry rules. A great starting point for families new to relocation.",
  },
  {
    name: "Thailand",
    text: "Low cost of living, good international schools in Bangkok and Chiang Mai, and a warm climate. Very popular among digital nomad families.",
  },
] as const;

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

export default function BlogBestCountriesFamilyRelocationPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#030712] font-sans text-foreground antialiased">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <header className="relative z-20 border-b border-white/[0.06] bg-nexim-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-screen-2xl items-center px-4 py-3 md:px-10 md:h-[4.25rem]">
          <Link
            href="/en"
            className="font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white"
          >
            Nexim
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <LegalArticle
          title="Best Countries to Relocate with Children in 2026: AI Analysis"
          updated="Blog · 2026"
        >
          <div className="space-y-3 text-nexim-muted">
            <p>
              Moving abroad with children is one of the most significant decisions a
              family can make. Schools, safety, healthcare, cost of living, and climate
              all matter deeply. That is why more and more families are turning to AI to
              analyze their relocation options.
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white md:text-lg">
              Top Countries for Families with Children
            </h2>
            <ul className="mt-6 space-y-4">
              {COUNTRIES.map((country) => (
                <li key={country.name} className={GLASS_CARD}>
                  <h3 className="font-display text-base font-semibold text-[#fbbf24] md:text-lg">
                    {country.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-nexim-muted">
                    {country.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <LegalBlock heading="How AI Helps You Choose the Right Country">
            <p>
              Every family is unique. Some prioritize education, others safety or taxes.
              The AI analyzer at Nexim considers your individual parameters — budget,
              number and ages of children, education priorities, visa requirements and
              tax situation — and delivers personalized recommendations specifically
              for your family.
            </p>
          </LegalBlock>

          <div className="border-t border-white/[0.08] pt-10">
            <Link
              href="/en"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
            >
              Get My Free Family Analysis →
            </Link>
          </div>
        </LegalArticle>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center text-xs text-nexim-muted md:px-10">
        <p>© Nexim · nexim.world</p>
      </footer>
    </div>
  );
}
