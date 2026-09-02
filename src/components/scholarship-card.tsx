import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  ArrowUpRight,
  Bookmark,
  Clock,
  ChevronRight,
  Share2,
  Link2,
  MessageCircle,
  Twitter,
  Linkedin,
  ArrowBigUp,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  coverageTags,
  daysUntil,
  deadlineLabel,
  scholarshipStatusTag,
  type Scholarship,
} from "@/lib/scholarship";
import { buildShareLinks, useSavedScholarship, useUpvotedScholarship } from "@/lib/engagement";
import { UrlVerificationBadge } from "@/components/UrlVerificationBadge";

export function ScholarshipCard({
  scholarship,
  onManagedApply,
}: {
  scholarship: Scholarship;
  onManagedApply: (s: Scholarship) => void;
}) {
  const { active: isSaved, toggle: toggleSaved } = useSavedScholarship(scholarship.id);
  const { active: isUpvoted, toggle: toggleUpvote } = useUpvotedScholarship(scholarship.id);
  const [shareOpen, setShareOpen] = useState(false);
  const days = daysUntil(scholarship.deadline);
  const urgent = days !== null && days >= 0 && days <= 14;
  const closed = days !== null && days < 0;
  const statusTag = scholarshipStatusTag(scholarship.deadline);

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/?scholarship=${scholarship.id}` : "";
  const shareLinks = buildShareLinks(shareUrl, scholarship.title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy the link");
    }
    setShareOpen(false);
  }

  const primaryDegree = scholarship.degree_levels[0] || "Master's";

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10">
      {/* Subtle Glow Spotlight Overlay */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20" />

      {/* Top Meta Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3.5">
          {/* Degree & Funding Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {scholarship.funding_type === "full" ? "Fully Funded" : "Partial Grant"}
            </span>

            {scholarship.degree_levels.map((level) => (
              <span
                key={level}
                className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300 border border-white/5"
              >
                {level}
              </span>
            ))}
          </div>

          {/* Save & Share Actions */}
          <div className="relative z-10 flex items-center gap-1.5">
            <Popover open={shareOpen} onOpenChange={setShareOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-emerald-400"
                  aria-label="Share scholarship"
                >
                  <Share2 className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-48 p-1.5 bg-slate-900 border-white/10 text-slate-200"
              >
                <button
                  type="button"
                  onClick={copyLink}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium hover:bg-slate-800"
                >
                  <Link2 className="size-3.5 text-emerald-400" /> Copy link
                </button>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium hover:bg-slate-800"
                >
                  <MessageCircle className="size-3.5 text-emerald-400" /> WhatsApp
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium hover:bg-slate-800"
                >
                  <Twitter className="size-3.5 text-emerald-400" /> Twitter / X
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium hover:bg-slate-800"
                >
                  <Linkedin className="size-3.5 text-emerald-400" /> LinkedIn
                </a>
              </PopoverContent>
            </Popover>

            <button
              type="button"
              onClick={() => {
                const saved = toggleSaved();
                toast.success(saved ? "Saved to your list" : "Removed from your list");
              }}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-amber-400"
              aria-label={isSaved ? "Remove from saved" : "Save program"}
              aria-pressed={isSaved}
            >
              <Bookmark className={`size-4 ${isSaved ? "fill-amber-400 text-amber-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-emerald-400">
          <Link
            to="/scholarships/$id"
            params={{ id: scholarship.id }}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {scholarship.title}
          </Link>
        </h3>

        {/* Institution & Country */}
        <div className="mt-2.5 flex flex-col gap-1 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <Building2 className="size-3.5 shrink-0 text-emerald-400/80" />
            <span className="truncate">{scholarship.university}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-slate-500" />
            <span>{scholarship.country}</span>
          </div>
        </div>

        {/* Bento Summary Highlights */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="rounded-xl bg-slate-800/50 p-2.5 border border-white/5">
            <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Degree Level
            </span>
            <span className="font-semibold text-white truncate block mt-0.5">{primaryDegree}</span>
          </div>
          <div className="rounded-xl bg-slate-800/50 p-2.5 border border-white/5">
            <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Coverage
            </span>
            <span className="font-semibold text-emerald-400 truncate block mt-0.5">
              {scholarship.funding_type === "full" ? "100% Tuition + Living" : "Partial Tuition"}
            </span>
          </div>
        </div>

        {/* Premium Coverage Pills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {coverageTags(scholarship.coverage_details)
            .slice(0, 4)
            .map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/5 bg-slate-800/40 px-2 py-0.5 text-[10px] font-medium text-slate-300"
              >
                ✓ {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
        {/* Deadline & Portal Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-slate-400" />
            <span className="text-slate-400">Deadline:</span>
            <span
              className={`font-semibold ${
                closed ? "text-slate-500" : urgent ? "text-rose-400" : "text-slate-200"
              }`}
            >
              {deadlineLabel(scholarship.deadline)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const up = toggleUpvote();
              toast.success(up ? "Upvoted" : "Upvote removed");
            }}
            aria-pressed={isUpvoted}
            className={`relative z-10 inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-colors ${
              isUpvoted
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <ArrowBigUp className={`size-3.5 ${isUpvoted ? "fill-emerald-400" : ""}`} />
            {isUpvoted ? "Upvoted" : "Upvote"}
          </button>
        </div>

        {scholarship.official_link && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">Verification Status</span>
            <UrlVerificationBadge url={scholarship.official_link} />
          </div>
        )}

        {/* Action Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full rounded-xl border-white/10 bg-slate-800/40 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <Link
              to="/scholarships/$id"
              params={{ id: scholarship.id }}
              className="relative z-10 inline-flex items-center justify-center gap-1"
            >
              View Details <ArrowUpRight className="size-3 text-slate-400" />
            </Link>
          </Button>

          <button
            type="button"
            onClick={() => onManagedApply(scholarship)}
            className="relative z-10 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Apply Concierge <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
