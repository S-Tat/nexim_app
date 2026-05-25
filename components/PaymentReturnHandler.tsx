"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { markTierPaid, getActiveTier } from "@/lib/nexim-payment-gate";
import type { PaidPlanTier } from "@/lib/assessment-storage";
import { useTranslations } from "next-intl";

type Props = {
  children: React.ReactNode;
};

/** After Stripe redirect, verify Checkout Session and unlock the paid tier in sessionStorage. */
export function PaymentReturnHandler({ children }: Props) {
  const t = useTranslations("checkout");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const ran = useRef(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (ran.current) return;
    const checkout = searchParams.get("checkout");
    const sessionId = searchParams.get("session_id");
    if (checkout !== "success" || !sessionId) return;

    const verifyKey = `nexim-stripe-verified-${sessionId}`;
    if (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(verifyKey)
    ) {
      ran.current = true;
      const active = getActiveTier();
      router.replace(
        `${pathname}${active ? `?tier=${encodeURIComponent(active)}` : ""}`,
      );
      return;
    }

    ran.current = true;
    setUnlocking(true);

    void (async () => {
      let paidTier: PaidPlanTier | null = null;
      try {
        const res = await fetch(
          `/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`,
        );
        const data = (await res.json()) as { tier?: PaidPlanTier; ok?: boolean };
        if (res.ok && (data.tier === "basic" || data.tier === "professional")) {
          markTierPaid(data.tier);
          paidTier = data.tier;
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(verifyKey, "1");
          }
        }
      } finally {
        router.replace(
          `${pathname}${
            paidTier != null
              ? `?tier=${encodeURIComponent(paidTier)}`
              : ""
          }`,
        );
        setUnlocking(false);
      }
    })();
  }, [searchParams, router, pathname]);

  if (unlocking) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-[#030712] px-6 text-sm text-nexim-muted">
        {t("unlockingAfterPay")}
      </div>
    );
  }

  return <>{children}</>;
}
