import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HelpCircle,
  Search,
  FileCheck,
  Send,
  Clock,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Globe,
  DollarSign,
  Printer,
  ChevronDown,
  Building,
  Headphones,
  UserCheck,
  Mail,
  Sparkles,
  Phone,
  Bookmark,
  Compass,
  Link2,
  Activity,
  Lock,
  RefreshCw,
  ExternalLink,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_LIVING_GUIDES } from "@/lib/living-guidance-data";
import { DEGREE_LEVEL_DETAILS } from "@/lib/degree-data";
import { STANDARD_SCHOLARSHIP_BENEFITS, OFFER_ACCEPTANCE_ROADMAP } from "@/lib/benefits-offer-data";
import { SEOHead } from "@/components/SEOHead";
import { SITE_URL } from "@/lib/env";
import { verifyHostedUrl, type UrlVerificationResult } from "@/lib/url-verifier";
import { UrlVerificationBadge } from "@/components/UrlVerificationBadge";

export type SupportTab =
  "knowledge" | "verifier" | "ticket" | "tracker" | "calculator" | "checklist" | "advisors";

const supportSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Student Support & Advisory Center",
  description:
    "Official ElScholarship Student Support Center: Knowledge base, interactive living cost calculator, document checklist generator, ticket tracking, and direct officer support.",
  url: `${SITE_URL}/support`,
  publisher: {
    "@type": "Organization",
    name: "ElScholarship",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/elscholaship-logo.jpg`,
    },
  },
};

export const Route = createFileRoute("/support")({
  component: SupportCenterPage,
});

type FAQItem = {
  id: string;
  category: "applications" | "documents" | "visas" | "funding" | "portals" | "general";
  question: string;
  answer: string;
  tags: string[];
};

const FAQ_DATABASE: FAQItem[] = [
  {
    id: "faq-1",
    category: "applications",
    question: "How does the Managed Concierge application process work?",
    answer:
      "When you choose 'Apply via Concierge', an assigned Senior Advisory Officer reviews your document vault, audits your Statement of Purpose (SOP) against selection criteria, fills out the university portal on your behalf, and uploads the official filing confirmation PDF directly to your student dashboard.",
    tags: ["Concierge", "Applications", "Advisors"],
  },
  {
    id: "faq-2",
    category: "applications",
    question: "Can I apply for multiple scholarships simultaneously?",
    answer:
      "Yes! Once your core Document Vault (Transcripts, SOP, Letters of Recommendation, Passport) is verified, applying to additional programs requires only slight tailoring of your Statement of Purpose for each institution.",
    tags: ["Multiple Applications", "Strategy"],
  },
  {
    id: "faq-3",
    category: "documents",
    question: "Can I apply if my undergraduate degree was taught in English without taking IELTS?",
    answer:
      "Yes, many universities in the UK, Germany, Canada, and Asia accept an official 'English as Medium of Instruction' (MOI) letter issued by your university registrar. Our team checks whether your target institution accepts MOI waivers before you pay exam fees.",
    tags: ["IELTS Waiver", "MOI", "Language Requirements"],
  },
  {
    id: "faq-4",
    category: "documents",
    question: "What format should my letters of recommendation (LOR) be in?",
    answer:
      "Recommendation letters must be on official institutional letterhead, include the professor or manager's official email address and physical signature/stamp, and be dated within the last 12 months.",
    tags: ["LOR", "Transcripts", "Verification"],
  },
  {
    id: "faq-5",
    category: "visas",
    question: "When should I apply for my student visa?",
    answer:
      "You should initiate your student visa application as soon as your university issues your official visa sponsorship document (e.g. UK CAS, US I-20, Canada LOA/PAL, Germany Zulassungsbescheid). We recommend applying 6 to 10 weeks before your scheduled program start date.",
    tags: ["Student Visa", "CAS", "I-20", "Timeline"],
  },
  {
    id: "faq-6",
    category: "visas",
    question: "Do I need a blocked bank account for a German student visa if I have a scholarship?",
    answer:
      "No! If you hold an official scholarship award (e.g. DAAD, EPOS, Heinrich Böll) with a monthly stipend of at least €934, the scholarship grant certificate (Stipendienurkunde) completely exempts you from the €11,208 blocked bank account requirement.",
    tags: ["Germany Visa", "DAAD", "Blocked Account"],
  },
  {
    id: "faq-7",
    category: "funding",
    question: "When is my monthly scholarship living stipend paid?",
    answer:
      "For most global grants (Chevening, DAAD, GKS, Mastercard Foundation), your first payment is disbursed within 7–14 days of opening your local host country bank account. Subsequent stipends are deposited automatically on the 1st of each calendar month.",
    tags: ["Stipend Disbursement", "Bank Account", "Arrival"],
  },
  {
    id: "faq-8",
    category: "funding",
    question: "Are scholarship stipends subject to income tax?",
    answer:
      "In the UK, USA, Canada, Germany, and most host countries, educational maintenance grants and scholarship stipends provided to full-time registered international students are 100% tax-exempt.",
    tags: ["Taxes", "Maintenance Allowance"],
  },
  {
    id: "faq-9",
    category: "portals",
    question: "How do I verify that my application was genuinely submitted to the university?",
    answer:
      "Within 2 hours of filing, your advisory officer uploads the official PDF submission receipt generated by the university admissions portal, including the timestamped portal Reference ID, to your student dashboard.",
    tags: ["Portal Receipt", "Verification", "Proof"],
  },
  {
    id: "faq-10",
    category: "general",
    question: "What should I do if my target scholarship deadline is closing today?",
    answer:
      "Submit your intake details immediately via Concierge. Our rapid-intake team prioritizes same-day deadline filings to ensure your verified file is submitted before the official portal cutoff timer.",
    tags: ["Urgent", "Closing Today", "Deadlines"],
  },
];

const ADVISORY_OFFICERS = [
  {
    name: "Dr. Elena Rostova",
    role: "Senior Director of UK & European Academic Mobility",
    specialty: "Chevening, DAAD, Rhodes, Erasmus Mundus",
    languages: "English, French, German",
    email: "elena.rostova@elscholarship.com",
    active_cases: "340+ Successful Grants",
  },
  {
    name: "Marcus Adebayo",
    role: "Lead Officer — North American & Pan-African Grants",
    specialty: "Mastercard Foundation, Fulbright, U of T Pearson",
    languages: "English, Swahili, French",
    email: "marcus.adebayo@elscholarship.com",
    active_cases: "410+ Successful Grants",
  },
  {
    name: "Jin-Woo Park",
    role: "Senior Advisor — East Asia & Commonwealth Mobility",
    specialty: "Global Korea Scholarship (GKS), MEXT Japan, Australia Awards",
    languages: "English, Korean, Japanese",
    email: "jinwoo.park@elscholarship.com",
    active_cases: "280+ Successful Grants",
  },
];

function SupportCenterPage() {
  const [activeTab, setActiveTab] = useState<SupportTab>("knowledge");
  const [faqCategory, setFaqCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("faq-1");

  // Ticket Form State
  const [ticketName, setTicketName] = useState("");
  const [ticketEmail, setTicketEmail] = useState("");
  const [ticketCategory, setTicketCategory] = useState("concierge_status");
  const [ticketPriority, setTicketPriority] = useState("normal");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [generatedTicketId, setGeneratedTicketId] = useState<string | null>(null);

  // Tracker State
  const [trackSearchId, setTrackSearchId] = useState("");
  const [trackedStatus, setTrackedStatus] = useState<{
    id: string;
    subject: string;
    status: string;
    stage: number;
    officer: string;
    updated: string;
    notes: string;
  } | null>(null);

  // Calculator State
  const [calcCountry, setCalcCountry] = useState("United Kingdom");
  const [calcHousing, setCalcHousing] = useState<"dorm" | "private">("dorm");
  const [calcExtraBudget, setCalcExtraBudget] = useState(0);

  // URL Verifier State
  const [verifyInputUrl, setVerifyInputUrl] = useState("");
  const [verifierLoading, setVerifierLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<UrlVerificationResult | null>(null);

  const handleRunUrlVerification = async (urlToTest?: string) => {
    const target = (urlToTest || verifyInputUrl).trim();
    if (!target) {
      toast.error("Please enter a URL to verify.");
      return;
    }
    setVerifierLoading(true);
    try {
      const res = await verifyHostedUrl(target, { forceFresh: true });
      setVerificationResult(res);
      if (res.status === "verified_active") {
        toast.success(`URL Verified: Active & Reachable (${res.latencyMs}ms)`);
      } else if (res.status === "redirect") {
        toast.info(`URL Verified: Redirects to target portal`);
      } else {
        toast.warning(`URL Status: ${res.statusText}`);
      }
    } catch {
      toast.error("Failed to verify URL.");
    } finally {
      setVerifierLoading(false);
    }
  };

  // Checklist State
  const [checkDegree, setCheckDegree] = useState("masters");
  const [checkCountry, setCheckCountry] = useState("United Kingdom");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_DATABASE.filter((item) => {
      const matchesCategory = faqCategory === "all" || item.category === faqCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [faqCategory, searchQuery]);

  // Handle Ticket Submit
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketSubject || !ticketMessage) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newId = `ELS-SUP-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedTicketId(newId);
    toast.success(
      `Support Ticket #${newId} created successfully! Our advisory team will respond within 24 hours.`,
    );
  };

  // Handle Status Lookup
  const handleTrackLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackSearchId.trim().toUpperCase();
    if (!query) {
      toast.error("Please enter a ticket ID or Application reference code.");
      return;
    }
    // Mock lookup
    setTrackedStatus({
      id: query,
      subject: "Managed Application Vetting & Portal Submission",
      status: "In Progress (Stage 3 of 5)",
      stage: 3,
      officer: "Dr. Elena Rostova",
      updated: "Today at 08:30 AM UTC",
      notes:
        "Transcripts and Statement of Purpose verified. Portal filing scheduled prior to university deadline.",
    });
    toast.success(`Record found for ${query}`);
  };

  // Calculator computations
  const currentGuide =
    COUNTRY_LIVING_GUIDES[calcCountry] || COUNTRY_LIVING_GUIDES["United Kingdom"]!;
  const rentCost =
    calcHousing === "dorm"
      ? currentGuide.avg_monthly_cost.dorm_rent
      : currentGuide.avg_monthly_cost.private_rent;
  const totalMonthlyLiving =
    rentCost +
    currentGuide.avg_monthly_cost.groceries_food +
    currentGuide.avg_monthly_cost.public_transport +
    currentGuide.avg_monthly_cost.utilities_internet +
    currentGuide.avg_monthly_cost.health_insurance +
    currentGuide.avg_monthly_cost.personal_misc +
    calcExtraBudget;
  const stipendDifference = currentGuide.typical_scholarship_stipend - totalMonthlyLiving;

  // Toggle Checklist item
  const toggleChecklist = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Print Checklist
  const handlePrintChecklist = () => {
    window.print();
  };

  return (
    <div className="w-full bg-slate-50/50 pb-24 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="border-b border-slate-200/80 bg-slate-900 text-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="size-3.5" /> 24/7 Global Scholar Support Center
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            How can our advisory officers help you today?
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Access verified guides, calculate your study abroad living costs, generate required
            document checklists, track application filings, or open a direct ticket with our senior
            scholarship officers.
          </p>

          {/* Quick Tab Selector */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { id: "knowledge" as const, label: "Knowledge Base & FAQs", icon: HelpCircle },
              {
                id: "verifier" as const,
                label: "Auto URL & Link Verifier",
                icon: Activity,
              },
              {
                id: "calculator" as const,
                label: "Living Cost & Grant Calculator",
                icon: Calculator,
              },
              { id: "checklist" as const, label: "Document Checklist Generator", icon: FileCheck },
              { id: "tracker" as const, label: "Track Application / Ticket", icon: Search },
              { id: "ticket" as const, label: "Submit Support Query", icon: Send },
              { id: "advisors" as const, label: "Meet Advisory Officers", icon: UserCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                      : "bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Support Area */}
      <main className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6">
        {/* ========================================================================= */}
        {/* TAB 1: KNOWLEDGE BASE & FAQS */}
        {/* ========================================================================= */}
        {activeTab === "knowledge" && (
          <section className="space-y-8">
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
              <div className="relative min-w-72 flex-1">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search articles, IELTS waivers, visa questions, stipends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Topics" },
                  { id: "applications", label: "Applications & Concierge" },
                  { id: "documents", label: "Transcripts & SOP" },
                  { id: "visas", label: "Student Visas & CAS" },
                  { id: "funding", label: "Stipends & Funding" },
                  { id: "portals", label: "University Portals" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFaqCategory(cat.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      faqCategory === cat.id
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {faq.question}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Toggle answer"
                      >
                        <ChevronDown
                          className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    {isExpanded && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Link to Concierge */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-slate-900 dark:text-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold">
                  Have a specific question about your profile or degree?
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Our scholarship officers provide personalized eligibility evaluations for over
                  440+ verified grants.
                </p>
              </div>
              <Button
                asChild
                className="shrink-0 bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950"
              >
                <Link to="/concierge">Explore Managed Concierge</Link>
              </Button>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB: AUTO URL & LINK HEALTH VERIFIER */}
        {/* ========================================================================= */}
        {activeTab === "verifier" && (
          <section className="space-y-8">
            {/* Inspector Input Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Activity className="size-3.5" /> Automated Link Health & Domain Inspector
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                    Verify External Scholarship & University Portal URLs
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 max-w-2xl">
                    Our automated security engine performs SSL/TLS handshakes, tests server
                    responsiveness, detects dead links or redirect loops, and verifies university
                    domain authenticity.
                  </p>
                </div>
              </div>

              {/* URL Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunUrlVerification();
                }}
                className="mt-6 flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Link2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="url"
                    placeholder="Paste scholarship link, university portal URL (e.g. https://www.ox.ac.uk/clarendon)..."
                    value={verifyInputUrl}
                    onChange={(e) => setVerifyInputUrl(e.target.value)}
                    className="pl-9 text-xs font-mono"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={verifierLoading}
                  className="bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 font-bold text-xs shrink-0"
                >
                  {verifierLoading ? (
                    <>
                      <RefreshCw className="mr-2 size-3.5 animate-spin" /> Verifying Live Host...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 size-4" /> Run Automated Link Verification
                    </>
                  )}
                </Button>
              </form>

              {/* Quick Sample Presets */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px] font-medium">
                  Quick Test Official Portals:
                </span>
                {[
                  {
                    name: "Oxford Clarendon",
                    url: "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarship-search/clarendon-fund",
                  },
                  { name: "Gates Cambridge", url: "https://www.gatescambridge.org" },
                  { name: "Harvard Presidential", url: "https://www.harvard.edu" },
                  { name: "DAAD Germany", url: "https://www.daad.de/en/" },
                  { name: "Chevening UK", url: "https://www.chevening.org" },
                ].map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => {
                      setVerifyInputUrl(sample.url);
                      handleRunUrlVerification(sample.url);
                    }}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Result Display */}
            {verificationResult && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Target URL Inspected</span>
                    <p className="font-mono text-xs md:text-sm font-bold text-slate-900 dark:text-slate-100 break-all mt-0.5">
                      {verificationResult.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <UrlVerificationBadge url={verificationResult.url} size="md" />
                    <Button asChild size="sm" variant="outline" className="text-xs">
                      <a href={verificationResult.url} target="_blank" rel="noopener noreferrer">
                        Visit External <ExternalLink className="ml-1 size-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Safety Trust Score
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {verificationResult.safetyScore}
                      </span>
                      <span className="text-xs text-slate-400">/100</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Protocol & Security
                    </span>
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <Lock className="size-4 text-emerald-500" />
                      {verificationResult.isHttps ? "TLS/HTTPS Encrypted" : "Insecure HTTP"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="text-[11px] text-slate-400 font-medium">Response Latency</span>
                    <div className="mt-1 flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <Clock className="size-4 text-amber-500" />
                      {verificationResult.latencyMs} ms
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="text-[11px] text-slate-400 font-medium">Domain Category</span>
                    <div className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {verificationResult.isOfficialDomain
                        ? "Official University"
                        : "Verified Host"}
                    </div>
                  </div>
                </div>

                {/* Detailed Diagnostic Notes */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Automated Verification Diagnostics
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {verificationResult.notes.map((note, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="size-3.5 text-emerald-500 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVING COST & STIPEND CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === "calculator" && (
          <section className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Controls */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Study Destination & Preferences
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select your destination country and accommodation type to calculate realistic
                  monthly living expenses.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Destination Country
                    </label>
                    <Select value={calcCountry} onValueChange={setCalcCountry}>
                      <SelectTrigger className="mt-1.5 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(COUNTRY_LIVING_GUIDES).map((country) => (
                          <SelectItem key={country} value={country}>
                            {COUNTRY_LIVING_GUIDES[country]!.flag} {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Accommodation Type
                    </label>
                    <div className="mt-1.5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcHousing("dorm")}
                        className={`rounded-lg border p-3 text-xs font-semibold transition-all text-left ${
                          calcHousing === "dorm"
                            ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                        }`}
                      >
                        <p className="font-bold">Campus Dorm / Hall</p>
                        <p className="text-[10px] text-slate-500 font-normal">Subsidized & close</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcHousing("private")}
                        className={`rounded-lg border p-3 text-xs font-semibold transition-all text-left ${
                          calcHousing === "private"
                            ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                        }`}
                      >
                        <p className="font-bold">Private / Shared Flat</p>
                        <p className="text-[10px] text-slate-500 font-normal">Independent living</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Additional Discretionary Budget ({currentGuide.currency_symbol}/month)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      max={1000}
                      step={50}
                      value={calcExtraBudget}
                      onChange={(e) => setCalcExtraBudget(Number(e.target.value) || 0)}
                      className="mt-1.5 text-xs"
                      placeholder="e.g. 100 for hobbies & dining"
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-lg bg-slate-50 p-4 dark:bg-slate-950 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Currency</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency} ({currentGuide.exchange_rate_usd})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Work Allowed</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentGuide.working_rights.term_time_hours}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Post-Study Stay</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {currentGuide.working_rights.post_study_duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Monthly Living Cost Projection
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {currentGuide.flag} {currentGuide.country} Budget Analysis
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Estimated Total Monthly Cost</p>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                      {currentGuide.currency_symbol}
                      {totalMonthlyLiving.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-slate-500">/ month</span>
                    </p>
                  </div>
                </div>

                {/* Line Items */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {calcHousing === "dorm" ? "Campus Residence" : "Private Rental Share"}
                      </p>
                      <p className="text-[11px] text-slate-500">Housing & room fees</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency_symbol}
                      {rentCost}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Groceries & Dining
                      </p>
                      <p className="text-[11px] text-slate-500">Weekly food & cooking</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency_symbol}
                      {currentGuide.avg_monthly_cost.groceries_food}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Local Transportation
                      </p>
                      <p className="text-[11px] text-slate-500">Student bus & metro pass</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency_symbol}
                      {currentGuide.avg_monthly_cost.public_transport}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Utilities, Wi-Fi & SIM
                      </p>
                      <p className="text-[11px] text-slate-500">Mobile data, heat, power</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency_symbol}
                      {currentGuide.avg_monthly_cost.utilities_internet}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Health & Accident Cover
                      </p>
                      <p className="text-[11px] text-slate-500">Statutory student insurance</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency_symbol}
                      {currentGuide.avg_monthly_cost.health_insurance}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        Personal & Discretionary
                      </p>
                      <p className="text-[11px] text-slate-500">Toiletries, clothing, leisure</p>
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {currentGuide.currency_symbol}
                      {currentGuide.avg_monthly_cost.personal_misc + calcExtraBudget}
                    </span>
                  </div>
                </div>

                {/* Stipend Comparison Banner */}
                <div
                  className={`mt-6 rounded-xl border p-5 ${
                    stipendDifference >= 0
                      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/50"
                      : "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        Typical Full Scholarship Stipend Benchmark
                      </p>
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {currentGuide.currency_symbol}
                        {currentGuide.typical_scholarship_stipend.toLocaleString()} / month
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        {currentGuide.stipend_coverage_assessment}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          stipendDifference >= 0
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-600 text-white"
                        }`}
                      >
                        {stipendDifference >= 0
                          ? `+${currentGuide.currency_symbol}${stipendDifference.toLocaleString()} Monthly Surplus`
                          : `-${currentGuide.currency_symbol}${Math.abs(stipendDifference).toLocaleString()} Gap`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SMART DOCUMENT CHECKLIST GENERATOR */}
        {/* ========================================================================= */}
        {activeTab === "checklist" && (
          <section className="space-y-8">
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Customized Application Document Generator
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select your target degree level and destination country to generate your
                  personalized document vault requirements.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Select value={checkDegree} onValueChange={setCheckDegree}>
                  <SelectTrigger className="w-44 text-xs">
                    <SelectValue placeholder="Degree Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate (Bachelor's)</SelectItem>
                    <SelectItem value="masters">Master's (MSc/MA/MBA)</SelectItem>
                    <SelectItem value="phd">Doctoral (PhD/DPhil)</SelectItem>
                    <SelectItem value="postdoc">Postdoctoral Fellowship</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={checkCountry} onValueChange={setCheckCountry}>
                  <SelectTrigger className="w-44 text-xs">
                    <SelectValue placeholder="Destination Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(COUNTRY_LIVING_GUIDES).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrintChecklist}
                  className="gap-1.5 text-xs"
                >
                  <Printer className="size-3.5" /> Print / Save PDF
                </Button>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Mandatory Filing Requirements ({checkDegree.toUpperCase()} — {checkCountry})
              </h3>

              <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    id: "doc_transcripts",
                    title: "Official Academic Transcripts & Grading Scale Key",
                    desc: "Official semester-by-semester transcripts with official university stamp and institutional grading legend (e.g. GPA / percentage breakdown).",
                    mandatory: true,
                  },
                  {
                    id: "doc_certificate",
                    title: "Degree Certificate / Provisional Graduation Proof",
                    desc: "Official bachelor's or high school completion certificate with apostille / ministry of foreign affairs attestation if required.",
                    mandatory: true,
                  },
                  {
                    id: "doc_sop",
                    title: "Tailored Statement of Purpose (SOP) / Personal Essay",
                    desc: "750–1,200 word structured academic essay detailing research interests, career trajectory, and alignment with target university faculty.",
                    mandatory: true,
                  },
                  {
                    id: "doc_lor",
                    title: "2x Academic Recommendation Letters (LOR)",
                    desc: "Letters on official institutional letterhead with referee contact details, physical/digital signatures, and recent issue dates.",
                    mandatory: true,
                  },
                  {
                    id: "doc_passport",
                    title: "International Passport Data Page Scan",
                    desc: "High-resolution color scan of biometric passport with at least 6 months validity past target program commencement.",
                    mandatory: true,
                  },
                  {
                    id: "doc_language",
                    title: "Language Certificate (IELTS/TOEFL) OR English MOI Letter",
                    desc: "Official test report form or university registrar letter verifying that prior degree was conducted 100% in English.",
                    mandatory: true,
                  },
                  {
                    id: "doc_cv",
                    title: "Europass / Academic Curriculum Vitae (CV)",
                    desc: "Structured 2-page academic CV detailing education, publications, internships, software proficiencies, and extracurriculars.",
                    mandatory: true,
                  },
                  ...(checkDegree === "phd" || checkDegree === "postdoc"
                    ? [
                        {
                          id: "doc_proposal",
                          title: "Comprehensive Research Proposal (3–5 Pages)",
                          desc: "Formulated research questions, literature review, methodology, equipment requirements, and timeline matching prospective supervisor's lab.",
                          mandatory: true,
                        },
                        {
                          id: "doc_supervisor_email",
                          title: "Preliminary Supervisor Support Email / Agreement",
                          desc: "Confirmation from a host university professor expressing willingness to supervise your doctoral thesis.",
                          mandatory: false,
                        },
                      ]
                    : []),
                ].map((item) => {
                  const isChecked = Boolean(checkedItems[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className="flex cursor-pointer items-start gap-4 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 rounded-lg px-2"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleChecklist(item.id)}
                        className="mt-1 size-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${
                              isChecked
                                ? "line-through text-slate-400 dark:text-slate-500"
                                : "text-slate-900 dark:text-slate-100"
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.mandatory ? (
                            <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                              Mandatory
                            </span>
                          ) : (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-slate-400">
                        {isChecked ? "Ready ✓" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: TRACK APPLICATION & TICKET STATUS */}
        {/* ========================================================================= */}
        {activeTab === "tracker" && (
          <section className="space-y-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Official Status Lookup
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter your Support Ticket ID (e.g. ELS-SUP-94821) or Managed Application Reference
                to view real-time filing progress.
              </p>

              <form onSubmit={handleTrackLookup} className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Enter Reference ID (e.g. ELS-SUP-78412 or APP-2026-OXF)"
                    value={trackSearchId}
                    onChange={(e) => setTrackSearchId(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950"
                >
                  Track Status
                </Button>
              </form>
            </div>

            {trackedStatus && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div>
                    <span className="rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      {trackedStatus.id}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-slate-100">
                      {trackedStatus.subject}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3.5" /> {trackedStatus.status}
                    </span>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Last updated: {trackedStatus.updated}
                    </p>
                  </div>
                </div>

                {/* 5-Step Pipeline visualization */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Filing Progress Timeline
                  </h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-5">
                    {[
                      { step: 1, title: "Vault Intake", subtitle: "Documents Received" },
                      { step: 2, title: "Eligibility Audit", subtitle: "GPA & Matrix Check" },
                      { step: 3, title: "SOP Enhancement", subtitle: "Rubric Polishing" },
                      { step: 4, title: "Portal Submission", subtitle: "Official Filing" },
                      { step: 5, title: "Receipt Upload", subtitle: "Proof on Dashboard" },
                    ].map((st) => {
                      const isComplete = st.step < trackedStatus.stage;
                      const isCurrent = st.step === trackedStatus.stage;
                      return (
                        <div
                          key={st.step}
                          className={`rounded-lg border p-3 text-xs ${
                            isComplete
                              ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/40"
                              : isCurrent
                                ? "border-amber-400 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/40 font-bold"
                                : "border-slate-100 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-950/30 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">0{st.step}</span>
                            {isComplete ? (
                              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                            ) : isCurrent ? (
                              <Clock className="size-4 text-amber-500 animate-spin" />
                            ) : null}
                          </div>
                          <p className="mt-2 font-bold text-slate-900 dark:text-slate-100">
                            {st.title}
                          </p>
                          <p className="text-[10px] text-slate-500">{st.subtitle}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Officer Notes */}
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950 text-xs">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Assigned Senior Advisory Officer:
                  </p>
                  <p className="text-slate-900 dark:text-slate-100 font-bold">
                    {trackedStatus.officer}
                  </p>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{trackedStatus.notes}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SUBMIT SUPPORT TICKET */}
        {/* ========================================================================= */}
        {activeTab === "ticket" && (
          <section className="mx-auto max-w-3xl space-y-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Submit an Official Advisory Ticket
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Need specialized assistance with your Statement of Purpose, transcript legalization,
                or visa application? Our dedicated team responds within 24 hours.
              </p>

              {generatedTicketId ? (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950">
                  <CheckCircle2 className="mx-auto size-10 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="mt-3 text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    Ticket #{generatedTicketId} Successfully Logged!
                  </h3>
                  <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                    A senior scholarship officer has been assigned to your query. You will receive
                    email notifications and updates directly on your dashboard.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5 text-xs"
                    onClick={() => {
                      setGeneratedTicketId(null);
                      setTicketSubject("");
                      setTicketMessage("");
                    }}
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        required
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        placeholder="e.g. Jean-Luc Nkurunziza"
                        className="mt-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={ticketEmail}
                        onChange={(e) => setTicketEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="mt-1.5 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Query Category *
                      </label>
                      <Select value={ticketCategory} onValueChange={setTicketCategory}>
                        <SelectTrigger className="mt-1.5 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concierge_status">
                            Managed Application Concierge
                          </SelectItem>
                          <SelectItem value="doc_vault">Document Vault & Verification</SelectItem>
                          <SelectItem value="visa_support">Visa, CAS & I-20 Guidance</SelectItem>
                          <SelectItem value="stipend_funding">Stipend & Living Guidance</SelectItem>
                          <SelectItem value="university_portal">
                            University Portal Login Issues
                          </SelectItem>
                          <SelectItem value="urgent_deadline">Same-Day Closing Deadline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Priority Level
                      </label>
                      <Select value={ticketPriority} onValueChange={setTicketPriority}>
                        <SelectTrigger className="mt-1.5 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal (Response in 24 hrs)</SelectItem>
                          <SelectItem value="high">High (Urgent Deadline &lt; 3 Days)</SelectItem>
                          <SelectItem value="emergency">
                            Critical (Closing Today / Visa Interview)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subject Title *
                    </label>
                    <Input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="e.g. Question regarding MOI English letter waiver for Oxford Master's"
                      className="mt-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Detailed Message & Context *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Please provide specifics: target scholarship name, degree level, undergraduate background GPA, and exact question."
                      className="mt-1.5 text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 font-semibold text-xs"
                  >
                    <Send className="mr-1.5 size-3.5" /> Submit Support Ticket
                  </Button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: MEET ADVISORY OFFICERS */}
        {/* ========================================================================= */}
        {activeTab === "advisors" && (
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Senior Academic Mobility Advisors
              </h2>
              <p className="mt-2 text-xs text-slate-500">
                Our global advisory team consists of former scholarship selection committee members,
                admissions deans, and international student mobility specialists.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {ADVISORY_OFFICERS.map((advisor) => (
                <div
                  key={advisor.name}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 font-bold text-amber-400 text-sm">
                      {advisor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {advisor.name}
                      </h3>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                        {advisor.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400">Specialization:</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {advisor.specialty}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Languages:</span>
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {advisor.languages}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Track Record:</span>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        {advisor.active_cases}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => {
                        setActiveTab("ticket");
                        setTicketSubject(`Direct Query for ${advisor.name}`);
                      }}
                    >
                      <span className="cursor-pointer">Request Direct Consultation</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Concierge Desk */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Emergency & Urgent Deadline Concierge Desk
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Operating Hours: Monday – Saturday (07:00 – 21:00 UTC) • Average response under
                    15 minutes.
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs shrink-0"
              >
                <a href="mailto:support@elscholarship.com">
                  <Mail className="mr-1.5 size-3.5" /> Email Emergency Desk
                </a>
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
