import { getCountryName } from "@/lib/countries";
import type { Locale } from "@/routing";

type RequirementKey =
  | "passport_valid"
  | "proof_qualification"
  | "criminal_record"
  | "health_insurance"
  | "proof_income"
  | "proof_remote_clients"
  | "freelance_license"
  | "medical_biometrics"
  | "job_offer_or_skills"
  | "language_readiness"
  | "professional_registration"
  | "settlement_funds";

type GuideCopy = {
  badge: string;
  intro: (country: string, profession: string) => string;
  h1: (country: string, profession: string) => string;
  description: (country: string, profession: string) => string;
  chanceLabel: (profession: string) => string;
  requirementsTitle: (country: string) => string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const GUIDE_COUNTRIES = [
  {
    code: "DE",
    slug: "germany",
    fallbackName: "Germany",
    requirementKeys: [
      "passport_valid",
      "proof_qualification",
      "job_offer_or_skills",
      "health_insurance",
    ],
  },
  {
    code: "US",
    slug: "usa",
    fallbackName: "United States",
    requirementKeys: [
      "passport_valid",
      "proof_qualification",
      "job_offer_or_skills",
      "criminal_record",
    ],
  },
  {
    code: "AE",
    slug: "uae",
    fallbackName: "United Arab Emirates",
    requirementKeys: [
      "passport_valid",
      "proof_income",
      "freelance_license",
      "health_insurance",
    ],
  },
  {
    code: "ES",
    slug: "spain",
    fallbackName: "Spain",
    requirementKeys: [
      "passport_valid",
      "proof_remote_clients",
      "criminal_record",
      "proof_income",
    ],
  },
  {
    code: "CA",
    slug: "canada",
    fallbackName: "Canada",
    requirementKeys: [
      "passport_valid",
      "proof_qualification",
      "language_readiness",
      "settlement_funds",
    ],
  },
  {
    code: "JP",
    slug: "japan",
    fallbackName: "Japan",
    requirementKeys: [
      "passport_valid",
      "proof_qualification",
      "job_offer_or_skills",
      "language_readiness",
    ],
  },
  {
    code: "PT",
    slug: "portugal",
    fallbackName: "Portugal",
    requirementKeys: [
      "passport_valid",
      "proof_income",
      "criminal_record",
      "health_insurance",
    ],
  },
  {
    code: "GB",
    slug: "uk",
    fallbackName: "United Kingdom",
    requirementKeys: [
      "passport_valid",
      "job_offer_or_skills",
      "proof_qualification",
      "language_readiness",
    ],
  },
  {
    code: "AU",
    slug: "australia",
    fallbackName: "Australia",
    requirementKeys: [
      "passport_valid",
      "proof_qualification",
      "language_readiness",
      "health_insurance",
    ],
  },
  {
    code: "NZ",
    slug: "new-zealand",
    fallbackName: "New Zealand",
    requirementKeys: [
      "passport_valid",
      "proof_qualification",
      "health_insurance",
      "settlement_funds",
    ],
  },
] as const;

export const GUIDE_PROFESSIONS = [
  { slug: "it-software", translationKey: "profession_it_software" },
  { slug: "data-science", translationKey: "profession_data_science" },
  { slug: "medicine", translationKey: "profession_medicine" },
  { slug: "nursing", translationKey: "profession_nursing_care" },
  { slug: "education", translationKey: "profession_education" },
  { slug: "engineering", translationKey: "profession_engineering" },
  { slug: "design", translationKey: "profession_design" },
  { slug: "marketing", translationKey: "profession_marketing_pr" },
  { slug: "sales", translationKey: "profession_sales_business" },
  { slug: "product-management", translationKey: "profession_product_pm" },
  { slug: "finance", translationKey: "profession_finance" },
  { slug: "entrepreneurship", translationKey: "profession_entrepreneurship" },
  { slug: "hr", translationKey: "profession_hr" },
  { slug: "construction", translationKey: "profession_construction" },
  { slug: "hospitality", translationKey: "profession_hospitality" },
  { slug: "logistics", translationKey: "profession_logistics" },
  { slug: "legal", translationKey: "profession_legal" },
  { slug: "creative-arts", translationKey: "profession_creative_arts" },
  { slug: "science", translationKey: "profession_science" },
  { slug: "other", translationKey: "profession_other" },
] as const;

const REQUIREMENT_LABELS: Record<Locale, Record<RequirementKey, string>> = {
  en: {
    passport_valid: "Valid passport with at least 6 months remaining",
    proof_qualification: "Recognized diploma, degree, or skills proof for your field",
    criminal_record: "Clean criminal record certificate with apostille or equivalent legalization",
    health_insurance: "Private or statutory health insurance valid for arrival and residence",
    proof_income: "Proof of stable income or savings that meets the local threshold",
    proof_remote_clients: "Remote-work contracts or foreign clients proving eligible income",
    freelance_license: "Freelance licence, permit, or employer-backed work authorization",
    medical_biometrics: "Medical check and biometrics after visa pre-approval",
    job_offer_or_skills: "Job offer, employer sponsorship, or shortage-skills pathway",
    language_readiness: "English and/or local-language readiness for work and integration",
    professional_registration: "Professional licence or registration if your field is regulated",
    settlement_funds: "Settlement funds to cover the first months after arrival",
  },
  ru: {
    passport_valid: "Действующий загранпаспорт со сроком не менее 6 месяцев",
    proof_qualification: "Подтверждённый диплом, квалификация или доказательство навыков по специальности",
    criminal_record: "Справка о несудимости с апостилем или иной легализацией",
    health_insurance: "Частная или государственная медстраховка, действующая на въезд и проживание",
    proof_income: "Подтверждение стабильного дохода или накоплений по местному порогу",
    proof_remote_clients: "Контракты на удалённую работу или зарубежные клиенты для подтверждения дохода",
    freelance_license: "Фриланс-лицензия, разрешение или рабочее основание от работодателя",
    medical_biometrics: "Медосмотр и биометрия после предварительного одобрения визы",
    job_offer_or_skills: "Оффер, спонсорство работодателя или программа для дефицитных специальностей",
    language_readiness: "Достаточный английский и/или местный язык для работы и интеграции",
    professional_registration: "Профлицензия или регистрация, если профессия регулируемая",
    settlement_funds: "Финансовая подушка на первые месяцы после переезда",
  },
  de: {
    passport_valid: "Gültiger Reisepass mit mindestens 6 Monaten Restlaufzeit",
    proof_qualification: "Anerkanntes Diplom, Abschlusszeugnis oder belastbarer Qualifikationsnachweis",
    criminal_record: "Führungszeugnis bzw. Strafregisterauszug mit Apostille oder gleichwertiger Legalisation",
    health_insurance: "Private oder gesetzliche Krankenversicherung für Einreise und Aufenthalt",
    proof_income: "Nachweis über stabiles Einkommen oder ausreichende Ersparnisse",
    proof_remote_clients: "Remote-Verträge oder ausländische Kunden als Einkommensnachweis",
    freelance_license: "Freiberufliche Lizenz, Genehmigung oder arbeitgebergestützte Arbeitserlaubnis",
    medical_biometrics: "Medizinischer Check und biometrische Erfassung nach Vorabgenehmigung",
    job_offer_or_skills: "Jobangebot, Arbeitgebersponsoring oder Zugang über Mangelberufe",
    language_readiness: "Englisch und/oder Landessprache für Arbeit und Integration",
    professional_registration: "Berufszulassung oder Registrierung bei reglementierten Berufen",
    settlement_funds: "Ausreichende Mittel für die ersten Monate nach der Einreise",
  },
  ar: {
    passport_valid: "جواز سفر ساري مع صلاحية لا تقل عن 6 أشهر",
    proof_qualification: "شهادة أو مؤهل معترف به أو إثبات واضح للمهارات المهنية",
    criminal_record: "شهادة حسن سيرة وسلوك مع أبوستيل أو تصديق معادل",
    health_insurance: "تأمين صحي خاص أو نظامي صالح لفترة الدخول والإقامة",
    proof_income: "إثبات دخل ثابت أو مدخرات تفي بالحد المحلي المطلوب",
    proof_remote_clients: "عقود عمل عن بُعد أو عملاء أجانب لإثبات الدخل المؤهل",
    freelance_license: "رخصة عمل حر أو تصريح أو أساس عمل مدعوم من صاحب عمل",
    medical_biometrics: "فحص طبي وبصمات بعد الموافقة المبدئية على التأشيرة",
    job_offer_or_skills: "عرض عمل أو رعاية من صاحب عمل أو مسار للمهن المطلوبة",
    language_readiness: "جاهزية باللغة الإنجليزية و/أو اللغة المحلية للعمل والاندماج",
    professional_registration: "ترخيص مهني أو تسجيل إذا كانت المهنة منظمة",
    settlement_funds: "أموال كافية لتغطية الأشهر الأولى بعد الوصول",
  },
  fa: {
    passport_valid: "گذرنامه معتبر با حداقل ۶ ماه اعتبار",
    proof_qualification: "مدرک تحصیلی، گواهی تخصص یا اثبات مهارت قابل قبول در حرفه شما",
    criminal_record: "گواهی عدم سوءپیشینه با آپوستیل یا تایید قانونی معادل",
    health_insurance: "بیمه درمانی خصوصی یا عمومی معتبر برای ورود و اقامت",
    proof_income: "مدرک درآمد پایدار یا پس‌انداز کافی مطابق حداقل محلی",
    proof_remote_clients: "قراردادهای دورکاری یا مشتریان خارجی برای اثبات درآمد واجد شرایط",
    freelance_license: "مجوز فریلنس، مجوز کاری یا مجوز مبتنی بر کارفرما",
    medical_biometrics: "معاینه پزشکی و بیومتریک پس از تایید اولیه ویزا",
    job_offer_or_skills: "جاب آفر، اسپانسری کارفرما یا مسیر مشاغل موردنیاز",
    language_readiness: "آمادگی زبان انگلیسی و/یا زبان محلی برای کار و ادغام",
    professional_registration: "مجوز حرفه‌ای یا ثبت‌نام برای مشاغل دارای مقررات",
    settlement_funds: "تمکن مالی برای ماه‌های اول پس از ورود",
  },
  zh: {
    passport_valid: "有效期至少还有6个月的护照",
    proof_qualification: "被认可的学历、资格证书或专业技能证明",
    criminal_record: "无犯罪记录证明，并附海牙认证或同等认证",
    health_insurance: "覆盖入境和居留阶段的私人或法定医疗保险",
    proof_income: "达到当地门槛的稳定收入或存款证明",
    proof_remote_clients: "远程工作合同或海外客户证明，以证明合规收入",
    freelance_license: "自由职业许可、工作许可或雇主支持的工作资格",
    medical_biometrics: "签证预批后完成体检和生物识别",
    job_offer_or_skills: "工作offer、雇主担保或紧缺职业通道",
    language_readiness: "满足工作与融入所需的英语和/或当地语言能力",
    professional_registration: "如属受监管行业，需完成执业许可或注册",
    settlement_funds: "覆盖落地后前几个月生活的安家资金",
  },
  hi: {
    passport_valid: "कम से कम 6 महीने की वैधता वाला पासपोर्ट",
    proof_qualification: "मान्य डिग्री, योग्यता प्रमाण या आपके क्षेत्र का कौशल प्रमाण",
    criminal_record: "अपोस्टिल या समकक्ष प्रमाणीकरण के साथ क्लीन पुलिस/क्रिमिनल रिकॉर्ड सर्टिफिकेट",
    health_insurance: "आगमन और निवास अवधि के लिए मान्य स्वास्थ्य बीमा",
    proof_income: "स्थिर आय या स्थानीय सीमा के अनुरूप बचत का प्रमाण",
    proof_remote_clients: "योग्य आय दिखाने वाले रिमोट कॉन्ट्रैक्ट या विदेशी क्लाइंट",
    freelance_license: "फ्रीलांस लाइसेंस, परमिट या नियोक्ता-समर्थित कार्य अनुमति",
    medical_biometrics: "वीज़ा प्री-अप्रूवल के बाद मेडिकल जांच और बायोमेट्रिक्स",
    job_offer_or_skills: "जॉब ऑफर, नियोक्ता स्पॉन्सरशिप या shortage-skills pathway",
    language_readiness: "काम और इंटीग्रेशन के लिए अंग्रेज़ी और/या स्थानीय भाषा की तैयारी",
    professional_registration: "यदि पेशा regulated है तो पेशेवर लाइसेंस या रजिस्ट्रेशन",
    settlement_funds: "आगमन के बाद शुरुआती महीनों के लिए सेटलमेंट फंड्स",
  },
};

const GUIDE_COPY_BY_LOCALE: Record<Locale, GuideCopy> = {
  en: {
    badge: "Programmatic relocation guide",
    intro: (country, profession) =>
      `${profession} specialists remain in demand in ${country} as employers continue to hire international talent to close skills gaps and support long-term growth.`,
    h1: (country, profession) =>
      `Relocation to ${country} for ${profession}: Step-by-Step Guide 2026`,
    description: (country, profession) =>
      `Explore the 2026 relocation path to ${country} for ${profession}: market demand, entry requirements, and the next step toward your personalized AI relocation analysis.`,
    chanceLabel: (profession) => `Chance of success for ${profession}`,
    requirementsTitle: (country) => `Key requirements for ${country}`,
    ctaTitle: "Get your Personalized AI Analysis",
    ctaBody: "Answer the questionnaire to unlock a tailored relocation strategy, country matching, and next-step guidance.",
    ctaButton: "Get your Personalized AI Analysis",
  },
  ru: {
    badge: "SEO-гид по релокации",
    intro: (country, profession) =>
      `Специалисты в сфере ${profession} остаются востребованными в ${country}, потому что работодатели продолжают нанимать международные кадры для закрытия дефицита навыков и поддержки роста экономики.`,
    h1: (country, profession) =>
      `Релокация в ${country} для ${profession}: пошаговый гид 2026`,
    description: (country, profession) =>
      `Изучите путь релокации в ${country} для специалистов ${profession} в 2026 году: спрос на рынке, базовые требования и следующий шаг к персональному AI-анализу.`,
    chanceLabel: (profession) => `Шанс на успех для ${profession}`,
    requirementsTitle: (country) => `Ключевые требования для ${country}`,
    ctaTitle: "Получить персональный AI-анализ",
    ctaBody: "Заполните анкету, чтобы получить персональную стратегию переезда, подбор стран и пошаговые рекомендации.",
    ctaButton: "Получить персональный AI-анализ",
  },
  de: {
    badge: "Programmatischer Relocation-Guide",
    intro: (country, profession) =>
      `${profession}-Fachkräfte bleiben in ${country} gefragt, weil Arbeitgeber weiterhin internationale Talente einstellen, um Fachkräftelücken zu schließen und Wachstum abzusichern.`,
    h1: (country, profession) =>
      `Relocation nach ${country} für ${profession}: Schritt-für-Schritt-Guide 2026`,
    description: (country, profession) =>
      `Erkunden Sie den Relocation-Weg 2026 nach ${country} für ${profession}: Nachfrage, Grundvoraussetzungen und der nächste Schritt zu Ihrer personalisierten KI-Analyse.`,
    chanceLabel: (profession) => `Erfolgschance für ${profession}`,
    requirementsTitle: (country) => `Wichtige Voraussetzungen für ${country}`,
    ctaTitle: "Ihre personalisierte KI-Analyse erhalten",
    ctaBody: "Beantworten Sie den Fragebogen und erhalten Sie eine individuelle Relocation-Strategie, Länder-Matching und konkrete nächste Schritte.",
    ctaButton: "Ihre personalisierte KI-Analyse erhalten",
  },
  ar: {
    badge: "دليل انتقال برمجي",
    intro: (country, profession) =>
      `لا يزال المتخصصون في مجال ${profession} مطلوبين في ${country} لأن أصحاب العمل يواصلون توظيف الكفاءات الدولية لسد فجوات المهارات ودعم النمو طويل الأمد.`,
    h1: (country, profession) =>
      `الانتقال إلى ${country} لمجال ${profession}: دليل خطوة بخطوة 2026`,
    description: (country, profession) =>
      `استكشف مسار الانتقال إلى ${country} لمجال ${profession} في 2026: الطلب في السوق، المتطلبات الأساسية، والخطوة التالية نحو تحليل ذكاء اصطناعي شخصي.`,
    chanceLabel: (profession) => `فرصة النجاح لمجال ${profession}`,
    requirementsTitle: (country) => `المتطلبات الأساسية لـ ${country}`,
    ctaTitle: "احصل على تحليلك الشخصي بالذكاء الاصطناعي",
    ctaBody: "أجب عن الاستبيان للحصول على استراتيجية انتقال مخصصة، ومطابقة الدول، وخطوات عملية تالية.",
    ctaButton: "احصل على تحليلك الشخصي بالذكاء الاصطناعي",
  },
  fa: {
    badge: "راهنمای برنامه‌محور مهاجرت",
    intro: (country, profession) =>
      `متخصصان ${profession} در ${country} همچنان پرتقاضا هستند، زیرا کارفرمایان برای جبران کمبود مهارت و حفظ رشد بلندمدت به جذب نیروهای بین‌المللی ادامه می‌دهند.`,
    h1: (country, profession) =>
      `مهاجرت به ${country} برای ${profession}: راهنمای گام‌به‌گام ۲۰۲۶`,
    description: (country, profession) =>
      `مسیر مهاجرت به ${country} برای ${profession} در سال ۲۰۲۶ را بررسی کنید: تقاضای بازار، الزامات اصلی و گام بعدی برای تحلیل شخصی‌سازی‌شده با هوش مصنوعی.`,
    chanceLabel: (profession) => `شانس موفقیت برای ${profession}`,
    requirementsTitle: (country) => `الزامات اصلی برای ${country}`,
    ctaTitle: "تحلیل شخصی‌سازی‌شده هوش مصنوعی را دریافت کنید",
    ctaBody: "پرسشنامه را تکمیل کنید تا استراتژی مهاجرت، تطبیق کشورها و گام‌های بعدی متناسب با شما ارائه شود.",
    ctaButton: "تحلیل شخصی‌سازی‌شده هوش مصنوعی را دریافت کنید",
  },
  zh: {
    badge: "程序化移居指南",
    intro: (country, profession) =>
      `${profession} 人才在 ${country} 仍然具有需求，因为雇主持续招聘国际人才来填补技能缺口并支持长期增长。`,
    h1: (country, profession) =>
      `${profession} 前往 ${country} 的移居指南：2026 分步攻略`,
    description: (country, profession) =>
      `了解 2026 年 ${profession} 前往 ${country} 的移居路径：市场需求、核心要求，以及进入个性化 AI 移居分析的下一步。`,
    chanceLabel: (profession) => `${profession} 的成功概率`,
    requirementsTitle: (country) => `${country} 的关键要求`,
    ctaTitle: "获取你的个性化 AI 分析",
    ctaBody: "填写问卷，获得定制化移居策略、国家匹配结果和下一步行动建议。",
    ctaButton: "获取你的个性化 AI 分析",
  },
  hi: {
    badge: "प्रोग्रामेटिक रिलोकेशन गाइड",
    intro: (country, profession) =>
      `${profession} पेशेवरों की ${country} में मांग बनी हुई है, क्योंकि नियोक्ता skill gaps को भरने और दीर्घकालिक विकास को समर्थन देने के लिए अंतरराष्ट्रीय प्रतिभा को नियुक्त कर रहे हैं।`,
    h1: (country, profession) =>
      `${profession} के लिए ${country} में रिलोकेशन: स्टेप-बाय-स्टेप गाइड 2026`,
    description: (country, profession) =>
      `${profession} के लिए ${country} में 2026 रिलोकेशन पाथ देखें: मार्केट डिमांड, मुख्य आवश्यकताएँ, और आपके personalized AI relocation analysis की अगली सीढ़ी।`,
    chanceLabel: (profession) => `${profession} के लिए सफलता की संभावना`,
    requirementsTitle: (country) => `${country} के लिए मुख्य आवश्यकताएँ`,
    ctaTitle: "अपना Personalized AI Analysis प्राप्त करें",
    ctaBody: "प्रश्नावली भरें और tailored relocation strategy, country matching और next-step guidance प्राप्त करें।",
    ctaButton: "अपना Personalized AI Analysis प्राप्त करें",
  },
};

export function getGuideCountryBySlug(slug: string) {
  return GUIDE_COUNTRIES.find((country) => country.slug === slug);
}

export function getGuideProfessionBySlug(slug: string) {
  return GUIDE_PROFESSIONS.find((profession) => profession.slug === slug);
}

export function getGuideCopy(locale: Locale): GuideCopy {
  return GUIDE_COPY_BY_LOCALE[locale];
}

export function getGuideCountryName(countryCode: string, locale: Locale): string {
  const country = GUIDE_COUNTRIES.find((entry) => entry.code === countryCode);
  return getCountryName(countryCode, locale) ?? country?.fallbackName ?? countryCode;
}

export function getGuideRequirementList(locale: Locale, countrySlug: string): string[] {
  const country = getGuideCountryBySlug(countrySlug);
  if (!country) return [];
  return country.requirementKeys.map((key) => REQUIREMENT_LABELS[locale][key]);
}

export function getGuideChance(countrySlug: string, professionSlug: string): number {
  const seed = `${countrySlug}:${professionSlug}`;
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return 75 + (hash % 16);
}
