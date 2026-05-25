/**
 * Rate-limit / demo fallback payloads (no live Gemini).
 * Keep copy in sync with `CountryMatch` / `GeminiResult` in `gemini-analysis.ts`.
 */
import type { CountryMatch, GeminiResult, RoadmapStep } from "./gemini-analysis";

function roadmap(steps: [string, string, string][]): RoadmapStep[] {
  return steps.map(([title, description, deadline], i) => ({
    step: i + 1,
    title,
    description,
    deadline,
  }));
}

function mockEnglish(tier: string): GeminiResult {
  const isPro = tier === "professional";
  const isExtended = isPro;

  const docTable = isExtended
    ? `| Document | Required | Notes |
|---|---|---|
| Valid Passport (≥6 mo) | ✅ Required | Must not expire during residency process |
| Birth Certificate + Apostille | ✅ Required | With certified translation |
| Diploma / Degree Certificate | ✅ Required | If required: local legalization and certified translation (apostille) |
| Criminal Record Certificate | ✅ Required | From country of residence, apostilled |
| Proof of Income / Bank Statements | ✅ Required | Last 3 months, ≥ €760/mo for PT |
| Health Insurance | ✅ Required | Valid for Schengen + destination country |
| CV / LinkedIn profile | 📋 Recommended | Increases visa officer confidence |
| Employment Contract or Offer | 📋 Recommended | Or freelance contracts (D8 / Nomad visa) |`
    : undefined;

  const weakPoints = isExtended
    ? [
        "English level below B2 reduces eligibility for Fast-Track work permits in UAE and Portugal",
        "Savings under $15,000 may not meet the consulate's financial threshold for Portugal D7 visa",
        "Diploma legalization is not confirmed — complete apostille and certified translation if required",
        "No job offer or client contracts on file — critical for Employment visa track",
      ]
    : undefined;

  const top_countries: CountryMatch[] = [
    {
      country_code: "PT",
      country_name: "Portugal",
      match_score: 87,
      visa_name: "D7 Passive Income Visa / Digital Nomad Visa",
      pros: [
        "EU residency with path to citizenship in 5 years",
        "Low cost of living relative to Western Europe",
        "Warm climate, English widely spoken in cities",
        "Non-Habitual Resident (NHR) tax regime — flat 20% on Portuguese income",
      ],
      cons: [
        "Bureaucracy can be slow — SEF appointments backed up",
        "Growing rental prices in Lisbon and Porto",
      ],
      gap_analysis: [
        "Income proof: need ≥€760/mo stable remote income or passive income",
        "Criminal record certificate (apostilled) from country of residence",
        "Health insurance valid for Schengen area before visa appointment",
      ],
      roadmap: roadmap([
        ["Gather documents", "Apostille birth certificate, diploma, criminal record. Get certified translations.", "Month 1–2"],
        ["Open Portuguese bank account", "NovoBanco or Caixa Geral — some banks allow remote opening.", "Month 2"],
        ["Book SEF appointment", "Schedule via AMA portal immediately — slots fill quickly.", "Month 2–3"],
        ["Apply for D7 / Digital Nomad visa", "Submit at Portuguese consulate in your country of residence.", "Month 3–4"],
        ["Relocate and register", "Register at local Junta de Freguesia within 30 days of arrival.", "Month 5"],
      ]),
      document_table: docTable,
      weak_points: weakPoints,
    },
    {
      country_code: "AE",
      country_name: "United Arab Emirates",
      match_score: 81,
      visa_name: "Freelancer / Remote Work Visa (1-year renewable)",
      pros: [
        "0% personal income tax",
        "World-class infrastructure and safety",
        "Easy company setup in free zones (Sharjah, Ras Al Khaimah)",
        "Multicultural expat community — 90% expat population",
      ],
      cons: [
        "High cost of living in Dubai and Abu Dhabi",
        "Visa tied to employment or freelance license",
      ],
      gap_analysis: [
        "Freelance license needed: ~$1,500–3,000/year via TECOM or IFZA",
        "Proof of income ≥$3,000/mo or equivalent business turnover",
        "Valid health insurance — mandatory for visa",
      ],
      roadmap: roadmap([
        ["Choose free zone", "Compare IFZA, TECOM, RAKEZ based on your profession and budget.", "Month 1"],
        ["Apply for freelance licence", "Submit online; typically approved within 2–4 weeks.", "Month 1–2"],
        ["Obtain Entry Permit", "Apply through the free zone once licence is issued.", "Month 2"],
        ["Emirates ID and visa stamping", "Medical check + biometrics in UAE after entry.", "Month 2–3"],
        ["Open bank account", "Mashreq Neo or Emirates NBD; may require salary transfer proof.", "Month 3"],
      ]),
      document_table: docTable,
    },
    {
      country_code: "ES",
      country_name: "Spain",
      match_score: 74,
      visa_name: "Digital Nomad Visa (Startup Act 2023)",
      pros: [
        "EU residency with access to all 27 Schengen countries",
        "Beckham Law: flat 24% tax for first 6 years for qualifying expats",
        "Rich culture, excellent healthcare, Mediterranean climate",
        "English proficiency growing fast in major cities",
      ],
      cons: [
        "Minimum income requirement: €2,160/mo (for digital nomad visa)",
        "Spanish language required for longer-term integration",
        "Bureaucratic process can take 3–5 months",
      ],
      gap_analysis: [
        "Income: need ≥200% Spanish minimum wage (~€2,160/mo) from non-Spanish clients",
        "Criminal record certificate (apostilled) from home country",
        "Proof that employer/clients are located outside Spain",
      ],
      roadmap: roadmap([
        ["Prepare income documentation", "3 months bank statements + client contracts confirming non-Spanish income.", "Month 1"],
        ["Obtain criminal record + apostille", "From home country. Translation to Spanish required.", "Month 1–2"],
        ["Book consulate appointment", "At Spanish consulate in your country of residence.", "Month 2"],
        ["Submit DNV application", "Complete online form + in-person appointment with documents.", "Month 2–3"],
        ["Arrive and register (Empadronamiento)", "Register at local Ayuntamiento within 30 days of moving.", "Month 4–5"],
      ]),
      document_table: docTable,
    },
  ];

  const analysis = isExtended
    ? "Full expert summary: Portugal (D7 / nomad routes), UAE (freelancer / zero personal income tax), and Spain (Digital Nomad Visa) align best with remote-income and mobility goals. Next steps: confirm income documentation, apostilles, and consulate timelines before filing."
    : "Based on your profile, Portugal, UAE, and Spain are strong initial matches. Portugal offers a clear EU residency path via D7 or digital nomad programmes; the UAE suits tax efficiency and fast freelance setup; Spain fits remote earners with non-Spanish client income. Upgrade to Pro for tax and labour-market depth plus a full document matrix.";

  const taxLegalAudit = isExtended
    ? `### Portugal
| Income band (illustrative) | Notes |
| --- | --- |
| Progressive IRS above personal allowance | Confirm current rates; tax residency often after 183 days |
| Non-wage income | Treat digital-nomad / passive routes separately |

### UAE
| Income band (illustrative) | Notes |
| --- | --- |
| Personal income tax | Typically 0% for individuals; focus on licence and compliance costs |
| Corporate / free-zone | Dependent on structure — validate with local adviser |

### Spain
| Income band (illustrative) | Notes |
| --- | --- |
| General employment bands | Beckham-style programmes evolve; validate days-in-country |
| Self-employment | Social contributions and IRPF schedules differ |

### Germany
| Income band (illustrative) | Notes |
| --- | --- |
| Progressive ESt | Church tax and solidarity surcharge may apply by Bundesland |
| Skilled work / Blue Card | Work authorisation ties to permit category |

### Italy
| Income band (illustrative) | Notes |
| --- | --- |
| IRPEF regional/municipal surcharges | Highly location-dependent |
| Self-employment / partita IVA | Flat-tax options for small businesses may exist — verify eligibility`
    : undefined;

  const jobMarketOverview = isExtended
    ? `### Portugal
- IT and product roles; align narrative with the user's education level and declared specialty.

### UAE
- Tech and consulting; freelancing via free-zone licences remains common for independent experts.

### Spain
- Barcelona and Madrid hire internationally; regulated professions need local credentials and language.

### Germany
- Blue Card and shortage occupations for STEM; recognition of foreign degrees shapes pathways.

### Italy
- North stronger for engineering and manufacturing; services and tourism cluster in major metros.`
    : undefined;

  const documentChecklist = isExtended
    ? `**Identity & civil status**
- Valid passport (6+ months), birth certificate with apostille + sworn translation where required.

**Education & profession**
- Diplomas / transcripts; regulated professions may need nostrification or local equivalence.

**Financial proof**
- Recent bank statements, tax returns, or client contracts matching the declared income path.

**Legal / compliance**
- Criminal record certificate(s) with apostille from relevant jurisdictions.

**Health & insurance**
- Travel/medical insurance meeting consulate and entry rules.

**Localisation**
- Certified translations (PT/ES/EN as required); appointment confirmations for consulates and biometrics.`
    : undefined;

  return {
    mode: "ai",
    analysis,
    top_countries,
    ...(isExtended
      ? {
          tax_legal_audit: taxLegalAudit!,
          job_market_overview: jobMarketOverview!,
          document_checklist: documentChecklist!,
        }
      : {}),
  };
}

function mockRussian(tier: string): GeminiResult {
  const isPro = tier === "professional";
  const isExtended = isPro;

  const docTable = isExtended
    ? `| Документ | Статус | Примечание |
|---|---|---|
| Загранпаспорт (срок ≥ 6 мес.) | Обязательно | Не должен истекать на период оформления ВНЖ |
| Свидетельство о рождении + апостиль | Обязательно | С заверенным переводом |
| Диплом / аттестат | Обязательно | При необходимости — легализация и перевод диплома (апостиль) |
| Справка о несудимости | Обязательно | Из страны проживания, с апостилем |
| Подтверждение дохода / выписки | Обязательно | За 3 месяца, от ~760 €/мес для PT |
| Медицинская страховка | Обязательно | Действует в Шенгене и в стране назначения |
| Резюме / LinkedIn | Рекомендуется | Повышает доверие визового офицера |
| Трудовой договор / оффер | Рекомендуется | Или договоры с клиентами (D8 / nomad) |`
    : undefined;

  const weakPoints = isExtended
    ? [
        "Уровень английского ниже B2 снижает шансы на ускоренные рабочие программы в ОАЭ и Португалии",
        "Накопления менее 15 000 $ могут не дотянуть до порога консульства для визы D7",
        "Легализация диплома не подтверждена — выполните апостиль и перевод при необходимости",
        "Нет оффера или договоров с клиентами — критично для трудовой визовой ветки",
      ]
    : undefined;

  const top_countries: CountryMatch[] = [
    {
      country_code: "PT",
      country_name: "Португалия",
      match_score: 87,
      visa_name: "Виза D7 (пассивный доход) / виза для цифровых кочевников",
      pros: [
        "ВНЖ ЕС с перспективой гражданства через 5 лет",
        "Относительно низкая стоимость жизни для Западной Европы",
        "Тёплый климат, в крупных городах много англоговорящих",
        "Режим NHR — льготное налогообложение доходов в Португалии",
      ],
      cons: [
        "Медленная бюрократия, перегруженные записи в SEF",
        "Рост аренды в Лиссабоне и Порту",
      ],
      gap_analysis: [
        "Доход: нужно подтвердить от ~760 €/мес стабильного удалённого или пассивного дохода",
        "Справка о несудимости с апостилем из страны проживания",
        "Медстраховка по Шенгену и Португалии до записи в консульство",
      ],
      roadmap: roadmap([
        ["Собрать документы", "Апостиль свидетельства о рождении, диплома, справки о несудимости. Заверенные переводы.", "1–2 мес."],
        ["Открыть счёт в банке PT", "NovoBanco, Caixa Geral — часть банков допускает дистанционно.", "2 мес."],
        ["Запись в SEF", "Бронируйте через портал AMA сразу — слоты быстро заканчиваются.", "2–3 мес."],
        ["Подача на D7 / digital nomad", "В консульстве Португалии в стране проживания.", "3–4 мес."],
        ["Переезд и регистрация", "Регистрация в Junta de Freguesia в течение 30 дней после въезда.", "5 мес."],
      ]),
      document_table: docTable,
      weak_points: weakPoints,
    },
    {
      country_code: "AE",
      country_name: "ОАЭ",
      match_score: 81,
      visa_name: "Фриланс / удалённая работа (виза на 1 год, продлевается)",
      pros: [
        "0% подоходного налога с физлиц",
        "Инфраструктура и безопасность мирового уровня",
        "Простая регистрация компании во free zone (Шарджа, РАК и др.)",
        "Мультикультурное сообщество экспатов",
      ],
      cons: [
        "Высокая стоимость жизни в Дубае и Абу-Даби",
        "Виза привязана к работодателю или фриланс-лицензии",
      ],
      gap_analysis: [
        "Нужна фриланс-лицензия: порядка 1 500–3 000 $/год (TECOM, IFZA и др.)",
        "Подтверждение дохода от ~3 000 $/мес или оборота по бизнесу",
        "Медстраховка — обязательное условие визы",
      ],
      roadmap: roadmap([
        ["Выбор free zone", "Сравните IFZA, TECOM, RAKEZ по профессии и бюджету.", "1 мес."],
        ["Заявка на лицензию фрилансера", "Онлайн; обычно 2–4 недели.", "1–2 мес."],
        ["Entry Permit", "Через free zone после выдачи лицензии.", "2 мес."],
        ["Emirates ID и вклейка визы", "Медосмотр и биометрия в ОАЭ после въезда.", "2–3 мес."],
        ["Банковский счёт", "Mashreq Neo, Emirates NBD; могут запросить подтверждение дохода.", "3 мес."],
      ]),
      document_table: docTable,
    },
    {
      country_code: "ES",
      country_name: "Испания",
      match_score: 74,
      visa_name: "Виза цифрового кочевника (Startup Act 2023)",
      pros: [
        "ВНЖ ЕС и доступ в зону Шенгена",
        "Закон Бекхэма: 24% налог для квалифицированных экспатов первые 6 лет",
        "Культура, медицина, средиземноморский климат",
        "Английский в крупных городах всё чаще достаточен на быту",
      ],
      cons: [
        "Порог дохода для DNV: от ~2 160 €/мес",
        "Для долгой интеграции почти неизбежен испанский",
        "Сроки оформления часто 3–5 месяцев",
      ],
      gap_analysis: [
        "Доход: от ~200% МРОТ Испании с клиентов вне Испании (~2 160 €/мес)",
        "Справка о несудимости с апостилем из страны гражданства",
        "Доказательства, что работодатель/клиенты за пределами Испании",
      ],
      roadmap: roadmap([
        ["Документы по доходу", "Выписки за 3 месяца + договоры с клиентами вне Испании.", "1 мес."],
        ["Несудимость + апостиль", "Из страны гражданства; перевод на испанский.", "1–2 мес."],
        ["Запись в консульство", "Консульство Испании в стране проживания.", "2 мес."],
        ["Подача DNV", "Онлайн-форма + личный приём с пакетом.", "2–3 мес."],
        ["Въезд и empadronamiento", "Регистрация по месту жительства в течение 30 дней.", "4–5 мес."],
      ]),
      document_table: docTable,
    },
  ];

  const analysis = isExtended
    ? "Расширенный обзор: Португалия (D7 / кочевники), ОАЭ (фриланс / без подоходного налога для физлиц) и Испания (виза цифрового кочевника) хорошо стыкуются с удалённым доходом. Следующий шаг — сверить документы по доходу, апостили и сроки в консульстве."
    : "По вашему профилю сильные стартовые варианты — Первый обзор: Португалия, ОАЭ и Испания. Pro даёт налоговый и рыночный разбор плюс полную матрицу документов.";

  const taxLegalAudit = isExtended
    ? `### Португалия
| Ориентиры по НДФЛ | Комментарий |
| --- | --- |
| Прогрессивные ставки выше не облагаемого минимума | Резидентство часто после 183 дней; актуальные льготы уточнять |
### ОАЭ
| Ориентиры | Комментарий |
| --- | --- |
| Подоходный с физлиц | Обычно 0%, акцент на лицензии и комплаенс |
### Испания
| IRPF / автономо | Налоги зависят от программы ВНЖ и дней в стране |
### Германия
| ESt + надбавки | Церковный налог и солидарная надбавка зависят от региона |
### Италия
| IRPEF + регион/коммуна | Сильная зависимость от места жительства`
    : undefined;

  const jobMarketOverview = isExtended
    ? `### Португалия
- IT и продукт; учитывайте заявленный уровень образования и специализацию.

### ОАЭ
- Технологии и консалтинг; высокий спрос на квалифицированные кадры в free zone.

### Испания
- Международные кластеры в Барселоне/Мадриде; regulated-профессии требуют местный язык.

### Германия
- Blue Card и shortage-роли для STEM; востребованность зависит от признания диплома.

### Италия
- Северные регионы сильнее по производству и инжинирингу; юг — туризм/логистика.`
    : undefined;

  const documentChecklist = isExtended
    ? `**Личность и гражданство**
- Загранпаспорт (6+ мес.), свидетельство о рождении с апостилем и переводом.

**Образование / профессия**
- Дипломы, транскрипты; регулируемые профессии — нострификация или эквивалент.

**Финансы**
- Выписки, декларации или договоры под заявленный доход.

**Юридическое**
- Справки о несудимости с апостилем.

**Страхование**
- Полис по правилам консульства и въезда.

**Локализация**
- Заверенные переводы; подтверждения записей в консульство.`
    : undefined;

  return {
    mode: "ai",
    analysis,
    top_countries,
    ...(isExtended
      ? {
          tax_legal_audit: taxLegalAudit!,
          job_market_overview: jobMarketOverview!,
          document_checklist: documentChecklist!,
        }
      : {}),
  };
}

export function buildMockGeminiResult(tier: string, locale: string): GeminiResult {
  const base = locale === "ru" ? mockRussian(tier) : mockEnglish(tier);
  let top_countries = [...base.top_countries];

  if (
    (tier === "basic" || tier === "professional") &&
    top_countries.length < 5
  ) {
    const de: CountryMatch = {
      ...top_countries[0]!,
      country_code: "DE",
      country_name: locale === "ru" ? "Германия" : "Germany",
      match_score: 72,
      visa_name: locale === "ru" ? "Blue Card EU / национальная рабочая виза" : "EU Blue Card / national work visa",
    };
    const it: CountryMatch = {
      ...top_countries[1]!,
      country_code: "IT",
      country_name: locale === "ru" ? "Италия" : "Italy",
      match_score: 69,
      visa_name: locale === "ru" ? "Рабочая виза / digital nomad" : "Work visa / digital nomad routes",
    };
    top_countries = [...top_countries, de, it].slice(0, 5);
  }

  const maxCountries = tier === "lite" ? 3 : 5;
  top_countries = top_countries.slice(0, maxCountries).map((c) => {
    if (tier === "lite") return { ...c, roadmap: [] };
    return c;
  });

  let analysis = base.analysis;
  if (tier === "lite") {
    analysis =
      locale === "ru"
        ? `Краткий список: ${top_countries.map((c) => c.country_name).join(", ")}.`
        : `Short list: ${top_countries.map((c) => c.country_name).join(", ")}.`;
  } else if (tier === "basic") {
    analysis =
      locale === "ru"
        ? `Пять стран — краткий обзор виз и общие шаги. ${base.analysis}`
        : `Five countries — brief visa guide and general recommendations. ${base.analysis}`;
  }

  if (tier === "professional") {
    return {
      mode: "ai",
      analysis,
      top_countries,
      tax_legal_audit: base.tax_legal_audit,
      job_market_overview: base.job_market_overview,
      document_checklist: base.document_checklist,
    };
  }

  return { mode: "ai", analysis, top_countries };
}
