"use client";

import { useEffect } from "react";
import {
  NEXIM_ASSESSMENT_STORAGE_KEY,
  parseAssessmentData,
  saveAssessment,
} from "@/lib/assessment-storage";

type Props = {
  countryCode: string;
};

export function SyncAssessmentFromUrl({ countryCode }: Props) {
  useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY)
        : null;
    const prev = parseAssessmentData(raw);
    saveAssessment(
      prev
        ? { ...prev, countryCode }
        : { countryCode },
    );
  }, [countryCode]);

  return null;
}
