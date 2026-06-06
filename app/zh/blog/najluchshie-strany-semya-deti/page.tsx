import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalBlock } from "@/components/LegalArticle";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "2026年携子女移居海外最佳国家：AI分析",
  description:
    "2026年适合携子女家庭的最佳移居国家：葡萄牙、德国、阿联酋、格鲁吉亚、泰国。Nexim AI如何帮助家庭选择移居目的地。",
  keywords: [
    "携子女移民",
    "家庭移居",
    "最佳移民国家",
    "AI移民分析",
    "Nexim",
  ],
};

const COUNTRIES = [
  {
    name: "葡萄牙",
    text: "安全的国家，气候温暖，国际学校优质，与其他西欧国家相比生活成本相对较低。D7签证即使没有当地工作邀请也可申请。",
  },
  {
    name: "德国",
    text: "免费教育、优质医疗和高生活水准使德国对家庭非常具有吸引力。缺点是税率较高且存在语言障碍。",
  },
  {
    name: "阿联酋",
    text: "迪拜和阿布扎比提供世界级国际学校、极高安全保障和优质生活。最适合高收入家庭。",
  },
  {
    name: "格鲁吉亚",
    text: "消费水平低，气候温暖，对外籍人士友好，入境规定简单。是家庭移民的绝佳起点。",
  },
  {
    name: "泰国",
    text: "生活成本低，曼谷和清迈有优质国际学校，气候温暖。深受数字游民家庭欢迎。",
  },
] as const;

const GLASS_CARD =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6";

export default function BlogNajluchshieStranySemyaDetiPage() {
  return (
    <div
      lang="zh"
      className="relative flex min-h-screen flex-col bg-[#030712] font-sans text-foreground antialiased tracking-normal"
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
            href="/zh"
            className="font-display text-xl font-semibold tracking-tight text-nexim-heading transition hover:text-white"
          >
            Nexim
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <LegalArticle
          title="2026年携子女移居海外最佳国家：AI分析"
          updated="博客 · 2026"
        >
          <div className="space-y-3 text-nexim-muted">
            <p>
              携带孩子移居海外是家庭生活中最重要的决定之一。学校质量、安全、医疗、生活成本和气候都至关重要。正因如此，越来越多的家庭开始借助AI来分析移居选择。
            </p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-white md:text-lg">
              适合携子女家庭的最佳国家
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

          <LegalBlock heading="AI如何帮助选择移居国家">
            <p>
              每个家庭都是独特的。Nexim平台上的AI分析器会综合考虑您的个人参数——预算、子女数量和年龄、教育优先级、签证要求和税务状况——为您的家庭提供个性化建议。
            </p>
          </LegalBlock>

          <div className="border-t border-white/[0.08] pt-10">
            <Link
              href="/zh"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-bold text-[#030712] shadow-[0_0_32px_-8px_rgba(251,191,36,0.5)] transition hover:brightness-110"
            >
              免费获取家庭分析报告 →
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
