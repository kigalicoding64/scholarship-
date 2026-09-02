import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      wizardTitle: "Opportunity Matcher",
      stepCount: "Step {{current}} of {{total}}",
      step1Title: "Select your preferred language",
      step2Title: "What academic level are you pursuing?",
      step3Title: "Where do you want to study?",
      step4Title: "What is your main field of study?",
      step5Title: "What level of funding do you need?",
      nextBtn: "Next",
      findBtn: "Find My Opportunities",
      backBtn: "Back",
      skipBtn: "Skip for now",
      matcherBadge: "AI Preference Matcher",
      langSelectorLabel: "Language",
    },
  },
  fr: {
    translation: {
      wizardTitle: "Assistant d'opportunités",
      stepCount: "Étape {{current}} sur {{total}}",
      step1Title: "Choisissez votre langue préférée",
      step2Title: "Quel niveau d'études poursuivez-vous ?",
      step3Title: "Où souhaitez-vous étudier ?",
      step4Title: "Quel est votre domaine d'études principal ?",
      step5Title: "Quel niveau de financement recherchez-vous ?",
      nextBtn: "Suivant",
      findBtn: "Trouver mes opportunités",
      backBtn: "Retour",
      skipBtn: "Passer pour l'instant",
      matcherBadge: "Sélectionneur IA",
      langSelectorLabel: "Langue",
    },
  },
  sw: {
    translation: {
      wizardTitle: "Msaidizi wa Nafasi",
      stepCount: "Hatua {{current}} kati ya {{total}}",
      step1Title: "Chagua lugha unayopendelea",
      step2Title: "Je, unatafuta kiwango gani cha elimu?",
      step3Title: "Unapendelea kusoma wapi?",
      step4Title: "Je, unadhani masomo yako yapo sekta gani?",
      step5Title: "Unahitaji msaada wa kiwango gani cha kifedha?",
      nextBtn: "Fuata",
      findBtn: "Tafuta Nafasi Zangu",
      backBtn: "Rudi",
      skipBtn: "Ruka kwa sasa",
      matcherBadge: "Mtafutaji Nafasi",
      langSelectorLabel: "Lugha",
    },
  },
  rw: {
    translation: {
      wizardTitle: "Shaka Amahirwe",
      stepCount: "Intambwe {{current}} kuri {{total}}",
      step1Title: "Hitamo ururimi wifuza gukoresha",
      step2Title: "Ni icyiciro ki cy'amashuri ushakamo amahirwe?",
      step3Title: "Wifuza kwiga mu kuhe gihugu/akarere?",
      step4Title: "Ni mu buhe bwoko bw'amasomo ushaka kwiga?",
      step5Title: "Ukeneye inkunga y'ubushobozi ingana iki?",
      nextBtn: "Komeza",
      findBtn: "Shaka Amahirwe Yanjye",
      backBtn: "Subira inyuma",
      skipBtn: "Reka gukomeza",
      matcherBadge: "Guhuza Amahirwe",
      langSelectorLabel: "Ururimi",
    },
  },
};

export const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  RW: "rw",
  TZ: "sw",
  KE: "sw",
  UG: "en",
  FR: "fr",
  CD: "fr",
  BI: "fr",
  BE: "fr",
  CA: "en",
  US: "en",
  GB: "en",
};

export const getStoredLanguage = (): string => {
  if (typeof window === "undefined") return "en";
  try {
    return localStorage.getItem("app_language") || "en";
  } catch {
    return "en";
  }
};

export const detectUserCountryAndLanguage = async (): Promise<string> => {
  if (typeof window === "undefined") return "en";
  const savedLang = getStoredLanguage();
  if (savedLang && savedLang !== "en") return savedLang;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return savedLang || "en";
    const data = await res.json();
    const detectedLang = COUNTRY_LANGUAGE_MAP[data.country_code] || savedLang || "en";
    localStorage.setItem("app_language", detectedLang);
    return detectedLang;
  } catch {
    return savedLang || "en";
  }
};

// Initialize i18next
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
