import type { PlanTier } from "@/lib/assessment-storage";

export const NEXIM_PAYMENT_GATE_KEY = "nexim-payment-gate";
export const NEXIM_ACTIVE_TIER_KEY = "nexim-active-tier";
export const NEXIM_SELECTED_TIER_KEY = "nexim-selected-tier";

type PaymentGateFile = {
  tiers: Partial<Record<PlanTier, true>>;
};

const TIER_PRIORITY: Record<PlanTier, number> = {
  lite: 0,
  basic: 1,
  professional: 2,
};

function emptyGate(): PaymentGateFile {
  return { tiers: {} };
}

function readGate(): PaymentGateFile {
  if (typeof window === "undefined") return emptyGate();
  try {
    const raw = window.sessionStorage.getItem(NEXIM_PAYMENT_GATE_KEY);
    if (!raw) return emptyGate();
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object" || !("tiers" in data)) return emptyGate();
    const tiersIn = (data as { tiers?: Record<string, unknown> }).tiers ?? {};
    const tiers: Partial<Record<PlanTier, true>> = {};
    if (tiersIn.lite === true) tiers.lite = true;
    if (tiersIn.basic === true) tiers.basic = true;
    if (tiersIn.professional === true) tiers.professional = true;
    return { tiers };
  } catch {
    return emptyGate();
  }
}

function writeGate(g: PaymentGateFile) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(NEXIM_PAYMENT_GATE_KEY, JSON.stringify(g));
  } catch {
    /* ignore */
  }
}

export function isTierPaid(tier: PlanTier): boolean {
  if (tier === "lite") return true;
  return Boolean(readGate().tiers[tier]);
}

export function markTierPaid(tier: PlanTier) {
  const g = readGate();
  g.tiers[tier] = true;
  writeGate(g);
  setActiveTier(tier);
}

export function highestPaidTier(): PlanTier | null {
  const tiers = readGate().tiers;
  let best: PlanTier | null = null;
  (Object.keys(tiers) as PlanTier[]).forEach((t) => {
    if (!tiers[t]) return;
    if (!best || TIER_PRIORITY[t] > TIER_PRIORITY[best]) best = t;
  });
  return best;
}

function readActiveTier(): PlanTier | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(NEXIM_ACTIVE_TIER_KEY);
    if (raw === "lite" || raw === "basic" || raw === "professional") return raw;
    const persisted = window.localStorage.getItem(NEXIM_SELECTED_TIER_KEY);
    if (persisted === "lite" || persisted === "basic" || persisted === "professional")
      return persisted;
    return null;
  } catch {
    return null;
  }
}

export function setActiveTier(tier: PlanTier) {
  if (typeof window === "undefined") return;
  const prev = readActiveTier();
  if (prev && TIER_PRIORITY[prev] > TIER_PRIORITY[tier]) return;
  try {
    window.sessionStorage.setItem(NEXIM_ACTIVE_TIER_KEY, tier);
    window.localStorage.setItem(NEXIM_SELECTED_TIER_KEY, tier);
  } catch {
    /* ignore */
  }
}

export function getActiveTier(): PlanTier | null {
  return readActiveTier();
}

export function clearActiveTier() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(NEXIM_ACTIVE_TIER_KEY);
    window.localStorage.removeItem(NEXIM_SELECTED_TIER_KEY);
  } catch {
    /* ignore */
  }
}
