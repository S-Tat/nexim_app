import type { NeximAssessmentData, PlanTier } from "@/lib/assessment-storage";

export type ResultTableRow = {
  id: string;
  parameterKey: string;
  valueKey: string;
  recKey: string;
};

/** Keys for `result.tableParam.*` and value/rec lookups */
export const BASIC_TABLE_ROWS: ResultTableRow[] = [
  { id: "citizenship", parameterKey: "tableParamCitizenship", valueKey: "valCitizenship", recKey: "tableRecCitizenship" },
  { id: "residence", parameterKey: "tableParamResidence", valueKey: "valResidence", recKey: "tableRecResidence" },
  { id: "nativeLanguage", parameterKey: "tableParamNativeLanguage", valueKey: "valNativeLanguage", recKey: "tableRecNativeLanguage" },
  { id: "legalViolations", parameterKey: "tableParamLegalViolations", valueKey: "valLegalViolations", recKey: "tableRecLegalViolations" },
  { id: "age", parameterKey: "tableParamAge", valueKey: "valAge", recKey: "tableRecAge" },
  { id: "language", parameterKey: "tableParamLanguage", valueKey: "valLanguage", recKey: "tableRecLanguage" },
  { id: "education", parameterKey: "tableParamEducation", valueKey: "valEducation", recKey: "tableRecEducation" },
  {
    id: "relocationFunds",
    parameterKey: "tableParamRelocationFunds",
    valueKey: "valRelocationFunds",
    recKey: "tableRecRelocationFunds",
  },
];

export const FULL_TABLE_ROWS: ResultTableRow[] = [
  { id: "citizenship", parameterKey: "tableParamCitizenship", valueKey: "valCitizenship", recKey: "tableRecCitizenship" },
  { id: "residence", parameterKey: "tableParamResidence", valueKey: "valResidence", recKey: "tableRecResidence" },
  { id: "nativeLanguage", parameterKey: "tableParamNativeLanguage", valueKey: "valNativeLanguage", recKey: "tableRecNativeLanguage" },
  { id: "legalViolations", parameterKey: "tableParamLegalViolations", valueKey: "valLegalViolations", recKey: "tableRecLegalViolations" },
  { id: "age", parameterKey: "tableParamAge", valueKey: "valAge", recKey: "tableRecAge" },
  { id: "familyMoving", parameterKey: "tableParamFamilyMoving", valueKey: "valFamilyMoving", recKey: "tableRecFamilyMoving" },
  { id: "professionMain", parameterKey: "tableParamProfessionMain", valueKey: "valProfessionMain", recKey: "tableRecProfessionMain" },
  { id: "experience", parameterKey: "tableParamExperience", valueKey: "valExperience", recKey: "tableRecExperience" },
  { id: "globalDemand", parameterKey: "tableParamGlobalDemand", valueKey: "valGlobalDemand", recKey: "tableRecGlobalDemand" },
  { id: "english", parameterKey: "tableParamEnglish", valueKey: "valEnglish", recKey: "tableRecEnglish" },
  { id: "otherLanguages", parameterKey: "tableParamOtherLanguages", valueKey: "valOtherLanguages", recKey: "tableRecOtherLanguages" },
  { id: "passport", parameterKey: "tableParamPassport", valueKey: "valPassport", recKey: "tableRecPassport" },
  { id: "visa", parameterKey: "tableParamVisa", valueKey: "valVisa", recKey: "tableRecVisa" },
  { id: "apostille", parameterKey: "tableParamApostille", valueKey: "valApostille", recKey: "tableRecApostille" },
  { id: "savings", parameterKey: "tableParamSavings", valueKey: "valSavings", recKey: "tableRecSavings" },
  { id: "remote2500", parameterKey: "tableParamRemote2500", valueKey: "valRemote2500", recKey: "tableRecRemote2500" },
  { id: "funds", parameterKey: "tableParamFunds", valueKey: "valFunds", recKey: "tableRecFunds" },
  { id: "idealEnv", parameterKey: "tableParamIdealEnv", valueKey: "valIdealEnv", recKey: "tableRecIdealEnv" },
  { id: "country", parameterKey: "tableParamCountry", valueKey: "valCountry", recKey: "tableRecCountry" },
];

export function tableRowsForTier(tier: PlanTier | null | undefined): ResultTableRow[] {
  if (tier === "basic") return BASIC_TABLE_ROWS;
  return FULL_TABLE_ROWS;
}
