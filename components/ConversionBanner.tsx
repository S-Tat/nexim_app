"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { isRtlLocale } from "@/routing";

const SESSION_KEY = "conversion-banner-dismissed";
const SCROLL_THRESHOLD = 0.6;

type BannerProps = {
  articleRef: RefObject<HTMLElement | null>;
};

function ConversionBanner({ articleRef }: BannerProps) {
  const t = useTranslations("conversionBanner");
  const locale = useLocale();
  const rtl = isRtlLocale(locale);
  const [eligible, setEligible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* sessionStorage blocked */
    }

    const articleEl = articleRef.current;
    if (!articleEl) return;

    function getReadProgress(): number {
      const el = articleRef.current;
      if (!el) return 0;

      const rect = el.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = el.offsetHeight;
      if (articleHeight <= 0) return 0;

      const viewportBottom = window.scrollY + window.innerHeight;
      return (viewportBottom - articleTop) / articleHeight;
    }

    function onScroll() {
      if (getReadProgress() >= SCROLL_THRESHOLD) {
        setEligible(true);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [articleRef]);

  function handleClose() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage blocked */
    }
    setDismissed(true);
  }

  if (dismissed || !eligible) return null;

  const rtlClass = rtl ? " rtl:font-arabic" : "";

  return (
    <div
      role="dialog"
      aria-labelledby="conversion-banner-title"
      aria-live="polite"
      dir={rtl ? "rtl" : "ltr"}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#fbbf24]/25 bg-[#030712]/95 px-4 py-4 shadow-[0_-12px_48px_-12px_rgba(251,191,36,0.25)] backdrop-blur-xl md:px-10 md:py-5 print:hidden"
    >
      <div className="relative mx-auto max-w-screen-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label={t("close")}
          className="absolute end-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-nexim-muted transition hover:border-white/30 hover:text-white"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ×
          </span>
        </button>

        <div className="flex flex-col gap-4 pe-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pe-12">
          <div className="min-w-0 flex-1">
            <h2
              id="conversion-banner-title"
              className={`font-display text-base font-semibold text-white md:text-lg${rtlClass}`}
            >
              {t("title")}
            </h2>
            <p className={`mt-1.5 text-sm leading-relaxed text-nexim-muted md:text-base${rtlClass}`}>
              {t("body")}
            </p>
          </div>

          <Link
            href="/"
            className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-6 py-3 text-sm font-bold text-[#030712] shadow-[0_0_28px_-6px_rgba(251,191,36,0.5)] transition hover:brightness-110${rtlClass}`}
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

type LayoutProps = {
  children: ReactNode;
};

export function ArticleConversionLayout({ children }: LayoutProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={articleRef}>
      {children}
      <ConversionBanner articleRef={articleRef} />
    </div>
  );
}
