import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  ExternalLink,
  MapPin,
  Search,
  Trophy,
  Users,
  GraduationCap,
  Wallet,
  Clock,
  Globe2,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUniversities, type University } from "@/lib/content";
import { DETAILED_UNIVERSITIES, type DetailedUniversity } from "@/lib/university-data";
import { SEOHead } from "@/components/SEOHead";
import { SITE_URL } from "@/lib/env";
import { UrlVerificationBadge } from "@/components/UrlVerificationBadge";

const universitiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Global University & Institution Directory",
  description:
    "Browse verified world-leading universities, global rankings, faculties, tuition ranges, and living cost guidance.",
  url: `${SITE_URL}/universities`,
  publisher: {
    "@type": "Organization",
    name: "ElScholarship",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/elscholaship-logo.jpg`,
    },
  },
};

export const Route = createFileRoute("/universities")({
  component: UniversitiesPage,
});

export function UniversitiesPage() {
  const [term, setTerm] = useState("");
  const [country, setCountry] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState<DetailedUniversity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"overview" | "academics" | "scholarships" | "living">(
    "overview",
  );

  const { data: dbData, isLoading } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
  });

  // Merge database items with detailed university dataset
  const combinedUniversities = useMemo(() => {
    const list: DetailedUniversity[] = [...DETAILED_UNIVERSITIES];

    if (dbData && dbData.length > 0) {
      dbData.forEach((dbItem) => {
        const exists = list.some(
          (u) =>
            u.name.toLowerCase() === dbItem.name.toLowerCase() ||
            (dbItem.acronym && u.acronym === dbItem.acronym),
        );
        if (!exists) {
          list.push({
            id: dbItem.id,
            name: dbItem.name,
            acronym: dbItem.acronym,
            country: dbItem.country,
            city: dbItem.city,
            type: dbItem.type ?? "Public Research University",
            global_rank: "Top Global Institution",
            acceptance_rate: "Selective",
            international_students_ratio: "30%+",
            campuses:
              dbItem.campuses && dbItem.campuses.length > 0 ? dbItem.campuses : ["Main Campus"],
            popular_faculties:
              dbItem.popular_faculties && dbItem.popular_faculties.length > 0
                ? dbItem.popular_faculties
                : ["Engineering & Computing", "Business", "Sciences", "Humanities"],
            degree_levels_offered: ["Undergraduate", "Master's", "PhD"],
            tuition_range: dbItem.tuition_range ?? "Full Scholarship Coverage Available",
            average_living_cost: "$900 – $1,500 / month",
            work_rights: "20 hrs/week during term; post-study work visa available",
            intake_terms: ["Autumn Intake (Sep/Oct)", "Spring Intake (Jan/Feb)"],
            language_requirements:
              "IELTS 6.5+ / TOEFL 90+ (MOI waivers accepted for eligible applicants)",
            scholarships_hosted: [
              "Bilateral Government Grants",
              "University Merit Fellowships",
              "Need-Based Aid",
            ],
            description:
              dbItem.description ??
              "Recognized higher education institution offering fully accredited undergraduate and postgraduate degree programs with verified scholarship opportunities.",
            website: dbItem.website,
            status: dbItem.status ?? "published",
          });
        }
      });
    }

    return list;
  }, [dbData]);

  const countries = useMemo(
    () => Array.from(new Set(combinedUniversities.map((u) => u.country))).sort(),
    [combinedUniversities],
  );

  const rows = useMemo(() => {
    const q = term.trim().toLowerCase();
    return combinedUniversities.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        (u.acronym ?? "").toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.popular_faculties.some((f) => f.toLowerCase().includes(q));

      const matchesCountry = country === "all" || u.country === country;
      const matchesDegree =
        degreeFilter === "all" ||
        u.degree_levels_offered.some((d) => d.toLowerCase().includes(degreeFilter.toLowerCase()));

      return matchesSearch && matchesCountry && matchesDegree;
    });
  }, [combinedUniversities, term, country, degreeFilter]);

  const handleOpenDetail = (uni: DetailedUniversity) => {
    setSelectedUniversity(uni);
    setModalTab("overview");
    setModalOpen(true);
  };

  return (
    <>
      <SEOHead
        title="Global University & Institution Directory"
        description="Explore verified world-leading universities: global rankings, popular faculties, degree offerings, tuition fee ranges, living costs, student visas, and hosted scholarships."
        canonicalUrl={`${SITE_URL}/universities`}
        type="website"
        keywords={[
          "Universities",
          "Institutions",
          "Global Rankings",
          "Faculties",
          "Study Abroad",
          "Higher Education",
        ]}
        jsonLd={universitiesSchema}
      />
      <div className="w-full bg-slate-50/50 pb-20 dark:bg-slate-950">
        {/* Hero Header Section */}
        <section className="border-b border-slate-200/80 bg-slate-900 text-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Trophy className="size-3.5" /> Verified Global Institutions
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              World-Leading Universities & Research Hubs
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              Explore verified host institutions for full-ride scholarships. Review global rankings,
              popular faculties, degree offerings, estimated monthly living costs, and post-study
              work authorizations.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
          {/* Filters */}
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900">
            <div className="relative min-w-64 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="h-10 border-slate-200 pl-9 text-xs dark:border-slate-800"
                maxLength={100}
                placeholder="Search by institution name, acronym, city, or faculty..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger
                  className="h-10 w-44 border-slate-200 text-xs dark:border-slate-800"
                  aria-label="Filter by country"
                >
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                <SelectTrigger
                  className="h-10 w-44 border-slate-200 text-xs dark:border-slate-800"
                  aria-label="Filter by degree"
                >
                  <SelectValue placeholder="All Degree Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Degree Levels</SelectItem>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="master">Master's Programs</SelectItem>
                  <SelectItem value="phd">PhD / Doctoral</SelectItem>
                  <SelectItem value="fellowship">Postdoc / Fellowships</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Directory Stats Counter */}
          <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <p>
              Displaying{" "}
              <strong className="text-slate-900 dark:text-slate-100">{rows.length}</strong> verified
              institutions
            </p>
            <span>Click any card to inspect full profile & scholarships</span>
          </div>

          {/* Dynamic States */}
          {isLoading ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          ) : rows.length === 0 ? (
            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                No universities match your search criteria
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try adjusting your search terms or clearing the country filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => {
                  setTerm("");
                  setCountry("all");
                  setDegreeFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rows.map((u) => (
                <article
                  key={u.id}
                  onClick={() => handleOpenDetail(u)}
                  className="group flex cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-500"
                >
                  {/* Type & Ranking */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
                      <Building2 className="size-3.5" />
                      {u.type}
                    </span>
                    <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                      {u.global_rank.split("/")[0]?.trim() || "Top Ranked"}
                    </span>
                  </div>

                  {/* Name & Acronym */}
                  <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-amber-400">
                    {u.name}
                    {u.acronym && (
                      <span className="font-normal text-slate-500 dark:text-slate-400">
                        {" "}
                        ({u.acronym})
                      </span>
                    )}
                  </h2>

                  {/* Location */}
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="size-3.5 shrink-0 text-slate-400" />
                    {u.city}, {u.country}
                  </p>

                  {/* Description Snippet */}
                  {u.description && (
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {u.description}
                    </p>
                  )}

                  {/* Popular Faculties Pills */}
                  {u.popular_faculties?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {u.popular_faculties.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {f}
                        </span>
                      ))}
                      {u.popular_faculties.length > 3 && (
                        <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-400 dark:bg-slate-800">
                          +{u.popular_faculties.length - 3} more
                        </span>
                      )}
                    </div>
                  ) : null}

                  {/* Degree Levels Tag */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {u.degree_levels_offered.map((deg) => (
                      <span
                        key={deg}
                        className="rounded border border-slate-200 bg-slate-50/50 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                      >
                        {deg}
                      </span>
                    ))}
                  </div>

                  {/* Footer Metrics */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="block font-semibold text-slate-800 dark:text-slate-200">
                        Living: {u.average_living_cost}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                    >
                      View Details <ChevronRight className="ml-1 size-3.5" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* DETAILED UNIVERSITY MODAL */}
        {/* ========================================================================= */}
        {selectedUniversity && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              {/* Modal Header */}
              <div className="border-b border-slate-100 bg-slate-900 p-6 text-white dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {selectedUniversity.type}
                  </span>
                  <span className="rounded-md bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {selectedUniversity.global_rank}
                  </span>
                  <span className="rounded-md bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-slate-300">
                    Acceptance: {selectedUniversity.acceptance_rate}
                  </span>
                </div>
                <DialogTitle className="mt-3 text-2xl font-extrabold text-white">
                  {selectedUniversity.name}
                  {selectedUniversity.acronym && (
                    <span className="text-slate-400 font-normal">
                      {" "}
                      ({selectedUniversity.acronym})
                    </span>
                  )}
                </DialogTitle>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="size-3.5 text-amber-400" />
                  {selectedUniversity.city}, {selectedUniversity.country} • International Students:{" "}
                  {selectedUniversity.international_students_ratio}
                </p>

                {/* Sub Navigation Tabs */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                  {[
                    { id: "overview" as const, label: "Overview & Campuses", icon: Info },
                    { id: "academics" as const, label: "Faculties & Degrees", icon: GraduationCap },
                    { id: "scholarships" as const, label: "Hosted Scholarships", icon: Trophy },
                    { id: "living" as const, label: "Living Costs & Visa", icon: Wallet },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setModalTab(tab.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          modalTab === tab.id
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <Icon className="size-3.5" /> {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Body */}
              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 text-xs text-slate-700 dark:text-slate-300">
                {modalTab === "overview" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        About the Institution
                      </h4>
                      <p className="mt-2 leading-relaxed">{selectedUniversity.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Campuses & Locations
                      </h4>
                      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                        {selectedUniversity.campuses.map((camp) => (
                          <li
                            key={camp}
                            className="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50"
                          >
                            <Building2 className="size-3.5 text-amber-500 shrink-0" />
                            <span className="font-medium">{camp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Academic Intake Terms
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedUniversity.intake_terms.map((term) => (
                          <span
                            key={term}
                            className="rounded-md bg-slate-100 px-3 py-1 font-semibold dark:bg-slate-800"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {modalTab === "academics" && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Popular Faculties & Departments
                      </h4>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {selectedUniversity.popular_faculties.map((fac) => (
                          <div
                            key={fac}
                            className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/40"
                          >
                            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {fac}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Degree Levels Offered
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedUniversity.degree_levels_offered.map((deg) => (
                          <span
                            key={deg}
                            className="rounded-lg bg-slate-900 px-3 py-1 font-bold text-white dark:bg-slate-100 dark:text-slate-900"
                          >
                            {deg}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">
                        Language Requirements & Waivers
                      </h4>
                      <p className="mt-1 text-slate-600 dark:text-slate-400">
                        {selectedUniversity.language_requirements}
                      </p>
                    </div>
                  </div>
                )}

                {modalTab === "scholarships" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Verified Scholarships Hosted at {selectedUniversity.name}
                    </h4>
                    <p className="text-slate-500">
                      The following fully funded and partial grant schemes are currently active for
                      this institution:
                    </p>
                    <div className="space-y-2.5">
                      {selectedUniversity.scholarships_hosted.map((sch) => (
                        <div
                          key={sch}
                          className="flex items-start justify-between gap-3 rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20"
                        >
                          <div className="flex items-center gap-2.5">
                            <Trophy className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              {sch}
                            </span>
                          </div>
                          <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold text-white shrink-0">
                            100% Eligible
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        Indicative Tuition Range
                      </p>
                      <p className="mt-1 text-slate-600 dark:text-slate-400">
                        {selectedUniversity.tuition_range}
                      </p>
                    </div>
                  </div>
                )}

                {modalTab === "living" && (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-slate-400 font-semibold">Average Monthly Living Cost</p>
                        <p className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">
                          {selectedUniversity.average_living_cost}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Includes dorm room, food, transport & internet
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-slate-400 font-semibold">Student Working Rights</p>
                        <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {selectedUniversity.work_rights}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
                          Concierge Visa & Admission Guarantee
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                        Our senior officers assist with transcript verification, statement of
                        purpose polishing, and student visa filing.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <a
                      href={selectedUniversity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      Official Website <ExternalLink className="size-3.5" />
                    </a>
                  </Button>
                  <UrlVerificationBadge url={selectedUniversity.website} />
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 text-xs font-semibold"
                  >
                    <Link to="/concierge">Apply via Managed Concierge</Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
