import type { NeximAssessmentData } from "@/lib/assessment-storage";
import { getCountryName } from "@/lib/countries";
import { educationTranslationKey } from "@/lib/education-level";
import { migrateStoredLanguageLevel } from "@/lib/language-level";
import type { ResultTableRow } from "@/lib/build-assessment-table";

const PROFESSION_KEYS = [
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

const IDEAL_ENV_KEYS = [
  "warm_sea",
  "temperate",
  "high_living_cold_ok",
  "megacity",
] as const;

/**
 * Formats a questionnaire table cell for PDF / CSV / UI (assessment namespace keys).
 */
export function formatAssessmentCell(
  row: ResultTableRow,
  data: NeximAssessmentData | null,
  locale: string,
  ta: (key: string) => string,
): string {
  if (!data) return "—";
  const t = ta;
  switch (row.id) {
    case "country":
      if (data.countryCode === "AI_SUGGEST") return t("valAiSuggestedDestination");
      return getCountryName(data.countryCode, locale) ?? data.countryName ?? data.countryCode;
    case "citizenship":
      return data.citizenshipCode
        ? getCountryName(data.citizenshipCode, locale) ?? data.citizenshipName ?? data.citizenshipCode
        : "—";
    case "residence":
      return data.residenceCode
        ? getCountryName(data.residenceCode, locale) ?? data.residenceName ?? data.residenceCode
        : "—";
    case "nativeLanguage":
      return data.nativeLanguage?.trim() || "—";
    case "legalViolations":
      if (data.unresolvedLegalViolations === "yes") return t("legalViolations_yes");
      if (data.unresolvedLegalViolations === "no") return t("legalViolations_no");
      return "—";
    case "age":
      return data.ageYears?.trim() || "—";
    case "language": {
      const lk = migrateStoredLanguageLevel(data.englishLevel);
      return lk ? t(`lang_${lk}` as "lang_none") : "—";
    }
    case "education":
      return data.educationLevel
        ? t(`education_${educationTranslationKey(data.educationLevel)}` as "education_phd")
        : "—";
    case "relocationFunds":
      return data.basicRelocationFunds
        ? t(`basic_relocate_${data.basicRelocationFunds}` as "basic_relocate_up_to_5000")
        : "—";
    case "familyMoving": {
      const fm = data.familyMoving;
      if (!fm) return "—";
      return t(`familyMoving_${fm}` as "familyMoving_solo");
    }
    case "professionMain": {
      const pm = data.professionMain;
      if (!pm) return "—";
      if (pm === "other") {
        const custom = data.professionOtherDetail?.trim();
        return custom && custom.length > 0 ? custom : t("profession_other");
      }
      if ((PROFESSION_KEYS as readonly string[]).includes(pm)) {
        return t(`profession_${pm}` as "profession_it_software");
      }
      return pm;
    }
    case "experience":
      return data.workExperience ? t(data.workExperience as "exp_0_2") : "—";
    case "globalDemand":
      return data.professionGlobalDemand
        ? t(
            data.professionGlobalDemand === "yes"
              ? "globalDemand_yes"
              : data.professionGlobalDemand === "no"
                ? "globalDemand_no"
                : "globalDemand_unknown",
          )
        : "—";
    case "english": {
      const le = migrateStoredLanguageLevel(data.englishLevel);
      return le ? t(`lang_${le}` as "lang_none") : "—";
    }
    case "otherLanguages":
      return data.otherLanguagesText?.trim() || "—";
    case "passport":
      return data.passportValidity
        ? t(
            data.passportValidity === "gt2y"
              ? "passport_gt2y"
              : data.passportValidity === "lt1y"
                ? "passport_lt1y"
                : "passport_lt6m",
          )
        : "—";
    case "visa":
      return data.visaRefusalHistory
        ? t(
            data.visaRefusalHistory === "none"
              ? "visa_refusal_none"
              : data.visaRefusalHistory === "schengen"
                ? "visa_refusal_schengen"
                : "visa_refusal_us_ca",
          )
        : "—";
    case "apostille":
      return data.apostillesReadiness
        ? t(
            data.apostillesReadiness === "all"
              ? "apostilles_all"
              : data.apostillesReadiness === "partial"
                ? "apostilles_partial"
                : "apostilles_none",
          )
        : "—";
    case "savings":
      if (!data.energyLevelAdaptation) return "—";
      switch (data.energyLevelAdaptation) {
        case "springboard":
          return t("energyLevelAdaptation_springboard");
        case "work_life_balance":
          return t("energyLevelAdaptation_work_life_balance");
        case "safe_haven":
          return t("energyLevelAdaptation_safe_haven");
        default:
          return data.energyLevelAdaptation;
      }
    case "remote2500":
      return data.remoteIncomeAbroad
        ? data.remoteIncomeAbroad === "yes"
          ? t("income2500_yes")
          : t("income2500_no")
        : "—";
    case "funds":
      return data.fundsSourceProvable
        ? data.fundsSourceProvable === "yes"
          ? t("funds_proof_yes")
          : t("funds_proof_no")
        : "—";
    case "idealEnv": {
      const ie = data.idealEnvironment;
      if (!ie) return "—";
      if ((IDEAL_ENV_KEYS as readonly string[]).includes(ie)) {
        return t(`idealEnv_${ie}` as "idealEnv_warm_sea");
      }
      return ie;
    }
    default:
      return "—";
  }
}
