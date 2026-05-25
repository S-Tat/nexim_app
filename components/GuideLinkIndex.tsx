import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import {
  GUIDE_COUNTRIES,
  GUIDE_PROFESSIONS,
  getGuideCountryName,
} from "@/lib/programmatic-guides";
import type { Locale } from "@/routing";

type Props = {
  locale: Locale;
  variant: "featured" | "full";
};

type Copy = {
  title: string;
  body: string;
  countryPrefix: string;
  professionPrefix: string;
  linkLabel: (profession: string, country: string) => string;
};

const FEATURED_COUNTRY_SLUGS = new Set([
  "germany",
  "portugal",
  "canada",
  "united-arab-emirates",
]);
const FEATURED_PROFESSION_SLUGS = new Set([
  "it-software",
  "engineering",
  "medicine",
]);

const COPY_BY_LOCALE: Record<Locale, Record<Props["variant"], Copy>> = {
  en: {
    featured: {
      title: "Popular relocation guides",
      body: "Explore crawlable country-and-profession guide pages that map common relocation paths before you start your AI assessment.",
      countryPrefix: "Country",
      professionPrefix: "Profession",
      linkLabel: (profession, country) => `${profession} in ${country}`,
    },
    full: {
      title: "Browse all relocation guide pages",
      body: "This internal index links search bots and users directly to every country-profession guide for the current language version.",
      countryPrefix: "Country",
      professionPrefix: "Guides",
      linkLabel: (profession, country) => `${profession} in ${country}`,
    },
  },
  ru: {
    featured: {
      title: "Популярные гайды по релокации",
      body: "Ниже собраны внутренние ссылки на страницы по странам и профессиям, чтобы быстрее перейти к нужному сценарию переезда.",
      countryPrefix: "Страна",
      professionPrefix: "Профессия",
      linkLabel: (profession, country) => `${profession} в ${country}`,
    },
    full: {
      title: "Все SEO-гайды по релокации",
      body: "Этот внутренний индекс даёт пользователям и поисковым ботам прямой доступ ко всем guide-страницам для текущей языковой версии.",
      countryPrefix: "Страна",
      professionPrefix: "Гайды",
      linkLabel: (profession, country) => `${profession} в ${country}`,
    },
  },
  de: {
    featured: {
      title: "Beliebte Relocation-Guides",
      body: "Hier finden Sie interne Links zu stark nachgefragten Länder-Berufs-Guides vor dem Start Ihrer KI-Analyse.",
      countryPrefix: "Land",
      professionPrefix: "Beruf",
      linkLabel: (profession, country) => `${profession} in ${country}`,
    },
    full: {
      title: "Alle Relocation-Guides durchsuchen",
      body: "Dieser interne Index verlinkt Nutzer und Suchmaschinen direkt auf alle Länder-Berufs-Guides der aktuellen Sprachversion.",
      countryPrefix: "Land",
      professionPrefix: "Guides",
      linkLabel: (profession, country) => `${profession} in ${country}`,
    },
  },
  ar: {
    featured: {
      title: "أدلة انتقال شائعة",
      body: "هذه روابط داخلية إلى صفحات الدولة والمهنة الأكثر طلباً لتسهيل الاكتشاف قبل بدء التحليل بالذكاء الاصطناعي.",
      countryPrefix: "الدولة",
      professionPrefix: "المهنة",
      linkLabel: (profession, country) => `${profession} في ${country}`,
    },
    full: {
      title: "تصفح جميع أدلة الانتقال",
      body: "هذا الفهرس الداخلي يربط المستخدمين ومحركات البحث مباشرة بجميع صفحات الأدلة الخاصة باللغة الحالية.",
      countryPrefix: "الدولة",
      professionPrefix: "الأدلة",
      linkLabel: (profession, country) => `${profession} في ${country}`,
    },
  },
  fa: {
    featured: {
      title: "راهنماهای محبوب مهاجرت",
      body: "این بخش لینک‌های داخلی به مهم‌ترین صفحات کشور و شغل را برای کشف سریع‌تر پیش از تحلیل هوش مصنوعی ارائه می‌کند.",
      countryPrefix: "کشور",
      professionPrefix: "حرفه",
      linkLabel: (profession, country) => `${profession} در ${country}`,
    },
    full: {
      title: "مرور همه راهنماهای مهاجرت",
      body: "این ایندکس داخلی کاربران و موتورهای جستجو را مستقیماً به همه صفحات guide در زبان فعلی هدایت می‌کند.",
      countryPrefix: "کشور",
      professionPrefix: "راهنماها",
      linkLabel: (profession, country) => `${profession} در ${country}`,
    },
  },
  zh: {
    featured: {
      title: "热门移居指南",
      body: "这里提供可抓取的国家与职业指南内链，方便用户和搜索引擎更快发现重点页面。",
      countryPrefix: "国家",
      professionPrefix: "职业",
      linkLabel: (profession, country) => `${country} ${profession} 指南`,
    },
    full: {
      title: "浏览全部移居指南页面",
      body: "这个内部索引会把用户和搜索引擎直接引导到当前语言版本下的全部国家与职业 guide 页面。",
      countryPrefix: "国家",
      professionPrefix: "指南",
      linkLabel: (profession, country) => `${country} ${profession} 指南`,
    },
  },
  hi: {
    featured: {
      title: "लोकप्रिय रिलोकेशन गाइड्स",
      body: "यहां country-profession guide pages के आंतरिक लिंक दिए गए हैं, ताकि उपयोगकर्ता और bots इन्हें जल्दी खोज सकें।",
      countryPrefix: "देश",
      professionPrefix: "पेशा",
      linkLabel: (profession, country) => `${country} में ${profession}`,
    },
    full: {
      title: "सभी रिलोकेशन गाइड पेज देखें",
      body: "यह internal index उपयोगकर्ताओं और search bots को current locale की सभी guide pages तक सीधे पहुंचाता है।",
      countryPrefix: "देश",
      professionPrefix: "गाइड्स",
      linkLabel: (profession, country) => `${country} में ${profession}`,
    },
  },
};

export async function GuideLinkIndex({ locale, variant }: Props) {
  const t = await getTranslations({
    locale,
    namespace: "questionnaire.extended",
  });
  const copy = COPY_BY_LOCALE[locale][variant];
  const countries =
    variant === "featured"
      ? GUIDE_COUNTRIES.filter((country) => FEATURED_COUNTRY_SLUGS.has(country.slug))
      : GUIDE_COUNTRIES;
  const professions =
    variant === "featured"
      ? GUIDE_PROFESSIONS.filter((profession) => FEATURED_PROFESSION_SLUGS.has(profession.slug))
      : GUIDE_PROFESSIONS;

  return (
    <section className="border-t border-white/[0.06] bg-black/20 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-nexim-muted md:text-lg">
            {copy.body}
          </p>
        </div>

        <div
          className={
            variant === "featured"
              ? "grid gap-6 md:grid-cols-2 xl:grid-cols-4"
              : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          }
        >
          {countries.map((country) => {
            const countryName = getGuideCountryName(country.code, locale);

            return (
              <div
                key={country.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nexim-muted">
                  {variant === "featured" ? copy.countryPrefix : `${copy.countryPrefix}`}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{countryName}</h3>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-nexim-muted">
                  {copy.professionPrefix}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {professions.map((profession) => {
                    const professionLabel = t(profession.translationKey as never);

                    return (
                      <li key={`${country.slug}-${profession.slug}`}>
                        <Link
                          href={`/guide/${country.slug}/${profession.slug}`}
                          className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs leading-relaxed text-amber-100 transition hover:border-[#fbbf24]/50 hover:text-[#fbbf24]"
                        >
                          {variant === "featured"
                            ? copy.linkLabel(professionLabel, countryName)
                            : professionLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
