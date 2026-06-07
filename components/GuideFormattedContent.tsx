import type { ReactNode } from "react";

type Props = {
  content: string;
  rtl?: boolean;
};

type Segment =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string };

const SENTENCES_PER_PARAGRAPH = 3;

function stripMarkdownSymbols(text: string): string {
  return text.replace(/\*\*/g, "").replace(/\*/g, "");
}

function splitIntoSentences(text: string): string[] {
  const normalized = stripMarkdownSymbols(text)
    .replace(/\.\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return [];

  return normalized
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function groupIntoParagraphs(sentences: string[]): string[] {
  const paragraphs: string[] = [];

  for (let i = 0; i < sentences.length; i += SENTENCES_PER_PARAGRAPH) {
    const chunk = sentences.slice(i, i + SENTENCES_PER_PARAGRAPH);
    paragraphs.push(chunk.join(" "));
  }

  return paragraphs;
}

function buildSegments(content: string): Segment[] {
  const sentences = splitIntoSentences(content);
  const segments: Segment[] = [];
  let bodyBuffer: string[] = [];

  const flushBodyBuffer = () => {
    if (bodyBuffer.length === 0) return;

    for (const paragraph of groupIntoParagraphs(bodyBuffer)) {
      segments.push({ kind: "paragraph", text: paragraph });
    }

    bodyBuffer = [];
  };

  for (const sentence of sentences) {
    if (sentence.endsWith(":")) {
      flushBodyBuffer();
      segments.push({ kind: "heading", text: sentence });
      continue;
    }

    bodyBuffer.push(sentence);
  }

  flushBodyBuffer();
  return segments;
}

export function GuideFormattedContent({ content, rtl }: Props) {
  const rtlClass = rtl ? " rtl:font-arabic" : "";
  const segments = buildSegments(content);

  const nodes: ReactNode[] = segments.map((segment, index) => {
    if (segment.kind === "heading") {
      return (
        <h3
          key={`heading-${index}`}
          className={`mt-8 text-base font-semibold text-white first:mt-0 md:text-lg${rtlClass}`}
        >
          {segment.text}
        </h3>
      );
    }

    return (
      <p
        key={`paragraph-${index}`}
        className={`text-sm leading-relaxed text-nexim-muted md:text-base${rtlClass}`}
      >
        {segment.text}
      </p>
    );
  });

  return <div className="space-y-4">{nodes}</div>;
}
