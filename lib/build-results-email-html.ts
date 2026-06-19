import type { AnalyzeResponse, CountryMatch } from "@/lib/analyze-client";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^\*\s+/gm, "• ")
    .replace(/^#+\s+/gm, "")
    .trim();
}

function tierLabel(tier: string): string {
  if (tier === "lite") return "Lite";
  if (tier === "professional") return "Pro";
  if (tier === "basic") return "Basic";
  return tier;
}

function renderCountry(country: CountryMatch, rank: number, includeRoadmap: boolean): string {
  const pros = country.pros?.length
    ? `<ul>${country.pros.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";
  const cons = country.cons?.length
    ? `<ul>${country.cons.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";
  const gaps = country.gap_analysis?.length
    ? `<ul>${country.gap_analysis.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";
  const roadmap =
    includeRoadmap && country.roadmap?.length
      ? `<ol>${country.roadmap
          .map(
            (step) =>
              `<li><strong>${escapeHtml(step.title)}</strong> — ${escapeHtml(step.description)} (${escapeHtml(step.deadline)})</li>`,
          )
          .join("")}</ol>`
      : "";

  return `
    <section style="margin:24px 0;padding:20px;border:1px solid #e5e7eb;border-radius:12px;">
      <h2 style="margin:0 0 8px;color:#111827;">#${rank} ${escapeHtml(country.country_name)} (${country.match_score}%)</h2>
      <p style="margin:0 0 12px;color:#374151;"><strong>Visa:</strong> ${escapeHtml(country.visa_name)}</p>
      ${pros ? `<h3 style="margin:16px 0 8px;color:#111827;">Pros</h3>${pros}` : ""}
      ${cons ? `<h3 style="margin:16px 0 8px;color:#111827;">Cons</h3>${cons}` : ""}
      ${gaps ? `<h3 style="margin:16px 0 8px;color:#111827;">Gap analysis</h3>${gaps}` : ""}
      ${roadmap ? `<h3 style="margin:16px 0 8px;color:#111827;">Roadmap</h3>${roadmap}` : ""}
    </section>
  `;
}

type LiteUpsellCopy = {
  title: string;
  body: string;
  cta: string;
  share: string;
};

const LITE_UPSELL_COPY: Record<string, LiteUpsellCopy> = {
  en: {
    title: "Want to see a more detailed analysis of your relocation success?",
    body: "Basic analysis includes 8 parameters, visa guide and detailed recommendations just for you",
    cta: "Get full analysis for $4 →",
    share: "Liked the service? Share with friends!",
  },
  ru: {
    title: "Хотите увидеть более детальный анализ вашего успеха на релокацию?",
    body: "Базовый анализ включает 8 параметров, визовый гид и детальные рекомендации именно для вас",
    cta: "Получить полный анализ за $4 →",
    share: "Понравился сервис? Поделитесь с друзьями!",
  },
  de: {
    title: "Möchten Sie eine detailliertere Analyse Ihres Umzugserfolgs sehen?",
    body: "Basisanalyse umfasst 8 Parameter, Visa-Leitfaden und detaillierte Empfehlungen für Sie",
    cta: "Vollständige Analyse für $4 →",
    share: "Hat Ihnen der Service gefallen? Teilen Sie ihn!",
  },
  ar: {
    title: "هل تريد تحليلاً أكثر تفصيلاً لنجاح انتقالك؟",
    body: "التحليل الأساسي يتضمن 8 معاملات ودليل التأشيرة",
    cta: "احصل على التحليل الكامل مقابل $4 →",
    share: "أعجبك الخدمة؟ شاركها مع الأصدقاء!",
  },
  fa: {
    title: "می‌خواهید تحلیل دقیق‌تری از موفقیت مهاجرت خود ببینید؟",
    body: "تحلیل پایه شامل ۸ پارامتر و راهنمای ویزا است",
    cta: "دریافت تحلیل کامل به قیمت $4 →",
    share: "از سرویس راضی بودید؟ با دوستان به اشتراک بگذارید!",
  },
  zh: {
    title: "想看看您移居成功的更详细分析吗？",
    body: "基础分析包括8个参数、签证指南和详细建议",
    cta: "获取完整分析 $4 →",
    share: "喜欢这个服务吗？与朋友分享！",
  },
  hi: {
    title: "क्या आप अपनी रिलोकेशन सफलता का अधिक विस्तृत विश्लेषण देखना चाहते हैं?",
    body: "बेसिक विश्लेषण में 8 पैरामीटर और वीज़ा गाइड शामिल है",
    cta: "पूर्ण विश्लेषण $4 में प्राप्त करें →",
    share: "सेवा पसंद आई? दोस्तों के साथ शेयर करें!",
  },
};

function getLiteUpsellCopy(locale: string): LiteUpsellCopy {
  return LITE_UPSELL_COPY[locale] ?? LITE_UPSELL_COPY.en;
}

function buildLiteUpsellBlock(locale: string): string {
  const copy = getLiteUpsellCopy(locale);
  const homeUrl = `https://nexim.world/${locale}`;
  return `
      <div style="text-align: center; margin: 30px 0; padding: 20px; background: #1a1a1a; border-radius: 12px;">
        <p style="color: #ffffff; font-size: 16px; margin-bottom: 8px;">
          <strong>${escapeHtml(copy.title)}</strong>
        </p>
        <p style="color: #888888; font-size: 14px; margin-bottom: 20px;">
          ${escapeHtml(copy.body)}
        </p>
        <a href="${homeUrl}" style="background: #FFB800; color: #000000; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
          ${escapeHtml(copy.cta)}
        </a>
      </div>
      <div style="text-align: center; margin: 20px 0;">
        <p style="color: #888888; font-size: 13px;">
          ${escapeHtml(copy.share)}
        </p>
        <a href="https://nexim.world" style="color: #FFB800; font-size: 14px;">
          nexim.world →
        </a>
      </div>`;
}

function buildEmailUnsubscribeFooter(locale: string): string {
  const copy = getEmailUnsubscribeCopy(locale);
  const unsubscribeUrl = `https://nexim.world/${locale}/unsubscribe`;
  return `
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <p style="color: #555555; font-size: 12px;">
          ${escapeHtml(copy.reason)}
        </p>
        <a href="${unsubscribeUrl}" style="color: #555555; font-size: 12px;">
          ${escapeHtml(copy.link)}
        </a>
      </div>`;
}

type EmailUnsubscribeCopy = {
  reason: string;
  link: string;
};

function getEmailUnsubscribeCopy(locale: string): EmailUnsubscribeCopy {
  return EMAIL_UNSUBSCRIBE_COPY[locale] ?? EMAIL_UNSUBSCRIBE_COPY.en;
}

const EMAIL_UNSUBSCRIBE_COPY: Record<string, EmailUnsubscribeCopy> = {
  en: {
    reason: "You received this email because you requested your results on nexim.world",
    link: "Unsubscribe from emails",
  },
  ru: {
    reason: "Вы получили это письмо потому что запросили результаты на nexim.world",
    link: "Отписаться от рассылки",
  },
  de: {
    reason: "Sie erhalten diese E-Mail, weil Sie Ihre Ergebnisse auf nexim.world angefordert haben",
    link: "Vom Newsletter abmelden",
  },
  ar: {
    reason: "تلقيت هذا البريد لأنك طلبت نتائجك على nexim.world",
    link: "إلغاء الاشتراك",
  },
  fa: {
    reason: "این ایمیل را دریافت کردید زیرا نتایج خود را در nexim.world درخواست کرده‌اید",
    link: "لغو اشتراک",
  },
  zh: {
    reason: "您收到此邮件是因为您在 nexim.world 请求了分析结果",
    link: "取消订阅",
  },
  hi: {
    reason: "आपको यह ईमेल इसलिए मिला क्योंकि आपने nexim.world पर अपने परिणाम का अनुरोध किया",
    link: "सदस्यता रद्द करें",
  },
};

export function buildResultsEmailHtml(
  results: AnalyzeResponse,
  tier: string,
  locale = "en",
): string {
  const includeRoadmap = tier !== "lite";
  const isPro = tier === "professional";
  const isLite = tier === "lite";
  const countries = results.top_countries ?? [];

  const analysisBlock = results.analysis
    ? `<section style="margin:24px 0;">
        <h2 style="color:#111827;">AI summary</h2>
        <p style="white-space:pre-line;color:#374151;line-height:1.6;">${escapeHtml(results.analysis)}</p>
      </section>`
    : "";

  const proBlocks = isPro
    ? [
        results.tax_legal_audit?.trim()
          ? `<section style="margin:24px 0;"><h2 style="color:#111827;">Tax &amp; legal audit</h2><pre style="white-space:pre-wrap;font-family:inherit;color:#374151;line-height:1.6;">${escapeHtml(stripMarkdown(results.tax_legal_audit))}</pre></section>`
          : "",
        results.job_market_overview?.trim()
          ? `<section style="margin:24px 0;"><h2 style="color:#111827;">Job market overview</h2><pre style="white-space:pre-wrap;font-family:inherit;color:#374151;line-height:1.6;">${escapeHtml(stripMarkdown(results.job_market_overview))}</pre></section>`
          : "",
        results.document_checklist?.trim()
          ? `<section style="margin:24px 0;"><h2 style="color:#111827;">Document checklist</h2><pre style="white-space:pre-wrap;font-family:inherit;color:#374151;line-height:1.6;">${escapeHtml(stripMarkdown(results.document_checklist))}</pre></section>`
          : "",
        countries[0]?.document_table?.trim()
          ? `<section style="margin:24px 0;"><h2 style="color:#111827;">Document table — ${escapeHtml(countries[0].country_name)}</h2><pre style="white-space:pre-wrap;font-family:inherit;color:#374151;line-height:1.6;">${escapeHtml(stripMarkdown(countries[0].document_table))}</pre></section>`
          : "",
      ].join("")
    : "";

  const countriesHtml = countries
    .map((country, index) => renderCountry(country, index + 1, includeRoadmap))
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f9fafb;font-family:Arial,sans-serif;color:#111827;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#d97706;">Nexim</p>
      <h1 style="margin:0 0 8px;font-size:28px;">Your relocation analysis</h1>
      <p style="margin:0 0 24px;color:#6b7280;">Plan: ${escapeHtml(tierLabel(tier))}</p>
      ${analysisBlock}
      ${countriesHtml}
      ${proBlocks}
      ${isLite ? buildLiteUpsellBlock(locale) : ""}
      <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />
      <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
        Generated by <a href="https://nexim.world" style="color:#d97706;">nexim.world</a>
      </p>
      ${buildEmailUnsubscribeFooter(locale)}
    </div>
  </body>
</html>`;
}

const SUBJECTS: Record<string, string> = {
  en: "Your Nexim relocation analysis",
  ru: "Ваш анализ релокации Nexim",
  de: "Ihre Nexim Relocation-Analyse",
  ar: "تحليل الانتقال الخاص بك من Nexim",
  fa: "تحلیل مهاجرت Nexim شما",
  zh: "您的 Nexim 移居分析",
  hi: "आपका Nexim रिलोकेशन विश्लेषण",
};

export function getResultsEmailSubject(locale: string): string {
  return SUBJECTS[locale] ?? SUBJECTS.en;
}
