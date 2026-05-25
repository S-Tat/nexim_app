import type { ReactNode } from "react";

export function LegalArticle({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-14 md:px-10 md:py-20">
      <header className="border-b border-white/[0.08] pb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-nexim-muted">
          {updated}
        </p>
      </header>
      <div className="mt-10 space-y-10 text-sm leading-relaxed text-nexim-text">
        {children}
      </div>
    </article>
  );
}

export function LegalBlock({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-white">{heading}</h2>
      <div className="mt-3 space-y-3 text-nexim-muted">{children}</div>
    </section>
  );
}
