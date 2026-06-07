type Props = {
  content: string;
  rtl?: boolean;
};

function isHeadingBlock(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed.endsWith(":")) return false;
  return /^[A-ZА-ЯЁÄÖÜا-ي]/i.test(trimmed);
}

export function GuideFormattedContent({ content, rtl }: Props) {
  const rtlClass = rtl ? " rtl:font-arabic" : "";
  const blocks = content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (isHeadingBlock(block)) {
          return (
            <h2
              key={index}
              className={`text-base font-semibold text-white md:text-lg${rtlClass}`}
            >
              {block}
            </h2>
          );
        }

        return (
          <p
            key={index}
            className={`text-sm leading-relaxed text-nexim-muted md:text-base${rtlClass}`}
          >
            {block.replace(/\n/g, " ")}
          </p>
        );
      })}
    </div>
  );
}
