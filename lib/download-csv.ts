/** UTF-8 BOM so Excel opens Cyrillic/Arabic correctly */
const BOM = "\uFEFF";

export function downloadTextFile(
  content: string,
  fileName: string,
  mime: string = "text/csv;charset=utf-8",
): void {
  const blob = new Blob([BOM + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type CsvRow = { parameter: string; value: string; recommendation: string };

export function rowsToCsv(rows: CsvRow[], header: [string, string, string]): string {
  const esc = (s: string) => {
    const t = s.replace(/"/g, '""');
    return `"${t}"`;
  };
  const lines = [
    [esc(header[0]), esc(header[1]), esc(header[2])].join(","),
    ...rows.map((r) =>
      [esc(r.parameter), esc(r.value), esc(r.recommendation)].join(","),
    ),
  ];
  return lines.join("\r\n");
}
