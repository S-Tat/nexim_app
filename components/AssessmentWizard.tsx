"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import { CountryPicker, type CountryOption } from "@/components/CountryPicker";
import { QuestionnaireQuestionRenderer } from "@/components/QuestionnaireQuestionRenderer";
import {
  clearAssessmentCompletion,
  clearNeximQuestionnaireDraftAndResults,
  NEXIM_ASSESSMENT_STORAGE_KEY,
  NEXIM_RESULT_TIER_KEY,
  NEXIM_STRATEGY_RESULT_KEY,
  parseAssessmentData,
  readAssessmentCompletion,
  saveAssessmentCompletion,
  saveAssessment,
  type NeximAssessmentData,
  type PlanTier,
} from "@/lib/assessment-storage";
import {
  getActiveTier,
  highestPaidTier,
  isTierPaid,
  markTierPaid,
  setActiveTier,
} from "@/lib/nexim-payment-gate";
import {
  EDUCATION_VALUES,
  migrateStoredEducationLevel,
} from "@/lib/education-level";
import {
  LANGUAGE_LEVEL_VALUES,
  migrateStoredLanguageLevel,
} from "@/lib/language-level";
import { requestAnalysis } from "@/lib/analyze-client";
import {
  answersFromAssessmentData,
  countStoredAnsweredSteps,
  firstUnansweredQuestionIndex,
  getQuestionsForTier,
  isQuestionAnswered,
  stageForQuestionIndex,
  type QuestionAnswers,
} from "@/lib/questionnaire-questions";

/** Stored values; labels = assessment.basic_relocate_{value} */
const BASIC_RELOCATION_FUND_VALUES = [
  "up_to_5000",
  "5000_15000",
  "15000_50000",
  "over_50000",
] as const;

const STAGE_DEFS = [
  { id: 1, labelKey: "stageBasics" as const, lastStep: 5 },
  { id: 2, labelKey: "stageProfile" as const, lastStep: 10 },
  { id: 3, labelKey: "stageBureaucracy" as const, lastStep: 14 },
  { id: 4, labelKey: "stageFinance" as const, lastStep: 18 },
];

const PROFESSION_MAIN_VALUES = [
  "it_software",
  "data_science",
  "medicine",
  "nursing_care",
  "education",
  "engineering",
  "design",
  "marketing_pr",
  "sales_business",
  "product_pm",
  "finance",
  "entrepreneurship",
  "hr",
  "construction",
  "hospitality",
  "logistics",
  "legal",
  "creative_arts",
  "science",
  "other",
] as const;

const FAMILY_MOVING_VALUES = [
  "solo",
  "partner_married",
  "partner_unmarried",
  "with_children",
  "with_pets",
] as const;

const IDEAL_ENV_VALUES = [
  "warm_sea",
  "temperate",
  "high_living_cold_ok",
  "megacity",
] as const;

const EXP_VALUES = ["exp_0_2", "exp_3_5", "exp_6_10", "exp_10_plus"] as const;
const GLASS_SHELL =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-8";
const GLASS_CARD =
  "rounded-xl border border-white/[0.08] bg-[#030712]/60 p-5 backdrop-blur-md md:p-6";

type Props = {
  countryOptions: CountryOption[];
};

function normalizeTierFromUrl(raw: string | null): PlanTier | null {
  if (raw === "lite" || raw === "basic" || raw === "professional") return raw;
  return null;
}

function hasStoredResultForTier(expectedTier: PlanTier): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.sessionStorage.getItem(NEXIM_STRATEGY_RESULT_KEY);
    const tier = window.sessionStorage.getItem(NEXIM_RESULT_TIER_KEY);
    if (!raw || tier !== expectedTier) return false;
    const parsed = JSON.parse(raw) as {
      top_countries?: unknown;
      legalRelocationBlocked?: boolean;
      analysis?: string | null;
    };
    return (
      parsed.legalRelocationBlocked === true ||
      (Array.isArray(parsed.top_countries) && parsed.top_countries.length > 0) ||
      (typeof parsed.analysis === "string" && parsed.analysis.trim().length > 0)
    );
  } catch {
    return false;
  }
}

export function AssessmentWizard({ countryOptions }: Props) {
  const t = useTranslations("questionnaire.extended");
  const locale = useLocale();
  const tightScript = locale === "zh" || locale === "hi";
  const router = useRouter();
  const searchParams = useSearchParams();
  /**
   * `tier` resolution must happen post-hydration to avoid SSR/CSR mismatches
   * AND a startup race where the payment-gate effect might fire `router.replace`
   * with an outdated tier before the storage-based promotion lands. We keep
   * `tier` as `null` until the client confirms the right tier — every
   * downstream effect (payment gate, prefill, persist) waits on that.
   */
  const urlTier = useMemo(
    () => normalizeTierFromUrl(searchParams.get("tier")),
    [searchParams],
  );
  const [tier, setTier] = useState<PlanTier | null>(null);

  useEffect(() => {
    if (urlTier !== null) {
      setTier(urlTier);
      return;
    }
    const active = getActiveTier();
    if (active) {
      setTier(active);
      return;
    }
    const paid = highestPaidTier();
    if (paid) {
      setTier(paid);
      return;
    }
    setTier("basic");
  }, [urlTier]);

  const questions = useMemo(
    () => (tier ? getQuestionsForTier(tier) : []),
    [tier],
  );
  const totalSteps = questions.length;

  /** 0-based index into `questions` — never use raw indices for answer lookup. */
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);
  /** null = checking payment gate; true = allowed; false = redirecting to checkout */
  const [paymentGateReady, setPaymentGateReady] = useState<boolean | null>(null);

  const [citizenship, setCitizenship] = useState<CountryOption | null>(null);
  const [residence, setResidence] = useState<CountryOption | null>(null);
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [unresolvedLegalViolations, setUnresolvedLegalViolations] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [familyMoving, setFamilyMoving] = useState("");
  const [professionMain, setProfessionMain] = useState("");
  const [professionOtherDetail, setProfessionOtherDetail] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [linkedinGithub, setLinkedinGithub] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [otherLanguagesText, setOtherLanguagesText] = useState("");
  const [professionGlobalDemand, setProfessionGlobalDemand] = useState("");
  const [passportValidity, setPassportValidity] = useState("");
  const [visaRefusalHistory, setVisaRefusalHistory] = useState("");
  const [apostillesReadiness, setApostillesReadiness] = useState("");
  const [energyLevelAdaptation, setEnergyLevelAdaptation] = useState("");
  const [remoteIncomeAbroad, setRemoteIncomeAbroad] = useState("");
  const [fundsSourceProvable, setFundsSourceProvable] = useState("");
  const [idealEnvironment, setIdealEnvironment] = useState("");
  const [basicRelocationFunds, setBasicRelocationFunds] = useState("");
  const [submittingAi, setSubmittingAi] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Canonical answers map keyed by question id. All navigation, validation,
   * and resume logic reads from this record — never from step index.
   */
  const answers: QuestionAnswers = useMemo(
    () => ({
      ageYears,
      citizenship,
      passportValidity,
      educationLevel,
      englishLevel,
      unresolvedLegalViolations,
      familyMoving,
      basicRelocationFunds,
      residence,
      nativeLanguage,
      professionMain,
      professionOtherDetail,
      workExperience,
      professionGlobalDemand,
      otherLanguagesText,
      visaRefusalHistory,
      apostillesReadiness,
      energy_level_adaptation: energyLevelAdaptation,
      remoteIncomeAbroad,
      fundsSourceProvable,
      idealEnvironment,
      linkedinGithub,
    }),
    [
      ageYears,
      citizenship,
      passportValidity,
      educationLevel,
      englishLevel,
      unresolvedLegalViolations,
      familyMoving,
      basicRelocationFunds,
      residence,
      nativeLanguage,
      professionMain,
      professionOtherDetail,
      workExperience,
      professionGlobalDemand,
      otherLanguagesText,
      visaRefusalHistory,
      apostillesReadiness,
      energyLevelAdaptation,
      remoteIncomeAbroad,
      fundsSourceProvable,
      idealEnvironment,
      linkedinGithub,
    ],
  );

  const currentQuestion = questions[currentStep] ?? null;
  /**
   * Synchronous ref-lock: prevents double-submit from rapid double-click.
   * React state (`submittingAi`) only updates on the next render, so two
   * native click events in the same tick would both pass the state check.
   */
  const submitLockRef = useRef(false);
  const resumeHandledRef = useRef(false);
  /** Tracks tier across mounts so we only reset consent / realign step on actual tier changes or first hydration. */
  const tierHydrateAnchorRef = useRef<PlanTier | null>(null);
  const [resumeGateReady, setResumeGateReady] = useState(false);
  const answersRef = useRef<QuestionAnswers>({});
  answersRef.current = answers;

  /** Drop Pro/Basic completion + answers when switching to free Lite (avoid 18-step bleed). */
  useEffect(() => {
    if (tier !== "lite" || typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY);
    const parsed = parseAssessmentData(raw);
    const snap = readAssessmentCompletion();
    const staleSnapshot = Boolean(snap?.tier && snap.tier !== "lite");
    const stalePlan =
      parsed?.planTier === "basic" || parsed?.planTier === "professional";
    const staleHeuristic =
      Boolean(parsed) &&
      !parsed?.planTier &&
      countStoredAnsweredSteps(parsed, "professional") > 3;
    if (staleSnapshot || stalePlan || staleHeuristic) {
      clearAssessmentCompletion();
      window.sessionStorage.removeItem(NEXIM_ASSESSMENT_STORAGE_KEY);
    }
  }, [tier]);

  useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY)
        : null;
    const stored = parseAssessmentData(raw);
    if (!stored) return;
    if (stored.unresolvedLegalViolations) {
      setUnresolvedLegalViolations(stored.unresolvedLegalViolations);
    }
    if (stored.familyMoving) setFamilyMoving(stored.familyMoving);
    if (stored.professionMain) setProfessionMain(stored.professionMain);
    else if (stored.specialty) {
      const m: Record<string, string> = {
        it: "it_software",
        medicine: "medicine",
        engineering: "engineering",
        business: "sales_business",
        art: "creative_arts",
        other: "other",
      };
      setProfessionMain(m[stored.specialty] ?? "other");
    }
    if (stored.professionOtherDetail) setProfessionOtherDetail(stored.professionOtherDetail);
    else if (stored.specialtyCustom) setProfessionOtherDetail(stored.specialtyCustom);
    if (stored.professionGlobalDemand) {
      setProfessionGlobalDemand(stored.professionGlobalDemand);
    } else if (stored.shortageListProfession) {
      setProfessionGlobalDemand(stored.shortageListProfession);
    }
    if (stored.otherLanguagesText) setOtherLanguagesText(stored.otherLanguagesText);
    if (stored.idealEnvironment) setIdealEnvironment(stored.idealEnvironment);
    if (stored.citizenshipCode) {
      const cm = countryOptions.find(
        (o) => o.code.toUpperCase() === stored.citizenshipCode!.toUpperCase(),
      );
      if (cm) setCitizenship(cm);
      else if (stored.citizenshipName) {
        setCitizenship({
          code: stored.citizenshipCode,
          name: stored.citizenshipName,
        });
      }
    }
    if (stored.residenceCode) {
      const rm = countryOptions.find(
        (o) => o.code.toUpperCase() === stored.residenceCode!.toUpperCase(),
      );
      if (rm) setResidence(rm);
      else if (stored.residenceName) {
        setResidence({
          code: stored.residenceCode,
          name: stored.residenceName,
        });
      }
    }
    if (stored.nativeLanguage) setNativeLanguage(stored.nativeLanguage);
    if (stored.ageYears) setAgeYears(stored.ageYears);
    if (stored.educationLevel) {
      setEducationLevel(migrateStoredEducationLevel(stored.educationLevel));
    }
    if (stored.linkedinGithub) setLinkedinGithub(stored.linkedinGithub);
    if (stored.workExperience) setWorkExperience(stored.workExperience);
    if (stored.englishLevel) {
      setEnglishLevel(migrateStoredLanguageLevel(stored.englishLevel));
    }
    if (stored.passportValidity) setPassportValidity(stored.passportValidity);
    if (stored.visaRefusalHistory) setVisaRefusalHistory(stored.visaRefusalHistory);
    if (stored.apostillesReadiness) setApostillesReadiness(stored.apostillesReadiness);
    if (stored.energyLevelAdaptation) {
      setEnergyLevelAdaptation(stored.energyLevelAdaptation);
    }
    if (stored.remoteIncomeAbroad) setRemoteIncomeAbroad(stored.remoteIncomeAbroad);
    if (stored.fundsSourceProvable) setFundsSourceProvable(stored.fundsSourceProvable);
    if (stored.basicRelocationFunds) setBasicRelocationFunds(stored.basicRelocationFunds);
  }, [countryOptions]);

  useEffect(() => {
    if (!tier) return;
    resumeHandledRef.current = false;
    setResumeGateReady(false);
    const stored =
      typeof window !== "undefined"
        ? parseAssessmentData(window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY))
        : null;
    const snapshot =
      typeof window !== "undefined" ? readAssessmentCompletion() : null;
    const storedAnswerCount = countStoredAnsweredSteps(stored, tier);
    const snapshotMatchesTier = snapshot?.tier === tier;
    const isCompleted =
      storedAnswerCount >= totalSteps ||
      Boolean(snapshot && snapshot.completed && snapshotMatchesTier && snapshot.answerCount >= totalSteps);
    if (isCompleted) return;
    if (snapshot?.completed && snapshotMatchesTier) {
      clearAssessmentCompletion();
    }

    const prevAnchor = tierHydrateAnchorRef.current;
    const firstHydration = prevAnchor === null;
    const tierChanged = prevAnchor !== null && prevAnchor !== tier;
    tierHydrateAnchorRef.current = tier;

    if (firstHydration || tierChanged) {
      const answerMap: QuestionAnswers = tierChanged
        ? answersRef.current
        : answersFromAssessmentData(stored);
      const idx = firstUnansweredQuestionIndex(tier, answerMap);
      if (idx !== -1) {
        setCurrentStep(idx);
      }
    }

    setResumeGateReady(true);
  }, [tier, totalSteps]);

  useEffect(() => {
    if (!tier) return;
    if (typeof window === "undefined") return;
    setPaymentGateReady(null);
    if (tier === "lite") {
      setPaymentComplete(true);
      setPaymentGateReady(true);
      return;
    }
    const raw = window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY);
    const stored = parseAssessmentData(raw);
    if (stored?.paymentConfirmed === true && stored.planTier === tier) {
      markTierPaid(tier);
    }
    if (!isTierPaid(tier)) {
      router.replace({ pathname: "/checkout", query: { tier } });
      setPaymentGateReady(false);
      return;
    }
    setActiveTier(tier);
    setPaymentComplete(true);
    setPaymentGateReady(true);
  }, [tier, router]);

  useEffect(() => {
    if (!tier || paymentGateReady !== true) return;
    if (resumeHandledRef.current) return;
    const stored = parseAssessmentData(
      window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY),
    );
    const snapshot = readAssessmentCompletion();
    const storedAnswerCount = countStoredAnsweredSteps(stored, tier);
    const snapshotMatchesTier = snapshot?.tier === tier;
    const isCompleted =
      storedAnswerCount >= totalSteps ||
      Boolean(snapshot && snapshot.completed && snapshotMatchesTier && snapshot.answerCount >= totalSteps);

    if (!isCompleted) {
      setResumeGateReady(true);
      return;
    }

    resumeHandledRef.current = true;

    if (hasStoredResultForTier(tier)) {
      setResumeGateReady(true);
      saveAssessmentCompletion({
        tier,
        answerCount: Math.max(totalSteps, snapshot?.answerCount ?? storedAnswerCount),
        completed: true,
        nextStage: "result",
        updatedAt: new Date().toISOString(),
      });
      router.replace({ pathname: "/result" });
      return;
    }

    setResumeGateReady(true);
    void runAnalysisAndRoute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentGateReady, router, tier, totalSteps]);

  const buildData = useCallback((): NeximAssessmentData | null => {
    const prev =
      typeof window !== "undefined"
        ? parseAssessmentData(
            window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY),
          )
        : null;

    const countryCode = "AI_SUGGEST";

    if (tier === "lite") {
      const hasAnyLite =
        Boolean(citizenship) ||
        isQuestionAnswered("ageYears", answers) ||
        Boolean(passportValidity) ||
        Boolean(prev);
      if (!hasAnyLite) return null;
    } else if (
      !citizenship &&
      !residence &&
      nativeLanguage.trim().length < 2 &&
      !prev
    ) {
      return null;
    }

    const professionOther =
      professionMain === "other"
        ? professionOtherDetail.trim() || undefined
        : professionMain
          ? undefined
          : prev?.professionOtherDetail;

    const base: NeximAssessmentData = {
      ...prev,
      countryCode,
      countryName: undefined,
      citizenshipCode: citizenship?.code ?? prev?.citizenshipCode,
      citizenshipName: citizenship?.name ?? prev?.citizenshipName,
      residenceCode: residence?.code ?? prev?.residenceCode,
      residenceName: residence?.name ?? prev?.residenceName,
      nativeLanguage: nativeLanguage.trim() || prev?.nativeLanguage,
      ageYears: ageYears.trim() || prev?.ageYears,
      planTier: tier ?? prev?.planTier,
      paymentConfirmed: paymentComplete ? true : prev?.paymentConfirmed,
      educationLevel: educationLevel || prev?.educationLevel,
      basicRelocationFunds: basicRelocationFunds || prev?.basicRelocationFunds,
      professionMain: professionMain || prev?.professionMain,
      professionOtherDetail: professionOther,
      familyMoving: familyMoving || prev?.familyMoving,
      unresolvedLegalViolations:
        unresolvedLegalViolations || prev?.unresolvedLegalViolations,
      linkedinGithub: linkedinGithub.trim() || prev?.linkedinGithub,
      workExperience: workExperience || prev?.workExperience,
      englishLevel: englishLevel || prev?.englishLevel,
      otherLanguagesText: otherLanguagesText.trim() || prev?.otherLanguagesText,
      professionGlobalDemand:
        professionGlobalDemand || prev?.professionGlobalDemand,
      passportValidity: passportValidity || prev?.passportValidity,
      visaRefusalHistory: visaRefusalHistory || prev?.visaRefusalHistory,
      apostillesReadiness: apostillesReadiness || prev?.apostillesReadiness,
      energyLevelAdaptation: energyLevelAdaptation || prev?.energyLevelAdaptation,
      remoteIncomeAbroad: remoteIncomeAbroad || prev?.remoteIncomeAbroad,
      fundsSourceProvable: fundsSourceProvable || prev?.fundsSourceProvable,
      idealEnvironment: idealEnvironment || prev?.idealEnvironment,
    };
    const dropFromPayload = [
      "hasJobOffer",
      "sponsorsInDestination",
      "diplomaVerification",
      "diplomaResult",
      "partnerHigherEducation",
      "targetLanguageLevel",
      "specialty",
      "specialtyCustom",
      "shortageListProfession",
      "maritalStatus",
      "familySize",
      "engCertType",
      "engCertScore",
      "langCertType",
      "langCertLevel",
    ] as const;
    for (const k of dropFromPayload) {
      delete (base as Record<string, unknown>)[k];
    }
    return base;
  }, [
    citizenship,
    residence,
    nativeLanguage,
    tier,
    paymentComplete,
    ageYears,
    educationLevel,
    basicRelocationFunds,
    professionMain,
    professionOtherDetail,
    familyMoving,
    unresolvedLegalViolations,
    linkedinGithub,
    workExperience,
    englishLevel,
    otherLanguagesText,
    professionGlobalDemand,
    passportValidity,
    visaRefusalHistory,
    apostillesReadiness,
    energyLevelAdaptation,
    remoteIncomeAbroad,
    fundsSourceProvable,
    idealEnvironment,
  ]);

  function persistPartial() {
    const p = buildData();
    if (!p || typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(NEXIM_ASSESSMENT_STORAGE_KEY);
    const prev = parseAssessmentData(raw);
    saveAssessment({ ...p, reportLocale: prev?.reportLocale });
  }

  const canAnswerCurrent =
    currentQuestion != null &&
    isQuestionAnswered(currentQuestion.id, answers);

  function surveyComplete(): boolean {
    if (!tier) return false;
    return getQuestionsForTier(tier).every((q) =>
      isQuestionAnswered(q.id, answers),
    );
  }

  function goNext() {
    if (!currentQuestion || !isQuestionAnswered(currentQuestion.id, answers)) {
      return;
    }
    persistPartial();
    if (currentStep < totalSteps - 1) setCurrentStep((x) => x + 1);
  }

  function goBack() {
    if (currentStep > 0) {
      setCurrentStep((x) => x - 1);
      persistPartial();
    }
  }

  /** Persist completed answers locally so they survive the magic-link round-trip. */
  function persistCompletedAnswers() {
    if (!tier) return null;
    const full = buildData();
    if (!full) return null;
    saveAssessment({
      ...full,
      paymentConfirmed: true,
      reportLocale: locale,
    });
    saveAssessmentCompletion({
      tier,
      answerCount: totalSteps,
      completed: true,
      nextStage: "result",
      updatedAt: new Date().toISOString(),
    });
    return full;
  }

  async function runAnalysisAndRoute() {
    if (!tier) return;
    const full = buildData();
    if (!full) {
      setSubmitError(t("questionnaireSaveFailed"));
      return;
    }
    setSubmitError(null);
    setSubmittingAi(true);
    console.log("[ANALYZE] POST /api/analyze payload", {
      locale,
      tier,
      answerKeys: Object.keys(full as Record<string, unknown>).length,
    });
    try {
      const res = await requestAnalysis({
        answers: {
          ...(full as unknown as Record<string, unknown>),
        },
        locale,
        tier,
      });
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(NEXIM_STRATEGY_RESULT_KEY, JSON.stringify(res));
        window.sessionStorage.setItem(NEXIM_RESULT_TIER_KEY, tier);
      }
      saveAssessmentCompletion({
        tier,
        answerCount: totalSteps,
        completed: true,
        nextStage: "result",
        updatedAt: new Date().toISOString(),
      });
      router.push({ pathname: "/result" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Analysis failed";
      setSubmitError(msg);
    } finally {
      setSubmittingAi(false);
    }
  }

  async function onGetResults() {
    if (submitLockRef.current || submittingAi) return;
    persistPartial();
    if (!surveyComplete()) {
      setSubmitError(t("questionnaireIncomplete"));
      return;
    }
    submitLockRef.current = true;
    setSubmitError(null);
    try {
      const full = persistCompletedAnswers();
      if (!full) {
        setSubmitError(t("questionnaireSaveFailed"));
        return;
      }
      await runAnalysisAndRoute();
    } finally {
      submitLockRef.current = false;
    }
  }

  /** Answer controls: ~60% width; centered text; wrapping for long CJK/Devanagari labels; min height + padding from prior spec. */
  const selectCls =
    "mt-3 ms-auto me-auto block w-[60%] min-h-[3.35rem] h-auto min-w-[min(100%,12rem)] max-w-full cursor-pointer rounded-xl border border-white/10 bg-[#030712]/80 px-4 py-4 text-center text-[1.2rem] leading-snug tracking-normal text-white whitespace-normal break-words shadow-inner outline-none transition focus:border-[#fbbf24]/50 focus:ring-2 focus:ring-[#fbbf24]/25 disabled:cursor-not-allowed";
  const labelCls =
    "mt-6 block max-w-full break-words text-sm font-medium text-white first:mt-0";
  const inputCls =
    "mt-3 ms-auto me-auto block w-[60%] min-h-[3.35rem] h-auto min-w-[min(100%,12rem)] max-w-full rounded-xl border border-white/10 bg-[#030712]/80 px-4 py-4 text-center text-[1.2rem] leading-snug tracking-normal text-white whitespace-normal break-words shadow-inner outline-none focus:border-[#fbbf24]/50 focus:ring-2 focus:ring-[#fbbf24]/25 disabled:cursor-not-allowed";

  const stepQuestionHeadingCls = tightScript
    ? "text-sm font-semibold tracking-normal text-[#fbbf24]"
    : "text-sm font-semibold uppercase tracking-[0.2em] text-[#fbbf24] rtl:normal-case";

  const stepTitle = currentQuestion
    ? t(currentQuestion.titleKey as "ageLabel")
    : "";
  const currentStage =
    tier === "professional"
      ? stageForQuestionIndex(tier, currentStep)
      : 1;

  const continueDisabled = !canAnswerCurrent;
  if (paymentGateReady !== true || !resumeGateReady) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-screen-2xl flex-1 flex-col items-center justify-center px-6 py-16 md:px-10">
        <p className="text-sm text-nexim-muted">{t("paymentGateLoading")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-6 py-12 md:px-10 md:py-16">
      {submittingAi ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#030712]/92 px-6 text-center backdrop-blur-md"
          role="alertdialog"
          aria-busy="true"
          aria-label={t("aiAnalyzingTitle")}
        >
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-[#fbbf24]" />
          </div>
          <div className="max-w-md">
            <p className="font-display text-lg font-semibold text-white md:text-xl">
              {t("aiAnalyzingTitle")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-nexim-muted">
              {t("aiAnalyzingHint")}
            </p>
          </div>
        </div>
      ) : null}
      <div className="mb-8">
        {tier === "professional" ? (
          <div
            className={`flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-nexim-muted md:gap-3 md:text-xs rtl:normal-case ${tightScript ? "tracking-normal" : "uppercase tracking-[0.18em]"}`}
          >
            {STAGE_DEFS.map((st, idx) => (
              <span key={st.id} className="flex items-center gap-2 md:gap-3">
                {idx > 0 ? <span className="text-white/20">—</span> : null}
                <span
                  className={
                    currentStage === st.id
                      ? "text-[#fbbf24]"
                      : currentStage > st.id
                        ? "text-nexim-text/90"
                        : "text-nexim-muted"
                  }
                >
                  {t(st.labelKey)}
                </span>
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => i).map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition ${
                n <= currentStep
                  ? "bg-[#fbbf24] shadow-[0_0_10px_rgba(251,191,36,0.45)]"
                  : "bg-white/[0.08]"
              }`}
            />
          ))}
        </div>
        <p
          className={`mt-3 text-xs font-semibold text-nexim-muted rtl:normal-case ${tightScript ? "tracking-normal" : "uppercase tracking-[0.2em]"}`}
        >
          {t("progress", { current: currentStep + 1, total: totalSteps })}
        </p>
      </div>

      <h1 className="font-display text-3xl font-semibold text-white rtl:font-arabic md:text-4xl">
        {t("title")}
      </h1>

      <div className={`mt-8 ${GLASS_SHELL}`}>
        <h2
          className={`max-w-full break-words ${stepQuestionHeadingCls}`}
        >
          {stepTitle}
        </h2>

        <div className={`mt-6 ${GLASS_CARD}`}>
          {currentQuestion ? (
            <QuestionnaireQuestionRenderer
              questionId={currentQuestion.id}
              t={t}
              countryOptions={countryOptions}
              labelCls={labelCls}
              inputCls={inputCls}
              selectCls={selectCls}
              ageYears={ageYears}
              setAgeYears={setAgeYears}
              citizenship={citizenship}
              setCitizenship={setCitizenship}
              passportValidity={passportValidity}
              setPassportValidity={setPassportValidity}
              educationLevel={educationLevel}
              setEducationLevel={setEducationLevel}
              englishLevel={englishLevel}
              setEnglishLevel={setEnglishLevel}
              unresolvedLegalViolations={unresolvedLegalViolations}
              setUnresolvedLegalViolations={setUnresolvedLegalViolations}
              familyMoving={familyMoving}
              setFamilyMoving={setFamilyMoving}
              basicRelocationFunds={basicRelocationFunds}
              setBasicRelocationFunds={setBasicRelocationFunds}
              residence={residence}
              setResidence={setResidence}
              nativeLanguage={nativeLanguage}
              setNativeLanguage={setNativeLanguage}
              professionMain={professionMain}
              setProfessionMain={setProfessionMain}
              professionOtherDetail={professionOtherDetail}
              setProfessionOtherDetail={setProfessionOtherDetail}
              linkedinGithub={linkedinGithub}
              setLinkedinGithub={setLinkedinGithub}
              workExperience={workExperience}
              setWorkExperience={setWorkExperience}
              professionGlobalDemand={professionGlobalDemand}
              setProfessionGlobalDemand={setProfessionGlobalDemand}
              otherLanguagesText={otherLanguagesText}
              setOtherLanguagesText={setOtherLanguagesText}
              visaRefusalHistory={visaRefusalHistory}
              setVisaRefusalHistory={setVisaRefusalHistory}
              apostillesReadiness={apostillesReadiness}
              setApostillesReadiness={setApostillesReadiness}
              energyLevelAdaptation={energyLevelAdaptation}
              setEnergyLevelAdaptation={setEnergyLevelAdaptation}
              remoteIncomeAbroad={remoteIncomeAbroad}
              setRemoteIncomeAbroad={setRemoteIncomeAbroad}
              fundsSourceProvable={fundsSourceProvable}
              setFundsSourceProvable={setFundsSourceProvable}
              idealEnvironment={idealEnvironment}
              setIdealEnvironment={setIdealEnvironment}
              familyMovingValues={FAMILY_MOVING_VALUES}
              basicRelocationFundValues={BASIC_RELOCATION_FUND_VALUES}
              professionMainValues={PROFESSION_MAIN_VALUES}
              expValues={EXP_VALUES}
              idealEnvValues={IDEAL_ENV_VALUES}
            />
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-nexim-text transition hover:border-white/25 hover:bg-white/[0.04]"
            >
              {t("backStep")}
            </button>
          )}
          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              disabled={continueDisabled}
              onClick={goNext}
              className="rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-8 py-3.5 text-sm font-semibold text-[#030712] shadow-[0_0_36px_-10px_rgba(251,191,36,0.5)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35 rtl:bg-gradient-to-l"
            >
              {t("continue")}
            </button>
          ) : (
            <button
              type="button"
              disabled={submittingAi}
              onClick={() => void onGetResults()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fbbf24] via-amber-300 to-[#f59e0b] px-10 py-4 text-base font-bold text-[#030712] shadow-[0_0_48px_-8px_rgba(251,191,36,0.55)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35 rtl:bg-gradient-to-l"
            >
              {submittingAi ? (
                <>
                  <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-[#030712]/25 border-t-[#030712]" />
                  <span>{t("getResultsLoading")}</span>
                </>
              ) : tier === "lite" ? (
                t("getFreeResult")
              ) : (
                t("getResults")
              )}
            </button>
          )}
        </div>
        {submitError ? (
          <p className="mt-4 text-center text-sm text-red-400" role="alert">
            {submitError}
          </p>
        ) : null}
      </div>

      <Link
        href="/"
        onClick={() => {
          clearNeximQuestionnaireDraftAndResults();
        }}
        className="mt-10 inline-flex w-fit text-sm font-medium text-[#fbbf24] underline-offset-4 transition hover:text-amber-200 hover:underline"
      >
        {t("back")}
      </Link>
    </div>
  );
}
