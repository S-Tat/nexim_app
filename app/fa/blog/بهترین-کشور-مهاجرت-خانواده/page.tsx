import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "بهترین کشورها برای مهاجرت با کودک در ۲۰۲۶: تحلیل هوش مصنوعی",
  description:
    "بهترین کشورها برای خانواده‌های دارای فرزند در ۲۰۲۶: پرتغال، آلمان، امارات، گرجستان، تایلند. چگونه Nexim با هوش مصنوعی کشور مناسب را انتخاب می‌کند.",
  keywords: [
    "مهاجرت با کودک",
    "بهترین کشور برای خانواده",
    "مهاجرت خانواده",
    "تحلیل مهاجرت با هوش مصنوعی",
    "Nexim",
  ],
};

const COUNTRIES = [
  {
    name: "پرتغال",
    text: "کشوری امن با آب‌وهوای گرم، مدارس بین‌المللی عالی و هزینه زندگی نسبتاً پایین. ویزای D7 امکان مهاجرت را حتی بدون پیشنهاد شغل محلی فراهم می‌کند.",
  },
  {
    name: "آلمان",
    text: "آموزش رایگان، مراقبت‌های بهداشتی عالی و سطح بالای زندگی آلمان را برای خانواده‌ها جذاب می‌کند. معایب: مالیات بالا و مانع زبانی.",
  },
  {
    name: "امارات",
    text: "دبی و ابوظبی مدارس بین‌المللی در سطح جهانی، امنیت بالا و کیفیت زندگی ممتاز ارائه می‌دهند. مناسب‌ترین گزینه برای خانواده‌های با درآمد بالاتر.",
  },
  {
    name: "گرجستان",
    text: "کشوری مقرون‌به‌صرفه با آب‌وهوای گرم، برخورد گرم با مهاجران و قوانین ورود ساده. نقطه شروع عالی برای خانواده‌های تازه‌کار در مهاجرت.",
  },
  {
    name: "تایلند",
    text: "هزینه زندگی پایین، مدارس بین‌المللی خوب در بانکوک و Chiang Mai و آب‌وهوای گرم. بسیار محبوب در میان خانواده‌های دیجیتال نومد.",
  },
] as const;

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

export default function BlogBehtarinKeshvarMohajeratKhanavadePage() {
  return (
    <div
      dir="rtl"
      lang="fa"
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
            href="/fa"
            className="font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white rtl:font-arabic"
          >
            Nexim
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <LegalArticle
          title="بهترین کشورها برای مهاجرت با کودک در ۲۰۲۶: تحلیل هوش مصنوعی"
          updated="وبلاگ · ۲۰۲۶"
        >
          <div className="space-y-3 text-nexim-muted">
            <p>
              مهاجرت به خارج همراه با کودکان یکی از مهم‌ترین تصمیم‌های زندگی
              خانواده است. کیفیت مدارس، امنیت، مراقبت‌های بهداشتی، هزینه زندگی و
              آب‌وهوا — همه این عوامل نقش حاسمی دارند. به همین دلیل خانواده‌های
              بیشتری برای تحلیل گزینه‌های مهاجرت به هوش مصنوعی روی می‌آورند.
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white md:text-lg rtl:font-arabic">
              بهترین کشورها برای خانواده‌های دارای فرزند
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

          <LegalBlock heading="چگونه هوش مصنوعی در انتخاب کشور کمک می‌کند">
            <p>
              هر خانواده منحصربه‌فرد است. تحلیل‌گر هوش مصنوعی Nexim پارامترهای
              فردی شما — بودجه، تعداد و سن فرزندان، اولویت‌های آموزشی، الزامات
              ویزا و وضعیت مالیاتی — را در نظر می‌گیرد و توصیه‌های شخصی‌سازی‌شده
              مخصوص خانواده شما ارائه می‌دهد.
            </p>
          </LegalBlock>

          <div className="border-t border-white/[0.08] pt-10">
            <Link
              href="/fa"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110 rtl:font-arabic"
            >
              تحلیل رایگان خانواده خود را دریافت کنید ←
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
