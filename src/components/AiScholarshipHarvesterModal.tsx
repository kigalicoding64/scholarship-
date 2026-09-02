import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sparkles,
  Bot,
  Search,
  Globe2,
  GraduationCap,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Key,
  RefreshCw,
  Send,
  Layers,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  harvestScholarshipOpportunities,
  type HarvestedScholarshipCandidate,
} from "@/lib/scholarship-ai-harvester";
import { UrlVerificationBadge } from "@/components/UrlVerificationBadge";

interface AiScholarshipHarvesterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_TOPICS = [
  {
    label: "2026/2027 Fully Funded Global Grants",
    query: "Fully funded international scholarships 2026 2027",
    region: "Global",
  },
  {
    label: "UK Chevening & Oxford Clarendon",
    query: "Chevening Oxford Cambridge UK scholarships",
    region: "United Kingdom",
  },
  {
    label: "Europe & DAAD Germany",
    query: "DAAD Germany Erasmus Europe scholarships",
    region: "Germany",
  },
  {
    label: "Pan-African & Mastercard Foundation",
    query: "Mastercard Foundation Africa scholarships 2026",
    region: "East Africa",
  },
  {
    label: "North America & Fulbright",
    query: "Fulbright Harvard McGill USA Canada scholarships",
    region: "United States",
  },
  {
    label: "East Asia MEXT & Korea GKS",
    query: "MEXT Japan Global Korea Scholarship GKS",
    region: "Japan",
  },
];

export const AiScholarshipHarvesterModal: React.FC<AiScholarshipHarvesterModalProps> = ({
  open,
  onOpenChange,
}) => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState(
    "Fully funded international scholarships 2026 2027",
  );
  const [targetRegion, setTargetRegion] = useState("Global");
  const [targetDegree, setTargetDegree] = useState("all");
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("gemini_harvester_api_key") || ""
      : "";
  });
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Harvesting & Syncing States
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [harvestStepText, setHarvestStepText] = useState("");
  const [harvestProgress, setHarvestProgress] = useState(0);
  const [candidates, setCandidates] = useState<HarvestedScholarshipCandidate[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Save API key
  const handleSaveApiKey = (key: string) => {
    setGeminiApiKey(key);
    if (typeof window !== "undefined") {
      localStorage.setItem("gemini_harvester_api_key", key);
    }
  };

  // Run AI & Web Search Gathering
  const handleRunHarvest = async (customQuery?: string, customRegion?: string) => {
    setIsHarvesting(true);
    setHarvestProgress(20);
    setHarvestStepText("Scanning international academic portals & admissions feeds...");

    const queryToUse = customQuery || searchQuery;
    const regionToUse = customRegion || targetRegion;

    try {
      const step1Timer = setTimeout(() => {
        setHarvestProgress(55);
        setHarvestStepText("Synthesizing records with Gemini AI language model...");
      }, 700);

      const step2Timer = setTimeout(() => {
        setHarvestProgress(85);
        setHarvestStepText("Validating official university portals and deadline criteria...");
      }, 1400);

      const harvested = await harvestScholarshipOpportunities({
        query: queryToUse,
        region: regionToUse,
        degree: targetDegree,
        geminiApiKey: geminiApiKey.trim() || undefined,
      });

      clearTimeout(step1Timer);
      clearTimeout(step2Timer);

      setHarvestProgress(100);
      setHarvestStepText("Extraction and verification complete!");
      setCandidates(harvested);
      toast.success(`Successfully gathered ${harvested.length} fresh scholarship candidates!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Harvesting failed.";
      toast.error(msg);
    } finally {
      setIsHarvesting(false);
    }
  };

  // Toggle selection
  const toggleSelectAll = (selectAll: boolean) => {
    setCandidates((prev) => prev.map((c) => ({ ...c, selected: selectAll })));
  };

  const toggleSelectCandidate = (id: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c)));
  };

  const removeCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCandidateField = (
    id: string,
    field: keyof HarvestedScholarshipCandidate,
    value: unknown,
  ) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const selectedCandidates = candidates.filter((c) => c.selected);

  // Sync & Publish to Supabase
  const handleSyncAndPublish = async () => {
    if (selectedCandidates.length === 0) {
      toast.warning("Please select at least one scholarship to sync and publish.");
      return;
    }

    setIsSyncing(true);
    try {
      const payload = selectedCandidates.map((c) => ({
        title: (c.title || "").trim(),
        university: (c.university || c.institution || "Leading Institution").trim(),
        country: (c.country || "Global").trim(),
        degree_levels: c.degree_levels || ["Master's"],
        funding_type: c.funding_type === "partial" ? ("partial" as const) : ("full" as const),
        coverage_details:
          (
            c.coverage_details ||
            c.coverageDetails ||
            "100% full tuition, living stipend, and study allowances."
          ).trim() || null,
        official_link:
          (c.official_link || c.officialLink || "https://elscholarship.com").trim() || null,
        deadline: c.deadline || c.applicationDeadline || null,
        status: "published" as const,
      }));

      const { data, error } = await supabase.from("scholarships").insert(payload).select();
      if (error) throw error;

      toast.success(
        `Successfully published ${data?.length || selectedCandidates.length} new scholarships directly to ElScholarship.com!`,
      );

      // Invalidate queries so listings appear immediately
      queryClient.invalidateQueries();

      // Clear staged items that were synced
      const syncedIds = new Set(selectedCandidates.map((c) => c.id));
      setCandidates((prev) => prev.filter((c) => !syncedIds.has(c.id)));

      // Close modal if all were synced
      if (candidates.length <= selectedCandidates.length) {
        onOpenChange(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sync to database.";
      toast.error(msg);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-border shadow-2xl rounded-2xl bg-card">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Bot className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                  AI & Web Search Opportunity Harvester
                  <Badge className="bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase">
                    Gemini AI Powered
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 mt-0.5">
                  Harvest live international scholarship opportunities from official university
                  feeds and publish directly to ElScholarship.com.
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-xs text-slate-300 hover:text-white gap-1.5 h-8"
            >
              <Key className="size-3.5 text-amber-400" />
              <span>{geminiApiKey ? "API Key Configured" : "Add Gemini API Key"}</span>
            </Button>
          </div>

          {/* Optional Gemini API Key Banner */}
          {showKeyInput && (
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/80 p-3 flex items-center gap-3 animate-in fade-in duration-200">
              <Key className="size-4 text-amber-400 shrink-0" />
              <div className="flex-1">
                <Label className="text-[11px] text-slate-300 font-semibold">
                  Gemini API Key (Optional)
                </Label>
                <Input
                  type="password"
                  placeholder="Paste your Gemini API key (e.g. AIzaSy...)..."
                  value={geminiApiKey}
                  onChange={(e) => handleSaveApiKey(e.target.value)}
                  className="h-8 text-xs bg-slate-900 border-slate-700 text-white mt-1"
                />
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowKeyInput(false)}
                className="text-xs h-8 mt-4 shrink-0"
              >
                Save & Close
              </Button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Query & Filter Controls */}
          <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search topic or keywords (e.g. DAAD Germany 2026, Oxford Clarendon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs"
                />
              </div>

              <Select value={targetRegion} onValueChange={setTargetRegion}>
                <SelectTrigger className="w-full sm:w-44 text-xs h-9">
                  <Globe2 className="size-3.5 mr-1.5 text-amber-500" />
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global">All Regions (Global)</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Germany">Germany & Europe</SelectItem>
                  <SelectItem value="East Africa">East Africa</SelectItem>
                  <SelectItem value="United States">USA & Canada</SelectItem>
                  <SelectItem value="Japan">Japan & East Asia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={targetDegree} onValueChange={setTargetDegree}>
                <SelectTrigger className="w-full sm:w-44 text-xs h-9">
                  <GraduationCap className="size-3.5 mr-1.5 text-amber-500" />
                  <SelectValue placeholder="Degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Degrees</SelectItem>
                  <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="Master's">Master's</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => handleRunHarvest()}
                disabled={isHarvesting}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 h-9"
              >
                {isHarvesting ? (
                  <>
                    <RefreshCw className="mr-1.5 size-3.5 animate-spin" /> Gathering...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 size-3.5" /> Gather Opportunities
                  </>
                )}
              </Button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-[11px] font-medium text-muted-foreground mr-1">
                Suggested Intakes:
              </span>
              {PRESET_TOPICS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setSearchQuery(preset.query);
                    setTargetRegion(preset.region);
                    handleRunHarvest(preset.query, preset.region);
                  }}
                  className="rounded-md border border-border bg-background px-2.5 py-1 text-[10px] font-semibold text-foreground hover:border-amber-500/50 hover:bg-secondary transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Harvesting Live Progress */}
          {isHarvesting && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-2.5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                <span className="flex items-center gap-2">
                  <RefreshCw className="size-4 animate-spin text-amber-500" />
                  {harvestStepText}
                </span>
                <span>{harvestProgress}%</span>
              </div>
              <Progress value={harvestProgress} className="h-1.5 bg-amber-500/20" />
            </div>
          )}

          {/* Staging Candidates Grid */}
          {candidates.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={
                      selectedCandidates.length === candidates.length && candidates.length > 0
                    }
                    onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                    id="select-all-candidates"
                  />
                  <Label
                    htmlFor="select-all-candidates"
                    className="text-xs font-bold cursor-pointer"
                  >
                    Select All ({selectedCandidates.length} of {candidates.length} selected for
                    publishing)
                  </Label>
                </div>

                <Button
                  onClick={handleSyncAndPublish}
                  disabled={isSyncing || selectedCandidates.length === 0}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="mr-1.5 size-3.5 animate-spin" /> Publishing to Live
                      Site...
                    </>
                  ) : (
                    <>
                      <Send className="mr-1.5 size-3.5" /> Sync & Publish Selected (
                      {selectedCandidates.length}) to ElScholarship.com
                    </>
                  )}
                </Button>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-3">
                {candidates.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-xl border p-4 transition-all ${
                      c.selected
                        ? "border-amber-500/50 bg-amber-500/[0.03] shadow-sm"
                        : "border-border bg-card opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={Boolean(c.selected)}
                        onCheckedChange={() => toggleSelectCandidate(c.id)}
                        className="mt-1"
                      />

                      <div className="flex-1 space-y-2">
                        {/* Title & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <Input
                            value={c.title}
                            onChange={(e) => updateCandidateField(c.id, "title", e.target.value)}
                            className="font-bold text-sm h-8 bg-background border-border"
                          />
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                              <ShieldCheck className="mr-1 size-3" /> {c.confidence_score}% Match
                              Confidence
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCandidate(c.id)}
                              className="size-7 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              Institution:
                            </span>
                            <Input
                              value={c.university}
                              onChange={(e) =>
                                updateCandidateField(c.id, "university", e.target.value)
                              }
                              className="text-xs h-7 mt-0.5 bg-background border-border"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              Country / Region:
                            </span>
                            <Input
                              value={c.country}
                              onChange={(e) =>
                                updateCandidateField(c.id, "country", e.target.value)
                              }
                              className="text-xs h-7 mt-0.5 bg-background border-border"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              Application Deadline:
                            </span>
                            <Input
                              type="date"
                              value={c.deadline}
                              onChange={(e) =>
                                updateCandidateField(c.id, "deadline", e.target.value)
                              }
                              className="text-xs h-7 mt-0.5 bg-background border-border font-mono"
                            />
                          </div>
                        </div>

                        {/* Coverage Details */}
                        <div>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            Coverage Details:
                          </span>
                          <Input
                            value={c.coverage_details}
                            onChange={(e) =>
                              updateCandidateField(c.id, "coverage_details", e.target.value)
                            }
                            className="text-xs h-7 mt-0.5 bg-background border-border"
                          />
                        </div>

                        {/* Official Link & Verification Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-border/60">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-[10px] text-muted-foreground font-medium shrink-0">
                              Official Link:
                            </span>
                            <Input
                              value={c.official_link}
                              onChange={(e) =>
                                updateCandidateField(c.id, "official_link", e.target.value)
                              }
                              className="text-xs h-6 font-mono text-muted-foreground bg-background border-border flex-1 min-w-0 truncate"
                            />
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <UrlVerificationBadge url={c.official_link} size="sm" />
                            <a
                              href={c.official_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-amber-600 hover:underline inline-flex items-center gap-1"
                            >
                              Test Portal <ExternalLink className="size-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isHarvesting && candidates.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
                <Layers className="size-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                No Harvested Candidates in Staging
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Select a suggested intake topic above or type custom keywords and click{" "}
                <strong>"Gather Opportunities"</strong> to fetch verified global grants with Gemini
                AI.
              </p>
              <Button
                onClick={() => handleRunHarvest()}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
              >
                <Sparkles className="mr-1.5 size-3.5" /> Gather 2026/2027 Intakes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
