"use client";

import type { ReactNode } from "react";
import { Link } from "@/navigation";
import { clearNeximQuestionnaireDraftAndResults } from "@/lib/assessment-storage";

type Props = {
  children: ReactNode;
  className?: string;
};

export function HeaderLogoLink({ children, className }: Props) {
  return (
    <Link
      href="/"
      className={className}
      onClick={() => {
        clearNeximQuestionnaireDraftAndResults();
      }}
    >
      {children}
    </Link>
  );
}
