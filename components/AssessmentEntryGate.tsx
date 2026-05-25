"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { AssessmentWizard } from "@/components/AssessmentWizard";
import {
  NEXIM_RESULT_TIER_KEY,
  NEXIM_STRATEGY_RESULT_KEY,
} from "@/lib/assessment-storage";
import { highestPaidTier } from "@/lib/nexim-payment-gate";

type CountryOption = { code: string; name: string };

type Props = {
  countryOptions: CountryOption[];
};

function hasRenderableResult(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw) as {
      top_countries?: unknown;
      legalRelocationBlocked?: boolean;
      analysis?: string | null;
    };
    return (
      parsed.legalRelocationBlocked === true ||
      (Array.isArray(parsed.top_countries) && parsed.top_countries.length > 0) ||
      (typeof parsed.analysis === "string" && parsed.analysis.trim().length > 0)
    );
  } catch {
    return false;
  }
}

function AssessmentEntryGateInner({ countryOptions }: Props) {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [entryRedirectChecked, setEntryRedirectChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setEntryRedirectChecked(true);
      return;
    }
    try {
      const urlTier = searchParams.get("tier");
      const paid = highestPaidTier();

      if (urlTier === "professional" || paid === "professional") {
        const storedResultTier = sessionStorage.getItem(NEXIM_RESULT_TIER_KEY);
        if (storedResultTier !== "professional") {
          sessionStorage.removeItem(NEXIM_STRATEGY_RESULT_KEY);
          sessionStorage.removeItem(NEXIM_RESULT_TIER_KEY);
        }
      }

      const tier = sessionStorage.getItem(NEXIM_RESULT_TIER_KEY);
      const raw = sessionStorage.getItem(NEXIM_STRATEGY_RESULT_KEY);
      if (
        (tier === "basic" || tier === "professional" || tier === "lite") &&
        raw &&
        hasRenderableResult(raw)
      ) {
        router.replace({ pathname: "/result" });
        return;
      }
    } catch {
      /* ignore */
    }
    setEntryRedirectChecked(true);
  }, [router, searchParams]);

  if (!entryRedirectChecked) {
    return (
      <div className="mx-auto flex min-h-[40vh] items-center justify-center bg-[#030712] px-6 text-nexim-muted">
        <p className="text-sm">{t("loadingData")}</p>
      </div>
    );
  }

  return <AssessmentWizard countryOptions={countryOptions} />;
}

export function AssessmentEntryGate({ countryOptions }: Props) {
  const t = useTranslations("dashboard");
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[40vh] items-center justify-center bg-[#030712] px-6 text-nexim-muted">
          <p className="text-sm">{t("loadingData")}</p>
        </div>
      }
    >
      <AssessmentEntryGateInner countryOptions={countryOptions} />
    </Suspense>
  );
}
