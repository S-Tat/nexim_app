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
    slug: "افضل-دول-عائلة-اطفال",
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
    slug: "بهترین-کشور-مهاجرت-خانواده",
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
