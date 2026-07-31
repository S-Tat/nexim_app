"use client";

import { CountryPicker, type CountryOption } from "@/components/CountryPicker";
import { EDUCATION_VALUES } from "@/lib/education-level";
import { LANGUAGE_LEVEL_VALUES } from "@/lib/language-level";
import type { QuestionId } from "@/lib/questionnaire-questions";

type Props = {
  questionId: QuestionId;
  t: (key: string) => string;
  countryOptions: CountryOption[];
  labelCls: string;
  inputCls: string;
  selectCls: string;
  ageYears: string;
  setAgeYears: (v: string) => void;
  citizenship: CountryOption | null;
  setCitizenship: (v: CountryOption | null) => void;
  destinationCountry: CountryOption | null;
  setDestinationCountry: (v: CountryOption | null) => void;
  /** When true, professionMain is profession-only (no education/LinkedIn on same step). */
  singleMode?: boolean;
  passportValidity: string;
  setPassportValidity: (v: string) => void;
  educationLevel: string;
  setEducationLevel: (v: string) => void;
  englishLevel: string;
  setEnglishLevel: (v: string) => void;
  unresolvedLegalViolations: string;
  setUnresolvedLegalViolations: (v: string) => void;
  familyMoving: string;
  setFamilyMoving: (v: string) => void;
  basicRelocationFunds: string;
  setBasicRelocationFunds: (v: string) => void;
  residence: CountryOption | null;
  setResidence: (v: CountryOption | null) => void;
  nativeLanguage: string;
  setNativeLanguage: (v: string) => void;
  professionMain: string;
  setProfessionMain: (v: string) => void;
  professionOtherDetail: string;
  setProfessionOtherDetail: (v: string) => void;
  linkedinGithub: string;
  setLinkedinGithub: (v: string) => void;
  workExperience: string;
  setWorkExperience: (v: string) => void;
  professionGlobalDemand: string;
  setProfessionGlobalDemand: (v: string) => void;
  otherLanguagesText: string;
  setOtherLanguagesText: (v: string) => void;
  visaRefusalHistory: string;
  setVisaRefusalHistory: (v: string) => void;
  apostillesReadiness: string;
  setApostillesReadiness: (v: string) => void;
  energyLevelAdaptation: string;
  setEnergyLevelAdaptation: (v: string) => void;
  remoteIncomeAbroad: string;
  setRemoteIncomeAbroad: (v: string) => void;
  fundsSourceProvable: string;
  setFundsSourceProvable: (v: string) => void;
  idealEnvironment: string;
  setIdealEnvironment: (v: string) => void;
  familyMovingValues: readonly string[];
  basicRelocationFundValues: readonly string[];
  professionMainValues: readonly string[];
  expValues: readonly string[];
  idealEnvValues: readonly string[];
};

/**
 * Renders the input control for a single questionnaire question, keyed by
 * stable `questionId` — never by step index.
 */
export function QuestionnaireQuestionRenderer({
  questionId,
  t,
  countryOptions,
  labelCls,
  inputCls,
  selectCls,
  ageYears,
  setAgeYears,
  citizenship,
  setCitizenship,
  destinationCountry,
  setDestinationCountry,
  singleMode = false,
  passportValidity,
  setPassportValidity,
  educationLevel,
  setEducationLevel,
  englishLevel,
  setEnglishLevel,
  unresolvedLegalViolations,
  setUnresolvedLegalViolations,
  familyMoving,
  setFamilyMoving,
  basicRelocationFunds,
  setBasicRelocationFunds,
  residence,
  setResidence,
  nativeLanguage,
  setNativeLanguage,
  professionMain,
  setProfessionMain,
  professionOtherDetail,
  setProfessionOtherDetail,
  linkedinGithub,
  setLinkedinGithub,
  workExperience,
  setWorkExperience,
  professionGlobalDemand,
  setProfessionGlobalDemand,
  otherLanguagesText,
  setOtherLanguagesText,
  visaRefusalHistory,
  setVisaRefusalHistory,
  apostillesReadiness,
  setApostillesReadiness,
  energyLevelAdaptation,
  setEnergyLevelAdaptation,
  remoteIncomeAbroad,
  setRemoteIncomeAbroad,
  fundsSourceProvable,
  setFundsSourceProvable,
  idealEnvironment,
  setIdealEnvironment,
  familyMovingValues,
  basicRelocationFundValues,
  professionMainValues,
  expValues,
  idealEnvValues,
}: Props) {
  switch (questionId) {
    case "ageYears":
      return (
        <div>
          <label htmlFor="assessment-age" className={labelCls}>
            {t("ageLabel")}
          </label>
          <input
            id="assessment-age"
            type="number"
            inputMode="numeric"
            min={16}
            max={100}
            value={ageYears}
            onChange={(e) => setAgeYears(e.target.value)}
            className={inputCls}
            aria-describedby="assessment-age-hint"
          />
          <p id="assessment-age-hint" className="mt-2 text-xs text-nexim-muted">
            {t("ageHint")}
          </p>
        </div>
      );
    case "citizenship":
      return (
        <div>
          <label
            htmlFor="assessment-citizenship"
            className="block max-w-full break-words text-base font-medium text-white"
          >
            {t("basicCitizenshipLabel")}
          </label>
          <CountryPicker
            inputId="assessment-citizenship"
            options={countryOptions}
            selected={citizenship}
            onSelectedChange={setCitizenship}
          />
        </div>
      );
    case "destinationCountry":
      return (
        <div>
          <label
            htmlFor="assessment-destination"
            className="block max-w-full break-words text-base font-medium text-white"
          >
            {t("destinationCountryLabel")}
          </label>
          <CountryPicker
            inputId="assessment-destination"
            options={countryOptions}
            selected={destinationCountry}
            onSelectedChange={setDestinationCountry}
          />
        </div>
      );
    case "passportValidity":
      return (
        <div>
          <label htmlFor="assessment-passport" className={labelCls}>
            {t("q11Label")}
          </label>
          <select
            id="assessment-passport"
            value={passportValidity}
            onChange={(e) => setPassportValidity(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="gt2y">{t("passport_gt2y")}</option>
            <option value="lt1y">{t("passport_lt1y")}</option>
            <option value="lt6m">{t("passport_lt6m")}</option>
          </select>
        </div>
      );
    case "educationLevel":
      return (
        <div>
          <label htmlFor="assessment-edu" className={labelCls}>
            {t("basicEducationLabel")}
          </label>
          <select
            id="assessment-edu"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {EDUCATION_VALUES.map((k) => (
              <option key={k} value={k}>
                {t(`education_${k}`)}
              </option>
            ))}
          </select>
        </div>
      );
    case "englishLevel":
      return (
        <div>
          <label htmlFor="assessment-eng" className={labelCls}>
            {t("q8Label")}
          </label>
          <select
            id="assessment-eng"
            value={englishLevel}
            onChange={(e) => setEnglishLevel(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {LANGUAGE_LEVEL_VALUES.map((k) => (
              <option key={k} value={k}>
                {t(`lang_${k}`)}
              </option>
            ))}
          </select>
        </div>
      );
    case "unresolvedLegalViolations":
      return (
        <div>
          <label htmlFor="assessment-legal" className={labelCls}>
            {t("legalViolationsLabel")}
          </label>
          <select
            id="assessment-legal"
            value={unresolvedLegalViolations}
            onChange={(e) => setUnresolvedLegalViolations(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="no">{t("legalViolations_no")}</option>
            <option value="yes">{t("legalViolations_yes")}</option>
          </select>
          <p className="mt-3 text-xs leading-relaxed text-nexim-muted">
            {t("legalViolationsHint")}
          </p>
        </div>
      );
    case "familyMoving":
      return (
        <div>
          <label htmlFor="assessment-family-moving" className={labelCls}>
            {t("familyMovingLabel")}
          </label>
          <select
            id="assessment-family-moving"
            value={familyMoving}
            onChange={(e) => setFamilyMoving(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {familyMovingValues.map((k) => (
              <option key={k} value={k}>
                {t(`familyMoving_${k}`)}
              </option>
            ))}
          </select>
        </div>
      );
    case "basicRelocationFunds":
      return (
        <div>
          <label htmlFor="assessment-basic-funds" className={labelCls}>
            {t("basicRelocationLabel")}
          </label>
          <select
            id="assessment-basic-funds"
            value={basicRelocationFunds}
            onChange={(e) => setBasicRelocationFunds(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {basicRelocationFundValues.map((k) => (
              <option key={k} value={k}>
                {t(`basic_relocate_${k}`)}
              </option>
            ))}
          </select>
        </div>
      );
    case "residence":
      return (
        <div>
          <label
            htmlFor="assessment-residence"
            className="block max-w-full break-words text-base font-medium text-white"
          >
            {t("basicResidenceLabel")}
          </label>
          <CountryPicker
            inputId="assessment-residence"
            options={countryOptions}
            selected={residence}
            onSelectedChange={setResidence}
          />
        </div>
      );
    case "nativeLanguage":
      return (
        <div>
          <label htmlFor="assessment-native-lang" className={labelCls}>
            {t("basicNativeLanguageLabel")}
          </label>
          <input
            id="assessment-native-lang"
            type="text"
            autoComplete="off"
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value)}
            className={inputCls}
            placeholder={t("basicNativeLanguagePlaceholder")}
            aria-describedby="assessment-native-lang-hint"
          />
          <p id="assessment-native-lang-hint" className="mt-2 text-xs text-nexim-muted">
            {t("basicNativeLanguageHint")}
          </p>
        </div>
      );
    case "professionMain":
      if (singleMode) {
        return (
          <div>
            <label htmlFor="assessment-profession-main" className={labelCls}>
              {t("professionMainLabel")}
            </label>
            <select
              id="assessment-profession-main"
              value={professionMain}
              onChange={(e) => {
                const v = e.target.value;
                setProfessionMain(v);
                if (v !== "other") setProfessionOtherDetail("");
              }}
              className={selectCls}
            >
              <option value="">{t("selectPlaceholder")}</option>
              {professionMainValues.map((k) => (
                <option key={k} value={k}>
                  {t(`profession_${k}`)}
                </option>
              ))}
            </select>
            {professionMain === "other" ? (
              <div className="mt-4">
                <label htmlFor="assessment-profession-other" className={labelCls}>
                  {t("professionOtherLabel")}
                </label>
                <input
                  id="assessment-profession-other"
                  type="text"
                  value={professionOtherDetail}
                  onChange={(e) => setProfessionOtherDetail(e.target.value)}
                  className={inputCls}
                  autoComplete="off"
                  placeholder={t("professionOtherPlaceholder")}
                />
              </div>
            ) : null}
          </div>
        );
      }
      return (
        <div>
          <label htmlFor="assessment-edu-pro" className={labelCls}>
            {t("basicEducationLabel")}
          </label>
          <select
            id="assessment-edu-pro"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {EDUCATION_VALUES.map((k) => (
              <option key={k} value={k}>
                {t(`education_${k}`)}
              </option>
            ))}
          </select>
          <label htmlFor="assessment-profession-main" className={`${labelCls} mt-8`}>
            {t("professionMainLabel")}
          </label>
          <select
            id="assessment-profession-main"
            value={professionMain}
            onChange={(e) => {
              const v = e.target.value;
              setProfessionMain(v);
              if (v !== "other") setProfessionOtherDetail("");
            }}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {professionMainValues.map((k) => (
              <option key={k} value={k}>
                {t(`profession_${k}`)}
              </option>
            ))}
          </select>
          {professionMain === "other" ? (
            <div className="mt-4">
              <label htmlFor="assessment-profession-other" className={labelCls}>
                {t("professionOtherLabel")}
              </label>
              <input
                id="assessment-profession-other"
                type="text"
                value={professionOtherDetail}
                onChange={(e) => setProfessionOtherDetail(e.target.value)}
                className={inputCls}
                autoComplete="off"
                placeholder={t("professionOtherPlaceholder")}
              />
            </div>
          ) : null}
          {professionMain === "it_software" ? (
            <div className="mt-5">
              <label htmlFor="assessment-linkedin" className={labelCls}>
                {t("linkedinLabel")}
              </label>
              <input
                id="assessment-linkedin"
                type="url"
                value={linkedinGithub}
                onChange={(e) => setLinkedinGithub(e.target.value)}
                className={inputCls}
                autoComplete="off"
                placeholder={t("linkedinPlaceholder")}
              />
              <p className="mt-1 text-xs text-nexim-muted">{t("linkedinHint")}</p>
            </div>
          ) : null}
        </div>
      );
    case "workExperience":
      return (
        <div>
          <label htmlFor="assessment-exp" className={labelCls}>
            {t("experienceLabel")}
          </label>
          <select
            id="assessment-exp"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {expValues.map((k) => (
              <option key={k} value={k}>
                {t(k)}
              </option>
            ))}
          </select>
        </div>
      );
    case "professionGlobalDemand":
      return (
        <div>
          <label htmlFor="assessment-global-demand" className={labelCls}>
            {t("globalDemandLabel")}
          </label>
          <select
            id="assessment-global-demand"
            value={professionGlobalDemand}
            onChange={(e) => setProfessionGlobalDemand(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="yes">{t("globalDemand_yes")}</option>
            <option value="no">{t("globalDemand_no")}</option>
            <option value="unknown">{t("globalDemand_unknown")}</option>
          </select>
        </div>
      );
    case "otherLanguagesText":
      return (
        <div>
          <label htmlFor="assessment-other-langs" className={labelCls}>
            {t("otherLanguagesLabel")}
          </label>
          <textarea
            id="assessment-other-langs"
            rows={4}
            value={otherLanguagesText}
            onChange={(e) => setOtherLanguagesText(e.target.value)}
            className={`${inputCls} min-h-[6rem] resize-y py-3 text-start text-sm leading-relaxed`}
            autoComplete="off"
            placeholder={t("otherLanguagesPlaceholder")}
          />
          <p className="mt-2 text-xs text-nexim-muted">{t("otherLanguagesHint")}</p>
        </div>
      );
    case "visaRefusalHistory":
      return (
        <div>
          <label htmlFor="assessment-visa" className={labelCls}>
            {t("q12Label")}
          </label>
          <select
            id="assessment-visa"
            value={visaRefusalHistory}
            onChange={(e) => setVisaRefusalHistory(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="none">{t("visa_refusal_none")}</option>
            <option value="schengen">{t("visa_refusal_schengen")}</option>
            <option value="us_ca">{t("visa_refusal_us_ca")}</option>
          </select>
        </div>
      );
    case "apostillesReadiness":
      return (
        <div>
          <label htmlFor="assessment-apostille" className={labelCls}>
            {t("q13Label")}
          </label>
          <select
            id="assessment-apostille"
            value={apostillesReadiness}
            onChange={(e) => setApostillesReadiness(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="all">{t("apostilles_all")}</option>
            <option value="partial">{t("apostilles_partial")}</option>
            <option value="none">{t("apostilles_none")}</option>
          </select>
        </div>
      );
    case "energy_level_adaptation":
      return (
        <div>
          <label htmlFor="assessment-energy-level" className={labelCls}>
            {t("energyLevelAdaptationLabel")}
          </label>
          <select
            id="assessment-energy-level"
            value={energyLevelAdaptation}
            onChange={(e) => setEnergyLevelAdaptation(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="springboard">{t("energyLevelAdaptation_springboard")}</option>
            <option value="work_life_balance">{t("energyLevelAdaptation_work_life_balance")}</option>
            <option value="safe_haven">{t("energyLevelAdaptation_safe_haven")}</option>
          </select>
        </div>
      );
    case "remoteIncomeAbroad":
      return (
        <div>
          <label htmlFor="assessment-remote" className={labelCls}>
            {t("income2500Label")}
          </label>
          <select
            id="assessment-remote"
            value={remoteIncomeAbroad}
            onChange={(e) => setRemoteIncomeAbroad(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="yes">{t("income2500_yes")}</option>
            <option value="no">{t("income2500_no")}</option>
          </select>
        </div>
      );
    case "fundsSourceProvable":
      return (
        <div>
          <label htmlFor="assessment-funds" className={labelCls}>
            {t("q17Label")}
          </label>
          <select
            id="assessment-funds"
            value={fundsSourceProvable}
            onChange={(e) => setFundsSourceProvable(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="yes">{t("funds_proof_yes")}</option>
            <option value="no">{t("funds_proof_no")}</option>
          </select>
        </div>
      );
    case "idealEnvironment":
      return (
        <div>
          <label htmlFor="assessment-ideal-env" className={labelCls}>
            {t("idealEnvironmentLabel")}
          </label>
          <select
            id="assessment-ideal-env"
            value={idealEnvironment}
            onChange={(e) => setIdealEnvironment(e.target.value)}
            className={selectCls}
          >
            <option value="">{t("selectPlaceholder")}</option>
            {idealEnvValues.map((k) => (
              <option key={k} value={k}>
                {t(`idealEnv_${k}`)}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
}
