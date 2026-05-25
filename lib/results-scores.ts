export type BottleneckKey = "visa" | "market" | "integration";

export type DemoScores = {
  overall: number;
  visa: number;
  market: number;
  integration: number;
  bottleneck: BottleneckKey;
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Deterministic demo scores from ISO code so the same country always matches. */
export function getDemoScores(code: string): DemoScores {
  const h = hashString(code.toUpperCase());
  const visa = 52 + (h % 41);
  const market = 52 + ((h >> 4) % 41);
  const integration = 52 + ((h >> 8) % 41);
  const overall = Math.round((visa + market + integration) / 3);

  const entries: [BottleneckKey, number][] = [
    ["visa", visa],
    ["market", market],
    ["integration", integration],
  ];
  const bottleneck = entries.reduce((a, b) => (a[1] <= b[1] ? a : b))[0];

  return { overall, visa, market, integration, bottleneck };
}
