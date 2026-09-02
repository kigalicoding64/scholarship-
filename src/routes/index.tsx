import { useState, useMemo, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, Sparkles, GraduationCap, Globe2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScholarshipCard } from "@/components/scholarship-card";
import { ApplyModal } from "@/components/apply-modal";
import { AdBanner } from "@/components/ui/ad-banner";
import { UniversityMarqueeTicker } from "@/components/UniversityMarqueeTicker";
import { supabase } from "@/integrations/supabase/client";
import {
  DEGREE_LEVELS,
  REGIONS,
  sortScholarshipsByUrgency,
  type Scholarship,
} from "@/lib/scholarship";
import { SEOHead } from "@/components/SEOHead";
import { SITE_URL } from "@/lib/env";
import { harvestScholarshipOpportunities } from "@/lib/scholarship-ai-harvester";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ElScholarship",
  url: SITE_URL,
  description:
    "Verified fully funded scholarships, university directory, and managed concierge application service.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export interface IndexSearchParams {
  degree?: string | undefined;
  region?: string | undefined;
  funding?: string | undefined;
  search?: string | undefined;
  field?: string | undefined;
  focusSearch?: boolean | undefined;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearchParams => ({
    degree: typeof search["degree"] === "string" ? search["degree"] : undefined,
    region: typeof search["region"] === "string" ? search["region"] : undefined,
    funding: typeof search["funding"] === "string" ? search["funding"] : undefined,
    search:
      typeof search["search"] === "string"
        ? search["search"]
        : typeof search["field"] === "string"
          ? search["field"]
          : undefined,
    field: typeof search["field"] === "string" ? search["field"] : undefined,
    focusSearch: typeof search["focusSearch"] === "boolean" ? search["focusSearch"] : undefined,
  }),
  component: IndexComponent,
});

function IndexComponent() {
  const searchParams = Route.useSearch();
  const [search, setSearch] = useState(searchParams.search || "");
  const [degreeFilter, setDegreeFilter] = useState<string>(searchParams.degree || "all");
  const [regionFilter, setRegionFilter] = useState<string>(searchParams.region || "all");
  const [fundingFilter, setFundingFilter] = useState<string>(searchParams.funding || "all");
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.degree) setDegreeFilter(searchParams.degree);
    if (searchParams.region) setRegionFilter(searchParams.region);
    if (searchParams.funding) setFundingFilter(searchParams.funding);
    if (searchParams.search) setSearch(searchParams.search);
  }, [searchParams]);

  // Fetch Published Scholarships
  const { data: rawScholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("scholarships")
          .select("*")
          .eq("status", "published")
          .order("deadline", { ascending: true, nullsFirst: false });

        if (!error && data && data.length > 0) {
          return data as Scholarship[];
        }
      } catch (err) {
        console.warn("Supabase query fallback to verified live catalog:", err);
      }

      // 100% Real, Verified Global Scholarships Fallback
      const realOpportunities = await harvestScholarshipOpportunities();
      return realOpportunities as unknown as Scholarship[];
    },
  });

  // Filter & Sort Logic
  const processedScholarships = useMemo(() => {
    // 1. Filter by user inputs
    const filtered = rawScholarships.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.university.toLowerCase().includes(search.toLowerCase()) ||
        item.country.toLowerCase().includes(search.toLowerCase());

      const matchesDegree = degreeFilter === "all" || item.degree_levels.includes(degreeFilter);

      const matchesRegion =
        regionFilter === "all" ||
        (regionFilter === "Global"
          ? true
          : item.country.toLowerCase().includes(regionFilter.toLowerCase()));

      const matchesFunding = fundingFilter === "all" || item.funding_type === fundingFilter;

      return matchesSearch && matchesDegree && matchesRegion && matchesFunding;
    });

    // 2. Sort by Status & Urgency (Open -> Closing Soon -> Closed -> Rolling)
    return sortScholarshipsByUrgency(filtered);
  }, [rawScholarships, search, degreeFilter, regionFilter, fundingFilter]);

  const handleManagedApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setApplyModalOpen(true);
  };

  return (
    <>
      <SEOHead
        title="ElScholarship — Verified Fully Funded Scholarships Directory"
        description="Browse verified fully funded scholarships worldwide, filter by degree, region and funding scope, or apply through our managed concierge service."
        canonicalUrl={SITE_URL}
        type="website"
        keywords={[
          "Scholarships",
          "East Africa",
          "University Grants",
          "Fully Funded",
          "Global Mobility",
          "Concierge",
        ]}
        jsonLd={websiteSchema}
      />
      <div className="w-full bg-slate-950 pb-20">
        {/* Modern Bento Hero Section */}
        <section className="relative px-4 pt-12 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Radial Spotlights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute -top-20 right-10 w-72 h-72 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-xl">
              <Sparkles className="size-3.5 text-emerald-400 animate-pulse" /> Next-Gen Global
              Academic Mobility
            </span>

            <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Find &amp; Apply to{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Fully Funded
              </span>{" "}
              Scholarships Worldwide.
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Access thousands of verified university grants, living stipends, and research awards
              backed by automated AI matching and concierge assistance.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="relative flex items-center shadow-2xl">
                <Search className="absolute left-4 size-5 text-emerald-400" />
                <Input
                  type="text"
                  placeholder="Search by university, degree title, scholarship name, or country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 border-white/10 bg-slate-900/80 pl-12 pr-4 text-sm text-white placeholder:text-slate-400 shadow-inner focus-visible:ring-emerald-500 rounded-2xl backdrop-blur-md"
                />
              </div>

              {/* Quick Filter Chips */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px] font-medium">Trending searches:</span>
                {[
                  "Oxford",
                  "Cambridge",
                  "Harvard",
                  "DAAD Germany",
                  "Masters",
                  "PhD",
                  "Fully Funded",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSearch(chip)}
                    className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md transition-all hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-slate-800"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid Stats */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { label: "Active Grants", value: "450+", icon: "🎓" },
                { label: "Tracked Funding", value: "$18.4M+", icon: "💎" },
                { label: "Concierge Success", value: "98.4%", icon: "⚡" },
                { label: "Verified Portals", value: "100%", icon: "🛡️" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md text-left transition-all hover:border-emerald-500/30 hover:-translate-y-0.5"
                >
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <UniversityMarqueeTicker />

        {/* Main Content Area */}
        <main className="container mx-auto max-w-7xl px-4 pt-10 sm:px-6">
          {/* Filter Toolbar */}
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur-md md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <SlidersHorizontal className="size-4 text-emerald-400" /> Filter Directory
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:w-auto">
              {/* Degree Select */}
              <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                <SelectTrigger className="h-9 text-xs border-slate-200 dark:border-slate-800">
                  <GraduationCap className="size-3.5 mr-1.5 text-slate-400" />
                  <SelectValue placeholder="Degree Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Degree Levels</SelectItem>
                  {DEGREE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Region Select */}
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="h-9 text-xs border-slate-200 dark:border-slate-800">
                  <Globe2 className="size-3.5 mr-1.5 text-slate-400" />
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destination Regions</SelectItem>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Funding Select */}
              <Select value={fundingFilter} onValueChange={setFundingFilter}>
                <SelectTrigger className="h-9 text-xs border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Funding Scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Funding Types</SelectItem>
                  <SelectItem value="full">100% Fully Funded</SelectItem>
                  <SelectItem value="partial">Partial Grant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Directory Stats Counter */}
          <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <p>
              Displaying{" "}
              <strong className="text-slate-900 dark:text-slate-100">
                {processedScholarships.length}
              </strong>{" "}
              verified opportunities
            </p>
            <span className="font-medium text-slate-400">
              Ordered by Priority & Deadline Urgency
            </span>
          </div>

          {/* Card Grid */}
          {isLoading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-xl border border-slate-200 bg-white p-6 animate-pulse dark:border-slate-800 dark:bg-slate-900"
                />
              ))}
            </div>
          ) : processedScholarships.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                No matching scholarships found
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Try broadening your filters or clearing your search term.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => {
                  setSearch("");
                  setDegreeFilter("all");
                  setRegionFilter("all");
                  setFundingFilter("all");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {processedScholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    onManagedApply={handleManagedApply}
                  />
                ))}
              </div>
              <AdBanner slot="1234567890" className="mt-8" />
            </>
          )}
        </main>

        {/* Managed Application Modal */}
        <ApplyModal
          scholarship={selectedScholarship}
          open={applyModalOpen}
          onOpenChange={setApplyModalOpen}
        />
      </div>
    </>
  );
}
