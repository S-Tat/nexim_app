"use client";

import type { ComponentProps } from "react";
import { Link } from "@/navigation";
import { clearNeximQuestionnaireDraftAndResults } from "@/lib/assessment-storage";

type Props = ComponentProps<typeof Link>;

/**
 * Clears questionnaire draft + completion + cached /result snapshot before navigation.
 * Use for tier entry points and logo so a new run always starts at step 1.
 */
export function NeximFreshNavLink({ onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        clearNeximQuestionnaireDraftAndResults();
        onClick?.(e);
      }}
    />
  );
}
