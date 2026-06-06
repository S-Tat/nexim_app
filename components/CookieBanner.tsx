"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isRtlLocale } from "@/routing";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const locale = useLocale();
  const rtl = isRtlLocale(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function saveChoice(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private browsing / blocked storage */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-message"
      aria-live="polite"
      dir={rtl ? "rtl" : "ltr"}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/[0.1] bg-[#030712]/95 px-4 py-4 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl md:px-10 md:py-5 print:hidden"
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p
          id="cookie-banner-message"
          className={`text-sm leading-relaxed text-nexim-text sm:max-w-3xl${rtl ? " rtl:font-arabic" : ""}`}
        >
          {t("message")}
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveChoice("declined")}
            className={`rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-nexim-muted transition hover:border-white/35 hover:text-white${rtl ? " rtl:font-arabic" : ""}`}
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => saveChoice("accepted")}
            className={`rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-5 py-2.5 text-sm font-bold text-[#030712] shadow-[0_0_24px_-6px_rgba(251,191,36,0.45)] transition hover:brightness-110${rtl ? " rtl:font-arabic" : ""}`}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
