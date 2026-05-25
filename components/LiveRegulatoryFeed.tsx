"use client";

export type RegulatoryFeedItem = {
  country: string;
  headline: string;
};

type Props = {
  title: string;
  liveBadge: string;
  statusPrefix: string;
  items: RegulatoryFeedItem[];
};

function FeedTicket({
  item,
  statusPrefix,
  liveBadge,
}: {
  item: RegulatoryFeedItem;
  statusPrefix: string;
  liveBadge: string;
}) {
  return (
    <div
      className="regulatory-feed-ticket flex shrink-0 items-center border-e border-white/[0.08] px-4 py-3 font-sans text-sm leading-relaxed text-white/95 sm:px-6 sm:py-3.5 sm:text-[15px] md:px-8 md:py-4 md:text-base md:leading-relaxed xl:py-5 xl:text-lg xl:leading-[1.75] 2xl:text-xl 2xl:leading-[1.8]"
      role="listitem"
    >
      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
        <span className="whitespace-nowrap font-medium text-white">{item.country}</span>
        <span className="text-white/35 select-none" aria-hidden>
          |
        </span>
        <span className="min-w-0 max-w-[min(100vw-8rem,420px)] text-slate-300 sm:max-w-[520px] md:max-w-[640px] xl:max-w-[720px]">
          {item.headline}
        </span>
        <span className="text-white/35 select-none max-sm:hidden" aria-hidden>
          |
        </span>
        <span className="whitespace-nowrap text-[#fbbf24] max-sm:w-full max-sm:ps-0 sm:ps-1">
          <span className="text-slate-500">{statusPrefix}: </span>
          {liveBadge}
        </span>
      </span>
    </div>
  );
}

export function LiveRegulatoryFeed({
  title,
  liveBadge,
  statusPrefix,
  items,
}: Props) {
  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <div className="mt-10 w-full md:mt-14">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-0.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fbbf24] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fbbf24]" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fbbf24] md:text-xs">
            {title}
          </span>
        </div>
        <span className="rounded border border-[#fbbf24]/35 bg-[#fbbf24]/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#fbbf24] shadow-[0_0_20px_-6px_rgba(251,191,36,0.5)]">
          {liveBadge}
        </span>
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#020617]/95 shadow-[inset_0_1px_0_rgba(251,191,36,0.08),0_0_0_1px_rgba(0,0,0,0.4)]"
        role="list"
        aria-label={title}
      >
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-[1] w-10 bg-gradient-to-r from-[#020617] to-transparent md:w-16 rtl:bg-gradient-to-l"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-[1] w-10 bg-gradient-to-l from-[#020617] to-transparent md:w-16 rtl:bg-gradient-to-r"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251,191,36,0.15) 2px, rgba(251,191,36,0.15) 3px)",
          }}
          aria-hidden
        />

        <div className="relative overflow-hidden py-1">
          <div className="regulatory-marquee-track flex w-max">
            {loop.map((item, i) => (
              <FeedTicket
                key={`${item.country}-${item.headline}-${i}`}
                item={item}
                statusPrefix={statusPrefix}
                liveBadge={liveBadge}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
