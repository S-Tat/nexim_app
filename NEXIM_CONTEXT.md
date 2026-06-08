# NEXIM.WORLD — Контекст проекта для AI ассистента

## Что такое Nexim

Nexim (nexim.world) — это AI-платформа которая помогает людям выбрать страну для переезда.
Пользователь заполняет анкету → Gemini AI анализирует данные → выдаёт персональные рекомендации по странам с процентами совпадения, визовой информацией, преимуществами и рисками.

Основатель: Сергей (username на Product Hunt: Nexim.world)

---

## Технический стек

| Компонент | Технология |
|-----------|-----------|
| Фреймворк | Next.js 14 (App Router) |
| Хостинг | Vercel |
| База данных | Supabase (PostgreSQL) |
| AI | Google Gemini API (модель: gemini-2.5-flash) |
| Платежи | Stripe |
| Email | Resend (домен: noreply@nexim.world) |
| Домен | Ionos |
| IDE | Cursor |

---

## Три тарифа

| Тариф | Цена | Описание |
|-------|------|----------|
| Лайт | $0 | 3 вопроса, 3 страны бесплатно |
| Базовый | $10 | 8 параметров, визовый гид |
| Про | $20 | 18 вопросов, налоги, документы, пошаговый план |

---

## Языки сайта (7 языков)

- 🇷🇺 Русский → /ru
- 🇬🇧 Английский → /en
- 🇩🇪 Немецкий → /de
- 🇸🇦 Арабский → /ar
- 🇮🇷 Фарси → /fa
- 🇨🇳 Китайский → /zh
- 🇮🇳 Хинди → /hi

---

## Структура проекта

```
nexim_app/
├── app/
│   ├── [lang]/
│   │   ├── page.tsx              — главная страница языка
│   │   ├── blog/
│   │   │   ├── page.tsx          — список статей блога
│   │   │   └── [slug]/page.tsx   — страница статьи
│   │   ├── guides/
│   │   │   ├── page.tsx          — список гайдов
│   │   │   └── [country]/[profession]/page.tsx — гайд
│   │   ├── questionnaire/        — анкета
│   │   ├── result/               — страница результатов
│   │   ├── privacy/              — политика конфиденциальности
│   │   ├── cookie-policy/        — политика cookie
│   │   ├── terms/                — условия использования
│   │   └── unsubscribe/          — страница отписки
│   └── api/
│       ├── analyze/route.ts      — основной AI анализ (Gemini)
│       └── send-results/route.ts — отправка email (Resend)
├── lib/
│   ├── gemini-analysis.ts        — логика Gemini (PRODUCTION_GEMINI_MODEL = gemini-2.5-flash)
│   ├── build-results-email-html.ts — шаблоны писем
│   └── seo-guides-catalog.ts     — данные для гайдов
├── components/
│   ├── ConversionBanner.tsx      — баннер после 60% прокрутки
│   ├── CookieBanner.tsx          — баннер cookie
│   └── GuideFormattedContent.tsx — форматирование текста гайдов
├── scripts/
│   └── generate-guides.ts        — скрипт генерации 1400 гайдов
└── public/
    ├── sitemap.xml
    └── robots.txt
```

---

## Что сделано (июнь 2026)

### SEO:
- ✅ Meta теги на 7 языков в layout.tsx
- ✅ Sitemap.xml (автогенерация Next.js)
- ✅ Robots.txt (запрет индексации /_next/static/)
- ✅ Google Search Console подключён, sitemap отправлен
- ✅ hreflang теги для всех 7 языков

### Контент:
- ✅ Блог — 5+ статей на всех 7 языках
  - "Куда переехать семье с детьми"
  - "IT специалист в Германии"
  - "Инженер в Португалии"
  - "Врач в Канаде"
  - "Финансист в ОАЭ"
- ✅ 998+ гайдов в Supabase (10 стран × 20 профессий × 7 языков)
- ✅ Страница гайдов в меню навигации
- ✅ Конверсионный баннер (появляется после 60% прокрутки)

### Email воронка:
- ✅ Форма отправки результатов на email (на всех тарифах)
- ✅ 3 разных письма: Лайт (→ $10), Базовый (→ $20), Про (→ поделиться)
- ✅ Кнопка "Поделиться с другом" в каждом письме
- ✅ Страница отписки /[lang]/unsubscribe
- ✅ Resend домен nexim.world верифицирован

### Юридика:
- ✅ Cookie баннер на 7 языков
- ✅ Privacy Policy на 7 языков (включая раздел про email)
- ✅ Terms & Conditions на 7 языков
- ✅ Cookie Policy на 7 языков

### Инфраструктура:
- ✅ Gemini API — платный Tier 1
- ✅ Supabase — Free Plan (обновить до Pro перед Product Hunt)
- ✅ Vercel — деплой автоматический через GitHub

---

## Переменные среды (Vercel)

```
GOOGLE_GENERATIVE_AI_API_KEY  — ключ Gemini API
NEXT_PUBLIC_SUPABASE_URL      — URL Supabase
SUPABASE_SERVICE_ROLE_KEY     — ключ Supabase
STRIPE_SECRET_KEY             — ключ Stripe
RESEND_API_KEY                — ключ Resend
RESEND_FROM_EMAIL             — Nexim <noreply@nexim.world>
```

---

## Supabase таблицы

```sql
-- Таблица гайдов
guides (
  id uuid primary key,
  country text,      -- например "germany"
  profession text,   -- например "it-software"
  lang text,         -- например "ru"
  title text,
  content text,
  slug text,
  created_at timestamp
)
```

---

## Страны в гайдах (10 стран)

Germany, USA, UAE, Spain, Canada, Japan, Portugal, UK, Australia, New Zealand

## Профессии в гайдах (20 профессий)

IT/Software, Data Science, Medicine, Nursing, Education, Engineering,
Design, Marketing/PR, Sales/Business, Product Management, Finance,
Entrepreneurship, HR, Construction, Hospitality, Logistics, Legal,
Creative/Arts, Science, Other

---

## Что планируется

### Срочно:
- [ ] Изменить модель в lib/gemini-analysis.ts с gemini-1.5-flash-latest на gemini-2.5-flash
- [ ] Обновить Supabase до Pro ($25/мес) перед Product Hunt
- [ ] Третий проход генерации гайдов (сейчас 998 из 1400)

### Продвижение:
- [ ] Запуск на Product Hunt (аккаунт создан: Nexim.world)
- [ ] Reddit — r/digitalnomad, r/IWantOut, r/expats
- [ ] Telegram — русскоязычные каналы про эмиграцию
- [ ] Email рассылка (когда наберётся 50+ подписчиков)

### Улучшения сайта:
- [ ] Страница оплаты — добавить что входит в каждый тариф
- [ ] Bing Webmaster Tools
- [ ] Добавить итальянский язык (Италия в топе посетителей!)
- [ ] Улучшить страницу оплаты Pro

---

## Важные ссылки

- Сайт: https://nexim.world
- Vercel: vercel.com (проект: nexim-app)
- Supabase: supabase.com (проект: S-Tat's Project)
- Google Search Console: search.google.com/search-console
- Google AI Studio: aistudio.google.com (проект: nexim)
- Resend: resend.com (домен: nexim.world верифицирован)
- Product Hunt: producthunt.com (аккаунт: Nexim.world)
- Домен: Ionos (nexim.world)

---

## Известные проблемы

1. **Модель Gemini** — в lib/gemini-analysis.ts стоит gemini-1.5-flash-latest 
   которая устарела. Нужно заменить на gemini-2.5-flash.
   
2. **Dedup система** — в app/api/analyze/route.ts есть защита от дублей 
   (DEDUP_WINDOW_MS = 5_000 мс). При тестировании одних и тех же ответов 
   подряд появляется "Server busy". Реальных пользователей не затрагивает.

3. **Supabase Free** — проект паузится раз в неделю при отсутствии активности.
   Нужно периодически заходить и возобновлять или перейти на Pro.

---

## Как помочь в новом чате

Скопируй этот файл и вставь в начало нового разговора со словами:
"Вот контекст моего проекта — помоги мне с [задача]"
```
