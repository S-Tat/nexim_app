import type { Metadata } from "next";

const BRAND = "Nexim";

/** Builds metadata for a sub-page; layout applies the `%s | Nexim` title template. */
export function buildSubpageMetadata(
  pageTitle: string,
  description?: string,
): Metadata {
  const fullTitle = `${pageTitle} | ${BRAND}`;
  return {
    title: pageTitle,
    ...(description
      ? {
          description,
          openGraph: { title: fullTitle, description },
          twitter: { title: fullTitle, description },
        }
      : {
          openGraph: { title: fullTitle },
          twitter: { title: fullTitle },
        }),
  };
}
