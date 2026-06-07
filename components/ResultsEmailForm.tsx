"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { AnalyzeResponse } from "@/lib/analyze-client";
import { isRtlLocale } from "@/routing";

type Props = {
  data: AnalyzeResponse;
  tier: string;
};

export function ResultsEmailForm({ data, tier }: Props) {
  const t = useTranslations("result");
  const locale = useLocale();
  const rtl = isRtlLocale(locale);
  const rtlClass = rtl ? " rtl:font-arabic" : "";

  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus("error");
      setErrorMessage(t("emailInvalid"));
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          marketingOptIn,
          locale,
          tier,
          results: data,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? t("emailError"));
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("emailError"));
    }
  }

  return (
    <div
      className="sticky top-0 z-50 -mx-6 mb-8 border-b border-[#fbbf24]/30 bg-gradient-to-r from-[#030712]/95 via-[#111827]/95 to-[#030712]/95 px-6 py-5 shadow-[0_8px_32px_-8px_rgba(251,191,36,0.35)] backdrop-blur-md md:-mx-10"
      dir={rtl ? "rtl" : "ltr"}
    >
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-screen-xl flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label
              htmlFor="results-email"
              className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-nexim-muted${rtlClass}`}
            >
              {t("emailLabel")}
            </label>
            <input
              id="results-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
              disabled={status === "loading" || status === "success"}
              className={`w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#fbbf24]/50 focus:ring-2 focus:ring-[#fbbf24]/20 disabled:opacity-60${rtlClass}`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-6 py-3 text-sm font-bold text-[#030712] shadow-[0_0_28px_-6px_rgba(251,191,36,0.5)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60${rtlClass}`}
          >
            {status === "loading" ? t("emailSending") : t("emailSubmit")}
          </button>
        </div>

        <label className={`flex items-start gap-3 text-sm text-nexim-muted${rtlClass}`}>
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(event) => setMarketingOptIn(event.target.checked)}
            disabled={status === "loading" || status === "success"}
            className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-black/30 text-[#fbbf24] focus:ring-[#fbbf24]/40"
          />
          <span>{t("emailMarketingOptIn")}</span>
        </label>

        {status === "success" ? (
          <p className={`text-sm font-medium text-[#fbbf24]${rtlClass}`} role="status">
            {t("emailSuccess")}
          </p>
        ) : null}

        {status === "error" && errorMessage ? (
          <p className={`text-sm font-medium text-red-300${rtlClass}`} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
