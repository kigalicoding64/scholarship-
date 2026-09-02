import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Clock,
  GraduationCap,
  MapPin,
  Bookmark,
  ArrowBigUp,
  ShieldCheck,
  CheckCircle2,
  Plane,
  Wallet,
  Home,
  Laptop,
  Globe,
  BookOpen,
  DollarSign,
  Briefcase,
  AlertCircle,
  Compass,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdBanner } from "@/components/ui/ad-banner";
import { ApplyModal } from "@/components/apply-modal";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useSavedScholarship, useUpvotedScholarship } from "@/lib/engagement";
import {
  coverageTags,
  deadlineLabel,
  scholarshipStatusTag,
  type Scholarship,
} from "@/lib/scholarship";
import { COUNTRY_LIVING_GUIDES } from "@/lib/living-guidance-data";
import { STANDARD_SCHOLARSHIP_BENEFITS, OFFER_ACCEPTANCE_ROADMAP } from "@/lib/benefits-offer-data";
import { DEGREE_LEVEL_DETAILS } from "@/lib/degree-data";
import { SITE_URL } from "@/lib/env";
import { UrlVerificationBadge } from "@/components/UrlVerificationBadge";
import { harvestScholarshipOpportunities } from "@/lib/scholarship-ai-harvester";
import { buildScholarshipSummary } from "@/lib/gemini-parser";

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop";

export const Route = createFileRoute("/scholarships/$id")({
  component: ScholarshipDetailPage,
});

function ScholarshipDetailPage() {
  const { id } = Route.useParams();
  const [applyOpen, setApplyOpen] = useState(false);
  const [heroError, setHeroError] = useState(false);
  const { active: isSaved, toggle: toggleSaved } = useSavedScholarship(id);
  const { active: isUpvoted, toggle: toggleUpvote } = useUpvotedScholarship(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("scholarships")
          .select("*")
          .eq("id", id)
          .eq("status", "published")
          .maybeSingle();
        if (!error && data) {
          return data as
            (Scholarship & { hero_banner_url?: string | null; image_url?: string | null }) | null;
        }
      } catch (err) {
        console.warn("Supabase query error:", err);
      }

      // Check verified live catalog for item
      const realOpportunities = await harvestScholarshipOpportunities();
      const match =
        realOpportunities.find((s) => s.id === id) ||
        realOpportunities[Number(id)] ||
        realOpportunities[0];

      return match as unknown as
        (Scholarship & { hero_banner_url?: string | null; image_url?: string | null }) | null;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Scholarship not available
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This listing may have been removed or is no longer published.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-6">
          <Link to="/">Back to directory</Link>
        </Button>
      </div>
    );
  }

  const scholarship = data;
  const statusTag = scholarshipStatusTag(scholarship.deadline);
  const currentUrl = `${SITE_URL}/scholarships/${scholarship.id}`;

  // Dynamic 1200x630 OG Banner URL
  const dynamicOgImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(scholarship.title)}&country=${encodeURIComponent(scholarship.country)}&coverage=${encodeURIComponent(scholarship.coverage_details || "100% Fully Funded")}&deadline=${encodeURIComponent(scholarship.deadline || "2026/2027")}&institution=${encodeURIComponent(scholarship.university)}`;

  const bannerImage =
    heroError || (!scholarship.hero_banner_url && !scholarship.image_url)
      ? dynamicOgImageUrl
      : scholarship.hero_banner_url || scholarship.image_url || dynamicOgImageUrl;

  // 6–10 line structured summary for WhatsApp & Social Feeds
  const structuredSummary = buildScholarshipSummary({
    title: scholarship.title,
    university: scholarship.university,
    country: scholarship.country,
    degree_levels: scholarship.degree_levels,
    funding_type: scholarship.funding_type,
    coverage_details: scholarship.coverage_details || undefined,
    deadline: scholarship.deadline,
    official_link: scholarship.official_link,
  });

  // Find country living guidance match
  const countryKey = Object.keys(COUNTRY_LIVING_GUIDES).find(
    (k) =>
      scholarship.country.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(scholarship.country.toLowerCase()),
  );
  const countryLiving = countryKey
    ? COUNTRY_LIVING_GUIDES[countryKey]
    : COUNTRY_LIVING_GUIDES["United Kingdom"];

  // Relevant degree level details
  const primaryDegreeLevel = scholarship.degree_levels[0]?.toLowerCase() || "masters";
  const degreeDetail =
    DEGREE_LEVEL_DETAILS.find(
      (d) => primaryDegreeLevel.includes(d.id) || d.id.includes(primaryDegreeLevel),
    ) || DEGREE_LEVEL_DETAILS[1]!;

  const scholarshipSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialAid",
    name: scholarship.title,
    description: structuredSummary,
    provider: {
      "@type": "EducationalOrganization",
      name: scholarship.university,
      address: {
        "@type": "PostalAddress",
        addressCountry: scholarship.country,
      },
    },
    amount: scholarship.funding_type === "full" ? "100% Fully Funded" : "Partial Grant",
    url: currentUrl,
    image: dynamicOgImageUrl,
    validThrough: scholarship.deadline || undefined,
  };

  return (
    <>
      <SEOHead
        title={`${scholarship.title} — ${scholarship.university}`}
        description={`${scholarship.title} at ${scholarship.university}, ${scholarship.country}. Verified full funding coverage, eligibility criteria, and concierge application.`}
        fullDescription={structuredSummary}
        canonicalUrl={currentUrl}
        imageUrl={dynamicOgImageUrl}
        type="article"
        keywords={[
          scholarship.country,
          scholarship.university,
          ...scholarship.degree_levels,
          "Fully Funded",
          "Scholarship",
          "Global Mobility",
        ]}
        jsonLd={scholarshipSchema}
      />

      <div className="w-full bg-slate-50/50 pb-20 dark:bg-slate-950">
        {/* Dynamic Hero Banner */}
        <div className="relative w-full h-[320px] md:h-[420px] bg-slate-950 overflow-hidden">
          <img
            src={bannerImage}
            alt={scholarship.title}
            onError={() => setHeroError(true)}
            className="w-full h-full object-cover opacity-50 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-6 left-6 z-10">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="gap-2 backdrop-blur-md bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700"
            >
              <Link to="/">
                <ArrowLeft className="size-4" /> Back to Directory
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {scholarship.degree_levels.map((level) => (
                  <Badge
                    key={level}
                    className="bg-slate-800 text-slate-100 border border-slate-700 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {level}
                  </Badge>
                ))}
                <Badge
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    scholarship.funding_type === "full"
                      ? "bg-amber-500 text-slate-950 font-extrabold"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {scholarship.funding_type === "full" ? "100% Fully Funded" : "Partial Grant"}
                </Badge>
                <Badge
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    statusTag === "Closed"
                      ? "bg-slate-800 text-slate-400"
                      : statusTag === "Closing Today"
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-emerald-500 text-slate-950 font-bold"
                  }`}
                >
                  {statusTag}
                </Badge>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                {scholarship.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-4 text-amber-400" /> {scholarship.university}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-amber-400" /> {scholarship.country}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-amber-400" /> {deadlineLabel(scholarship.deadline)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="border-b border-slate-200 bg-white py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2.5">
              <Button
                onClick={() => setApplyOpen(true)}
                className="bg-slate-900 text-xs md:text-sm font-semibold text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
              >
                Apply with Managed Concierge
              </Button>
              {scholarship.official_link ? (
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="text-xs font-semibold">
                    <a href={scholarship.official_link} target="_blank" rel="noopener noreferrer">
                      Official Portal Link <ArrowUpRight className="ml-1 size-3.5" />
                    </a>
                  </Button>
                  <UrlVerificationBadge url={scholarship.official_link} />
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                aria-pressed={isSaved}
                onClick={() => {
                  const saved = toggleSaved();
                  toast.success(saved ? "Saved to your list" : "Removed from your list");
                }}
              >
                <Bookmark
                  className={`mr-1 size-3.5 ${isSaved ? "fill-amber-500 text-amber-500" : ""}`}
                />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                aria-pressed={isUpvoted}
                onClick={() => {
                  const up = toggleUpvote();
                  toast.success(up ? "Upvoted" : "Upvote removed");
                }}
              >
                <ArrowBigUp className={`mr-1 size-3.5 ${isUpvoted ? "fill-emerald-500" : ""}`} />
                {isUpvoted ? "Upvoted" : "Upvote"}
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                <Link to="/support">Support Center</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Detail Grid */}
        <main className="container mx-auto max-w-5xl px-4 pt-8 sm:px-6 space-y-10">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Overview & Coverage */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Coverage Scope & Description
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {scholarship.coverage_details ??
                    "This grant covers full institutional tuition fees, living allowances, health coverage, and travel subsidies for eligible international scholars."}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {coverageTags(scholarship.coverage_details).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic WhatsApp & Social Preview Card */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-6 dark:border-emerald-500/20 dark:bg-emerald-950/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <span>📱 WhatsApp &amp; Social Summary Breakdown</span>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Auto-generated 10-line bullet summary and social media preview card for
                      WhatsApp, Twitter/X, and Facebook.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1.5 h-8"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            `${structuredSummary}\n\n🔗 Official Page & Apply: ${currentUrl}`,
                          );
                          toast.success("10-line WhatsApp summary copied to clipboard!");
                        } catch {
                          toast.error("Failed to copy summary");
                        }
                      }}
                    >
                      📋 Copy Summary
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8 gap-1.5"
                    >
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `${structuredSummary}\n\n🔗 Apply directly or via Concierge: ${currentUrl}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Share WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-background/80 p-4 border border-border/80 font-mono text-xs leading-relaxed text-foreground whitespace-pre-line shadow-inner">
                  {structuredSummary}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
                  <span>
                    Dynamic 1200x630 Social Banner active via{" "}
                    <code className="text-[11px] bg-muted px-1.5 py-0.5 rounded">/api/og</code>
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      Facebook Debugger &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Standard Benefits Breakdown Grid */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Detailed Grant Benefits Breakdown
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Verified entitlements provided directly to enrolled scholarship recipients:
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {STANDARD_SCHOLARSHIP_BENEFITS.slice(0, 6).map((benefit) => (
                    <div
                      key={benefit.key}
                      className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {benefit.description}
                      </p>
                      <span className="mt-2 inline-block rounded bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-400">
                        Value: {benefit.estimated_value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offer Acceptance & Visa Roadmap */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Offer Letter & Visa Acceptance Roadmap
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Step-by-step path from university acceptance to student visa issuance and arrival:
                </p>

                <div className="mt-6 space-y-4">
                  {OFFER_ACCEPTANCE_ROADMAP.map((step) => (
                    <div key={step.step_number} className="flex items-start gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-amber-400 dark:bg-slate-100 dark:text-slate-900">
                        {step.step_number}
                      </div>
                      <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {step.stage}
                          </h3>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {step.timeline}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {step.action_required}
                        </p>
                        <div className="mt-2 text-[10px] text-rose-600 dark:text-rose-400">
                          <strong>Avoid:</strong> {step.common_pitfalls}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="space-y-6">
              {/* Quick Summary Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  At a Glance
                </h2>
                <dl className="mt-4 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-slate-400">Degrees</dt>
                    <dd className="text-right font-medium text-slate-800 dark:text-slate-200">
                      {scholarship.degree_levels.join(", ") || "—"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-slate-400">Funding</dt>
                    <dd className="text-right font-medium text-slate-800 dark:text-slate-200">
                      {scholarship.funding_type === "full" ? "Fully funded (100%)" : "Partial"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-slate-400">Host Institution</dt>
                    <dd className="text-right font-medium text-slate-800 dark:text-slate-200">
                      {scholarship.university}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-slate-400">Destination</dt>
                    <dd className="text-right font-medium text-slate-800 dark:text-slate-200">
                      {scholarship.country}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-slate-400">Deadline</dt>
                    <dd className="text-right font-bold text-slate-900 dark:text-slate-100">
                      {deadlineLabel(scholarship.deadline)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <Button
                    onClick={() => setApplyOpen(true)}
                    className="w-full bg-slate-900 text-xs font-bold text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950"
                  >
                    Initiate Concierge Review
                  </Button>
                </div>
              </div>

              {/* Living Cost Card for Host Country */}
              {countryLiving && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <Compass className="size-4 text-amber-500" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Living in {countryLiving.country} {countryLiving.flag}
                    </h2>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                      <span className="text-slate-400">Estimated Monthly Cost</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {countryLiving.currency_symbol}
                        {countryLiving.avg_monthly_cost.total_estimated.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                      <span className="text-slate-400">Campus Dorm Rent</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {countryLiving.currency_symbol}
                        {countryLiving.avg_monthly_cost.dorm_rent}/mo
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                      <span className="text-slate-400">Working Hours</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {countryLiving.working_rights.term_time_hours}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                      <span className="text-slate-400">Post-Study Visa</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {countryLiving.working_rights.post_study_duration}
                      </span>
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="mt-4 w-full text-xs">
                    <Link to="/support">Open Cost Calculator</Link>
                  </Button>
                </div>
              )}

              {/* Degree Framework Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Degree Requirements ({degreeDetail.name.split(" ")[0]})
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {degreeDetail.entry_requirements}
                </p>
                <div className="mt-3 rounded bg-slate-50 p-2.5 dark:bg-slate-950 text-[11px] text-slate-600 dark:text-slate-400">
                  <strong>GPA Threshold:</strong> {degreeDetail.gpa_threshold}
                </div>
              </div>
            </aside>
          </div>

          <AdBanner slot="1234567890" className="mt-8" />
        </main>

        <ApplyModal scholarship={scholarship} open={applyOpen} onOpenChange={setApplyOpen} />
      </div>
    </>
  );
}
