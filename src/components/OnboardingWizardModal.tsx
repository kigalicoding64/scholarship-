import React, { useState, useEffect, useTransition } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Globe2,
  BookOpen,
  DollarSign,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { detectUserCountryAndLanguage } from "@/lib/i18n";
import type { IndexSearchParams } from "@/routes/index";

export interface UserPreferences {
  academicLevel: string;
  region: string;
  fieldOfStudy: string;
  fundingType: string;
}

export const OnboardingWizardModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");

  const [preferences, setPreferences] = useState<UserPreferences>({
    academicLevel: "",
    region: "",
    fieldOfStudy: "",
    fundingType: "",
  });

  useEffect(() => {
    // Check if user has already finished onboarding
    const completed =
      typeof window !== "undefined" ? localStorage.getItem("has_completed_onboarding") : null;
    if (!completed) {
      detectUserCountryAndLanguage().then((lang) => {
        i18n.changeLanguage(lang);
        setSelectedLang(lang);
      });
      setIsOpen(true);
    }

    // Custom event listener to reopen from Navbar/Anywhere
    const handleOpenModal = () => {
      setCurrentStep(1);
      setIsOpen(true);
    };

    window.addEventListener("open-onboarding-wizard", handleOpenModal);
    return () => {
      window.removeEventListener("open-onboarding-wizard", handleOpenModal);
    };
  }, [i18n]);

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLang(langCode);
    startTransition(() => {
      i18n.changeLanguage(langCode);
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("app_language", langCode);
    }
  };

  const handleSelectPreference = (key: keyof UserPreferences, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("has_completed_onboarding", "true");
    }
    setIsOpen(false);

    // Map academicLevel to standard filter value
    let degreeQuery = "all";
    if (preferences.academicLevel === "undergraduate") degreeQuery = "Undergraduate";
    else if (preferences.academicLevel === "masters") degreeQuery = "Masters";
    else if (preferences.academicLevel === "phd") degreeQuery = "PhD";

    // Map region to standard filter value
    let regionQuery = "all";
    if (preferences.region === "east-africa") regionQuery = "East Africa";
    else if (preferences.region === "europe") regionQuery = "Europe & UK";
    else if (preferences.region === "north-america") regionQuery = "North America";

    // Map funding to filter
    let fundingQuery = "all";
    if (preferences.fundingType === "fully-funded") fundingQuery = "full";

    // Navigate to homepage with matching search/filter parameters
    navigate({
      to: "/",
      search: {
        degree: degreeQuery,
        region: regionQuery,
        funding: fundingQuery,
        field: preferences.fieldOfStudy || undefined,
      } as IndexSearchParams,
    });
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("has_completed_onboarding", "true");
    }
    setIsOpen(false);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
    { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-border/60 shadow-2xl rounded-2xl bg-card">
        {/* Header Progress Bar */}
        <div className="bg-slate-900 text-white p-6 pb-4 border-b border-amber-500/20">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> {t("wizardTitle")}
            </span>
            <span>{t("stepCount", { current: currentStep, total: totalSteps })}</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5 bg-slate-800" />

          <DialogTitle className="text-xl font-extrabold text-white mt-4 leading-snug">
            {currentStep === 1 && t("step1Title")}
            {currentStep === 2 && t("step2Title")}
            {currentStep === 3 && t("step3Title")}
            {currentStep === 4 && t("step4Title")}
            {currentStep === 5 && t("step5Title")}
          </DialogTitle>
        </div>

        {/* Dynamic Question Body */}
        <div className="p-6 space-y-4">
          {/* Step 1: Language */}
          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedLang === lang.code
                      ? "border-amber-500 bg-amber-500/10 text-foreground font-bold shadow-sm"
                      : "border-border/60 hover:border-amber-500/40 text-muted-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-semibold">{lang.name}</span>
                  </span>
                  {selectedLang === lang.code && <CheckCircle2 className="size-4 text-amber-500" />}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Academic Level */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "undergraduate", label: "Undergraduate", icon: GraduationCap },
                { id: "masters", label: "Master's Degree", icon: GraduationCap },
                { id: "phd", label: "PhD / Doctorate", icon: GraduationCap },
                { id: "certificate", label: "Short Courses", icon: BookOpen },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPreference("academicLevel", item.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col items-start gap-2 transition-all cursor-pointer ${
                    preferences.academicLevel === item.id
                      ? "border-amber-500 bg-amber-500/10 text-foreground font-bold shadow-sm"
                      : "border-border/60 hover:border-amber-500/40 text-muted-foreground"
                  }`}
                >
                  <item.icon className="size-5 text-amber-500" />
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Region */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "east-africa", label: "East Africa", sub: "Rwanda, Kenya, Tanzania, Uganda" },
                { id: "europe", label: "Europe & UK", sub: "UK, Germany, France, Sweden" },
                { id: "north-america", label: "North America", sub: "USA & Canada" },
                { id: "global", label: "Worldwide", sub: "Any Destination" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPreference("region", item.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    preferences.region === item.id
                      ? "border-amber-500 bg-amber-500/10 text-foreground font-bold shadow-sm"
                      : "border-border/60 hover:border-amber-500/40 text-muted-foreground"
                  }`}
                >
                  <Globe2 className="size-5 text-amber-500 mb-2" />
                  <div>
                    <span className="text-sm font-bold block">{item.label}</span>
                    <span className="text-[11px] text-muted-foreground">{item.sub}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Field of Study */}
          {currentStep === 4 && (
            <div className="space-y-2">
              {[
                { id: "stem", label: "STEM (Engineering, Computer Science, IT, Sciences)" },
                { id: "business", label: "Business, Economics, Finance & Management" },
                { id: "health", label: "Medicine, Public Health & Nursing" },
                { id: "humanities", label: "Arts, Law, Media & Social Sciences" },
                { id: "any", label: "Open to Any Academic Field" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPreference("fieldOfStudy", item.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    preferences.fieldOfStudy === item.id
                      ? "border-amber-500 bg-amber-500/10 text-foreground font-bold shadow-sm"
                      : "border-border/60 hover:border-amber-500/40 text-muted-foreground"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                  {preferences.fieldOfStudy === item.id && (
                    <CheckCircle2 className="size-4 text-amber-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 5: Funding Type */}
          {currentStep === 5 && (
            <div className="space-y-3">
              {[
                {
                  id: "fully-funded",
                  label: "100% Fully Funded",
                  desc: "Covers 100% tuition, monthly stipend, accommodation, and travel allowance.",
                },
                {
                  id: "partial",
                  label: "Tuition Waiver / Partial Grant",
                  desc: "Covers academic tuition fees only with student self-funded living costs.",
                },
                {
                  id: "stipend",
                  label: "Research / Monthly Living Stipend",
                  desc: "Provides living cost allowances and research mobility grants.",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPreference("fundingType", item.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    preferences.fundingType === item.id
                      ? "border-amber-500 bg-amber-500/10 text-foreground font-bold shadow-sm"
                      : "border-border/60 hover:border-amber-500/40 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="size-4 text-amber-500" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-border/40">
            {currentStep > 1 ? (
              <Button onClick={handleBack} size="sm" variant="ghost" className="text-xs">
                <ArrowLeft className="size-4 mr-1" /> {t("backBtn")}
              </Button>
            ) : (
              <Button
                onClick={handleSkip}
                size="sm"
                variant="ghost"
                className="text-xs text-muted-foreground"
              >
                {t("skipBtn")}
              </Button>
            )}

            <Button
              onClick={handleNext}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 ml-auto text-xs"
            >
              {currentStep === totalSteps ? t("findBtn") : t("nextBtn")}
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
