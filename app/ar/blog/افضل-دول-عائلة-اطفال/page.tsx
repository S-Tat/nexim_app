import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "أفضل الدول للهجرة مع الأطفال في 2026: تحليل الذكاء الاصطناعي",
  description:
    "أفضل الدول للعائلات ذات الأطفال في 2026: البرتغال، ألمانيا، الإمارات، جورجيا، تايلاند. كيف يساعد Nexim الذكاء الاصطناعي في اختيار دولة الهجرة.",
  keywords: [
    "الهجرة مع الأطفال",
    "أفضل دول للعائلات",
    "انتقال العائلة",
    "تحليل الهجرة بالذكاء الاصطناعي",
    "Nexim",
  ],
};

const COUNTRIES = [
  {
    name: "البرتغال",
    text: "بلد آمن، مناخ دافئ، مدارس دولية ممتازة وتكلفة معيشة معقولة. تأشيرة D7 تتيح الانتقال حتى بدون عرض عمل محلي.",
  },
  {
    name: "ألمانيا",
    text: "التعليم المجاني والرعاية الصحية الممتازة ومستوى المعيشة المرتفع يجعل ألمانيا جذابة للعائلات. السلبيات: الضرائب المرتفعة وحاجز اللغة.",
  },
  {
    name: "الإمارات",
    text: "تقدم دبي وأبوظبي مدارس دولية عالمية المستوى وأماناً عالياً وجودة حياة رفيعة. الأنسب للعائلات ذات الدخل المرتفع.",
  },
  {
    name: "جورجيا",
    text: "بلد ميسور التكلفة بمناخ دافئ وترحيب بالمغتربين وقواعد دخول مبسطة. نقطة انطلاق ممتازة للعائلات.",
  },
  {
    name: "تايلاند",
    text: "تكلفة معيشة منخفضة ومدارس دولية جيدة في بانكوك وشيانغ ماي ومناخ دافئ. شائع جداً بين عائلات الرحّالة الرقميين.",
  },
] as const;

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

export default function BlogAfdalDulUailaAtfalPage() {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="relative flex min-h-screen flex-col bg-[#030712] font-sans text-foreground antialiased rtl:font-arabic"
    >
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
            href="/ar"
            className="font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white rtl:font-arabic"
          >
            Nexim
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <LegalArticle
          title="أفضل الدول للهجرة مع الأطفال في 2026: تحليل الذكاء الاصطناعي"
          updated="المدونة · 2026"
        >
          <div className="space-y-3 text-nexim-muted">
            <p>
              الانتقال إلى الخارج مع الأطفال هو أحد أهم القرارات في حياة الأسرة.
              جودة المدارس والأمان والرعاية الصحية وتكلفة المعيشة والمناخ — كل هذه
              العوامل تلعب دوراً حاسماً. لهذا السبب تلجأ عائلات أكثر فأكثر إلى
              الذكاء الاصطناعي لتحليل خيارات الهجرة.
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white md:text-lg rtl:font-arabic">
              أفضل الدول للعائلات ذات الأطفال
            </h2>
            <ul className="mt-6 space-y-4">
              {COUNTRIES.map((country) => (
                <li key={country.name} className={GLASS_CARD}>
                  <h3 className="font-display text-base font-semibold text-[#fbbf24] md:text-lg rtl:font-arabic">
                    {country.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-nexim-muted">
                    {country.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <LegalBlock heading="كيف يساعد الذكاء الاصطناعي في اختيار الدولة">
            <p>
              كل عائلة فريدة من نوعها. يأخذ محلل الذكاء الاصطناعي في Nexim بعين
              الاعتبار معاملاتك الفردية — الميزانية وعدد الأطفال وأعمارهم وأولويات
              التعليم ومتطلبات التأشيرة والوضع الضريبي — ويقدم توصيات مخصصة
              لعائلتك تحديداً.
            </p>
          </LegalBlock>

          <div className="border-t border-white/[0.08] pt-10">
            <Link
              href="/ar"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110 rtl:font-arabic"
            >
              احصل على تحليل مجاني لعائلتك ←
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
