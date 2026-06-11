import { createServerClient } from "@/lib/supabase";
import type { Database } from "@/lib/supabase-types";

export type GuideRow = Database["public"]["Tables"]["guides"]["Row"];

export async function fetchGuideByParams(
  lang: string,
  country: string,
  profession: string,
): Promise<GuideRow | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("lang", lang)
    .eq("country", country)
    .eq("profession", profession)
    .maybeSingle();

  if (error) {
    console.error("[guides] fetch error:", error.message);
    return null;
  }

  return data;
}

export async function guideExists(
  lang: string,
  country: string,
  profession: string,
): Promise<boolean> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("guides")
    .select("id")
    .eq("lang", lang)
    .eq("country", country)
    .eq("profession", profession)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to check guide existence: ${error.message}`);
  }

  return Boolean(data);
}

export async function insertGuide(row: Database["public"]["Tables"]["guides"]["Insert"]) {
  const supabase = createServerClient();
  const { error } = await supabase.from("guides").insert(row);

  if (error) {
    throw new Error(`Failed to insert guide: ${error.message}`);
  }
}

export type GuideSitemapEntry = {
  lang: string;
  country: string;
  profession: string;
  created_at: string;
};

export async function fetchAllGuideSitemapEntries(): Promise<GuideSitemapEntry[]> {
  try {
    const supabase = createServerClient();
    const pageSize = 1000;
    const all: GuideSitemapEntry[] = [];
    let from = 0;

    for (;;) {
      const { data, error } = await supabase
        .from("guides")
        .select("lang, country, profession, created_at")
        .order("created_at", { ascending: true })
        .range(from, from + pageSize - 1);

      if (error) {
        console.error("[guides] sitemap fetch error:", error.message);
        break;
      }

      if (!data || data.length === 0) break;

      all.push(...data);

      if (data.length < pageSize) break;
      from += pageSize;
    }

    return all;
  } catch {
    return [];
  }
}