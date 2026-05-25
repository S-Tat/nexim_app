"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const mdComponents: Components = {
  table: ({ children, ...rest }) => (
    <table
      className="w-full min-w-[28rem] border-collapse border border-white/[0.08] text-left text-sm text-nexim-text"
      {...rest}
    >
      {children}
    </table>
  ),
  thead: ({ children, ...rest }) => (
    <thead className="bg-white/[0.07]" {...rest}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...rest }) => (
    <tbody className="divide-y divide-white/[0.06]" {...rest}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...rest }) => (
    <tr className="border-b border-white/[0.06] last:border-0" {...rest}>
      {children}
    </tr>
  ),
  th: ({ children, ...rest }) => (
    <th
      className="whitespace-normal px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#fbbf24] md:px-4"
      {...rest}
    >
      {children}
    </th>
  ),
  td: ({ children, ...rest }) => (
    <td className="px-3 py-2.5 align-top text-xs leading-relaxed md:px-4 md:text-sm" {...rest}>
      {children}
    </td>
  ),
  p: ({ children, ...rest }) => (
    <p className="mb-3 text-sm leading-relaxed last:mb-0" {...rest}>
      {children}
    </p>
  ),
  h2: ({ children, ...rest }) => (
    <h3 className="mb-2 mt-4 text-sm font-semibold text-white first:mt-0" {...rest}>
      {children}
    </h3>
  ),
  h3: ({ children, ...rest }) => (
    <h4 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-nexim-muted" {...rest}>
      {children}
    </h4>
  ),
  ul: ({ children, ...rest }) => (
    <ul className="my-2 list-disc space-y-1 ps-5 text-sm" {...rest}>
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }) => (
    <ol className="my-2 list-decimal space-y-1 ps-5 text-sm" {...rest}>
      {children}
    </ol>
  ),
  li: ({ children, ...rest }) => (
    <li className="leading-relaxed" {...rest}>
      {children}
    </li>
  ),
  strong: ({ children, ...rest }) => (
    <strong className="font-semibold text-white" {...rest}>
      {children}
    </strong>
  ),
};

export function MarkdownDocumentTable({ source }: { source: string }) {
  const trimmed = source?.trim();
  if (!trimmed) return null;
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#030712]/50 p-2 md:p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {trimmed}
      </ReactMarkdown>
    </div>
  );
}

/** Generic markdown block (lists, headings, tables) for Pro audit sections. */
export function MarkdownSection({ source }: { source: string }) {
  const trimmed = source?.trim();
  if (!trimmed) return null;
  return (
    <div className="max-w-none text-nexim-text">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {trimmed}
      </ReactMarkdown>
    </div>
  );
}
