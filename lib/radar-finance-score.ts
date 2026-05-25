/** Single “finance” radar axis derived from real AI scores (no hash / demo). */
export function financeAxisFromScores(s: {
  visa: number;
  market: number;
  integration: number;
}): number {
  return Math.max(
    0,
    Math.min(100, Math.round((s.visa + s.market + s.integration) / 3)),
  );
}
