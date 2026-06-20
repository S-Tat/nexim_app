import type { Locale } from "@/routing";

export type BlogPostCountry = {
  name: string;
  text: string;
};

export type BlogPost = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  intro: string;
  countriesHeading: string;
  countries: BlogPostCountry[];
  aiHeading: string;
  aiBody: string;
  ctaLabel: string;
  updated: string;
};

export const blogPosts: BlogPost[] = [
  {
    locale: "en",
    slug: "best-countries-family-relocation",
    title: "Best Countries to Relocate with Children in 2026: AI Analysis",
    description:
      "Top countries for families with children in 2026 — Portugal, Germany, UAE, Georgia, and Thailand. How AI helps you choose the right destination.",
    intro:
      "Moving abroad with children is one of the most significant decisions a family can make. Schools, safety, healthcare, cost of living, and climate all matter deeply. That is why more and more families are turning to AI to analyze their relocation options.",
    countriesHeading: "Top Countries for Families with Children",
    countries: [
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
    ],
    aiHeading: "How AI Helps You Choose the Right Country",
    aiBody:
      "Every family is unique. Some prioritize education, others safety or taxes. The AI analyzer at Nexim considers your individual parameters — budget, number and ages of children, education priorities, visa requirements and tax situation — and delivers personalized recommendations specifically for your family.",
    ctaLabel: "Get My Free Family Analysis →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "kuda-pereekhat-semye-s-detmi",
    title: "Куда переехать семье с детьми в 2026 году: анализ ИИ",
    description:
      "Топ стран для семей с детьми в 2026 году — Португалия, Германия, ОАЭ, Грузия и Таиланд. Как ИИ помогает выбрать страну для переезда.",
    intro:
      "Переезд с детьми — одно из самых важных решений в жизни семьи. Нужно учесть качество школ, безопасность, медицину, стоимость жизни и климат. Именно поэтому всё больше семей используют ИИ для анализа вариантов переезда.",
    countriesHeading: "Топ стран для семей с детьми",
    countries: [
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
    ],
    aiHeading: "Как ИИ помогает выбрать страну для переезда",
    aiBody:
      "Каждая семья уникальна. У одних приоритет — образование, у других — безопасность или налоги. ИИ-анализатор на платформе Nexim учитывает ваши индивидуальные параметры: бюджет, количество детей, их возраст, приоритеты в образовании, визовые требования и налоговую ситуацию — и выдаёт персональные рекомендации именно для вашей семьи.",
    ctaLabel: "Попробовать бесплатно",
    updated: "Блог · 2026",
  },
  {
    locale: "de",
    slug: "beste-laender-familie-umzug",
    title: "Beste Länder für Familien mit Kindern 2026: KI-Analyse",
    description:
      "Top-Länder für Familien mit Kindern 2026 — Portugal, Deutschland, VAE, Georgien und Thailand. Wie KI bei der Länderwahl hilft.",
    intro:
      "Ein Umzug ins Ausland mit Kindern ist eine der wichtigsten Entscheidungen im Familienleben. Schulen, Sicherheit, Gesundheitsversorgung, Lebenshaltungskosten und Klima spielen eine entscheidende Rolle. Immer mehr Familien nutzen daher KI, um ihre Umzugsoptionen zu analysieren.",
    countriesHeading: "Top-Länder für Familien mit Kindern",
    countries: [
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
    ],
    aiHeading: "Wie KI bei der Länderwahl hilft",
    aiBody:
      "Jede Familie ist einzigartig. Der KI-Analyzer auf der Nexim-Plattform berücksichtigt Ihre individuellen Parameter — Budget, Anzahl und Alter der Kinder, Bildungsprioritäten, Visaanforderungen und Steuersituation — und liefert personalisierte Empfehlungen speziell für Ihre Familie.",
    ctaLabel: "Kostenlose Familienanalyse starten →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "afdal-duwal-aila-atfal",
    title: "أفضل الدول للهجرة مع الأطفال في 2026: تحليل الذكاء الاصطناعي",
    description:
      "أفضل الدول للعائلات ذات الأطفال في 2026 — البرتغال، ألمانيا، الإمارات، جورجيا وتايلاند. كيف يساعد الذكاء الاصطناعي في اختيار الدولة.",
    intro:
      "الانتقال إلى الخارج مع الأطفال هو أحد أهم القرارات في حياة الأسرة. جودة المدارس والأمان والرعاية الصحية وتكلفة المعيشة والمناخ — كل هذه العوامل تلعب دوراً حاسماً. لهذا السبب تلجأ عائلات أكثر فأكثر إلى الذكاء الاصطناعي لتحليل خيارات الهجرة.",
    countriesHeading: "أفضل الدول للعائلات ذات الأطفال",
    countries: [
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
    ],
    aiHeading: "كيف يساعد الذكاء الاصطناعي في اختيار الدولة",
    aiBody:
      "كل عائلة فريدة من نوعها. يأخذ محلل الذكاء الاصطناعي في Nexim بعين الاعتبار معاملاتك الفردية — الميزانية وعدد الأطفال وأعمارهم وأولويات التعليم ومتطلبات التأشيرة والوضع الضريبي — ويقدم توصيات مخصصة لعائلتك تحديداً.",
    ctaLabel: "احصل على تحليل مجاني لعائلتك ←",
    updated: "المدونة · 2026",
  },
  {
    locale: "fa",
    slug: "behtarin-keshvar-mohajerat-khanevadeh",
    title: "بهترین کشورها برای مهاجرت با کودک در ۲۰۲۶: تحلیل هوش مصنوعی",
    description:
      "بهترین کشورها برای خانواده‌های دارای فرزند در ۲۰۲۶ — پرتغال، آلمان، امارات، گرجستان و تایلند. چگونه هوش مصنوعی کشور مناسب را انتخاب می‌کند.",
    intro:
      "مهاجرت به خارج همراه با کودکان یکی از مهم‌ترین تصمیم‌های زندگی خانواده است. کیفیت مدارس، امنیت، مراقبت‌های بهداشتی، هزینه زندگی و آب‌وهوا — همه این عوامل نقش حاسمی دارند. به همین دلیل خانواده‌های بیشتری برای تحلیل گزینه‌های مهاجرت به هوش مصنوعی روی می‌آورند.",
    countriesHeading: "بهترین کشورها برای خانواده‌های دارای فرزند",
    countries: [
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
    ],
    aiHeading: "چگونه هوش مصنوعی در انتخاب کشور کمک می‌کند",
    aiBody:
      "هر خانواده منحصربه‌فرد است. تحلیل‌گر هوش مصنوعی Nexim پارامترهای فردی شما — بودجه، تعداد و سن فرزندان، اولویت‌های آموزشی، الزامات ویزا و وضعیت مالیاتی — را در نظر می‌گیرد و توصیه‌های شخصی‌سازی‌شده مخصوص خانواده شما ارائه می‌دهد.",
    ctaLabel: "تحلیل رایگان خانواده خود را دریافت کنید ←",
    updated: "وبلاگ · ۲۰۲۶",
  },
  {
    locale: "zh",
    slug: "najluchshie-strany-semya-deti",
    title: "2026年携子女移居海外最佳国家：AI分析",
    description:
      "2026年适合携子女家庭的最佳移居国家——葡萄牙、德国、阿联酋、格鲁吉亚和泰国。AI如何帮助选择移居目的地。",
    intro:
      "携带孩子移居海外是家庭生活中最重要的决定之一。学校质量、安全、医疗、生活成本和气候都至关重要。正因如此，越来越多的家庭开始借助AI来分析移居选择。",
    countriesHeading: "适合携子女家庭的最佳国家",
    countries: [
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
    ],
    aiHeading: "AI如何帮助选择移居国家",
    aiBody:
      "每个家庭都是独特的。Nexim平台上的AI分析器会综合考虑您的个人参数——预算、子女数量和年龄、教育优先级、签证要求和税务状况——为您的家庭提供个性化建议。",
    ctaLabel: "免费获取家庭分析报告 →",
    updated: "博客 · 2026",
  },
  {
    locale: "hi",
    slug: "sabse-achhe-desh-parivar-bachche",
    title: "2026 में बच्चों के साथ परिवार के लिए बेहतरीन देश: AI विश्लेषण",
    description:
      "2026 में बच्चों वाले परिवारों के लिए शीर्ष देश — पुर्तगाल, जर्मनी, UAE, जॉर्जिया और थाईलैंड। AI सही देश चुनने में कैसे मदद करता है।",
    intro:
      "बच्चों के साथ विदेश जाना परिवार के जीवन के सबसे महत्वपूर्ण निर्णयों में से एक है। स्कूलों की गुणवत्ता, सुरक्षा, स्वास्थ्य सेवा, जीवन-यापन की लागत और जलवायु — ये सभी अहम भूमिका निभाते हैं। इसीलिए अधिक से अधिक परिवार स्थानांतरण विकल्पों का विश्लेषण करने के लिए AI का उपयोग कर रहे हैं।",
    countriesHeading: "बच्चों वाले परिवारों के लिए शीर्ष देश",
    countries: [
      {
        name: "पुर्तगाल",
        text: "सुरक्षित देश, गर्म जलवायु, उत्कृष्ट अंतर्राष्ट्रीय स्कूल और अन्य पश्चिमी यूरोपीय देशों की तुलना में कम जीवन-यापन लागत। D7 वीज़ा स्थानीय नौकरी के बिना भी स्थानांतरण की अनुमति देता है।",
      },
      {
        name: "जर्मनी",
        text: "मुफ्त शिक्षा, उत्कृष्ट स्वास्थ्य सेवा और उच्च जीवन स्तर जर्मनी को परिवारों के लिए आकर्षक बनाते हैं। नुकसान: उच्च कर और भाषा की बाधा।",
      },
      {
        name: "UAE",
        text: "दुबई और अबू धाबी विश्व स्तरीय अंतर्राष्ट्रीय स्कूल, उच्च सुरक्षा और बेहतरीन जीवन गुणवत्ता प्रदान करते हैं। उच्च आय वाले परिवारों के लिए सबसे उपयुक्त।",
      },
      {
        name: "जॉर्जिया",
        text: "गर्म जलवायु, प्रवासियों के प्रति मित्रवत रवैया और सरल प्रवेश नियमों वाला किफायती देश। परिवारों के लिए एक शानदार शुरुआती बिंदु।",
      },
      {
        name: "थाईलैंड",
        text: "कम जीवन-यापन लागत, बैंकॉक और चियांग माई में अच्छे अंतर्राष्ट्रीय स्कूल और गर्म जलवायu। डिजिटल नोमैड परिवारों में बेहद लोकप्रिय।",
      },
    ],
    aiHeading: "AI देश चुनने में कैसे मदद करता है",
    aiBody:
      "हर परिवार अनूठा होता है। Nexim पर AI विश्लेषक आपके व्यक्तिगत मापदंडों को ध्यान में रखता है — बजट, बच्चों की संख्या और उम्र, शिक्षा की प्राथमिकताएं, वीज़ा आवश्यकताएं और कर स्थिति — और विशेष रूप से आपके परिवार के लिए व्यक्तिगत सिफारिशें प्रदान करता है।",
    ctaLabel: "मुफ्त पारिवारिक विश्लेषण पाएं →",
    updated: "ब्लॉग · 2026",
  },

  /* ── IT → Germany ── */
  {
    locale: "en",
    slug: "it-germany",
    title: "How IT Specialists Can Relocate to Germany in 2026",
    description:
      "EU Blue Card, Chancenkarte, salary thresholds and language tips for IT professionals moving to Germany in 2026.",
    intro:
      "Germany remains Europe's largest tech hub with strong demand for software engineers, DevOps specialists and data experts. In 2026 the main routes are the EU Blue Card, the Chancenkarte points system and employer-sponsored skilled worker visas — each with different salary, language and recognition requirements.",
    countriesHeading: "Key relocation routes for IT professionals",
    countries: [
      {
        name: "EU Blue Card",
        text: "The fastest path with a signed contract above the annual salary threshold (lower for shortage occupations such as IT). Requires a recognised university degree or equivalent experience and health insurance from day one.",
      },
      {
        name: "Chancenkarte (Opportunity Card)",
        text: "A points-based residence permit to search for work in Germany for up to one year without a prior job offer. IT experience, German or English level, age and prior ties to Germany all add points.",
      },
      {
        name: "Skilled worker visa with job offer",
        text: "Standard employment residence for qualified roles when the Blue Card threshold is not met. The employer must prove the role could not be filled locally; IT roles on shortage lists often pass more easily.",
      },
      {
        name: "Language, taxes and recognition",
        text: "Many tech teams work in English, but B1–B2 German opens more roles and daily life. Check whether your diploma needs ZAB evaluation; plan for income tax and social contributions from the first payslip.",
      },
    ],
    aiHeading: "How AI builds your personal Germany IT roadmap",
    aiBody:
      "Nexim cross-checks your stack, years of experience, citizenship, salary expectations, family situation and language level against current Blue Card thresholds, shortage lists and realistic city markets — so you see which visa path fits before you apply.",
    ctaLabel: "Get My Free Relocation Analysis →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "it-germany",
    title: "Как IT-специалисту переехать в Германию в 2026 году",
    description:
      "Blue Card, Chancenkarte, пороги зарплаты и языковые требования для IT-специалистов, переезжающих в Германию в 2026 году.",
    intro:
      "Германия остаётся крупнейшим IT-рынком Европы с высоким спросом на разработчиков, DevOps и data-специалистов. В 2026 году основные маршруты — EU Blue Card, балльная Chancenkarte и рабочая виза по контракту; у каждого свои требования к зарплате, языку и признанию диплома.",
    countriesHeading: "Основные пути переезда для IT-специалистов",
    countries: [
      {
        name: "EU Blue Card",
        text: "Самый быстрый путь при контракте с зарплатой выше годового порога (для IT и дефицитных профессий порог ниже). Нужен признанный диплом или эквивалентный опыт и медстраховка с первого дня.",
      },
      {
        name: "Chancenkarte",
        text: "ВНЖ на баллах для поиска работы до года без оффера. IT-опыт, уровень немецкого или английского, возраст и связи с Германией дают дополнительные баллы.",
      },
      {
        name: "Рабочая виза по офферу",
        text: "Стандартный трудовой ВНЖ, если порог Blue Card не достигнут. Работодатель подтверждает, что кандидата не нашли на местном рынке; IT из списка дефицита проходит проще.",
      },
      {
        name: "Язык, налоги и признание",
        text: "В IT часто работают на английском, но B1–B2 немецкого расширяет выбор. Проверьте, нужна ли оценка диплома через ZAB; заложите подоходный налог и соцвзносы с первой зарплаты.",
      },
    ],
    aiHeading: "Как ИИ составляет ваш план переезда в IT в Германию",
    aiBody:
      "Nexim сопоставляет ваш стек, стаж, гражданство, зарплатные ожидания, семью и язык с актуальными порогами Blue Card, списками дефицита и рынком городов — чтобы вы видели подходящий визовый маршрут до подачи документов.",
    ctaLabel: "Попробовать бесплатно",
    updated: "Блог · 2026",
  },
  {
    locale: "de",
    slug: "it-germany",
    title: "Wie IT-Spezialisten 2026 nach Deutschland auswandern können",
    description:
      "Blue Card, Chancenkarte, Gehaltsschwellen und Sprachtipps für IT-Fachkräfte, die 2026 nach Deutschland ziehen wollen.",
    intro:
      "Deutschland ist weiterhin Europas größter Tech-Standort mit hoher Nachfrage nach Entwicklern, DevOps und Data-Experten. 2026 sind die EU Blue Card, die Chancenkarte und das klassische Fachkräfte-Visum mit Jobangebot die wichtigsten Wege — jeweils mit eigenen Gehalts-, Sprach- und Anerkennungsregeln.",
    countriesHeading: "Wichtige Wege für IT-Fachkräfte",
    countries: [
      {
        name: "EU Blue Card",
        text: "Der schnellste Weg mit unterschriebenem Vertrag über der Jahresgehaltsschwelle (für IT und Mangelberufe niedriger). Anerkanntes Studium oder gleichwertige Erfahrung plus Krankenversicherung ab Tag eins erforderlich.",
      },
      {
        name: "Chancenkarte",
        text: "Punktebasierte Aufenthaltserlaubnis zur Jobsuche bis zu einem Jahr ohne Vorabangebot. IT-Erfahrung, Deutsch- oder Englischniveau, Alter und Deutschlandbezug bringen Punkte.",
      },
      {
        name: "Fachkräfte-Visum mit Jobangebot",
        text: "Standard-Arbeitsaufenthalt, wenn die Blue-Card-Schwelle nicht erreicht wird. Der Arbeitgeber muss den Bedarf nachweisen; IT-Rollen auf der Engpassliste werden oft leichter genehmigt.",
      },
      {
        name: "Sprache, Steuern, Anerkennung",
        text: "Viele Teams arbeiten auf Englisch, doch B1–B2 Deutsch erweitert Chancen. Prüfen Sie, ob eine ZAB-Bewertung nötig ist; planen Sie Einkommensteuer und Sozialabgaben ab der ersten Gehaltszahlung.",
      },
    ],
    aiHeading: "Wie KI Ihren persönlichen IT-Umzugsplan erstellt",
    aiBody:
      "Nexim vergleicht Stack, Berufserfahrung, Staatsangehörigkeit, Gehaltserwartung, Familie und Sprachniveau mit aktuellen Blue-Card-Schwellen, Engpasslisten und Stadt-Märkten — damit Sie den passenden Visumsweg sehen, bevor Sie antragen.",
    ctaLabel: "Kostenlose Analyse starten →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "it-germany",
    title: "كيف يمكن لمتخصصي تقنية المعلومات الانتقال إلى ألمانيا في 2026",
    description:
      "البطاقة الزرقاء الأوروبية، بطاقة الفرص، حدود الرواتب ونصائح اللغة لمتخصصي IT الذين ينتقلون إلى ألمانيا في 2026.",
    intro:
      "تظل ألمانيا أكبر مركز تقني في أوروبا مع طلب قوي على مهندسي البرمجيات وDevOps وخبراء البيانات. في 2026 المسارات الرئيسية هي البطاقة الزرقاء الأوروبية وبطاقة الفرص (Chancenkarte) وتأشيرة العامل الماهر برعاية صاحب عمل — لكل منها متطلبات راتب ولغة واعتراف مختلفة.",
    countriesHeading: "مسارات الانتقال الرئيسية لمتخصصي IT",
    countries: [
      {
        name: "البطاقة الزرقاء الأوروبية",
        text: "أسرع مسار مع عقد يتجاوز حد الراتب السنوي (أقل للمهن الناقصة مثل IT). يلزم شهادة جامعية معترف بها أو خبرة مكافئة وتأمين صحي من اليوم الأول.",
      },
      {
        name: "بطاقة الفرص (Chancenkarte)",
        text: "تصريح إقامة بالنقاط للبحث عن عمل حتى سنة دون عرض مسبق. خبرة IT ومستوى الألمانية أو الإنجليزية والعمر والروابط بألمانيا تضيف نقاطاً.",
      },
      {
        name: "تأشيرة العامل الماهر بعرض عمل",
        text: "إقامة عمل قياسية عندما لا يُستوفى حد البطاقة الزرقاء. يجب على صاحب العمل إثبات الحاجة؛ وظائف IT في قوائم النقص غالباً أسهل.",
      },
      {
        name: "اللغة والضرائب والاعتراف",
        text: "كثير من الفرق تعمل بالإنجليزية، لكن B1–B2 ألمانية توسّع الخيارات. تحقق من تقييم ZAB للشهادة؛ خطط للضريبة والاشتراكات الاجتماعية من أول راتب.",
      },
    ],
    aiHeading: "كيف يبني الذكاء الاصطناعي خطة انتقال IT الشخصية",
    aiBody:
      "يقارن Nexim خبرتك التقنية وسنوات العمل وجنسيتك وتوقعات الراتب ووضع العائلة واللغة مع حدود البطاقة الزرقاء وقوائم النقص والأسواق الحضرية — لترى المسار المناسب قبل التقديم.",
    ctaLabel: "احصل على تحليل مجاني ←",
    updated: "المدونة · 2026",
  },
  {
    locale: "fa",
    slug: "it-germany",
    title: "چگونه متخصصان IT می‌توانند در سال ۲۰۲۶ به آلمان مهاجرت کنند",
    description:
      "کارت آبی اتحادیه اروپا، Chancenkarte، آستانه حقوق و نکات زبان برای متخصصان IT که در ۲۰۲۶ به آلمان می‌روند.",
    intro:
      "آلمان همچنان بزرگ‌ترین مرکز فناوری اروپاست با تقاضای بالا برای توسعه‌دهندگان، DevOps و متخصصان داده. در ۲۰۲۶ مسیرهای اصلی کارت آبی EU، Chancenkarte و ویزای کار با پیشنهاد شغلی است — هر کدام شرایط حقوق، زبان و تأیید مدرک متفاوتی دارند.",
    countriesHeading: "مسیرهای اصلی مهاجرت برای متخصصان IT",
    countries: [
      {
        name: "کارت آبی EU",
        text: "سریع‌ترین مسیر با قرارداد بالاتر از آستانه حقوق سالانه (برای IT و مشاغل کم‌یاب پایین‌تر). مدرک دانشگاهی معتبر یا تجربه معادل و بیمه درمانی از روز اول لازم است.",
      },
      {
        name: "Chancenkarte",
        text: "اجازه اقامت امتیازی برای جستجوی کار تا یک سال بدون پیشنهاد قبلی. تجربه IT، سطح آلمانی یا انگلیسی، سن و پیوند با آلمان امتیاز می‌دهد.",
      },
      {
        name: "ویزای کار با پیشنهاد شغلی",
        text: "اقامت کاری استاندارد وقتی آستانه کارت آبی برآورده نشود. کارفرما باید نیاز را ثابت کند؛ نقش‌های IT در لیست کم‌یاب اغلب راحت‌تر تأیید می‌شوند.",
      },
      {
        name: "زبان، مالیات و تأیید مدرک",
        text: "بسیاری از تیم‌ها انگلیسی کار می‌کنند، اما B1–B2 آلمانی گزینه‌ها را گسترش می‌دهد. بررسی کنید آیا ارزیابی ZAB لازم است؛ مالیات و بیمه اجتماعی را از اولین حقوق در نظر بگیرید.",
      },
    ],
    aiHeading: "چگونه هوش مصنوعی نقشه مهاجرت IT شخصی شما را می‌سازد",
    aiBody:
      "Nexim استک، سابقه، تابعیت، انتظار حقوق، وضعیت خانواده و زبان شما را با آستانه‌های فعلی کارت آبی، لیست کم‌یاب و بازار شهرها مقایسه می‌کند — تا قبل از درخواست مسیر ویزای مناسب را ببینید.",
    ctaLabel: "تحلیل رایگان دریافت کنید ←",
    updated: "وبلاگ · ۲۰۲۶",
  },
  {
    locale: "zh",
    slug: "it-germany",
    title: "IT专业人士如何在2026年移居德国",
    description:
      "2026年IT从业者移居德国：欧盟蓝卡、机会卡、薪资门槛与语言要求。",
    intro:
      "德国仍是欧洲最大的科技中心，对软件工程师、DevOps和数据专家需求旺盛。2026年主要路径包括欧盟蓝卡、机会卡（Chancenkarte）以及雇主担保的技术工人签证——各自有不同的薪资、语言和学历认证要求。",
    countriesHeading: "IT专业人士的主要移居途径",
    countries: [
      {
        name: "欧盟蓝卡",
        text: "有高于年度薪资门槛的劳动合同时最快的路径（IT等紧缺职业门槛较低）。需认可大学学历或同等经验，并从第一天起有健康保险。",
      },
      {
        name: "机会卡（Chancenkarte）",
        text: "积分制居留许可，可在无预先工作邀请的情况下在德国求职最长一年。IT经验、德语或英语水平、年龄及与德国的关联均可加分。",
      },
      {
        name: "有工作邀请的技术工人签证",
        text: "未达蓝卡门槛时的标准工作居留。雇主需证明岗位无法本地填补；紧缺列表上的IT岗位通常更容易获批。",
      },
      {
        name: "语言、税务与学历认证",
        text: "许多团队使用英语工作，但B1–B2德语可扩大选择。确认是否需要ZAB学历评估；从第一份工资起规划所得税和社会贡献。",
      },
    ],
    aiHeading: "AI如何为您定制德国IT移居方案",
    aiBody:
      "Nexim将您的技术栈、工作年限、国籍、薪资预期、家庭状况和语言水平与当前蓝卡门槛、紧缺职业列表及各城市市场进行交叉比对——让您在申请前看清适合的签证路径。",
    ctaLabel: "免费获取移居分析 →",
    updated: "博客 · 2026",
  },
  {
    locale: "hi",
    slug: "it-germany",
    title: "IT विशेषज्ञ 2026 में जर्मनी कैसे जाएं",
    description:
      "2026 में IT पेशेवरों के लिए EU Blue Card, Chancenkarte, वेतन सीमा और भाषा सुझाव।",
    intro:
      "जर्मनी यूरोप का सबसे बड़ा टेक हब बना हुआ है — सॉफ्टवेयर इंजीनियर, DevOps और डेटा विशेषज्ञों की माँग मजबूत है। 2026 में मुख्य रास्ते EU Blue Card, Chancenkarte और नौकरी ऑफर वाला कुशल कार्यकर्ता वीज़ा हैं — प्रत्येक की अलग वेतन, भाषा और मान्यता शर्तें हैं।",
    countriesHeading: "IT पेशेवरों के लिए प्रमुख स्थानांतरण मार्ग",
    countries: [
      {
        name: "EU Blue Card",
        text: "हस्ताक्षरित अनुबंध पर वार्षिक वेतन सीमा से ऊपर सबसे तेज़ रास्ता (IT जैसे कमी पदों पर सीमा कम)। मान्यता प्राप्त डिग्री या समकक्ष अनुभव और पहले दिन से स्वास्थ्य बीमा जरूरी।",
      },
      {
        name: "Chancenkarte (अवसर कार्ड)",
        text: "बिना पूर्व ऑफर के एक वर्ष तक नौकरी खोजने के लिए अंक आधारित निवास। IT अनुभव, जर्मन या अंग्रेजी स्तर, उम्र और जर्मनी से संबंध अंक देते हैं।",
      },
      {
        name: "नौकरी ऑफर वाला कुशल कार्यकर्ता वीज़ा",
        text: "Blue Card सीमा पूरी न होने पर मानक कार्य निवास। नियोक्ता को जरूरत साबित करनी होती है; कमी सूची वाली IT भूमिकाएँ अक्सर आसानी से पास होती हैं।",
      },
      {
        name: "भाषा, कर और मान्यता",
        text: "कई टीमें अंग्रेजी में काम करती हैं, लेकिन B1–B2 जर्मन विकल्प बढ़ाता है। ZAB मूल्यांकन की जरूरत जांचें; पहले वेतन से आयकर और सामाजिक योगदान की योजना बनाएं।",
      },
    ],
    aiHeading: "AI आपकी व्यक्तिगत जर्मनी IT योजना कैसे बनाता है",
    aiBody:
      "Nexim आपके स्टैक, अनुभव, नागरिकता, वेतन अपेक्षा, परिवार और भाषा को वर्तमान Blue Card सीमा, कमी सूची और शहर बाजार से मिलाता है — ताकि आवेदन से पहले सही वीज़ा मार्ग दिखे।",
    ctaLabel: "मुफ्त विश्लेषण पाएं →",
    updated: "ब्लॉग · 2026",
  },

  /* ── Engineering → Portugal ── */
  {
    locale: "en",
    slug: "engineering-portugal",
    title: "Engineers: How to Relocate to Portugal in 2026",
    description:
      "D7 visa, tech hiring hubs, Ordem dos Engenheiros recognition and cost of living for engineers moving to Portugal in 2026.",
    intro:
      "Portugal combines EU access, a growing tech and infrastructure sector and a mild climate — attractive for civil, mechanical, electrical and software engineers. In 2026 popular routes include the D7 passive-income visa, employer-sponsored work permits and EU mobility for holders of other Schengen permits.",
    countriesHeading: "Main pathways for engineers",
    countries: [
      {
        name: "D7 visa (passive / remote income)",
        text: "Suitable for engineers with stable remote contracts or passive income above the minimum threshold. Allows residence without a local employer; path to permanent stay after five years of legal residence.",
      },
      {
        name: "Work visa with Portuguese employer",
        text: "Required when relocating for a local engineering firm or EPC contractor. The employer initiates SEF/AIMA authorization; shortage sectors such as renewable energy and construction can speed approval.",
      },
      {
        name: "Professional recognition",
        text: "Regulated engineering titles may need validation through Ordem dos Engenheiros or equivalent documentation of foreign credentials, project portfolio and language skills.",
      },
      {
        name: "Lisbon, Porto and emerging hubs",
        text: "Lisbon and Porto lead in tech and infrastructure jobs; Braga, Aveiro and the Algarve attract manufacturing and energy projects. Compare salaries with lower housing costs outside the capital.",
      },
    ],
    aiHeading: "How AI matches engineers to the right Portugal route",
    aiBody:
      "Nexim weighs your discipline, licensing status, income source, family size and language against D7 thresholds, employer sponsorship odds and regional job markets — delivering a tailored Portugal plan instead of generic expat advice.",
    ctaLabel: "Get My Free Relocation Analysis →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "engineering-portugal",
    title: "Инженерам — как переехать в Португалию в 2026 году",
    description:
      "Виза D7, инженерные центры, признание квалификации и стоимость жизни для инженеров в Португалии в 2026 году.",
    intro:
      "Португалия сочетает доступ к ЕС, растущий tech и инфраструктурный сектор и мягкий климат — привлекательно для инженеров всех направлений. В 2026 году популярны D7 при удалённом доходе, рабочие визы через местного работодателя и мобильность внутри Шенгена.",
    countriesHeading: "Основные пути для инженеров",
    countries: [
      {
        name: "Виза D7",
        text: "Подходит при стабильном удалённом доходе или пассивных поступлениях выше порога. Даёт ВНЖ без местного работодателя; через 5 лет легального проживания — путь к ПМЖ.",
      },
      {
        name: "Рабочая виза с португальским работодателем",
        text: "Нужна при контракте с местной инжиниринговой или EPC-компанией. Работодатель инициирует разрешение AIMA; дефицитные отрасли (ВИЭ, строительство) ускоряют процесс.",
      },
      {
        name: "Признание квалификации",
        text: "Регулируемые инженерные звания могут требовать подтверждения через Ordem dos Engenheiros, портфолио проектов и языковой уровень.",
      },
      {
        name: "Лиссабон, Порту и регионы",
        text: "Лиссабон и Порту лидируют по tech и инфраструктуре; Брага, Авейру и Алgarve — производство и энергетика. Сравните зарплаты с более низкой арендой вне столицы.",
      },
    ],
    aiHeading: "Как ИИ подбирает инженерам маршрут в Португалию",
    aiBody:
      "Nexim учитывает специализацию, лицензию, источник дохода, семью и язык относительно порогов D7, шансов спонсорства и региональных рынков — вместо общих советов для экспатов.",
    ctaLabel: "Попробовать бесплатно",
    updated: "Блог · 2026",
  },
  {
    locale: "de",
    slug: "engineering-portugal",
    title: "Ingenieure: Wie Sie 2026 nach Portugal auswandern",
    description:
      "D7-Visum, Tech-Zentren, Anerkennung und Lebenshaltungskosten für Ingenieure in Portugal 2026.",
    intro:
      "Portugal verbindet EU-Zugang, wachsenden Tech- und Infrastruktursektor und mildes Klima — attraktiv für Ingenieure aller Fachrichtungen. 2026 sind D7 bei Remote-Einkommen, Arbeitsvisa über lokale Arbeitgeber und Schengen-Mobilität die gängigsten Wege.",
    countriesHeading: "Wichtige Wege für Ingenieure",
    countries: [
      {
        name: "D7-Visum",
        text: "Geeignet bei stabilem Remote-Einkommen oder passiven Einnahmen über der Schwelle. Aufenthalt ohne lokalen Arbeitgeber; nach fünf Jahren legaler Aufenthalt Weg zum Daueraufenthalt.",
      },
      {
        name: "Arbeitsvisum mit portugiesischem Arbeitgeber",
        text: "Erforderlich bei Vertrag mit lokalem Ingenieurbüro oder EPC. Arbeitgeber beantragt AIMA-Genehmigung; Engpasssektoren wie Erneuerbare und Bau beschleunigen das Verfahren.",
      },
      {
        name: "Berufliche Anerkennung",
        text: "Regulierte Ingenieurtitel können Validierung durch Ordem dos Engenheiros, Projektportfolio und Sprachkenntnisse erfordern.",
      },
      {
        name: "Lissabon, Porto und Regionen",
        text: "Lissabon und Porto führen bei Tech und Infrastruktur; Braga, Aveiro und Algarve bei Industrie und Energie. Gehälter außerhalb der Hauptstadt vs. Mietkosten vergleichen.",
      },
    ],
    aiHeading: "Wie KI Ingenieuren den Portugal-Weg zuordnet",
    aiBody:
      "Nexim wägt Fachrichtung, Lizenzstatus, Einkommensquelle, Familie und Sprache gegen D7-Schwellen, Sponsoring-Chancen und regionale Märkte — für einen maßgeschneiderten Portugal-Plan.",
    ctaLabel: "Kostenlose Analyse starten →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "engineering-portugal",
    title: "المهندسون: كيف تنتقل إلى البرتغال في 2026",
    description:
      "تأشيرة D7، مراكز التوظيف التقني، الاعتراف المهني وتكلفة المعيشة للمهندسين في البرتغال 2026.",
    intro:
      "تجمع البرتغال بين الوصول إلى الاتحاد الأوروبي وقطاع تقني متنامٍ ومناخ معتدل — جذابة للمهندسين المدنيين والميكانيكيين والكهربائيين. في 2026 المسارات الشائعة: D7 للدخل عن بُعد، تأشيرة عمل برعاية صاحب عمل، وتنقل شنغن.",
    countriesHeading: "المسارات الرئيسية للمهندسين",
    countries: [
      {
        name: "تأشيرة D7",
        text: "مناسبة لدخل عن بُعد أو دخل سلبي فوق الحد الأدنى. إقامة دون صاحب عمل محلي؛ بعد خمس سنوات إقامة قانونية — مسار للإقامة الدائمة.",
      },
      {
        name: "تأشيرة عمل بصاحب عمل برتغالي",
        text: "مطلوبة عند التعاقد مع شركة هندسية محلية. صاحب العمل يبدأ تصريح AIMA؛ قطاعات النقص مثل الطاقة المتجددة تسرّع الموافقة.",
      },
      {
        name: "الاعتراف المهني",
        text: "الألقاب المنظمة قد تحتاج تحققاً عبر Ordem dos Engenheiros ومحفظة مشاريع ومستوى لغوي.",
      },
      {
        name: "لشبونة وبورتو والمناطق",
        text: "لشبونة وبورتو تقودان التقنية والبنية التحتية؛ براغا وأفيرو والغارف للصناعة والطاقة. قارن الرواتب مع إيجار أقل خارج العاصمة.",
      },
    ],
    aiHeading: "كيف يطابق الذكاء الاصطناعي المهندسين مع مسار البرتغال",
    aiBody:
      "يقارن Nexim تخصصك ورخصتك ومصدر الدخل وعائلتك ولغتك مع عتبات D7 واحتمالات الكفالة والأسواق الإقليمية — لخطة برتغالية مخصصة.",
    ctaLabel: "احصل على تحليل مجاني ←",
    updated: "المدونة · 2026",
  },
  {
    locale: "fa",
    slug: "engineering-portugal",
    title: "مهندسان: چگونه در سال ۲۰۲۶ به پرتغال مهاجرت کنند",
    description:
      "ویزای D7، مراکز استخدام فنی، تأیید صلاحیت و هزینه زندگی برای مهندسان در پرتغال ۲۰۲۶.",
    intro:
      "پرتغال دسترسی به EU، بخش فناوری در حال رشد و آب‌وهوای معتدل را ترکیب می‌کند — جذاب برای مهندسان عمران، مکانیک، برق و نرم‌افزار. در ۲۰۲۶ مسیرهای رایج: D7 با درآمد دورکار، ویزای کار با کارفرمای محلی و تحرک شنگن.",
    countriesHeading: "مسیرهای اصلی برای مهندسان",
    countries: [
      {
        name: "ویزای D7",
        text: "مناسب برای درآمد پایدار دورکار یا غیرفعال بالاتر از آستانه. اقامت بدون کارفرمای محلی؛ پس از پنج سال اقامت قانونی — مسیر اقامت دائم.",
      },
      {
        name: "ویزای کار با کارفرمای پرتغالی",
        text: "برای قرارداد با شرکت مهندسی یا EPC محلی لازم است. کارفرما مجوز AIMA را آغاز می‌کند؛ بخش‌های کم‌یاب مانند انرژی تجدیدپذیر فرآیند را تسریع می‌کنند.",
      },
      {
        name: "تأیید صلاحیت حرفه‌ای",
        text: "عناوین تنظیم‌شده ممکن است نیاز به تأیید Ordem dos Engenheiros، نمونه کار و سطح زبان داشته باشند.",
      },
      {
        name: "لیسبون، پورتو و مناطق",
        text: "لیسبون و پورتو در فناوری و زیرساخت پیشتازند؛ برaga و Aveiro و Algarve در صنعت و انرژی. حقوق را با اجاره پایین‌تر خارج پایتخت مقایسه کنید.",
      },
    ],
    aiHeading: "چگونه هوش مصنوعی مسیر پرتغال را به مهندسان پیشنهاد می‌دهد",
    aiBody:
      "Nexim رشته، مجوز، منبع درآمد، خانواده و زبان شما را با آستانه D7، احتمال اسپانسری و بازار منطقه‌ای مقایسه می‌کند — برای برنامه‌ای شخصی‌سازی‌شده.",
    ctaLabel: "تحلیل رایگان دریافت کنید ←",
    updated: "وبلاگ · ۲۰۲۶",
  },
  {
    locale: "zh",
    slug: "engineering-portugal",
    title: "工程师：2026年如何移居葡萄牙",
    description:
      "2026年工程师移居葡萄牙：D7签证、就业中心、资质认证与生活成本。",
    intro:
      "葡萄牙兼具欧盟准入、蓬勃发展的科技与基建行业及温和气候，对土木、机械、电气和软件工程师具有吸引力。2026年常见路径包括D7被动/远程收入签证、本地雇主担保工作许可及申根区流动。",
    countriesHeading: "工程师的主要移居途径",
    countries: [
      {
        name: "D7签证（被动/远程收入）",
        text: "适合有稳定远程合同或高于最低门槛的被动收入者。无需本地雇主即可居留；合法居住五年后可申请长期居留。",
      },
      {
        name: "葡萄牙雇主工作签证",
        text: "受雇于本地工程或EPC企业时需要。雇主向AIMA申请授权；可再生能源、建筑等紧缺行业审批更快。",
      },
      {
        name: "专业资质认证",
        text: "受监管工程师职称可能需要通过Ordem dos Engenheiros验证，并提交外国学历、项目作品集及语言能力证明。",
      },
      {
        name: "里斯本、波尔图与新兴城市",
        text: "里斯本和波尔图引领科技与基建就业；布拉加、阿威罗和阿尔加维吸引制造业与能源项目。比较首都外较低房租下的薪资水平。",
      },
    ],
    aiHeading: "AI如何为工程师匹配葡萄牙移居路径",
    aiBody:
      "Nexim综合您的专业、执照状态、收入来源、家庭规模与语言水平，对照D7门槛、雇主担保概率及区域就业市场——提供量身定制的葡萄牙方案，而非泛泛的移居建议。",
    ctaLabel: "免费获取移居分析 →",
    updated: "博客 · 2026",
  },
  {
    locale: "hi",
    slug: "engineering-portugal",
    title: "इंजीनियर: 2026 में पुर्तगाल कैसे जाएं",
    description:
      "2026 में इंजीनियरों के लिए D7 वीज़ा, नौकरी केंद्र, मान्यता और जीवन लागत — पुर्तगाल।",
    intro:
      "पुर्तगाल EU पहुँच, बढ़ता टेक और इंफ्रास्ट्रक्चर सेक्टर और सौम्य जलवायu को जोड़ता है — civil, mechanical, electrical और software इंजीनियरों के लिए आकर्षक। 2026 में D7, स्थानीय नियोक्ता वाला कार्य वीज़ा और Schengen mobility प्रमुख रास्ते हैं।",
    countriesHeading: "इंजीनियरों के लिए मुख्य मार्ग",
    countries: [
      {
        name: "D7 वीज़ा",
        text: "स्थिर रिमोट आय या न्यूनतम सीमा से ऊपर passive income पर उपयुक्त। स्थानीय नियोक्ता बिना निवास; पाँच वर्ष कानूनी निवास के बाद स्थायी निवास का रास्ता।",
      },
      {
        name: "पुर्तगाली नियोक्ता के साथ कार्य वीज़ा",
        text: "स्थानीय engineering या EPC फर्म के साथ अनुबंध पर आवश्यक। नियोक्ता AIMA अनुमोदन शुरू करता है; renewable energy जैसे कमी क्षेत्र तेज़ करते हैं।",
      },
      {
        name: "पेशेवर मान्यता",
        text: "विनियमित engineering titles को Ordem dos Engenheiros, प्रोजेक्ट पोर्टफोलियो और भाषा स्तर की पुष्टi चाहिए हो सकती है।",
      },
      {
        name: "लिस्बन, पोर्टो और क्षेत्र",
        text: "लिस्बन और पोर्टो tech और infrastructure में अग्रणी; Braga, Aveiro और Algarve manufacturing और energy में। राजधानी के बाहर किराए के साथ वेतन तुलना करें।",
      },
    ],
    aiHeading: "AI इंजीनियरों को सही पुर्तगाल मार्ग कैसे देता है",
    aiBody:
      "Nexim आपके discipline, लाइसेंस, आय स्रोत, परिवार और भाषा को D7 सीमा, sponsorship संभावना और regional बाजार से मिलाता है — व्यक्तिगत पुर्तगाल योजना के लिए।",
    ctaLabel: "मुफ्त विश्लेषण पाएं →",
    updated: "ब्लॉग · 2026",
  },

  /* ── Medicine → Canada ── */
  {
    locale: "en",
    slug: "medicine-canada",
    title: "Doctors and Medical Professionals: How to Relocate to Canada in 2026",
    description:
      "Express Entry, provincial streams, credential recognition and licensing steps for physicians relocating to Canada in 2026.",
    intro:
      "Canada actively recruits internationally trained physicians and allied health professionals, but relocation is tightly regulated. In 2026 success depends on credential assessment, language scores, provincial licensing and choosing the right immigration stream before you arrive.",
    countriesHeading: "Key steps for medical professionals",
    countries: [
      {
        name: "Express Entry (FSW / CEC)",
        text: "Federal points-based permanent residence for skilled workers. Strong language scores, age, education and Canadian experience determine CRS ranking; medical occupations can benefit from category-based draws when announced.",
      },
      {
        name: "Provincial Nominee Programs (PNP)",
        text: "Provinces such as Ontario, BC and Alberta run health-worker streams that add 600 CRS points or grant direct PR pathways for in-demand specialties when you commit to practice in the region.",
      },
      {
        name: "Credential recognition & licensing",
        text: "Physicians typically need verification through PhysiciansApply.ca, MCCEE/NAC exams where required, and provincial college registration (e.g. CPSO). Nurses and allied roles follow separate regulatory bodies.",
      },
      {
        name: "Practice readiness & settlement",
        text: "Many newcomers start with supervised practice, locum roles or clinical observer ships while completing exams. Budget for multi-year licensing timelines and cold-climate relocation costs.",
      },
    ],
    aiHeading: "How AI maps your medical profile to Canada",
    aiBody:
      "Nexim evaluates specialty, years of practice, exam status, language, family and preferred province against current PNP health lists and realistic licensing timelines — so you know whether Express Entry, a provincial stream or a staged pathway fits best.",
    ctaLabel: "Get My Free Relocation Analysis →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "medicine-canada",
    title: "Врачам и медикам — как переехать в Канаду в 2026 году",
    description:
      "Express Entry, провинциальные программы, признание дипломов и лицензирование для медиков в Канаде в 2026 году.",
    intro:
      "Канада привлекает иностранных врачей и медработников, но переезд строго регулируется. В 2026 году успех зависит от оценки диплома, языковых баллов, провинциальной лицензии и выбора иммиграционного потока до приезда.",
    countriesHeading: "Ключевые шаги для медицинских специалистов",
    countries: [
      {
        name: "Express Entry",
        text: "Федеральное ПМЖ по баллам для квалифицированных специалистов. Язык, возраст, образование и канадский опыт определяют CRS; медпрофессии могут попадать в category-based draws.",
      },
      {
        name: "Provincial Nominee Programs (PNP)",
        text: "Провинции (Ontario, BC, Alberta) запускают потоки для медработников — +600 CRS или прямой путь к ПМЖ при обязательстве практиковать в регионе.",
      },
      {
        name: "Признание диплома и лицензия",
        text: "Врачам обычно нужны PhysiciansApply.ca, экзамены MCCEE/NAC и регистрация в колlegе провинции (например CPSO). Медсёстры и смежные специальности — свои регуляторы.",
      },
      {
        name: "Подготовка к практике",
        text: "Многие начинают с supervised practice, locum или observer ship, сдавая экзамены. Заложите многолетний timeline лицензии и расходы на переезд.",
      },
    ],
    aiHeading: "Как ИИ сопоставляет медпрофиль с Канадой",
    aiBody:
      "Nexim оценивает специальность, стаж, экзамены, язык, семью и провинцию относительно PNP health lists и сроков лицензии — чтобы выбрать Express Entry, провинциальный поток или поэтапный маршрут.",
    ctaLabel: "Попробовать бесплатно",
    updated: "Блог · 2026",
  },
  {
    locale: "de",
    slug: "medicine-canada",
    title: "Ärzte und Mediziner: Wie Sie 2026 nach Kanada auswandern",
    description:
      "Express Entry, Provinzprogramme, Anerkennung und Zulassung für Mediziner in Kanada 2026.",
    intro:
      "Kanada wirbt um international ausgebildete Ärzte und Gesundheitsfachkräfte, doch der Umzug ist streng reguliert. 2026 hängen Erfolg von Anerkennung, Sprachscores, Provinzlizenz und dem richtigen Einwanderungsweg vor der Ankunft ab.",
    countriesHeading: "Wichtige Schritte für Mediziner",
    countries: [
      {
        name: "Express Entry",
        text: "Bundesweite Punkte-PR für Fachkräfte. Sprache, Alter, Bildung und kanadische Erfahrung bestimmen CRS; Medizinberufe können von Kategorie-Lotterien profitieren.",
      },
      {
        name: "Provincial Nominee Programs (PNP)",
        text: "Provinzen wie Ontario, BC und Alberta haben Gesundheits-Streams mit +600 CRS oder direktem PR-Weg bei Praxisverpflichtung in der Region.",
      },
      {
        name: "Anerkennung & Lizenz",
        text: "Ärzte brauchen meist PhysiciansApply.ca, MCCEE/NAC-Prüfungen und Provinz-College-Registrierung (z. B. CPSO). Pflege und andere Berufe haben eigene Regulierer.",
      },
      {
        name: "Praxisvorbereitung",
        text: "Viele starten mit supervised practice, Locum oder Observer ship während der Prüfungen. Mehrjährige Lizenztimeline und Umzugskosten einplanen.",
      },
    ],
    aiHeading: "Wie KI Ihr Medizinprofil auf Kanada mappt",
    aiBody:
      "Nexim bewertet Fachrichtung, Praxisjahre, Prüfungsstatus, Sprache, Familie und Provinz gegen PNP-Gesundheitslisten und realistische Lizenzfristen — für Express Entry, Provinzstream oder gestaffelten Weg.",
    ctaLabel: "Kostenlose Analyse starten →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "medicine-canada",
    title: "الأطباء والمتخصصون الطبيون: كيف تنتقل إلى كندا في 2026",
    description:
      "Express Entry، برامج المقاطعات، الاعتراف بالشهادات والترخيص للمهنيين الطبيين في كندا 2026.",
    intro:
      "كندا تستقطب الأطباء والكوادر الصحية الدولية، لكن الانتقال منظّم بصرامة. في 2026 يعتمد النجاح على تقييم الشهادة ودرجات اللغة وترخيص المقاطعة واختيار مسار الهجرة قبل الوصول.",
    countriesHeading: "خطوات رئيسية للمتخصصين الطبيين",
    countries: [
      {
        name: "Express Entry",
        text: "إقامة دائمة فيدرالية بالنقاط للعمال الماهرين. اللغة والعمر والتعليم والخبرة الكندية تحدد CRS؛ المهن الطبية قد تستفيد من سحوبات فئوية.",
      },
      {
        name: "برامج ترشيح المقاطعات (PNP)",
        text: "مقاطعات مثل Ontario وBC وAlberta تقدم مسارات صحية تضيف 600 نقطة CRS أو PR مباشر عند الالتزام بالممارسة في المنطقة.",
      },
      {
        name: "الاعتراف والترخيص",
        text: "الأطباء يحتاجون عادة PhysiciansApply.ca وامتحانات MCCEE/NAC وتسجيل college إقليمي (مثل CPSO). التمريض ومهن أخرى لها جهات تنظيمية منفصلة.",
      },
      {
        name: "الاستعداد للممارسة",
        text: "كثيرون يبدأون بممارسة خاضعة للإشراف أو locum أو observer ship أثناء الامتحانات. خطط لجدول ترخيص متعدد السنوات وتكاليف الانتقال.",
      },
    ],
    aiHeading: "كيف يربط الذكاء الاصطناعي ملفك الطبي بكندا",
    aiBody:
      "يقيّم Nexim تخصصك وسنوات الممارسة وحالة الامتحانات واللغة والعائلة والمقاطعة مقابل قوائم PNP الصحية وجداول الترخيص — لاختيار Express Entry أو مسار إقليمي أو مرحلي.",
    ctaLabel: "احصل على تحليل مجاني ←",
    updated: "المدونة · 2026",
  },
  {
    locale: "fa",
    slug: "medicine-canada",
    title: "پزشکان و متخصصان پزشکی: چگونه در سال ۲۰۲۶ به کانادا مهاجرت کنند",
    description:
      "Express Entry، برنامه‌های استانی، تأیید مدارک و مجوز برای متخصصان پزشکی در کانادا ۲۰۲۶.",
    intro:
      "کanada پزشکان و کادر بهداشت بین‌المللی را جذب می‌کند، اما مهاجرت شدیداً تنظیم‌شده است. در ۲۰۲۶ موفقیت به ارزیابی مدرک، نمرات زبان، مجوز استانی و انتخاب مسیر مهاجرت قبل از ورود بستگی دارد.",
    countriesHeading: "گام‌های کلیدی برای متخصصان پزشکی",
    countries: [
      {
        name: "Express Entry",
        text: "اقامت دائم فدرال امتیازی برای نیروی ماهر. زبان، سن، تحصیلات و تجربه کانادایی CRS را تعیین می‌کند؛ مشاغل پزشکی ممکن است از قرعه‌کشی‌های category-based بهره ببرند.",
      },
      {
        name: "برنامه‌های نامزدی استانی (PNP)",
        text: "استان‌هایی مانند Ontario، BC و Alberta مسیرهای بهداشت با +600 CRS یا PR مستقیم با تعهد به فعالیت در منطقه دارند.",
      },
      {
        name: "تأیید مدرک و مجوز",
        text: "پزشکان معمولاً به PhysiciansApply.ca، آزمون‌های MCCEE/NAC و ثبت college استانی (مثل CPSO) نیاز دارند. پرستاری و مشاغل وابسته نهادهای جدا دارند.",
      },
      {
        name: "آمادگی برای فعالیت",
        text: "بسیاری با supervised practice، locum یا observer ship شروع می‌کنند. برای timeline چندساله مجوز و هزینه مهاجرت برنامه‌ریزی کنید.",
      },
    ],
    aiHeading: "چگونه هوش مصنوعی پروفایل پزشکی شما را با کانادا تطبیق می‌دهد",
    aiBody:
      "Nexim تخصص، سابقه، وضعیت آزمون، زبان، خانواده و استان را با فهرست‌های PNP بهداشت و زمان‌بندی مجوز مقایسه می‌کند — برای Express Entry، مسیر استانی یا مرحله‌ای.",
    ctaLabel: "تحلیل رایگان دریافت کنید ←",
    updated: "وبلاگ · ۲۰۲۶",
  },
  {
    locale: "zh",
    slug: "medicine-canada",
    title: "医生和医疗专业人士：2026年如何移居加拿大",
    description:
      "2026年医疗从业者移居加拿大：Express Entry、省提名、资质认证与执业许可步骤。",
    intro:
      "加拿大积极招募国际培训医师和医疗专业人员，但移居受到严格监管。2026年成功取决于学历评估、语言成绩、省级执业许可以及在抵达前选择正确的移民通道。",
    countriesHeading: "医疗专业人士的关键步骤",
    countries: [
      {
        name: "Express Entry（联邦技术移民）",
        text: "针对 skilled worker 的联邦积分制永久居留。语言、年龄、学历及加拿大经验决定CRS排名；医疗职业在类别抽签中可能受益。",
      },
      {
        name: "省提名计划（PNP）",
        text: "安大略、BC、阿尔伯塔等省设有医疗工作者通道，可增加600 CRS分或承诺在省内执业后直接获得永久居留。",
      },
      {
        name: "学历认证与执业许可",
        text: "医师通常需通过PhysiciansApply.ca验证、MCCEE/NAC等考试及省级医师学院注册（如CPSO）。护士及辅助医疗岗位有独立监管机构。",
      },
      {
        name: "执业准备与定居",
        text: "许多新移民在考试期间从受监督执业、临时岗位或观察实习开始。需为多 year 许可时间线及寒冷地区定居成本做预算。",
      },
    ],
    aiHeading: "AI如何将您的医疗背景匹配到加拿大",
    aiBody:
      "Nexim根据专业、执业年限、考试状态、语言、家庭及目标省份，对照当前PNP医疗清单和 realistic 许可时间线——帮您判断Express Entry、省提名或分阶段路径哪种最合适。",
    ctaLabel: "免费获取移居分析 →",
    updated: "博客 · 2026",
  },
  {
    locale: "hi",
    slug: "medicine-canada",
    title: "डॉक्टर और मेडिकल प्रोफेशनल: 2026 में कनाडा कैसे जाएं",
    description:
      "2026 में चिकित्सा पेशेवरों के लिए Express Entry, PNP, credential recognition और licensing — कनाडा।",
    intro:
      "कनाडा अंतर्राष्ट्रीय रूप से prashikhit chikitsak aur swasthya professionals ko attract karti hai, lekin sthanantaran sakht regulated hai. 2026 mein safalta credential assessment, bhasha scores, provincial license aur sahi immigration stream par nirbhar karti hai.",
    countriesHeading: "चिकित्सा पेशेवरों के लिए प्रमुख कदम",
    countries: [
      {
        name: "Express Entry",
        text: "Skilled workers ke liye federal points-based permanent residence. Bhasha, umar, shiksha aur Canadian anubhav CRS tay karte hain; chikitsa peyeshon ko category-based draws se labh ho sakta hai.",
      },
      {
        name: "Provincial Nominee Programs (PNP)",
        text: "Ontario, BC, Alberta jaise prant health-worker streams chalate hain — +600 CRS ya seedha PR jab aap kshetra mein abhyas karne ka vachan dein.",
      },
      {
        name: "Credential recognition aur licensing",
        text: "Physicians ko aam taur par PhysiciansApply.ca, MCCEE/NAC exams aur provincial college registration (jaise CPSO) chahiye. Nurses aur allied roles ke alag regulators hain.",
      },
      {
        name: "Practice readiness",
        text: "Kayi log exams ke dauran supervised practice, locum ya observer ship se shuru karte hain. Multi-year licensing timeline aur sthanantaran kharch ki yojana banayein.",
      },
    ],
    aiHeading: "AI aapke medical profile ko Canada se kaise milata hai",
    aiBody:
      "Nexim specialty, abhyas varsh, exam sthiti, bhasha, parivar aur pasandeeda prant ko PNP health lists aur licensing samayrekha se milata hai — Express Entry, provincial stream ya staged pathway chunne ke liye.",
    ctaLabel: "मुफ्त विश्लेषण पाएं →",
    updated: "ब्लॉग · 2026",
  },

  /* ── Finance → UAE ── */
  {
    locale: "en",
    slug: "finance-uae",
    title: "Finance Professionals: How to Relocate to the UAE in 2026",
    description:
      "Employment visa, Golden Visa, DIFC licensing and tax-free salary planning for finance professionals in the UAE in 2026.",
    intro:
      "Dubai and Abu Dhabi remain global hubs for banking, asset management, fintech and corporate finance. In 2026 relocation usually means an employer-sponsored residence visa, with Golden Visa options for senior talent and strict rules on qualifications in regulated zones such as DIFC and ADGM.",
    countriesHeading: "Key routes for finance professionals",
    countries: [
      {
        name: "Employment residence visa",
        text: "The standard path: a UAE employer sponsors your work permit and residence. Contracts are typically fixed-term; health insurance and Emirates ID are mandatory. Salary must meet ministry thresholds for your role grade.",
      },
      {
        name: "Golden Visa (10-year)",
        text: "Available for high earners, specialized talent and certain investors without employer tie after approval. Requires documented income, qualifications or approved professional category.",
      },
      {
        name: "DIFC / ADGM regulated roles",
        text: "Roles in Dubai International Financial Centre or Abu Dhabi Global Market may need additional fitness checks, reference letters and compliance with local regulator registers for advisers and fund professionals.",
      },
      {
        name: "Tax, lifestyle and contracts",
        text: "Personal income tax is generally nil, but understand end-of-service gratuity, rent deposits and school fees. Review non-compete clauses and repatriation benefits before signing.",
      },
    ],
    aiHeading: "How AI tailors your UAE finance relocation plan",
    aiBody:
      "Nexim compares your role level, certifications (CFA, ACCA, CPA), salary, family size and target emirate against visa thresholds, Golden Visa eligibility and realistic employer demand — not generic Gulf expat myths.",
    ctaLabel: "Get My Free Relocation Analysis →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "finance-uae",
    title: "Финансистам — как переехать в ОАЭ в 2026 году",
    description:
      "Рабочая виза, Golden Visa, лицензирование DIFC и налоговое планирование для финансистов в ОАЭ в 2026 году.",
    intro:
      "Дубай и Абу-Даби остаются мировыми центрами банкинга, asset management, fintech и корпоративных финансов. В 2026 году переезд обычно через спонсорство работодателя, с Golden Visa для топ-специалистов и строгими правилами в зонах DIFC и ADGM.",
    countriesHeading: "Основные пути для финансистов",
    countries: [
      {
        name: "Рабочая резидентская виза",
        text: "Стандартный путь: работодатель в ОАЭ спонсирует разрешение на работу и ВНЖ. Контракты срочные; нужны медстраховка и Emirates ID. Зарплата должна соответствовать порогам министерства.",
      },
      {
        name: "Golden Visa (10 лет)",
        text: "Для высоких доходов, специалистов редких профессий и инвесторов без привязки к работодателю после одобрения. Нужны подтверждённые доход, квалификация или одобренная категория.",
      },
      {
        name: "Роли в DIFC / ADGM",
        text: "Позиции в DIFC или ADGM могут требовать дополнительных compliance-проверок, рекомендаций и регистрации у локального регулятора для advisers и fund professionals.",
      },
      {
        name: "Налоги, быт и контракт",
        text: "Подоходный налог для физлиц обычно отсутствует, но учитывайте end-of-service gratuity, депозиты за аренду и школы. Проверьте non-compete и repatriation benefits.",
      },
    ],
    aiHeading: "Как ИИ составляет план переезда финансиста в ОАЭ",
    aiBody:
      "Nexim сопоставляет уровень роли, сертификаты (CFA, ACCA, CPA), зарплату, семью и эмират с порогами виз, Golden Visa и спросом работодателей — без мифов про «просто переехать в Дубай».",
    ctaLabel: "Попробовать бесплатно",
    updated: "Блог · 2026",
  },
  {
    locale: "de",
    slug: "finance-uae",
    title: "Finanzexperten: Wie Sie 2026 in die VAE auswandern",
    description:
      "Arbeitsvisum, Golden Visa, DIFC-Lizenzierung und steuerfreies Gehalt für Finanzprofis in den VAE 2026.",
    intro:
      "Dubai und Abu Dhabi sind globale Zentren für Banking, Asset Management, Fintech und Corporate Finance. 2026 erfolgt der Umzug meist über Arbeitgebersponsoring, mit Golden Visa für Spitzenkräfte und strengen Regeln in DIFC und ADGM.",
    countriesHeading: "Wichtige Wege für Finanzprofis",
    countries: [
      {
        name: "Arbeitsaufenthaltsvisum",
        text: "Standardweg: ein VAE-Arbeitgeber sponsert Arbeitserlaubnis und Aufenthalt. Verträge oft befristet; Krankenversicherung und Emirates ID Pflicht. Gehalt muss Mindestschwellen erfüllen.",
      },
      {
        name: "Golden Visa (10 Jahre)",
        text: "Für Topverdiener, Spezialtalente und bestimmte Investoren ohne Arbeitgeberbindung nach Genehmigung. Nachgewiesenes Einkommen, Qualifikation oder anerkannte Kategorie nötig.",
      },
      {
        name: "DIFC / ADGM regulierte Rollen",
        text: "Positionen in DIFC oder ADGM können zusätzliche Compliance-Prüfungen, Referenzen und Regulator-Register für Berater und Fondprofis erfordern.",
      },
      {
        name: "Steuern, Lebensstil, Vertrag",
        text: "Einkommensteuer entfällt meist, aber End-of-Service-Gratuity, Mietkautionen und Schulgebühren einplanen. Non-compete und Repatriierungsleistungen prüfen.",
      },
    ],
    aiHeading: "Wie KI Ihren VAE-Finanz-Umzugsplan erstellt",
    aiBody:
      "Nexim vergleicht Rollenniveau, Zertifikate (CFA, ACCA, CPA), Gehalt, Familie und Emirat mit Visumschwellen, Golden-Visa-Eignung und realistischer Nachfrage — statt generischer Golf-Mythen.",
    ctaLabel: "Kostenlose Analyse starten →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "finance-uae",
    title: "متخصصو المالية: كيف تنتقل إلى الإمارات في 2026",
    description:
      "تأشيرة عمل، الإقامة الذهبية، ترخيص DIFC والتخطيط الضريبي لمتخصصي المالية في الإمارات 2026.",
    intro:
      "دبي وأبوظبي مركزان عالميان للمصارف وإدارة الأصول والفintech والمالية المؤسسية. في 2026 الانتقال عادة برعاية صاحب عمل، مع الإقامة الذهبية للمواهب senior وقواعد صارمة في DIFC وADGM.",
    countriesHeading: "المسارات الرئيسية لمتخصصي المالية",
    countries: [
      {
        name: "تأشيرة إقامة عمل",
        text: "المسار القياسي: صاحب عمل إماراتي يكفل تصريح العمل والإقامة. عقود محددة المدة؛ التأمين الصحي وهوية الإمارات إلزاميان. الراتب يجب أن يلبي حدود الوزارة.",
      },
      {
        name: "الإقامة الذهبية (10 سنوات)",
        text: "للدخل المرتفع والمواهب المتخصصة وبعض المستثمرين دون ربط بصاحب عمل بعد الموافقة. يلزم إثبات دخل ومؤهلات أو فئة معتمدة.",
      },
      {
        name: "أدوار DIFC / ADGM",
        text: "الوظائف في DIFC أو ADGM قد تحتاج فحوصات compliance إضافية ومراجع وتسجيل لدى المنظم للمستشارين ومحترفي الصناديق.",
      },
      {
        name: "الضرائب ونمط الحياة والعقد",
        text: "ضريبة الدخل الشخصي غالباً معدومة، لكن خطط لمكافأة نهاية الخدمة وودائع الإيجار ورسوم المدارس. راجع non-compete ومزايا التrepatriation.",
      },
    ],
    aiHeading: "كيف يخصص الذكاء الاصطناعي خطة انتقالك المالية إلى الإمارات",
    aiBody:
      "يقارن Nexim مستوى دورك وشهاداتك (CFA, ACCA, CPA) وراتبك وعائلتك والإمارة مع عتبات التأشيرة وأهلية الإقامة الذهبية والطلب الواقعي — لا خرافات expat عامة.",
    ctaLabel: "احصل على تحليل مجاني ←",
    updated: "المدونة · 2026",
  },
  {
    locale: "fa",
    slug: "finance-uae",
    title: "متخصصان مالی: چگونه در سال ۲۰۲۶ به امارات مهاجرت کنند",
    description:
      "ویزای کار، Golden Visa، مجوز DIFC و برنامه‌ریزی مالی برای متخصصان مالی در امارات ۲۰۲۶.",
    intro:
      "دبی و ابوظبی مراکز جهانی بانکداری، مدیریت دارایی، fintech و مالی شرکتی هستند. در ۲۰۲۶ مهاجرت معمولاً با اسپانسری کارفرماست، با Golden Visa برای استعدادهای senior و قوانین سخت در DIFC و ADGM.",
    countriesHeading: "مسیرهای اصلی برای متخصصان مالی",
    countries: [
      {
        name: "ویزای اقامت کاری",
        text: "مسیر استاندارد: کارفرمای اماراتی مجوز کار و اقامت را اسپانسری می‌کند. قراردادها اغلب موقت؛ بیمه درمانی و Emirates ID الزامی. حقوق باید آستانه وزارت را برآورده کند.",
      },
      {
        name: "Golden Visa (۱۰ سال)",
        text: "برای درآمد بالا، استعداد تخصصی و برخی سرمایه‌گذاران بدون وابستگی به کارفرما پس از تأیید. درآمد، صلاحیت یا دسته تأییدشده مستند لازم است.",
      },
      {
        name: "نقش‌های DIFC / ADGM",
        text: "موقعیت در DIFC یا ADGM ممکن است بررسی compliance، معرفی‌نامه و ثبت نزد نهاد تنظیم‌گر برای advisers و fund professionals بخواهد.",
      },
      {
        name: "مالیات، سبک زندگی و قرارداد",
        text: "مالیات بر درآمد شخصی معمولاً صفر است، اما end-of-service gratuity، ودیعه اجاره و شهریه مدارس را در نظر بگیرید. non-compete و مزایای repatriation را بررسی کنید.",
      },
    ],
    aiHeading: "چگونه هوش مصنوعی برنامه مهاجرت مالی شما به امارات را می‌سازد",
    aiBody:
      "Nexim سطح نقش، گواهینامه‌ها (CFA, ACCA, CPA)، حقوق، خانواده و امارت را با آستانه ویزا، Golden Visa و تقاضای واقعی کارفرما مقایسه می‌کند — نه افسانه‌های کلی expat.",
    ctaLabel: "تحلیل رایگان دریافت کنید ←",
    updated: "وبلاگ · ۲۰۲۶",
  },
  {
    locale: "zh",
    slug: "finance-uae",
    title: "金融专业人士：2026年如何移居阿联酋",
    description:
      "2026年金融从业者移居阿联酋：工作签证、黄金签证、DIFC许可及免税薪资规划。",
    intro:
      "迪拜和阿布扎比仍是全球银行、资产管理、金融科技和企业金融枢纽。2026年移居通常需雇主担保居留签证，高级人才可申请黄金签证，DIFC和ADGM等监管区对资质有严格要求。",
    countriesHeading: "金融专业人士的主要途径",
    countries: [
      {
        name: "工作居留签证",
        text: "标准路径：阿联酋雇主担保工作许可与居留。合同通常为固定期限；健康保险和阿联酋身份证为强制要求。薪资须满足部委对该职级的最低门槛。",
      },
      {
        name: "黄金签证（10年）",
        text: "适用于高收入者、专业人才及特定投资者，获批后可不绑定雇主。需证明收入、资质或经批准的专业类别。",
      },
      {
        name: "DIFC / ADGM 监管岗位",
        text: "迪拜国际金融中心或阿布扎比全球市场职位可能需额外合规审查、推荐信及在当地监管机构登记（顾问和基金专业人士）。",
      },
      {
        name: "税务、生活与合同",
        text: "个人所得税通常为零，但需考虑离职补偿金、租金押金和学费。签约前审阅竞业禁止和遣返福利条款。",
      },
    ],
    aiHeading: "AI如何定制您的阿联酋金融移居方案",
    aiBody:
      "Nexim根据职级、证书（CFA、ACCA、CPA）、薪资、家庭规模及目标酋长国，对照签证门槛、黄金签证资格及 realistic 雇主需求——而非泛泛的海湾移居传言。",
    ctaLabel: "免费获取移居分析 →",
    updated: "博客 · 2026",
  },
  {
    locale: "hi",
    slug: "finance-uae",
    title: "फाइनेंस प्रोफेशनल: 2026 में UAE कैसे जाएं",
    description:
      "2026 में finance professionals ke liye employment visa, Golden Visa, DIFC licensing aur tax-free salary planning — UAE.",
    intro:
      "Dubai aur Abu Dhabi banking, asset management, fintech aur corporate finance ke global hubs hain. 2026 mein sthanantaran aam taur par employer-sponsored residence visa se hota hai, Golden Visa senior talent ke liye aur DIFC/ADGM mein sakht qualification rules ke saath.",
    countriesHeading: "फाइनेंस पेशेवरों के लिए प्रमुख मार्ग",
    countries: [
      {
        name: "Employment residence visa",
        text: "Standard path: UAE employer work permit aur residence sponsor karta hai. Contracts aksar fixed-term; health insurance aur Emirates ID anivarya. Vetan ministry thresholds poora kare.",
      },
      {
        name: "Golden Visa (10-year)",
        text: "High earners, specialized talent aur kuch investors ke liye employer tie ke bina approval ke baad. Documented income, qualifications ya approved category chahiye.",
      },
      {
        name: "DIFC / ADGM regulated roles",
        text: "DIFC ya ADGM roles mein extra compliance checks, reference letters aur local regulator registration advisers aur fund professionals ke liye ho sakti hai.",
      },
      {
        name: "Tax, lifestyle aur contracts",
        text: "Personal income tax aam taur par nil, lekin end-of-service gratuity, rent deposits aur school fees samjhein. Non-compete aur repatriation benefits review karein.",
      },
    ],
    aiHeading: "AI aapki UAE finance sthanantaran yojana kaise banata hai",
    aiBody:
      "Nexim role level, certifications (CFA, ACCA, CPA), vetan, parivar aur emirate ko visa thresholds, Golden Visa eligibility aur realistic employer demand se milata hai.",
    ctaLabel: "मुफ्त विश्लेषण पाएं →",
    updated: "ब्लॉग · 2026",
  },
  {
    locale: "en",
    slug: "best-countries-arab-professionals-2026",
    title: "Beyond the Gulf: 5 Top Countries for Arab Professionals to Relocate in 2026",
    description:
      "Germany, Canada, the UK, Turkey and Malaysia — the 5 best countries for Gulf and Arab professionals to relocate, work or secure a second residence in 2026, and how AI helps you choose.",
    intro:
      "More Gulf and Arab professionals than ever are looking abroad in 2026 — for a stronger career, a second passport, a better future for their children, or simply a Plan B. Countries around the world are competing for skilled talent, and many now offer faster, friendlier routes than you'd expect. The hard part is choosing the right one for your profession, family and goals.",
    countriesHeading: "5 Top Destinations for Gulf & Arab Professionals",
    countries: [
      {
        name: "Germany",
        text: "Europe's economic powerhouse is short on skilled workers and actively recruiting. The EU Blue Card and the new Opportunity Card let qualified professionals — especially in medicine, engineering and IT — move even without a job offer first. Free healthcare, strong salaries, a growing Arab community and a clear path to permanent residence.",
      },
      {
        name: "Canada",
        text: "Few countries make skilled immigration as clear as Canada. Its Express Entry system scores you on skills, experience and language, with a transparent road to permanent residence and citizenship. Healthcare, tech and trades are in high demand, and large, well-established Arab communities make settling in far smoother.",
      },
      {
        name: "United Kingdom",
        text: "Deep historic ties to the Gulf make the UK a top choice for Arab families and professionals. The Skilled Worker visa opens doors in healthcare, finance and tech, English removes the language barrier, and London offers a ready-made Arab community, mosques, schools and halal everything.",
      },
      {
        name: "Turkey",
        text: "Culturally close, easy to reach and welcoming, Turkey is one of the most popular destinations for Gulf and Arab families. Residence permits are accessible, real-estate investment can open a route to citizenship, and a large Arab community means you'll feel at home from week one — without giving up a modern, connected lifestyle.",
      },
      {
        name: "Malaysia",
        text: "For those who want a Muslim-majority country with a low cost of living and a relaxed pace, Malaysia is hard to beat. Its long-stay residence programs welcome professionals and families, English is widely spoken, and Kuala Lumpur offers world-class healthcare and international schools at a fraction of Western prices.",
      },
    ],
    aiHeading: "How AI Helps You Choose the Right Country",
    aiBody:
      "Every professional's situation is different — your field, your budget, your family, whether you want a job, a second residence or a new passport. Nexim's AI analyzer weighs your exact profile against current visa routes, demand and costs across dozens of countries, and gives you a personalized shortlist built for you — not generic advice that fits no one.",
    ctaLabel: "Get My Free Country Match →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "best-countries-arab-professionals-2026",
    title: "ما وراء الخليج: أفضل 5 دول للهجرة للمحترفين العرب في 2026",
    description:
      "ألمانيا وكندا وبريطانيا وتركيا وماليزيا — أفضل 5 دول للمحترفين الخليجيين والعرب للانتقال أو العمل أو الحصول على إقامة ثانية في 2026، وكيف يساعدك الذكاء الاصطناعي في الاختيار.",
    intro:
      "يتطلع عدد متزايد من المحترفين الخليجيين والعرب إلى الخارج في 2026 — بحثاً عن مسار مهني أقوى، أو جواز سفر ثانٍ، أو مستقبل أفضل لأبنائهم، أو ببساطة خطة بديلة. دول العالم تتنافس اليوم على الكفاءات الماهرة، وكثير منها يقدّم مسارات أسرع وأسهل مما تتوقع. التحدي الحقيقي هو اختيار الدولة المناسبة لمهنتك وعائلتك وأهدافك.",
    countriesHeading: "أفضل 5 وجهات للمحترفين الخليجيين والعرب",
    countries: [
      {
        name: "ألمانيا",
        text: "أكبر اقتصاد في أوروبا يعاني نقصاً في الكفاءات ويستقطبها بنشاط. تتيح البطاقة الزرقاء الأوروبية وبطاقة الفرص الجديدة للمحترفين المؤهلين — خاصة في الطب والهندسة وتقنية المعلومات — الانتقال حتى دون عرض عمل مسبق. رعاية صحية مجانية، رواتب قوية، جالية عربية متنامية، ومسار واضح للإقامة الدائمة.",
      },
      {
        name: "كندا",
        text: "قلّ أن تجد دولة تجعل الهجرة الماهرة بهذا الوضوح. يقيّمك نظام Express Entry على المهارات والخبرة واللغة، بمسار شفّاف نحو الإقامة الدائمة والجنسية. الطلب مرتفع على الرعاية الصحية والتقنية والمهن الحرفية، والجاليات العربية الراسخة تجعل الاستقرار أسهل بكثير.",
      },
      {
        name: "المملكة المتحدة",
        text: "الروابط التاريخية العميقة مع الخليج تجعل بريطانيا خياراً مفضّلاً للعائلات والمحترفين العرب. تأشيرة العامل الماهر تفتح أبواب الصحة والمال والتقنية، والإنجليزية تزيل حاجز اللغة، وتوفّر لندن جالية عربية جاهزة ومساجد ومدارس وكل ما هو حلال.",
      },
      {
        name: "تركيا",
        text: "قريبة ثقافياً، سهلة الوصول ومرحّبة، تركيا من أكثر الوجهات شعبية بين العائلات الخليجية والعربية. تصاريح الإقامة ميسّرة، والاستثمار العقاري قد يفتح طريقاً للجنسية، والجالية العربية الكبيرة تشعرك بالانتماء من الأسبوع الأول — دون التخلي عن نمط حياة عصري ومتصل.",
      },
      {
        name: "ماليزيا",
        text: "لمن يريد بلداً ذا أغلبية مسلمة بتكلفة معيشة منخفضة وإيقاع هادئ، يصعب التفوّق على ماليزيا. برامج الإقامة طويلة الأمد ترحّب بالمحترفين والعائلات، والإنجليزية منتشرة، وتقدّم كوالالمبور رعاية صحية ومدارس دولية على مستوى عالمي بجزء بسيط من الأسعار الغربية.",
      },
    ],
    aiHeading: "كيف يساعدك الذكاء الاصطناعي في اختيار الدولة المناسبة",
    aiBody:
      "وضع كل محترف مختلف — مجالك، ميزانيتك، عائلتك، وما إذا كنت تريد وظيفة أو إقامة ثانية أو جواز سفر جديداً. يقارن محلل Nexim ملفك الدقيق مع مسارات التأشيرات الحالية والطلب والتكاليف عبر عشرات الدول، ويمنحك قائمة مختصرة مخصصة لك أنت — لا نصائح عامة لا تناسب أحداً.",
    ctaLabel: "احصل على تطابق الدول المجاني ←",
    updated: "المدونة · 2026",
  },
  {
    locale: "fa",
    slug: "best-countries-arab-professionals-2026",
    title: "فراتر از خلیج: ۵ کشور برتر برای مهاجرت متخصصان عرب در ۲۰۲۶",
    description:
      "آلمان، کانادا، بریتانیا، ترکیه و مالزی — ۵ کشور برتر برای متخصصان حوزه خلیج و عرب جهت مهاجرت، کار یا دریافت اقامت دوم در ۲۰۲۶، و اینکه هوش مصنوعی چگونه در انتخاب کمک می‌کند.",
    intro:
      "در سال ۲۰۲۶ شمار بیشتری از متخصصان حوزه خلیج و عرب به مهاجرت می‌اندیشند — برای مسیر شغلی قوی‌تر، پاسپورت دوم، آینده‌ای بهتر برای فرزندان، یا صرفاً یک برنامه جایگزین. کشورهای جهان برای جذب نیروهای ماهر رقابت می‌کنند و بسیاری مسیرهایی سریع‌تر و آسان‌تر از تصور شما ارائه می‌دهند. چالش اصلی، انتخاب کشور مناسب برای شغل، خانواده و اهداف شماست.",
    countriesHeading: "۵ مقصد برتر برای متخصصان حوزه خلیج و عرب",
    countries: [
      {
        name: "آلمان",
        text: "بزرگ‌ترین اقتصاد اروپا با کمبود نیروی ماهر روبه‌روست و فعالانه جذب می‌کند. کارت آبی اتحادیه اروپا و کارت فرصت جدید به متخصصان واجد شرایط — به‌ویژه در پزشکی، مهندسی و فناوری اطلاعات — اجازه می‌دهد حتی بدون پیشنهاد شغلی قبلی مهاجرت کنند. مراقبت بهداشتی رایگان، حقوق بالا، جامعه عرب رو به رشد و مسیری روشن برای اقامت دائم.",
      },
      {
        name: "کانادا",
        text: "کمتر کشوری مهاجرت ماهر را به این روشنی ممکن می‌کند. سامانه Express Entry شما را بر اساس مهارت، تجربه و زبان امتیاز می‌دهد، با مسیری شفاف به اقامت دائم و شهروندی. تقاضا برای حوزه سلامت، فناوری و مشاغل فنی بالاست و جوامع عرب جاافتاده، استقرار را بسیار آسان‌تر می‌کنند.",
      },
      {
        name: "بریتانیا",
        text: "پیوندهای تاریخی عمیق با خلیج، بریتانیا را به انتخابی برتر برای خانواده‌ها و متخصصان عرب تبدیل کرده است. ویزای کارگر ماهر درهای سلامت، مالی و فناوری را می‌گشاید، انگلیسی مانع زبانی را برمی‌دارد و لندن جامعه‌ای عرب آماده، مساجد، مدارس و همه‌چیز حلال را فراهم می‌کند.",
      },
      {
        name: "ترکیه",
        text: "ترکیه که از نظر فرهنگی نزدیک، دسترس‌پذیر و پذیراست، از محبوب‌ترین مقاصد برای خانواده‌های خلیجی و عرب است. مجوزهای اقامت در دسترس‌اند، سرمایه‌گذاری در املاک می‌تواند راهی به شهروندی بگشاید و جامعه بزرگ عرب باعث می‌شود از همان هفته اول احساس تعلق کنید — بدون چشم‌پوشی از سبک زندگی مدرن.",
      },
      {
        name: "مالزی",
        text: "برای کسانی که کشوری با اکثریت مسلمان، هزینه زندگی پایین و ریتمی آرام می‌خواهند، مالزی بی‌رقیب است. برنامه‌های اقامت بلندمدت از متخصصان و خانواده‌ها استقبال می‌کنند، انگلیسی رواج دارد و کوالالامپور مراقبت بهداشتی و مدارس بین‌المللی در سطح جهانی را با کسری از قیمت‌های غربی ارائه می‌دهد.",
      },
    ],
    aiHeading: "هوش مصنوعی چگونه در انتخاب کشور مناسب کمک می‌کند",
    aiBody:
      "وضعیت هر متخصص متفاوت است — رشته، بودجه، خانواده، و اینکه شغل می‌خواهید یا اقامت دوم یا پاسپورت جدید. تحلیل‌گر هوش مصنوعی Nexim پروفایل دقیق شما را با مسیرهای ویزای فعلی، تقاضا و هزینه‌ها در ده‌ها کشور مقایسه می‌کند و فهرستی کوتاه و شخصی‌سازی‌شده مخصوص شما ارائه می‌دهد — نه توصیه‌های کلی که به درد هیچ‌کس نمی‌خورد.",
    ctaLabel: "تطبیق رایگان کشورها را دریافت کنید ←",
    updated: "وبلاگ · ۲۰۲۶",
  },
  {
    locale: "en",
    slug: "how-to-find-a-job-abroad-2026",
    title: "How to Find a Job Abroad in 2026: A Practical Step-by-Step Guide",
    description:
      "Where to start, which platforms actually work, and how to land a job in another country in 2026 — a practical guide for professionals planning to relocate.",
    intro:
      "Finding a job in another country feels overwhelming until you break it down into steps. The good news: the international job market in 2026 is more accessible than ever, with remote-first hiring, digital work permits and dedicated global platforms making cross-border careers a realistic option for millions of professionals. Here is where to start and what actually works.",
    countriesHeading: "5 Steps to Finding a Job Abroad",
    countries: [
      {
        name: "1. Know your visa and work authorization options first",
        text: "Before updating your CV, research whether you can legally work in your target country. EU Blue Card, Skilled Worker visa, Working Holiday, Digital Nomad visa or employer-sponsored permit — each has different requirements. Applying for jobs without knowing this wastes months. A targeted AI analysis of your profile (passport, profession, experience) can map the realistic routes in minutes.",
      },
      {
        name: "2. Use the right platforms for international roles",
        text: "LinkedIn remains the single most powerful tool for international job search — set your location preferences to open and turn on the Open to Work signal. Beyond LinkedIn, use Indeed (global filter), Glassdoor, and sector-specific boards: Relocate.me and Layboard for tech, EuropeLanguageJobs for multilingual roles in Europe. Company career pages often list roles not published elsewhere.",
      },
      {
        name: "3. Adapt your CV and cover letter to local standards",
        text: "A CV that works in India or the UAE may not work in Germany or Canada. German employers expect a photo and a precise chronological format; North American resumes are shorter and achievement-focused; UK CVs never include age or photos. Research the local standard for your target country and tailor accordingly. A one-page cover letter explaining why you want to work in that specific country goes a long way.",
      },
      {
        name: "4. Network before you apply",
        text: "Most international hires happen through referrals, not cold applications. Find professionals from your field already working in your target country on LinkedIn and ask for a 20-minute call — not for a job, for advice. Join expat and professional groups on LinkedIn and Facebook. Attend virtual industry events. One warm introduction is worth 50 cold applications.",
      },
      {
        name: "5. Line up the practicalities in parallel",
        text: "Do not wait until you have an offer to sort the rest. Research cost of living, housing and healthcare in your target city. Understand what relocation support your employer might offer — flights, temporary housing, visa sponsorship. If you have family, factor in schools and spousal work rights. The more prepared you are, the faster you can say yes when the offer comes.",
      },
    ],
    aiHeading: "Why Nexim Is One of the Best Relocation Success Tools in the World",
    aiBody:
      "Most job seekers spend weeks researching visa routes, salary benchmarks and cost of living across dozens of countries — and still end up guessing. Nexim.world changes that. Recognized as one of the most comprehensive AI-powered relocation platforms available, Nexim cross-references your passport, profession, experience, salary expectations and family situation against real visa eligibility, job market demand and living costs across 50+ countries — and delivers a personalized relocation success score in minutes. Before you apply anywhere, run your profile through Nexim. It is the one step that makes every other step faster and smarter.",
    ctaLabel: "Get My Free Country Match →",
    updated: "Blog · 2026",
  },
  {
    locale: "en",
    slug: "new-zealand-business-visa-foreigners-2026",
    title: "New Zealand Business & Startup Visa in 2026: Everything Changed — Here's What You Need to Know",
    description:
      "The old New Zealand Entrepreneur Work Visa is gone. Here is what actually exists in 2026 for foreigners who want to start or buy a business in New Zealand — and how to figure out if it is right for you.",
    intro:
      "If you have been researching a 'startup visa' for New Zealand based on articles written before mid-2025, you are reading outdated information. The New Zealand Entrepreneur Work Visa — which allowed foreigners to launch a new business and earn residency — was officially closed to new applications in August 2025. New Zealand's business immigration landscape has been completely overhauled. Here is the accurate, up-to-date picture for 2026, and what it means for entrepreneurs and investors who have New Zealand on their radar.",
    countriesHeading: "New Zealand Business Immigration in 2026: The Full Picture",
    countries: [
      {
        name: "What closed: the Entrepreneur Work Visa (August 2025)",
        text: "The Entrepreneur Work Visa, which had been running since 1999, was shut down to new applications on 25 August 2025. It allowed foreigners to start a business from scratch in New Zealand and progress to permanent residency over three years. The government closed it citing high decline rates, inconsistent outcomes and policy settings that were no longer fit for purpose. If you already held this visa before the closure, existing pathways to residency remain open — but no new applications are being accepted.",
      },
      {
        name: "What opened: the Business Investor Work Visa (November 2025)",
        text: "On 24 November 2025, New Zealand launched the Business Investor Work Visa. This is not a startup visa — it is an investor visa for buying into an established business. There are two pathways: NZD $1 million investment in an existing New Zealand business (operating for at least 5 years) leads to a 3-year work-to-residence pathway. NZD $2 million investment in the same type of business offers a fast-track to residence in just 12 months. You can purchase the business outright or acquire at least a 25% shareholding. The visa is valid for up to 4 years and your partner and dependent children can be included in the application.",
      },
      {
        name: "What is coming: a dedicated startup and innovation pathway",
        text: "The New Zealand government has confirmed it is developing a new visa pathway specifically for startup entrepreneurs with scalable, innovative business ideas. This future program is designed to fill the gap left by the Entrepreneur Visa closure and will target founders with concepts that have significant growth and export potential. As of mid-2026, this pathway has not yet launched — but it is actively in development. For tech founders, ICT entrepreneurs and those with high-innovation business models, this will be worth watching closely.",
      },
      {
        name: "Who the current options are actually for",
        text: "The Business Investor Work Visa is designed for experienced business operators with serious capital — the NZD $1 million minimum is the entry point, not a rough guide. If you are a founder looking to start something new from scratch without that level of capital, the current New Zealand system does not have a direct route for you right now. However, depending on your profession, you may have alternative pathways: the Skilled Migrant Category, working holiday visas for younger applicants, or employer-sponsored work visas if you secure a job offer first.",
      },
      {
        name: "How to know which New Zealand pathway — if any — fits your profile",
        text: "The honest answer is: it depends entirely on your passport, profession, available capital, business experience and whether you are looking to invest, start fresh or get sponsored. New Zealand's immigration settings changed significantly in 2025 and continue to evolve. Running your personal profile through an AI-powered relocation analyzer is the fastest way to see whether New Zealand is a realistic option for you right now — or whether another country (Australia, Canada, Portugal, Germany) offers a more accessible business immigration route for your specific situation.",
      },
    ],
    aiHeading: "Nexim: One of the Best AI Relocation Tools in the World for Exactly This",
    aiBody:
      "New Zealand's business immigration overhaul in 2025 is a perfect example of why generic advice fails people: the landscape changed overnight, and most content online still describes a visa that no longer exists. Nexim.world's AI analyzer is built for precisely this kind of complexity. It cross-references your passport, profession, available capital, business experience and family situation against current visa routes across 50+ countries — including New Zealand's updated 2026 pathways — and delivers a personalized relocation success score in minutes. If New Zealand is realistic for you, Nexim will show you how. If another country is a stronger match right now, you will know that too — before spending months on the wrong application.",
    ctaLabel: "Check My Relocation Options Free →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "portugal-startup-viza-2026",
    title: "Стартап-виза в Португалию 2026: актуальный гид — от требований IAPMEI до нового закона о гражданстве",
    description:
      "Стартап-виза IAPMEI работает в 2026 году. Но главное изменение: срок до гражданства вырос с 5 до 10 лет. Полный актуальный гид с требованиями, шагами и честным взглядом на новые условия.",
    intro:
      "Португалия остаётся одним из самых популярных направлений для предпринимателей из России, Украины, Казахстана и других стран — и не случайно. Стартап-виза IAPMEI не требует крупных инвестиций, даёт вид на жительство в Евросоюзе и путь к одному из сильнейших паспортов в мире. Но в 2026 году правила существенно изменились. Прежде чем подавать документы — прочитайте этот гид до конца.",
    countriesHeading: "Стартап-виза Португалии в 2026: всё, что нужно знать",
    countries: [
      {
        name: "Программа жива: стартап-виза IAPMEI работает",
        text: "Стартап-виза Португалии — официальная программа агентства IAPMEI (Агентство по конкурентоспособности и инновациям) — продолжает работать в 2026 году. Создана в 2018 году, она позволяет предпринимателям из стран за пределами ЕС получить вид на жительство без фиксированного минимума инвестиций. Достаточно перспективной идеи и одобрения аккредитованного бизнес-инкубатора. Программа рассчитана на основателей технологических и инновационных стартапов — как на тех, кто только разрабатывает идею, так и на тех, кто уже развивает компанию не старше 4 лет.",
      },
      {
        name: "Что требует IAPMEI от вашего проекта",
        text: "Ваш стартап должен соответствовать четырём ключевым критериям. Инновационность: проект должен быть основан на технологиях или специализированных знаниях. Масштабируемость: продукт или услуга должны иметь потенциал для выхода на международные рынки. Создание рабочих мест: стартап должен быть способен обеспечить квалифицированную занятость в Португалии. Финансовый потенциал: в течение пяти лет бизнес должен выйти на оборот или стоимость активов не менее €325 000. Заявку оценивают эксперты IAPMEI, а один из аккредитованных инкубаторов должен выразить готовность взять ваш проект в акселерацию.",
      },
      {
        name: "Что требуется от вас лично: деньги, документы, образование",
        text: "Лично от заявителя требуется немного: быть старше 18 лет, быть гражданином страны вне ЕС, иметь диплом о высшем образовании (не ниже бакалавра) и подтвердить наличие на счёте не менее €11 040 — прожиточный минимум на год в Португалии. Инвестировать фиксированную сумму в бизнес не нужно. В заявку можно включить до пяти партнёров-сооснователей. Члены семьи (супруг, дети до 18 лет, финансово зависимые родители) получают право на воссоединение семьи после получения ВНЖ.",
      },
      {
        name: "Как выглядит процесс: шаги и реальные сроки",
        text: "Всё начинается с регистрации на портале Startup Visa и подачи бизнес-плана на оценку IAPMEI. Решение — в течение 30 рабочих дней. Если одобрено: 40 рабочих дней на подписание акселерационного соглашения с инкубатором. Затем — заявка на визу в консульстве Португалии, которая выдаётся в течение 3–6 месяцев. После въезда — 4 месяца на обращение в AIMA (ранее SEF) за ВНЖ. ВНЖ выдаётся на 2 года, затем продлевается на 3 года. С 2025 года AIMA перешла на полностью электронное делопроизводство — документы загружаются онлайн через личный кабинет.",
      },
      {
        name: "Главное изменение 2026 года: гражданство теперь через 10 лет",
        text: "Это важнейшая новость для всех, кто рассматривал Португалию ради быстрого паспорта ЕС. 1 апреля 2026 года парламент Португалии принял поправки к закону о гражданстве, президент подписал их 3 мая 2026 года, в силу они вступили 19 мая 2026 года. Теперь срок легального проживания до подачи на гражданство — 10 лет для большинства иностранцев (7 лет для граждан ЕС и стран португалоязычного сообщества: Бразилии, Анголы и других). Ранее этот срок составлял 5 лет. Закон не имеет обратной силы: заявления, поданные до 19 мая 2026 года, рассматриваются по старым правилам. Для тех, кто только планирует переезд, это меняет расчёты — особенно если главной целью был путь к паспорту ЕС.",
      },
    ],
    aiHeading: "Португалия — один из вариантов. Nexim покажет лучший именно для вас",
    aiBody:
      "Стартап-виза Португалии — сильный инструмент. Но теперь, когда гражданство стало доступно только через 10 лет, стоит честно спросить: является ли Португалия вашим оптимальным маршрутом? Может быть, для вашего профиля, профессии и финансовой ситуации лучше подойдёт Германия с EU Blue Card, Канада через Express Entry или другая страна с более коротким путём к резидентству? Nexim.world — один из наиболее точных AI-инструментов в мире для расчёта шанса на успешную релокацию. Система анализирует ваш паспорт, профессию, опыт, финансы и семейную ситуацию по реальным визовым маршрутам в 50+ странах и выдаёт персональный результат — не общий совет, а именно ваши цифры. Pro-анализ за $7 включает три лучших страны под ваш профиль, пошаговый роадмап с таймингами, обзор рынка труда с реальными зарплатами и налоговый аудит — всё для того, чтобы принять решение осознанно, а не вслепую.",
    ctaLabel: "Получить Pro-анализ за $7 →",
    updated: "Блог · 2026",
  },
  {
    locale: "en",
    slug: "germany-opportunity-card-2026",
    title: "Germany Opportunity Card (Chancenkarte) in 2026: The Easiest Way Into Europe Right Now?",
    description:
      "Germany's Opportunity Card lets skilled workers move without a job offer first. In 2026 it has become one of the most popular routes into Europe — especially for professionals from India. Here is how it works.",
    intro:
      "Something remarkable happened in 2026: Germany overtook Canada in total immigration for the first time since 2019. The driving force is the Chancenkarte, or Opportunity Card — a points-based visa that lets qualified professionals move to Germany to look for work, without needing a job offer first. In its first full year it received around 48,000 applications, more than triple the government's projection, with applicants from India leading the way. Here is the complete 2026 picture.",
    countriesHeading: "Germany's Opportunity Card in 2026: What You Need to Know",
    countries: [
      {
        name: "What the Opportunity Card actually is",
        text: "The Chancenkarte is a job-seeker residence permit based on a points system. Unlike almost every other work visa, you do not need a German employer to sponsor you before you arrive. If you score enough points, you can move to Germany for up to one year to search for a job in person, work part-time (up to 20 hours per week) to support yourself, and switch to a full work permit or EU Blue Card once you land a role. It is designed specifically to bring skilled talent into Germany's labor market, which faces a serious shortage of qualified workers.",
      },
      {
        name: "How the points system works",
        text: "You need a minimum of six points to qualify, plus a baseline requirement: either a recognized university degree or a vocational qualification of at least two years, and basic language skills (German A1 or English B2). Points are awarded for things that make you employable: years of professional experience, German language ability (the higher your level, the more points), age (younger applicants score more), and a previous connection to Germany. The system rewards practical employability over pure academics — real work experience and language skills carry significant weight.",
      },
      {
        name: "Why India leads — and who else benefits most",
        text: "Indian professionals topped the application charts in the card's first year, and it is easy to see why: Germany's shortage is sharpest in IT, engineering, healthcare and skilled trades — exactly the fields where India produces large numbers of qualified graduates. But the card is open to professionals worldwide. If you have a degree or solid vocational training, a few years of experience, and decent English, you are likely closer to qualifying than you think. Nurses, software developers, engineers and tradespeople are in especially high demand.",
      },
      {
        name: "The financial and practical requirements",
        text: "You must prove you can support yourself during your job search — typically by showing funds in a blocked account (Sperrkonto) or a formal financial commitment, covering roughly €1,000 or more per month for the duration. You will also need valid health insurance and recognized proof of your qualifications. For degrees, this means checking your credential against Germany's anabin database. The application fee is modest, and your spouse and children can join you. Once you find a job and switch to a Blue Card, you are on a direct path to permanent residence.",
      },
      {
        name: "Is Germany actually the right move for you?",
        text: "The Opportunity Card is genuinely one of the most accessible routes into Europe in 2026 — but it is not automatically the best fit for everyone. Your ideal destination depends on your profession, your language skills, your savings and your long-term goals. For some, Canada's Express Entry or Australia's skilled migration may score better. For others, Germany is clearly the strongest play. The only way to know is to compare your actual profile against the real requirements of each country.",
      },
    ],
    aiHeading: "Nexim: See if Germany Is Your Best Route in Minutes",
    aiBody:
      "Germany's Opportunity Card changed the immigration landscape overnight — and most people have no idea whether they qualify or whether another country would be a smarter move. Nexim.world is one of the most advanced AI relocation tools in the world for exactly this question. It analyzes your passport, profession, experience, language skills, savings and family situation against the current 2026 requirements for the Opportunity Card and 50+ other pathways, then gives you a personalized relocation success score in minutes. The Pro analysis ($7) shows your three best-matched countries with step-by-step roadmaps, real salary data and document checklists — so you can stop guessing and start planning.",
    ctaLabel: "Check My Germany Eligibility Free →",
    updated: "Blog · 2026",
  },
  {
    locale: "ru",
    slug: "pereezd-v-germaniyu-2026",
    title: "Переезд в Германию в 2026: Opportunity Card, Голубая карта ЕС и реальные пути для специалистов",
    description:
      "Германия в 2026 году обогнала Канаду по приёму мигрантов. Карта возможностей (Chancenkarte) позволяет переехать без приглашения на работу. Полный актуальный гид: пути, требования, шаги.",
    intro:
      "В 2026 году Германия впервые с 2019 года обогнала Канаду по количеству принятых мигрантов — и это не случайно. Страна остро нуждается в квалифицированных специалистах и открыла один из самых доступных путей в Европу: Карту возможностей (Chancenkarte), которая позволяет переехать в Германию для поиска работы без предварительного приглашения от работодателя. Если вы IT-специалист, инженер, врач, медсестра или представитель рабочей профессии — этот гид для вас.",
    countriesHeading: "Главные пути переезда в Германию в 2026 году",
    countries: [
      {
        name: "Карта возможностей (Chancenkarte) — переезд без приглашения",
        text: "Это главная новость последних лет. Карта возможностей — это вид на жительство для поиска работы, основанный на балльной системе. В отличие от обычной рабочей визы, вам не нужен работодатель, который пригласит вас до переезда. Набрав минимум 6 баллов, вы можете приехать в Германию на срок до одного года, искать работу на месте, подрабатывать до 20 часов в неделю, а после получения оффера — оформить полноценное разрешение на работу или Голубую карту ЕС. За первый год программа получила около 48 000 заявок — втрое больше прогноза.",
      },
      {
        name: "Как начисляются баллы",
        text: "Базовое требование: диплом о высшем образовании или профессиональная квалификация от двух лет, плюс базовый язык (немецкий A1 или английский B2). Баллы начисляются за то, что делает вас востребованным на рынке: опыт работы по специальности, уровень владения немецким (чем выше — тем больше баллов), возраст (молодым начисляют больше), а также прошлая связь с Германией. Система ценит практическую востребованность выше чистой академичности — реальный опыт и знание языка дают много баллов.",
      },
      {
        name: "Голубая карта ЕС — для тех, у кого уже есть оффер",
        text: "Если вы уже нашли работу в Германии с зарплатой выше установленного порога, вам подходит Голубая карта ЕС — это прямой и быстрый путь. Она особенно выгодна для дефицитных профессий (IT, инженеры, врачи), где зарплатный порог снижен. Голубая карта даёт право на ПМЖ всего через 21–33 месяца при наличии знания немецкого языка, а также упрощённое воссоединение семьи. Для многих специалистов это оптимальный маршрут, если удалось получить оффер удалённо.",
      },
      {
        name: "Что нужно подготовить: документы и финансы",
        text: "Ключевой момент — признание вашего диплома. Образование проверяется через базу anabin (для квалификаций используется оценка ZAB). Также понадобится подтверждение финансов на время поиска работы — обычно через блокированный счёт (Sperrkonto) на сумму от примерно €1 000 в месяц, медицинская страховка и действующий загранпаспорт. Немецкая бюрократия требовательна, но предсказуема: при правильно собранном пакете документов процесс идёт по понятным правилам. Супруг и дети могут переехать вместе с вами.",
      },
      {
        name: "А Германия — точно ваш лучший вариант?",
        text: "Карта возможностей делает Германию одним из самых доступных направлений в Европе в 2026 году. Но это не значит, что она автоматически лучший выбор именно для вас. Оптимальная страна зависит от вашей профессии, знания языков, накоплений и долгосрочных целей. Кому-то больше подойдёт Канада через Express Entry, кому-то — Австралия, а кому-то Германия действительно идеальна. Узнать наверняка можно только сравнив свой реальный профиль с актуальными требованиями каждой страны.",
      },
    ],
    aiHeading: "Nexim: узнайте, подходит ли вам Германия, за минуты",
    aiBody:
      "Карта возможностей изменила правила игры — но большинство людей не знают, проходят ли они по баллам и не будет ли другая страна более удачным выбором. Nexim.world — один из самых продвинутых AI-инструментов в мире для ответа именно на этот вопрос. Система анализирует ваш паспорт, профессию, опыт, знание языков, финансы и семейную ситуацию по актуальным требованиям 2026 года для Карты возможностей и 50+ других маршрутов, а затем выдаёт персональный расчёт шанса на успех — за минуты. Pro-анализ за $7 показывает три лучшие страны под ваш профиль с пошаговым роадмапом, реальными зарплатами и чеклистом документов — чтобы вы перестали гадать и начали планировать.",
    ctaLabel: "Проверить шансы на Германию бесплатно →",
    updated: "Блог · 2026",
  },
  {
    locale: "en",
    slug: "malaysia-relocation-2026",
    title: "Why Malaysia Is the Smart Relocation Choice in 2026: Low Cost, No Tax on Foreign Income",
    description:
      "As living costs push people away from Western Europe, Malaysia is emerging as one of the best value relocation destinations in 2026 — low cost, English-friendly, and no local tax on foreign-earned income.",
    intro:
      "A major shift is reshaping global relocation in 2026: as housing and living costs surge in traditional destinations like the UK and Australia, more people are choosing affordable, high-quality alternatives. Demand for countries with monthly living costs under €1,500 jumped 34% this year. Near the top of that list sits Malaysia — a Muslim-majority country offering a rare combination of low cost, modern infrastructure, widespread English, and a tax system that does not touch your foreign income. Here is why it deserves a serious look.",
    countriesHeading: "Malaysia in 2026: A Complete Relocation Snapshot",
    countries: [
      {
        name: "The cost advantage is real",
        text: "Malaysia consistently ranks among the best-value destinations in Asia. A comfortable lifestyle in Kuala Lumpur or Penang costs a fraction of what you would pay in Western Europe, North America or Singapore. Rent, food, transport and healthcare are all dramatically more affordable, while the quality — modern apartments, world-class private hospitals, fast internet, international schools — remains high. For remote workers, retirees and families stretching their savings, that gap is the whole point.",
      },
      {
        name: "No local tax on foreign-earned income",
        text: "This is Malaysia's standout financial feature. Foreign-sourced income received by resident individuals is currently exempt from Malaysian tax through the end of 2036, subject to conditions. For digital nomads, remote employees and entrepreneurs earning from clients abroad, that can mean keeping significantly more of what you earn compared to high-tax European destinations where local tax residency kicks in after 183 days. Always confirm your own situation with a tax professional, but the structural advantage is clear.",
      },
      {
        name: "English works, and the culture is welcoming",
        text: "English is widely spoken across business, healthcare and daily life, which removes one of the biggest barriers people face when relocating to Asia. Malaysia is also one of the most balanced destinations in the region for safety, connectivity and ease of settling in. As a Muslim-majority country with halal food everywhere, mosques in every neighborhood and a large, diverse expat community, it is especially comfortable for families and professionals from the Middle East, North Africa and South Asia.",
      },
      {
        name: "Visa routes: how to actually stay",
        text: "Malaysia offers several long-stay pathways. The Malaysia My Second Home (MM2H) program is the best-known route for those who can meet its financial requirements, granting renewable long-term residency. There are also professional work visas tied to employment, and the country has been expanding options aimed at remote workers and digital professionals. The right route depends on your income, profession and whether you are coming to work locally, work remotely, or settle with savings — so it pays to match your profile to the specific visa before committing.",
      },
      {
        name: "Is Malaysia your best match — or just one option?",
        text: "Malaysia is one of the strongest value plays in 2026, but the smartest destination is always the one that fits your specific situation. Your profession, income source, family needs and long-term goals determine whether Malaysia, a European route like Germany's Opportunity Card, or somewhere else entirely makes the most sense. Rather than guessing from generic 'best country' lists, the better approach is to compare your actual profile against the real requirements and trade-offs of each destination.",
      },
    ],
    aiHeading: "Nexim: Match Your Profile to the Right Country in Minutes",
    aiBody:
      "Malaysia's rise is part of a bigger trend — people are realizing that the 'obvious' destinations are not always the best fit for their budget and goals. Nexim.world is one of the most advanced AI relocation tools in the world for cutting through that noise. Instead of generic lists, it analyzes your passport, profession, income, savings and family situation against the real 2026 requirements of Malaysia and 50+ other countries, then delivers a personalized relocation success score in minutes. The Pro analysis ($7) gives you your three best-matched destinations with step-by-step roadmaps, real cost-of-living and salary data, tax notes and document checklists — everything you need to choose with confidence instead of guessing.",
    ctaLabel: "Find My Best-Match Country Free →",
    updated: "Blog · 2026",
  },
  {
    locale: "ar",
    slug: "egypt-immigration-without-agent-2026",
    title: "إجراءات الهجرة بدون وسيط للمصريين في 2026: دليلك الكامل خطوة بخطوة",
    description:
      "كيف تهاجر من مصر بدون وسيط أو مكتب هجرة في 2026 — وتوفّر آلاف الجنيهات. دليل عملي للمسارات المتاحة: الخليج، ألمانيا، كندا، والخطوات الرسمية المباشرة.",
    intro:
      "يدفع آلاف المصريين كل عام مبالغ ضخمة لمكاتب الهجرة والوسطاء — وكثير منهم يقعون ضحية للنصب أو الوعود الكاذبة. الحقيقة التي لا يخبرك بها الوسيط: معظم إجراءات الهجرة الرسمية يمكنك إنجازها بنفسك مباشرة مع السفارات والجهات الحكومية، دون الحاجة إلى دفع عمولات. مع انخفاض قيمة الجنيه، أصبح توفير هذه التكاليف أهم من أي وقت مضى. هذا الدليل يوضح لك كيف تهاجر بدون وسيط في 2026.",
    countriesHeading: "كيف تهاجر من مصر بدون وسيط: المسارات والخطوات",
    countries: [
      {
        name: "لماذا لا تحتاج إلى وسيط في معظم الحالات",
        text: "الوسطاء يبيعونك خدمة يمكنك القيام بها بنفسك: ملء الطلبات، حجز المواعيد، وتجهيز المستندات. الجهات الرسمية — السفارات وأنظمة الهجرة الحكومية — تتعامل مباشرة مع المتقدمين، ومواقعها الإلكترونية تشرح المتطلبات بوضوح. الوسيط لا يملك 'واسطة' سحرية لدى السفارة؛ قرار القبول يعتمد على ملفك أنت. توفير عمولة الوسيط (التي قد تصل لعشرات الآلاف من الجنيهات) يعني مالاً إضافياً لتكاليف انتقالك الحقيقية. احذر فقط من المكاتب التي تعدك بـ'ضمان' الفيزا أو 'تأشيرة مضمونة' — هذا مؤشر شبه أكيد على النصب.",
      },
      {
        name: "المسار الأسرع: دول الخليج (أسابيع وليست سنوات)",
        text: "إذا كان هدفك المغادرة السريعة، فالخليج هو الإجابة الواقعية. السعودية والكويت والإمارات وقطر تعالج تأشيرات العمل في أسابيع. المسار المعتاد: تجد عرض عمل مباشرة (عبر منصات التوظيف أو مواقع الشركات)، ثم يتكفّل صاحب العمل برعاية التأشيرة وإجراءاتها. المطلوب منك عادة: الفحص الطبي (GAMCA)، تصديق الشهادات، وختم التأشيرة. الكويت والسعودية تضمّان أكبر جاليات مصرية، مما يسهّل الاستقرار. مهم: احسب تكاليف مغادرتك (التأشيرة، الفحص، التذاكر) بعملة الوجهة لا بالجنيه، حتى لا تقلّل من تقدير المبلغ.",
      },
      {
        name: "المسار الأقوى لأوروبا: ألمانيا (بطاقة الفرص)",
        text: "ألمانيا تعاني نقصاً حاداً في الكفاءات وفتحت أحد أسهل الأبواب إلى أوروبا: بطاقة الفرص (Chancenkarte) التي أُطلقت في 2024. تتيح لك الانتقال إلى ألمانيا للبحث عن عمل دون عرض عمل مسبق، بنظام نقاط يعتمد على مؤهلك وخبرتك ولغتك. وإذا كان لديك عرض عمل بالفعل، فالبطاقة الزرقاء الأوروبية مسار أسرع — بحدّ أدنى للراتب مخفّض في المهن المطلوبة مثل تقنية المعلومات والهندسة والطب. تقدّم بنفسك عبر موقع السفارة الألمانية، واعتمد على قاعدة anabin للتحقق من معادلة شهادتك.",
      },
      {
        name: "الخطوات الرسمية المباشرة لأي دولة",
        text: "بغضّ النظر عن وجهتك، الإجراء المباشر يتبع نفس المنطق: أولاً، حدّد نوع التأشيرة المناسب لحالتك (عمل، بحث عن عمل، دراسة) من الموقع الرسمي للسفارة. ثانياً، جهّز مستنداتك: جواز سفر ساري، شهادات مُصدّقة ومترجمة، إثبات مالي، وتأمين صحي. ثالثاً، احجز موعداً في السفارة أو مركز التأشيرات مباشرة عبر موقعهم الرسمي. رابعاً، قدّم الطلب وادفع الرسوم الرسمية فقط (لا عمولات وسيط). خامساً، تابع حالة طلبك بنفسك. كل خطوة موثّقة على المواقع الرسمية — لا تحتاج إلى من يقوم بها نيابة عنك.",
      },
      {
        name: "أهم سؤال: أي دولة هي الأنسب لك فعلاً؟",
        text: "قبل أن تبدأ أي إجراء، السؤال الأهم ليس 'كيف أهاجر' بل 'إلى أين'. الوجهة المثالية تعتمد على مهنتك وخبرتك وميزانيتك ووضع عائلتك. نفس المهندس المصري قد يكون الخيار الأفضل له كندا أو ألمانيا أو البقاء في الإمارات بالإقامة الذهبية — أربع إجابات صحيحة مختلفة حسب التفاصيل. اختيار الوجهة الخاطئة يعني إهدار شهور وأموال. لذلك الخطوة الذكية الأولى هي مطابقة ملفك الشخصي مع المتطلبات الحقيقية لكل دولة.",
      },
    ],
    aiHeading: "Nexim: اعرف وجهتك الأنسب في دقائق — بدون وسيط",
    aiBody:
      "أكبر خطأ يرتكبه المهاجر هو اختيار الوجهة الخاطئة، أو الاعتماد على وسيط يبيعه الدولة التي تدفع له أعلى عمولة. منصة Nexim.world هي واحدة من أكثر أدوات الهجرة الذكية تطوراً في العالم لحلّ هذه المشكلة بالضبط. تحلّل المنصة جواز سفرك ومهنتك وخبرتك ومدخراتك ووضعك العائلي مقابل متطلبات أكثر من 50 دولة بمعايير 2026، ثم تمنحك نتيجة شخصية لاحتمال نجاح هجرتك في دقائق. التحليل الاحترافي (Pro) بسعر 7 دولارات فقط يعرض لك أفضل ثلاث دول تناسب ملفك، مع خارطة طريق خطوة بخطوة، ورواتب حقيقية، وقائمة بالمستندات والجهات الرسمية — كل ما تحتاجه لتهاجر بنفسك بثقة، دون وسيط ودون نصب.",
    ctaLabel: "اكتشف وجهتك المناسبة مجاناً ←",
    updated: "المدونة · 2026",
  },
];

export function getBlogPostsForLocale(locale: string): BlogPost[] {
  return blogPosts.filter((post) => post.locale === locale);
}

export function getBlogPost(locale: string, slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.locale === locale && post.slug === slug);
}

export function getAllBlogPostParams(): Array<{ locale: string; slug: string }> {
  return blogPosts.map(({ locale, slug }) => ({ locale, slug }));
}
