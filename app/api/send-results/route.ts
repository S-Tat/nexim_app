import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import type { AnalyzeResponse } from "@/lib/analyze-client";
import {
  buildResultsEmailHtml,
  getResultsEmailSubject,
} from "@/lib/build-results-email-html";

type SendResultsBody = {
  email?: string;
  marketingOptIn?: boolean;
  locale?: string;
  tier?: string;
  results?: AnalyzeResponse;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidResultsPayload(results: AnalyzeResponse | undefined): results is AnalyzeResponse {
  if (!results || results.mode !== "ai") return false;
  if (results.legalRelocationBlocked === true) {
    return Boolean(results.analysis?.trim());
  }
  return Array.isArray(results.top_countries) && results.top_countries.length > 0;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  let body: SendResultsBody;
  try {
    body = (await req.json()) as SendResultsBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const locale = body.locale?.trim() || "en";
  const tier = body.tier?.trim() || "basic";
  const marketingOptIn = body.marketingOptIn === true;

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (!isValidResultsPayload(body.results)) {
    return NextResponse.json({ error: "Invalid or empty results payload." }, { status: 400 });
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim() || "Nexim <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  const html = buildResultsEmailHtml(body.results, tier, locale);
  const subject = getResultsEmailSubject(locale);

  const tags = [
    { name: "tier", value: tier.slice(0, 50) },
    { name: "locale", value: locale.slice(0, 20) },
    { name: "marketing_opt_in", value: marketingOptIn ? "yes" : "no" },
  ];

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject,
    html,
    tags,
  });

  if (error) {
    console.error("[send-results] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
