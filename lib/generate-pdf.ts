import jsPDF from "jspdf";
import { ROBOTO_REGULAR_BASE64 } from "./roboto-regular-base64";
import { ROBOTO_BOLD_BASE64 } from "./roboto-bold-base64";
import type { CountryMatch } from "./analyze-client";

const MARGIN = 20;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FONT_NAME = "Roboto";

function registerFonts(doc: jsPDF) {
  doc.addFileToVFS("Roboto-Regular.ttf", ROBOTO_REGULAR_BASE64);
  doc.addFont("Roboto-Regular.ttf", FONT_NAME, "normal");
  doc.addFileToVFS("Roboto-Bold.ttf", ROBOTO_BOLD_BASE64);
  doc.addFont("Roboto-Bold.ttf", FONT_NAME, "bold");
}

function setFont(doc: jsPDF, style: "normal" | "bold" = "normal") {
  doc.setFont(FONT_NAME, style);
}

function ensureSpace(doc: jsPDF, y: number, needMm: number): number {
  if (y + needMm > 275) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function drawGaugeRing(
  doc: jsPDF,
  cx: number,
  cy: number,
  r: number,
  pct: number,
  label: string,
) {
  const segments = 72;
  const filled = Math.round((pct / 100) * segments);

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(2.5);
  doc.circle(cx, cy, r, "S");

  doc.setDrawColor(180, 140, 20);
  doc.setLineWidth(3);
  for (let i = 0; i < filled; i++) {
    const a1 = -Math.PI / 2 + (2 * Math.PI * i) / segments;
    const a2 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / segments;
    doc.line(
      cx + r * Math.cos(a1), cy + r * Math.sin(a1),
      cx + r * Math.cos(a2), cy + r * Math.sin(a2),
    );
  }

  doc.setFontSize(22);
  setFont(doc, "bold");
  doc.setTextColor(40, 40, 40);
  doc.text(`${pct}%`, cx, cy + 2, { align: "center" });

  doc.setFontSize(7);
  setFont(doc, "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(label, cx, cy + r + 7, { align: "center" });
}

function printBulletList(
  doc: jsPDF,
  items: string[],
  y: number,
  prefix: string,
): number {
  let yy = y;
  doc.setFontSize(8.5);
  setFont(doc, "normal");
  doc.setTextColor(50, 50, 50);
  for (const item of items) {
    const lines = doc.splitTextToSize(`${prefix} ${item}`, CONTENT_W - 6);
    for (const line of lines) {
      yy = ensureSpace(doc, yy, 5);
      doc.text(line, MARGIN + 3, yy);
      yy += 4.2;
    }
  }
  return yy;
}

export type StrategyPdfLabels = {
  title: string;
  subtitle: string;
  badge: string;
  matchLabel: string;
  prosLabel: string;
  consLabel: string;
  gapLabel: string;
  roadmapLabel: string;
  analysisLabel: string;
  fileName: string;
};

export function generateStrategyPdf(opts: {
  labels: StrategyPdfLabels;
  analysis: string;
  countries: CountryMatch[];
  locale: string;
}) {
  const { labels, analysis, countries } = opts;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  registerFonts(doc);
  setFont(doc, "normal");

  let y = MARGIN;

  // Header
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, PAGE_W, 42, "F");
  doc.setFontSize(9);
  setFont(doc, "normal");
  doc.setTextColor(140, 140, 140);
  doc.text(labels.badge.toUpperCase(), MARGIN, 14);

  doc.setFontSize(18);
  setFont(doc, "bold");
  doc.setTextColor(20, 20, 20);
  doc.text(labels.title, MARGIN, 28);

  doc.setFontSize(10);
  setFont(doc, "normal");
  doc.setTextColor(80, 80, 80);
  const subtitleLines = doc.splitTextToSize(labels.subtitle, CONTENT_W);
  doc.text(subtitleLines, MARGIN, 36);
  y = 50;

  // Analysis summary
  if (analysis.trim()) {
    y = ensureSpace(doc, y, 20);
    doc.setFontSize(11);
    setFont(doc, "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(labels.analysisLabel, MARGIN, y);
    y += 6;
    doc.setFontSize(9);
    setFont(doc, "normal");
    doc.setTextColor(50, 50, 50);
    const para = doc.splitTextToSize(analysis.trim(), CONTENT_W);
    for (const line of para) {
      y = ensureSpace(doc, y, 5);
      doc.text(line, MARGIN, y);
      y += 4.5;
    }
    y += 6;
  }

  // Score rings row
  if (countries.length > 0) {
    y = ensureSpace(doc, y, 55);
    const ringR = 16;
    const gap = CONTENT_W / countries.length;
    for (let i = 0; i < countries.length; i++) {
      const c = countries[i];
      const cx = MARGIN + gap * i + gap / 2;
      drawGaugeRing(doc, cx, y + ringR + 2, ringR, c.match_score, c.country_name);
    }
    y += ringR * 2 + 20;
  }

  // Each country section
  for (let i = 0; i < countries.length; i++) {
    const c = countries[i];
    const medal = i === 0 ? "#1" : i === 1 ? "#2" : "#3";

    y = ensureSpace(doc, y, 30);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y, MARGIN + CONTENT_W, y);
    y += 8;

    doc.setFontSize(13);
    setFont(doc, "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(`${medal}  ${c.country_name} — ${c.match_score}%`, MARGIN, y);
    y += 5;
    doc.setFontSize(9);
    setFont(doc, "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(c.visa_name, MARGIN, y);
    y += 7;

    // Pros
    if (c.pros.length) {
      doc.setFontSize(9);
      setFont(doc, "bold");
      doc.setTextColor(34, 139, 34);
      doc.text(labels.prosLabel, MARGIN, y);
      y += 5;
      y = printBulletList(doc, c.pros, y, "+");
      y += 3;
    }

    // Cons
    if (c.cons.length) {
      y = ensureSpace(doc, y, 10);
      doc.setFontSize(9);
      setFont(doc, "bold");
      doc.setTextColor(180, 40, 40);
      doc.text(labels.consLabel, MARGIN, y);
      y += 5;
      y = printBulletList(doc, c.cons, y, "−");
      y += 3;
    }

    // Gap analysis
    if (c.gap_analysis.length) {
      y = ensureSpace(doc, y, 10);
      doc.setFontSize(9);
      setFont(doc, "bold");
      doc.setTextColor(180, 140, 20);
      doc.text(labels.gapLabel, MARGIN, y);
      y += 5;
      y = printBulletList(doc, c.gap_analysis, y, "⚠");
      y += 3;
    }

    // Roadmap
    if (c.roadmap.length) {
      y = ensureSpace(doc, y, 10);
      doc.setFontSize(9);
      setFont(doc, "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(labels.roadmapLabel, MARGIN, y);
      y += 5;
      doc.setFontSize(8.5);
      setFont(doc, "normal");
      doc.setTextColor(50, 50, 50);
      for (const s of c.roadmap) {
        y = ensureSpace(doc, y, 12);
        setFont(doc, "bold");
        doc.text(`${s.step}. ${s.title}`, MARGIN + 3, y);
        y += 4;
        setFont(doc, "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(s.deadline, MARGIN + 3, y);
        y += 4;
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(s.description, CONTENT_W - 10);
        for (const line of descLines) {
          y = ensureSpace(doc, y, 5);
          doc.text(line, MARGIN + 3, y);
          y += 4.2;
        }
        y += 2;
      }
    }
    y += 4;
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    setFont(doc, "normal");
    doc.setTextColor(170, 170, 170);
    doc.text("nexim.world", MARGIN, 290);
    doc.text(`${p} / ${pageCount}`, PAGE_W - MARGIN, 290, { align: "right" });
  }

  doc.save(labels.fileName);
}
