export const NEXIM_ASSESSMENT_STORAGE_KEY = "nexim-assessment";
export const NEXIM_ASSESSMENT_COMPLETION_KEY = "nexim-assessment-completion";
/** AI result payload kept in sessionStorage for /result (must clear with questionnaire reset). */
export const NEXIM_STRATEGY_RESULT_KEY = "nexim-strategy-result";
export const NEXIM_RESULT_TIER_KEY = "nexim-result-tier";

export type PlanTier = "lite" | "basic" | "professional";

/** Tiers that require Stripe checkout */
export type PaidPlanTier = Exclude<PlanTier, "lite">;

export type QuestionnaireResumeStage = "questionnaire" | "result";

export type NeximAssessmentCompletion = {
  tier: PlanTier;
  answerCount: number;
  completed: boolean;
  nextStage: QuestionnaireResumeStage;
  updatedAt: string;
};

export type NeximAssessmentData = {
  countryCode: string;
  countryName?: string;
  citizenshipCode?: string;
  citizenshipName?: string;
  residenceCode?: string;
  residenceName?: string;
  nativeLanguage?: string;
  ageYears?: string;
  ageRange?: string;
  maritalStatus?: string;
  familySize?: string;
  specialty?: string;
  specialtyCustom?: string;
  professionMain?: string;
  professionOtherDetail?: string;
  workExperience?: string;
  workRole?: string;
  familyMoving?: string;
  linkedinGithub?: string;
  unresolvedLegalViolations?: string;
  diplomaVerification?: string;
  diplomaResult?: string;
  partnerHigherEducation?: string;
  engCertType?: string;
  engCertScore?: string;
  langCertType?: string;
  langCertLevel?: string;
  englishLevel?: string;
  targetLanguageLevel?: string;
  otherLanguagesText?: string;
  professionGlobalDemand?: string;
  shortageListProfession?: string;
  passportValidity?: string;
  visaRefusalHistory?: string;
  apostillesReadiness?: string;
  sponsorsInDestination?: string;
  energyLevelAdaptation?: string;
  savingsBracket?: string;
  remoteIncomeAbroad?: string;
  fundsSourceProvable?: string;
  hasJobOffer?: string;
  idealEnvironment?: string;
  savingsUsd?: string;
  educationLevel?: string;
  basicRelocationFunds?: string;
  paymentConfirmed?: boolean;
  reportLocale?: string;
  planTier?: PlanTier;
  destinationCountryCode?: string;
  destinationCountryName?: string;
};

function str(data: Record<string, unknown>, key: string): string | undefined {
  const v = data[key];
  return typeof v === "string" ? v : undefined;
}

function bool(data: Record<string, unknown>, key: string): boolean | undefined {
  const v = data[key];
  return typeof v === "boolean" ? v : undefined;
}

function isAgeValid(raw: string | undefined): boolean {
  if (!raw) return false;
  const n = Number(raw);
  return raw.trim() !== "" && Number.isFinite(n) && n >= 16 && n <= 100;
}

function isNativeLanguageValid(raw: string | undefined): boolean {
  return (raw ?? "").trim().length >= 2;
}

export function parseAssessmentData(
  raw: string | null,
): NeximAssessmentData | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data) return null;
    const countryCode =
      typeof data.countryCode === "string" && data.countryCode.trim() !== ""
        ? data.countryCode
        : "AI_SUGGEST";
    const tierRaw = str(data, "planTier");
    let planTier: PlanTier | undefined;
    if (tierRaw === "lite" || tierRaw === "basic" || tierRaw === "professional")
      planTier = tierRaw;

    return {
      countryCode,
      countryName: str(data, "countryName"),
      citizenshipCode: str(data, "citizenshipCode"),
      citizenshipName: str(data, "citizenshipName"),
      residenceCode: str(data, "residenceCode"),
      residenceName: str(data, "residenceName"),
      nativeLanguage: str(data, "nativeLanguage"),
      ageYears: str(data, "ageYears"),
      ageRange: str(data, "ageRange"),
      maritalStatus: str(data, "maritalStatus"),
      specialty: str(data, "specialty"),
      specialtyCustom: str(data, "specialtyCustom"),
      professionMain: str(data, "professionMain"),
      professionOtherDetail: str(data, "professionOtherDetail"),
      familyMoving: str(data, "familyMoving"),
      unresolvedLegalViolations: str(data, "unresolvedLegalViolations"),
      otherLanguagesText: str(data, "otherLanguagesText"),
      professionGlobalDemand: str(data, "professionGlobalDemand"),
      idealEnvironment: str(data, "idealEnvironment"),
      workExperience: str(data, "workExperience"),
      workRole: str(data, "workRole"),
      familySize: str(data, "familySize"),
      linkedinGithub: str(data, "linkedinGithub"),
      diplomaVerification: str(data, "diplomaVerification"),
      diplomaResult: str(data, "diplomaResult"),
      partnerHigherEducation: str(data, "partnerHigherEducation"),
      engCertType: str(data, "engCertType"),
      engCertScore: str(data, "engCertScore"),
      langCertType: str(data, "langCertType"),
      langCertLevel: str(data, "langCertLevel"),
      englishLevel: str(data, "englishLevel"),
      targetLanguageLevel: str(data, "targetLanguageLevel"),
      shortageListProfession: str(data, "shortageListProfession"),
      passportValidity: str(data, "passportValidity"),
      visaRefusalHistory: str(data, "visaRefusalHistory"),
      apostillesReadiness: str(data, "apostillesReadiness"),
      energyLevelAdaptation: str(data, "energyLevelAdaptation"),
      sponsorsInDestination: str(data, "sponsorsInDestination"),
      savingsBracket: str(data, "savingsBracket"),
      remoteIncomeAbroad: str(data, "remoteIncomeAbroad"),
      fundsSourceProvable: str(data, "fundsSourceProvable"),
      hasJobOffer: str(data, "hasJobOffer"),
      savingsUsd: str(data, "savingsUsd"),
      educationLevel: str(data, "educationLevel"),
      basicRelocationFunds: str(data, "basicRelocationFunds"),
      paymentConfirmed: bool(data, "paymentConfirmed"),
      reportLocale: str(data, "reportLocale"),
      planTier,
      destinationCountryCode: str(data, "destinationCountryCode"),
      destinationCountryName: str(data, "destinationCountryName"),
    };
  } catch {
    return null;
  }
}

export function saveAssessment(data: NeximAssessmentData) {
  try {
    window.sessionStorage.setItem(
      NEXIM_ASSESSMENT_STORAGE_KEY,
      JSON.stringify(data),
    );
  } catch {
    /* ignore */
  }
}

export function readAssessmentCompletion(): NeximAssessmentCompletion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(NEXIM_ASSESSMENT_COMPLETION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<NeximAssessmentCompletion>;
    if (!data || typeof data !== "object") return null;

    let tier: PlanTier | null = null;
    if (
      data.tier === "lite" ||
      data.tier === "basic" ||
      data.tier === "professional"
    )
      tier = data.tier;

    if (!tier) return null;

    const nextRaw = data.nextStage;
    const nextStage: QuestionnaireResumeStage =
      nextRaw === "result" || nextRaw === "questionnaire"
        ? nextRaw
        : "questionnaire";

    return {
      tier,
      answerCount:
        typeof data.answerCount === "number" && Number.isFinite(data.answerCount)
          ? data.answerCount
          : 0,
      completed: data.completed === true,
      nextStage,
      updatedAt:
        typeof data.updatedAt === "string"
          ? data.updatedAt
          : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveAssessmentCompletion(data: NeximAssessmentCompletion) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      NEXIM_ASSESSMENT_COMPLETION_KEY,
      JSON.stringify(data),
    );
  } catch {
    /* ignore */
  }
}

export function clearAssessmentCompletion() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(NEXIM_ASSESSMENT_COMPLETION_KEY);
  } catch {
    /* ignore */
  }
}

export function clearQuestionnairePersistedState(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(NEXIM_ASSESSMENT_STORAGE_KEY);
    window.localStorage.removeItem(NEXIM_ASSESSMENT_COMPLETION_KEY);
  } catch {
    /* ignore */
  }
}

/** Clears draft answers, completion snapshot, and cached AI result — use before home / new tier. */
export function clearNeximQuestionnaireDraftAndResults(): void {
  clearQuestionnairePersistedState();
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(NEXIM_STRATEGY_RESULT_KEY);
    window.sessionStorage.removeItem(NEXIM_RESULT_TIER_KEY);
  } catch {
    /* ignore */
  }
}

export function hasCompletedExtendedAssessmentLocally(): boolean {
  if (typeof window === "undefined") return false;

  const snapshot = readAssessmentCompletion();
  if (
    snapshot?.completed &&
    snapshot.answerCount >= 18 &&
    snapshot.tier === "professional"
  ) {
    return true;
  }

  const stored = parseAssessmentData(
    window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY),
  );
  if (!stored) return false;

  const answered = [
    Boolean(stored.citizenshipCode || stored.citizenshipName),
    Boolean(stored.residenceCode || stored.residenceName),
    isNativeLanguageValid(stored.nativeLanguage),
    Boolean(stored.unresolvedLegalViolations),
    isAgeValid(stored.ageYears),
    Boolean(stored.familyMoving),
    Boolean(
      stored.professionMain &&
        (stored.professionMain !== "other" ||
          (stored.professionOtherDetail ?? "").trim().length >= 2),
    ),
    Boolean(stored.workExperience),
    Boolean(stored.professionGlobalDemand),
    Boolean(stored.englishLevel),
    (stored.otherLanguagesText ?? "").trim().length >= 2,
    Boolean(stored.passportValidity),
    Boolean(stored.visaRefusalHistory),
    Boolean(stored.apostillesReadiness),
    Boolean(stored.energyLevelAdaptation),
    Boolean(stored.remoteIncomeAbroad),
    Boolean(stored.fundsSourceProvable),
    Boolean(stored.idealEnvironment),
  ].filter(Boolean).length;

  return answered >= 18;
}
