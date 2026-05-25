/**
 * Client-side wrapper for POST /api/analyze (v2 — strategy-based).
 * The API key is NEVER included here — it lives only on the server.
 */

export type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  deadline: string;
};

export type RoadmapTask = {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium";
  deadline_days: number;
};

export type CountryMatch = {
  country_code: string;
  country_name: string;
  match_score: number;
  visa_name: string;
  pros: string[];
  cons: string[];
  gap_analysis: string[];
  roadmap: RoadmapStep[];
  document_table?: string;
  weak_points?: string[];
};

export type AnalyzeResponse = {
  mode: "ai";
  analysis: string;
  top_countries: CountryMatch[];
  cached?: boolean;
  error?: string;
  legalRelocationBlocked?: boolean;
  /** Basic/Pro: unresolved legal violations — show extra warning while still showing matches */
  legalIssuesWarning?: boolean;
  /** Pro tier: expert-only blocks from Gemini */
  tax_legal_audit?: string;
  job_market_overview?: string;
  document_checklist?: string;
};

export type AnalyzeRequest = {
  answers: Record<string, unknown>;
  locale: string;
  tier: string;
};

export async function requestAnalysis(
  opts: AnalyzeRequest,
): Promise<AnalyzeResponse> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      details?: string;
    };
    const msg =
      body.error ?? `Analysis request failed (${res.status})`;
    const withDetails =
      body.details && body.details !== body.error
        ? `${msg} — ${body.details}`
        : msg;
    throw new Error(withDetails);
  }

  return res.json() as Promise<AnalyzeResponse>;
}
