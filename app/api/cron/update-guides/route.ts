import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";
import type { GuideRow } from "@/lib/guides-repository";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GEMINI_MODEL = "gemini-1.5-pro";
const TARGET_PROFESSIONS = ["medicine", "entrepreneurship"] as const;

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const auth = req.headers.get("authorization")?.trim();
  return auth === secret || auth === `Bearer ${secret}`;
}

function getGeminiApiKey(): string | undefined {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim()
  );
}

const MAKE_IT_IN_GERMANY_RSS_URL =
  "https://www.make-it-in-germany.com/en/service/rss";
const IMMIGRATION_NEW_ZEALAND_RSS_URL =
  "https://www.immigration.govt.nz/about-us/media-centre/news-rss";
const RSS_FETCH_TIMEOUT_MS = 20_000;
const RSS_MAX_ITEMS_PER_SOURCE = 5;

function parseRssXmlToNews(xml: string, maxItems: number): string[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const news: string[] = [];

  for (const item of items.slice(0, maxItems)) {
    const title = extractRssTag(item, "title");
    const description = extractRssTag(item, "description");
    if (!title && !description) continue;

    const body = [title, description].filter(Boolean).join(" — ");
    const cleaned = stripHtml(decodeXmlEntities(body)).replace(/\s+/g, " ").trim();
    if (cleaned) news.push(cleaned);
  }

  return news;
}

async function fetchRssNewsFromSource(
  url: string,
  sourceLabel: string,
): Promise<string[]> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "NeximGuideUpdater/1.0",
      },
      signal: AbortSignal.timeout(RSS_FETCH_TIMEOUT_MS),
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(
        "[cron/update-guides] RSS fetch failed:",
        sourceLabel,
        response.status,
        response.statusText,
        url,
      );
      return [];
    }

    const xml = await response.text();
    return parseRssXmlToNews(xml, RSS_MAX_ITEMS_PER_SOURCE);
  } catch (err) {
    console.error(
      "[cron/update-guides] RSS fetch error:",
      sourceLabel,
      err instanceof Error ? err.message : err,
      url,
    );
    return [];
  }
}

/** Fetch latest headlines from official migration RSS feeds (Germany + New Zealand). */
async function fetchOfficialNews(): Promise<string[]> {
  const results = await Promise.allSettled([
    fetchRssNewsFromSource(MAKE_IT_IN_GERMANY_RSS_URL, "Make it in Germany"),
    fetchRssNewsFromSource(
      IMMIGRATION_NEW_ZEALAND_RSS_URL,
      "Immigration New Zealand",
    ),
  ]);

  const news: string[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      news.push(...result.value);
      continue;
    }

    console.error(
      "[cron/update-guides] RSS source rejected:",
      result.reason instanceof Error ? result.reason.message : result.reason,
    );
  }

  return news.slice(0, RSS_MAX_ITEMS_PER_SOURCE * 2);
}

function extractRssTag(block: string, tag: string): string {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"),
  );
  if (!match?.[1]) return "";

  const raw = match[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/i);
  return (cdata?.[1] ?? raw).trim();
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, " ").trim();
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

async function fetchGuidesByProfessions(
  professions: readonly string[],
): Promise<GuideRow[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .in("profession", [...professions]);

  if (error) {
    throw new Error(`Failed to fetch guides: ${error.message}`);
  }

  return data ?? [];
}

function buildGeminiPrompt(guide: GuideRow, newsItems: string[]): string {
  const newsBlock = newsItems.map((item, i) => `${i + 1}. ${item}`).join("\n");

  return `You are updating a relocation guide for profession "${guide.profession}" in country "${guide.country}" (language: ${guide.lang}).

Current guide content:
---
${guide.content}
---

Recent migration news:
${newsBlock}

Проанализируй новость. Если она меняет правила для этой профессии, верни обновленный markdown-текст гайда. Если нет, верни 'NO_CHANGE'`;
}

async function requestGuideUpdateFromGemini(
  guide: GuideRow,
  newsItems: string[],
  apiKey: string,
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  const result = await model.generateContent(buildGeminiPrompt(guide, newsItems));
  return result.response.text().trim();
}

function isNoChange(response: string): boolean {
  const normalized = response.trim();
  return normalized === "NO_CHANGE" || normalized.startsWith("NO_CHANGE");
}

function guidePagePath(guide: GuideRow): string {
  return `/${guide.lang}/guides/${guide.country}/${guide.profession}`;
}

async function updateGuideContent(guide: GuideRow, content: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("guides")
    .update({ content })
    .eq("id", guide.id);

  if (error) {
    throw new Error(`Failed to update guide ${guide.id}: ${error.message}`);
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured." },
      { status: 503 },
    );
  }

  try {
    const newsItems = await fetchOfficialNews();
    const guides = await fetchGuidesByProfessions(TARGET_PROFESSIONS);

    const summary = {
      processed: guides.length,
      updated: 0,
      skipped: 0,
      errors: [] as string[],
      paths: [] as string[],
    };

    for (const guide of guides) {
      try {
        const geminiResponse = await requestGuideUpdateFromGemini(
          guide,
          newsItems,
          apiKey,
        );

        if (isNoChange(geminiResponse)) {
          summary.skipped += 1;
          continue;
        }

        await updateGuideContent(guide, geminiResponse);
        const path = guidePagePath(guide);
        revalidatePath(path);
        summary.updated += 1;
        summary.paths.push(path);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown guide update error";
        summary.errors.push(`${guide.id}: ${message}`);
      }
    }

    return NextResponse.json({ ok: true, ...summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cron job failed";
    console.error("[cron/update-guides]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
