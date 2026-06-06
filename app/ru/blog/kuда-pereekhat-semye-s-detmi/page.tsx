import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Куда переехать семье с детьми в 2026 году: анализ ИИ",
  description:
    "Топ стран для семей с детьми в 2026 году: Португалия, Германия, ОАЭ, Грузия, Таиланд. Как ИИ Nexim помогает выбрать страну для переезда.",
  keywords: [
    "куда переехать с детьми",
    "переезд семьи",
    "эмиграция с детьми",
    "лучшие страны для семей",
    "Nexim",
  ],
};

const COUNTRIES = [
  {
    name: "Португалия",
    text: "Безопасная страна, тёплый климат, хорошие международные школы и относительно невысокая стоимость жизни. Виза D7 позволяет переехать даже без работы на месте.",
  },
  {
    name: "Германия",
    text: "Бесплатное образование, отличная медицина и высокий уровень жизни. Минус — высокие налоги и сложный язык.",
  },
  {
    name: "ОАЭ",
    text: "Дубай и Абу-Даби предлагают отличные международные школы, безопасность и высокий уровень жизни. Подходит для семей с высоким доходом.",
  },
  {
    name: "Грузия",
    text: "Доступная страна с тёплым климатом, дружелюбным отношением к эмигрантам и простыми правилами въезда. Отличный вариант для начала.",
  },
  {
    name: "Таиланд",
    text: "Низкая стоимость жизни, хорошие международные школы в Бангкоке и Чиангмае, тёплый климат. Популярен среди цифровых кочевников с семьями.",
  },
] as const;

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

export default function BlogKudaPereekhatSemyePage() {
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
            href="/ru"
            className="font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white"
          >
            Nexim
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <LegalArticle
          title="Куда переехать семье с детьми в 2026 году: анализ ИИ"
          updated="Блог · 2026"
        >
          <div className="space-y-3 text-nexim-muted">
            <p>
              Переезд с детьми — одно из самых важных решений в жизни семьи. Нужно
              учесть качество школ, безопасность, медицину, стоимость жизни и климат.
              Именно поэтому всё больше семей используют ИИ для анализа вариантов
              переезда.
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white md:text-lg">
              Топ стран для семей с детьми
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

          <LegalBlock heading="Как ИИ помогает выбрать страну для переезда">
            <p>
              Каждая семья уникальна. У одних приоритет — образование, у других —
              безопасность или налоги. ИИ-анализатор на платформе Nexim учитывает
              ваши индивидуальные параметры: бюджет, количество детей, их возраст,
              приоритеты в образовании, визовые требования и налоговую ситуацию —
              и выдаёт персональные рекомендации именно для вашей семьи.
            </p>
          </LegalBlock>

          <div className="border-t border-white/[0.08] pt-10">
            <Link
              href="/ru"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
            >
              Попробовать бесплатно
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
