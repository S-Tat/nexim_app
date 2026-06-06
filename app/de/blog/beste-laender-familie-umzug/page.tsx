import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Beste Länder für Familien mit Kindern 2026: KI-Analyse",
  description:
    "Top-Länder für Familien mit Kindern 2026: Portugal, Deutschland, VAE, Georgien, Thailand. Wie Nexim KI bei der Länderwahl für den Familienumzug hilft.",
  keywords: [
    "Umzug mit Kindern",
    "Familienumzug",
    "beste Länder für Familien",
    "Auswandern mit Kindern",
    "Nexim",
  ],
};

const COUNTRIES = [
  {
    name: "Portugal",
    text: "Sicheres Land, warmes Klima, ausgezeichnete internationale Schulen und vergleichsweise niedrige Lebenshaltungskosten. Das D7-Visum ermöglicht den Umzug auch ohne lokales Jobangebot.",
  },
  {
    name: "Deutschland",
    text: "Kostenlose Bildung, exzellente Gesundheitsversorgung und ein hoher Lebensstandard machen Deutschland attraktiv. Nachteile sind hohe Steuern und die Sprachbarriere.",
  },
  {
    name: "VAE",
    text: "Dubai und Abu Dhabi bieten erstklassige internationale Schulen, hohe Sicherheit und einen gehobenen Lebensstandard. Am besten geeignet für Familien mit höherem Einkommen.",
  },
  {
    name: "Georgien",
    text: "Ein erschwingliches Land mit warmem Klima, herzlicher Einstellung gegenüber Expats und unkomplizierten Einreiseregeln. Ein hervorragender Einstieg für auswanderungswillige Familien.",
  },
  {
    name: "Thailand",
    text: "Niedrige Lebenshaltungskosten, gute internationale Schulen in Bangkok und Chiang Mai sowie ein warmes Klima. Sehr beliebt bei digitalen Nomadenfamilien.",
  },
] as const;

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

export default function BlogBesteLaenderFamilieUmzugPage() {
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
            href="/de"
            className="font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white"
          >
            Nexim
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <LegalArticle
          title="Beste Länder für Familien mit Kindern 2026: KI-Analyse"
          updated="Blog · 2026"
        >
          <div className="space-y-3 text-nexim-muted">
            <p>
              Ein Umzug ins Ausland mit Kindern ist eine der wichtigsten
              Entscheidungen im Familienleben. Schulen, Sicherheit,
              Gesundheitsversorgung, Lebenshaltungskosten und Klima spielen eine
              entscheidende Rolle. Immer mehr Familien nutzen daher KI, um ihre
              Umzugsoptionen zu analysieren.
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white md:text-lg">
              Top-Länder für Familien mit Kindern
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

          <LegalBlock heading="Wie KI bei der Länderwahl hilft">
            <p>
              Jede Familie ist einzigartig. Der KI-Analyzer auf der Nexim-Plattform
              berücksichtigt Ihre individuellen Parameter — Budget, Anzahl und Alter
              der Kinder, Bildungsprioritäten, Visaanforderungen und Steuersituation —
              und liefert personalisierte Empfehlungen speziell für Ihre Familie.
            </p>
          </LegalBlock>

          <div className="border-t border-white/[0.08] pt-10">
            <Link
              href="/de"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
            >
              Kostenlose Familienanalyse starten →
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
