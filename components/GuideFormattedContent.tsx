import type { ReactNode } from "react";

type Props = {
  content: string;
  rtl?: boolean;
};

function isHeadingBlock(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed.endsWith(":")) return false;
  return /^[A-ZА-ЯЁÄÖÜا-ي]/i.test(trimmed);
}

function parseInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`strong-${key++}`} className="font-semibold text-white">
        {match[1]}
      </strong>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function renderBlock(block: string, index: number, rtlClass: string) {
  if (isHeadingBlock(block)) {
    return (
      <h2
        key={index}
        className={`text-base font-semibold text-white md:text-lg${rtlClass}`}
      >
        {parseInlineMarkdown(block)}
      </h2>
    );
  }

  const lines = block.split(/\n/);
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let elementKey = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul
        key={`${index}-ul-${elementKey++}`}
        className={`my-2 list-disc space-y-1 ps-5 text-sm md:text-base${rtlClass}`}
      >
        {listItems.map((item, itemIndex) => (
          <li
            key={itemIndex}
            className={`leading-relaxed text-nexim-muted${rtlClass}`}
          >
            {parseInlineMarkdown(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const listMatch = trimmed.match(/^\*\s+(.+)$/);

    if (listMatch) {
      listItems.push(listMatch[1]);
      continue;
    }

    flushList();

    if (trimmed) {
      elements.push(
        <p
          key={`${index}-p-${elementKey++}`}
          className={`text-sm leading-relaxed text-nexim-muted md:text-base${rtlClass}`}
        >
          {parseInlineMarkdown(trimmed)}
        </p>,
      );
    }
  }

  flushList();

  if (elements.length === 0) return null;
  if (elements.length === 1) {
    return <div key={index}>{elements[0]}</div>;
  }

  return (
    <div key={index} className="space-y-2">
      {elements}
    </div>
  );
}

export function GuideFormattedContent({ content, rtl }: Props) {
  const rtlClass = rtl ? " rtl:font-arabic" : "";
  const blocks = content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => renderBlock(block, index, rtlClass))}
    </div>
  );
}
