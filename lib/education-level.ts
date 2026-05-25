/** Stored in NeximAssessmentData.educationLevel; labels = assessment.education_* */
export const EDUCATION_VALUES = [
  "phd",
  "master",
  "bachelor",
  "vocational",
  "high_school",
] as const;

export type EducationLevelValue = (typeof EDUCATION_VALUES)[number];

const LEGACY_TO_CURRENT: Record<string, EducationLevelValue | ""> = {
  higher: "bachelor",
  secondary: "vocational",
  school_finished: "high_school",
  /** Old UI had incomplete school — ask user to pick again in the wizard */
  school_not_finished: "",
};

/** Legacy-only display key (assessment.education_below_hs), not a selectable value */
const LEGACY_DISPLAY_KEY: Record<string, string> = {
  higher: "bachelor",
  secondary: "vocational",
  school_finished: "high_school",
  school_not_finished: "below_hs",
};

export function migrateStoredEducationLevel(raw: string | undefined): string {
  if (!raw) return "";
  if ((EDUCATION_VALUES as readonly string[]).includes(raw)) return raw;
  const mapped = LEGACY_TO_CURRENT[raw];
  return mapped !== undefined ? mapped : "";
}

/** Resolve message key for assessment.education_{key} (handles legacy stored values). */
export function educationTranslationKey(stored: string): string {
  if ((EDUCATION_VALUES as readonly string[]).includes(stored)) return stored;
  const display = LEGACY_DISPLAY_KEY[stored];
  if (display) return display;
  return stored;
}
