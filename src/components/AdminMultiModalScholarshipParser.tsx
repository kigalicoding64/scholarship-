import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sparkles,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Share2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/env";
import {
  parseScholarshipMultiModal,
  buildScholarshipSummary,
  type ParsedScholarshipResult,
} from "@/lib/gemini-parser";
import { supabase } from "@/integrations/supabase/client";

export function AdminMultiModalScholarshipParser() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawText, setRawText] = useState("");
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    type: string;
    base64: string;
    sizeKb: number;
  } | null>(null);
  const [customApiKey, setCustomApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedScholarshipResult | null>(null);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  // File Upload Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedFile({
        name: file.name,
        type: file.type || "image/jpeg",
        base64,
        sizeKb: Math.round(file.size / 1024),
      });
      toast.success(`Attached file: ${file.name}`);
    };
    reader.onerror = () => toast.error("Failed to read file.");
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedFile({
        name: file.name,
        type: file.type || "image/jpeg",
        base64,
        sizeKb: Math.round(file.size / 1024),
      });
      toast.success(`Dropped file: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Run Gemini Multi-Modal Extraction
  const handleExecuteParsing = async () => {
    if (!rawText.trim() && !selectedFile) {
      toast.warning("Please paste raw announcement text or upload a poster flyer image first.");
      return;
    }

    setIsParsing(true);
    setParsedData(null);
    setPublishedId(null);

    try {
      const result = await parseScholarshipMultiModal({
        text: rawText.trim() || undefined,
        fileBase64: selectedFile?.base64,
        mimeType: selectedFile?.type,
        geminiApiKey: customApiKey.trim() || undefined,
      });

      setParsedData(result);
      toast.success(`Successfully extracted: "${result.title}"`);
    } catch (err) {
      console.error(err);
      toast.error("Multi-modal parsing error. Please check input or Gemini key.");
    } finally {
      setIsParsing(false);
    }
  };

  // Direct Publish to Live Supabase Directory
  const handlePublishDirect = async () => {
    if (!parsedData) return;

    setIsPublishing(true);
    try {
      const payload = {
        title: parsedData.title.trim(),
        university: parsedData.institution.trim(),
        country: parsedData.country.trim(),
        degree_levels: [parsedData.degreeLevel || "Master's"],
        funding_type: parsedData.fundingType,
        coverage_details: parsedData.coverageDetails.trim() || null,
        official_link: parsedData.officialLink.trim() || null,
        deadline: parsedData.deadline || null,
        status: "published" as const,
      };

      const { data, error } = await supabase.from("scholarships").insert(payload).select().single();
      if (error) throw error;

      setPublishedId(data.id);
      queryClient.invalidateQueries();
      toast.success("Scholarship published live to ElScholarship directory!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish to database.");
    } finally {
      setIsPublishing(false);
    }
  };

  const dynamicSummary = parsedData ? buildScholarshipSummary(parsedData) : "";
  const publicPageUrl = publishedId
    ? `${SITE_URL}/scholarships/${publishedId}`
    : `${SITE_URL}/scholarships/preview`;
  const dynamicOgUrl = parsedData
    ? `${SITE_URL}/api/og?title=${encodeURIComponent(parsedData.title)}&country=${encodeURIComponent(parsedData.country)}&coverage=${encodeURIComponent(parsedData.coverageDetails)}&deadline=${encodeURIComponent(parsedData.deadline)}&institution=${encodeURIComponent(parsedData.institution)}`
    : "";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Sparkles className="size-4" />
            </div>
            <h2 className="text-base font-bold text-foreground">
              Gemini Multi-Modal AI Flyer &amp; Text Ingestion Pipeline
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Drop promotional poster images, flyer flyers, circular PDFs, or paste raw text to parse
            into verified listings and social share previews.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="text-xs gap-1.5 h-8 shrink-0 border-border"
        >
          <Key className="size-3.5 text-amber-500" />
          <span>{customApiKey ? "Custom Key Set" : "Gemini API Key"}</span>
        </Button>
      </div>

      {showKeyInput && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 flex items-center gap-3">
          <Key className="size-4 text-amber-500 shrink-0" />
          <div className="flex-1">
            <Label className="text-[11px] font-semibold text-foreground">
              Gemini API Key (Optional — Default production keys are active)
            </Label>
            <Input
              type="password"
              placeholder="Paste custom Gemini API key..."
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              className="h-8 text-xs mt-1 bg-background"
            />
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowKeyInput(false)}
            className="text-xs h-8 mt-4 shrink-0"
          >
            Done
          </Button>
        </div>
      )}

      {/* Inputs Grid: Drag & Drop + Raw Text */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Dropzone Column */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <ImageIcon className="size-3.5 text-amber-500" /> 1. Upload Flyer / Poster / Document
          </Label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center cursor-pointer hover:border-amber-500/50 hover:bg-muted/50 transition-all min-h-[170px]"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.txt,.pdf"
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center gap-3 text-left">
                {selectedFile.type.startsWith("image/") ? (
                  <img
                    src={selectedFile.base64}
                    alt="Preview"
                    className="size-16 rounded-lg object-cover border border-border"
                  />
                ) : (
                  <div className="flex size-14 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                    <FileText className="size-7" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-foreground truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{selectedFile.sizeKb} KB</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[11px] text-destructive hover:text-destructive px-0 mt-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                  >
                    <Trash2 className="size-3 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <UploadCloud className="size-8 text-muted-foreground mb-2" />
                <p className="text-xs font-bold text-foreground">
                  Click or Drag &amp; Drop Flyer Image
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Supports JPG, PNG, WEBP, or TXT documents
                </p>
              </>
            )}
          </div>
        </div>

        {/* Raw Text Textarea Column */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <FileText className="size-3.5 text-amber-500" /> 2. Or Paste Raw Text / Circular Notice
          </Label>
          <Textarea
            placeholder="Paste university press release, email announcement, eligibility criteria, or scholarship description..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="min-h-[170px] text-xs font-mono leading-relaxed"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-emerald-500" />
          <span>Multi-modal parsing with Gemini 2.5 Flash &amp; Google Search Grounding</span>
        </div>

        <Button
          onClick={handleExecuteParsing}
          disabled={isParsing || (!rawText.trim() && !selectedFile)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-2"
        >
          {isParsing ? (
            <>
              <Sparkles className="size-4 animate-spin" /> Analyzing Flyer &amp; Text...
            </>
          ) : (
            <>
              <Sparkles className="size-4" /> Parse with Gemini Multi-Modal AI
            </>
          )}
        </Button>
      </div>

      {/* Extracted Live Results & Social Card Staging Area */}
      {parsedData && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-emerald-500" />
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Extracted Scholarship: {parsedData.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {parsedData.institution} • {parsedData.country} ({parsedData.degreeLevel})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handlePublishDirect}
                disabled={isPublishing || !!publishedId}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 h-8"
              >
                {publishedId ? (
                  <>
                    <CheckCircle2 className="size-3.5" /> Published Live
                  </>
                ) : isPublishing ? (
                  "Publishing..."
                ) : (
                  <>
                    <ArrowRight className="size-3.5" /> Publish to Live Directory
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Extracted Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-card p-4 rounded-xl border border-border">
            <div>
              <span className="text-[10px] text-muted-foreground font-semibold">
                Degree &amp; Funding
              </span>
              <p className="font-bold text-foreground mt-0.5">
                {parsedData.degreeLevel} •{" "}
                {parsedData.fundingType === "full" ? "100% Fully Funded" : "Partial"}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground font-semibold">
                Fields of Study
              </span>
              <p className="font-bold text-foreground mt-0.5 truncate">{parsedData.fieldOfStudy}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground font-semibold">
                GPA / Requirement
              </span>
              <p className="font-bold text-foreground mt-0.5 truncate">
                {parsedData.gpaRequirement}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground font-semibold">
                Application Deadline
              </span>
              <p className="font-bold text-amber-600 dark:text-amber-400 mt-0.5 font-mono">
                {parsedData.deadline}
              </p>
            </div>
          </div>

          {/* WhatsApp & Social Media Preview Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>📱 Generated 10-Line WhatsApp / Social Feed Summary</span>
              </Label>
              <Button
                size="sm"
                variant="outline"
                className="text-[11px] h-7 gap-1 border-border"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `${dynamicSummary}\n\n🔗 Apply & Details: ${publicPageUrl}`,
                    );
                    toast.success("10-line summary copied to clipboard!");
                  } catch {
                    toast.error("Failed to copy");
                  }
                }}
              >
                <Copy className="size-3" /> Copy Summary
              </Button>
            </div>

            <div className="rounded-lg bg-background p-4 border border-border font-mono text-xs leading-relaxed text-foreground whitespace-pre-line shadow-inner">
              {dynamicSummary}
            </div>
          </div>

          {/* Social Preview Testing Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs border-border gap-1.5 h-8"
              >
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${dynamicSummary}\n\n🔗 Apply: ${publicPageUrl}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="size-3.5 text-emerald-500" /> Share on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs border-border gap-1.5 h-8"
              >
                <a
                  href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(publicPageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-3.5 text-blue-500" /> Facebook Debugger Test
                </a>
              </Button>
            </div>

            {dynamicOgUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground h-8"
              >
                <a href={dynamicOgUrl} target="_blank" rel="noopener noreferrer">
                  View 1200x630 Banner Card &rarr;
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
