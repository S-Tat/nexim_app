"use client";

import { useState, useTransition } from "react";
import {
  submitFeedback,
  type FeedbackRating,
} from "@/lib/actions/submit-feedback";

type Props = {
  pageUrl: string;
  className?: string;
};

export function FeedbackForm({ pageUrl, className = "" }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleFeedback(rating: FeedbackRating) {
    startTransition(async () => {
      await submitFeedback(rating, pageUrl);
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <p className={`text-sm text-amber-100/90 ${className}`}>
        Спасибо за ваш отзыв!
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="mb-3 text-sm text-nexim-muted">Был ли гайд полезен?</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => handleFeedback("helpful")}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:border-[#fbbf24]/45 hover:bg-[#fbbf24]/10 disabled:opacity-50"
        >
          <span aria-hidden>👍</span>
          Полезно
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => handleFeedback("not_helpful")}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:border-[#fbbf24]/45 hover:bg-[#fbbf24]/10 disabled:opacity-50"
        >
          <span aria-hidden>👎</span>
          Не полезно
        </button>
      </div>
    </div>
  );
}
