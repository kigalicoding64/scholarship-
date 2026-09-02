import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const NavbarControls: React.FC = () => {
  const { i18n } = useTranslation();
  const [, startTransition] = useTransition();

  const changeLanguage = (lang: string) => {
    startTransition(() => {
      i18n.changeLanguage(lang);
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("app_language", lang);
    }
  };

  const relaunchWizard = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-onboarding-wizard"));
    }
  };

  const currentLangLabel = () => {
    const lang = i18n.language || "en";
    switch (lang) {
      case "fr":
        return "FR";
      case "sw":
        return "SW";
      case "rw":
        return "RW";
      default:
        return "EN";
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Wizard Relauncher */}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={relaunchWizard}
        className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 h-8 text-xs font-semibold px-2.5"
      >
        <Sparkles className="size-3.5 text-amber-500" />
        <span className="hidden sm:inline">Opportunity Matcher</span>
      </Button>

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 uppercase font-bold text-xs h-8 px-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Globe className="size-3.5 text-amber-500" />
            <span>{currentLangLabel()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-38 text-xs">
          <DropdownMenuItem onClick={() => changeLanguage("en")} className="cursor-pointer">
            🇬🇧 English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("fr")} className="cursor-pointer">
            🇫🇷 Français
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("sw")} className="cursor-pointer">
            🇹🇿 Kiswahili
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("rw")} className="cursor-pointer">
            🇷🇼 Kinyarwanda
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
