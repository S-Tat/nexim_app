import type { NeximAssessmentData } from "@/lib/assessment-storage";

/**
 * Questionnaire question registry — stable IDs, strictly additive tier lists.
 *
 * Lite questions always occupy the first indices. Basic appends after Lite.
 * Pro appends after Basic. Answers MUST be keyed by question `id`, never by
 * step index, so tier upgrades never scramble stored values.
 */

import type { PlanTier } from "@/lib/assessment-storage";

/** Stable identifier for each questionnaire step. */
export type QuestionId =
  | "ageYears"
  | "citizenship"
  | "passportValidity"
  | "educationLevel"
  | "englishLevel"
  | "unresolvedLegalViolations"
  | "familyMoving"
  | "basicRelocationFunds"
  | "residence"
  | "nativeLanguage"
  | "professionMain"
  | "workExperience"
  | "professionGlobalDemand"
  | "otherLanguagesText"
  | "visaRefusalHistory"
  | "apostillesReadiness"
  | "energy_level_adaptation"
  | "remoteIncomeAbroad"
  | "fundsSourceProvable"
  | "idealEnvironment"
  | "destinationCountry";

export type QuestionDef = {
  id: QuestionId;
  /** i18n key under questionnaire.extended */
  titleKey: string;
  /** Pro tier stage indicator (1–4); ignored for Lite/Basic */
  stage?: number;
};

/** Country picker value stored under answers.citizenship / answers.residence */
export type CountryAnswer = { code: string; name: string } | null;

/** All answers keyed by question id — never by step index. */
export type QuestionAnswers = Partial<
  Record<
    QuestionId,
    string | CountryAnswer | undefined
  >
> & {
  /** Pro profession step auxiliary fields (same step as professionMain) */
  professionOtherDetail?: string;
  linkedinGithub?: string;
};

export const LITE_QUESTIONS: QuestionDef[] = [
  { id: "ageYears", titleKey: "ageLabel" },
  { id: "citizenship", titleKey: "basicCitizenshipLabel" },
  { id: "passportValidity", titleKey: "q11Label" },
];

export const BASIC_ONLY_QUESTIONS: QuestionDef[] = [
  { id: "educationLevel", titleKey: "basicEducationLabel" },
  { id: "englishLevel", titleKey: "q8Label" },
  { id: "unresolvedLegalViolations", titleKey: "legalViolationsLabel" },
  { id: "familyMoving", titleKey: "familyMovingLabel" },
  { id: "basicRelocationFunds", titleKey: "basicRelocationLabel" },
];

export const PRO_ONLY_QUESTIONS: QuestionDef[] = [
  { id: "residence", titleKey: "basicResidenceLabel", stage: 1 },
  { id: "nativeLanguage", titleKey: "basicNativeLanguageLabel", stage: 1 },
  { id: "professionMain", titleKey: "professionMainLabel", stage: 2 },
  { id: "workExperience", titleKey: "experienceLabel", stage: 2 },
  { id: "professionGlobalDemand", titleKey: "globalDemandLabel", stage: 2 },
  { id: "otherLanguagesText", titleKey: "otherLanguagesLabel", stage: 3 },
  { id: "visaRefusalHistory", titleKey: "q12Label", stage: 3 },
  { id: "apostillesReadiness", titleKey: "q13Label", stage: 3 },
  { id: "energy_level_adaptation", titleKey: "energyLevelAdaptationLabel", stage: 4 },
  { id: "remoteIncomeAbroad", titleKey: "income2500Label", stage: 4 },
  { id: "fundsSourceProvable", titleKey: "q17Label", stage: 4 },
  { id: "idealEnvironment", titleKey: "idealEnvironmentLabel", stage: 4 },
];

export const BASIC_QUESTIONS: QuestionDef[] = [
  ...LITE_QUESTIONS,
  ...BASIC_ONLY_QUESTIONS,
];

export const PRO_QUESTIONS: QuestionDef[] = [
  ...BASIC_QUESTIONS,
  ...PRO_ONLY_QUESTIONS,
];

/** Single-country deep-dive questionnaire (not a payment tier). */
export const SINGLE_QUESTIONS: QuestionDef[] = [
  { id: "destinationCountry", titleKey: "destinationCountryLabel" },
  { id: "professionMain", titleKey: "professionMainLabel" },
  { id: "educationLevel", titleKey: "basicEducationLabel" },
  { id: "workExperience", titleKey: "experienceLabel" },
  { id: "professionGlobalDemand", titleKey: "globalDemandLabel" },
  { id: "ageYears", titleKey: "ageLabel" },
  { id: "citizenship", titleKey: "basicCitizenshipLabel" },
  { id: "passportValidity", titleKey: "q11Label" },
  { id: "residence", titleKey: "basicResidenceLabel" },
  { id: "unresolvedLegalViolations", titleKey: "legalViolationsLabel" },
  { id: "familyMoving", titleKey: "familyMovingLabel" },
  { id: "basicRelocationFunds", titleKey: "basicRelocationLabel" },
  { id: "visaRefusalHistory", titleKey: "q12Label" },
  { id: "englishLevel", titleKey: "q8Label" },
  { id: "nativeLanguage", titleKey: "basicNativeLanguageLabel" },
  { id: "otherLanguagesText", titleKey: "otherLanguagesLabel" },
  { id: "apostillesReadiness", titleKey: "q13Label" },
  { id: "energy_level_adaptation", titleKey: "energyLevelAdaptationLabel" },
];

export function getQuestionsForTier(tier: PlanTier): QuestionDef[] {
  if (tier === "lite") return LITE_QUESTIONS;
  if (tier === "basic") return BASIC_QUESTIONS;
  return PRO_QUESTIONS;
}

export function getSingleCountryQuestions(): QuestionDef[] {
  return SINGLE_QUESTIONS;
}

function isAgeValid(raw: unknown): boolean {
  if (typeof raw !== "string") return false;
  const n = Number(raw);
  return raw.trim() !== "" && Number.isFinite(n) && n >= 16 && n <= 100;
}

function isNonEmptyString(raw: unknown): boolean {
  return typeof raw === "string" && raw.trim().length > 0;
}

function isCountryAnswer(raw: unknown): boolean {
  if (raw == null) return false;
  if (typeof raw === "object" && "code" in raw) {
    const code = (raw as CountryAnswer)?.code;
    return typeof code === "string" && code.trim().length > 0;
  }
  return false;
}

/**
 * Returns true when the question identified by `id` has a valid answer in
 * `answers`. Composite steps (professionMain) validate auxiliary fields too.
 */
export function isQuestionAnswered(
  id: QuestionId,
  answers: QuestionAnswers,
): boolean {
  switch (id) {
    case "ageYears":
      return isAgeValid(answers.ageYears);
    case "citizenship":
      return isCountryAnswer(answers.citizenship);
    case "destinationCountry":
      return isCountryAnswer(answers.destinationCountry);
    case "passportValidity":
    case "educationLevel":
    case "englishLevel":
    case "unresolvedLegalViolations":
    case "familyMoving":
    case "basicRelocationFunds":
    case "workExperience":
    case "professionGlobalDemand":
    case "visaRefusalHistory":
    case "apostillesReadiness":
    case "energy_level_adaptation":
    case "remoteIncomeAbroad":
    case "fundsSourceProvable":
    case "idealEnvironment":
      return isNonEmptyString(answers[id]);
    case "residence":
      return isCountryAnswer(answers.residence);
    case "nativeLanguage":
      return isNonEmptyString(answers.nativeLanguage) &&
        (answers.nativeLanguage as string).trim().length >= 2;
    case "otherLanguagesText":
      return isNonEmptyString(answers.otherLanguagesText) &&
        (answers.otherLanguagesText as string).trim().length >= 2;
    case "professionMain": {
      if (!isNonEmptyString(answers.educationLevel)) return false;
      if (!isNonEmptyString(answers.professionMain)) return false;
      if (answers.professionMain === "other") {
        return (
          typeof answers.professionOtherDetail === "string" &&
          answers.professionOtherDetail.trim().length >= 2
        );
      }
      return true;
    }
    default:
      return false;
  }
}

/**
 * Validation for the single-country questionnaire. Unlike isQuestionAnswered,
 * professionMain does NOT require educationLevel (separate steps in this mode).
 */
export function isSingleQuestionAnswered(
  id: QuestionId,
  answers: QuestionAnswers,
): boolean {
  switch (id) {
    case "destinationCountry":
      return isCountryAnswer(answers.destinationCountry);
    case "professionMain": {
      if (!isNonEmptyString(answers.professionMain)) return false;
      if (answers.professionMain === "other") {
        return (
          typeof answers.professionOtherDetail === "string" &&
          answers.professionOtherDetail.trim().length >= 2
        );
      }
      return true;
    }
    default:
      return isQuestionAnswered(id, answers);
  }
}

/** 0-based index of the first unanswered question, or -1 if all answered. */
export function firstUnansweredQuestionIndex(
  tier: PlanTier,
  answers: QuestionAnswers,
): number {
  const questions = getQuestionsForTier(tier);
  return questions.findIndex((q) => !isQuestionAnswered(q.id, answers));
}

export function countAnsweredQuestions(
  tier: PlanTier,
  answers: QuestionAnswers,
): number {
  return getQuestionsForTier(tier).filter((q) =>
    isQuestionAnswered(q.id, answers),
  ).length;
}

export function firstUnansweredSingleQuestionIndex(
  answers: QuestionAnswers,
): number {
  return SINGLE_QUESTIONS.findIndex(
    (q) => !isSingleQuestionAnswered(q.id, answers),
  );
}

export function countAnsweredSingleQuestions(
  answers: QuestionAnswers,
): number {
  return SINGLE_QUESTIONS.filter((q) =>
    isSingleQuestionAnswered(q.id, answers),
  ).length;
}

export function stageForQuestionIndex(
  tier: PlanTier,
  questionIndex: number,
): number {
  if (tier !== "professional") return 1;
  const q = PRO_QUESTIONS[questionIndex];
  return q?.stage ?? 4;
}

/** Build the answers map from persisted NeximAssessmentData (storage hydration). */
export function answersFromAssessmentData(
  data: NeximAssessmentData | null,
): QuestionAnswers {
  if (!data) return {};
  const out: QuestionAnswers = {};
  if (data.ageYears) out.ageYears = data.ageYears;
  if (data.citizenshipCode) {
    out.citizenship = {
      code: data.citizenshipCode,
      name: data.citizenshipName ?? data.citizenshipCode,
    };
  }
  if (data.residenceCode) {
    out.residence = {
      code: data.residenceCode,
      name: data.residenceName ?? data.residenceCode,
    };
  }
  if (data.passportValidity) out.passportValidity = data.passportValidity;
  if (data.educationLevel) out.educationLevel = data.educationLevel;
  if (data.englishLevel) out.englishLevel = data.englishLevel;
  if (data.unresolvedLegalViolations) {
    out.unresolvedLegalViolations = data.unresolvedLegalViolations;
  }
  if (data.familyMoving) out.familyMoving = data.familyMoving;
  if (data.basicRelocationFunds) out.basicRelocationFunds = data.basicRelocationFunds;
  if (data.nativeLanguage) out.nativeLanguage = data.nativeLanguage;
  if (data.professionMain) out.professionMain = data.professionMain;
  if (data.professionOtherDetail) {
    out.professionOtherDetail = data.professionOtherDetail;
  }
  if (data.workExperience) out.workExperience = data.workExperience;
  if (data.professionGlobalDemand) {
    out.professionGlobalDemand = data.professionGlobalDemand;
  }
  if (data.otherLanguagesText) out.otherLanguagesText = data.otherLanguagesText;
  if (data.visaRefusalHistory) out.visaRefusalHistory = data.visaRefusalHistory;
  if (data.apostillesReadiness) out.apostillesReadiness = data.apostillesReadiness;
  if (data.energyLevelAdaptation) {
    out.energy_level_adaptation = data.energyLevelAdaptation;
  }
  if (data.remoteIncomeAbroad) out.remoteIncomeAbroad = data.remoteIncomeAbroad;
  if (data.fundsSourceProvable) out.fundsSourceProvable = data.fundsSourceProvable;
  if (data.idealEnvironment) out.idealEnvironment = data.idealEnvironment;
  if (data.linkedinGithub) out.linkedinGithub = data.linkedinGithub;
  return out;
}

export function countStoredAnsweredSteps(
  data: NeximAssessmentData | null,
  tier: PlanTier,
): number {
  return countAnsweredQuestions(tier, answersFromAssessmentData(data));
}
