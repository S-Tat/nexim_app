"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type RadarDatum = {
  subject: string;
  A: number;
  fullMark: number;
};

type Props = {
  data: RadarDatum[];
};

export function RadarChartPanel({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
        <PolarGrid stroke="rgba(251,191,36,0.15)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Radar
          name="A"
          dataKey="A"
          stroke="#fbbf24"
          fill="#fbbf24"
          fillOpacity={0.28}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: "#030712",
            border: "1px solid rgba(251,191,36,0.35)",
            borderRadius: "10px",
            color: "#f1f5f9",
          }}
          labelStyle={{ color: "#fde68a" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
