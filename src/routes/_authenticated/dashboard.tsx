import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  FolderOpen,
  Download,
  GraduationCap,
  Languages,
  Stamp,
  User,
  ExternalLink,
  Plus,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Clock,
  Briefcase,
  Globe2,
  ShieldCheck,
  Menu,
  ChevronRight,
  Shield,
  HelpCircle,
  Search,
  Sliders,
  HardDrive,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useAuth";
import {
  STATUS_LABELS,
  deadlineLabel,
  type Application,
  type DocumentRow,
} from "@/lib/scholarship";
import { StudentProfileTab } from "@/components/dashboard/StudentProfileTab";
import { AcademicCvBuilderTab } from "@/components/dashboard/AcademicCvBuilderTab";
import { LanguageCertificationHubTab } from "@/components/dashboard/LanguageCertificationHubTab";
import { LivingAbroadDocumentsTab } from "@/components/dashboard/LivingAbroadDocumentsTab";
import { DocumentVaultTab } from "@/components/dashboard/DocumentVaultTab";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Scholar OS Workstation — ElScholarship" },
      {
        name: "description",
        content:
          "Full-control scholar OS dashboard: applications pipeline, encrypted document vault, academic CV builder, MOI English waivers, and living abroad visa center.",
      },
      { property: "og:title", content: "Scholar OS Workstation — ElScholarship" },
      {
        property: "og:description",
        content: "Track applications, build academic CVs, and manage your encrypted vault.",
      },
    ],
  }),
  component: DashboardPage,
});

function statusTone(status: string) {
  if (status === "ACCEPTED") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "REJECTED") return "bg-destructive/10 text-destructive";
  if (status === "SUBMITTED") return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
  if (status === "DOC_APPROVED") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
}

type DashboardTab =
  "applications" | "vault" | "cv" | "language" | "living" | "profile" | "security";

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | undefined;
  desc: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

function DashboardPage() {
  const { user } = useSession();
  const [activeTab, setActiveTab] = useState<DashboardTab>("applications");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const applications = useQuery({
    queryKey: ["my-applications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*, scholarships(title, university, deadline)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Application[];
    },
  });

  const documents = useQuery({
    queryKey: ["my-documents", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as DocumentRow[];
    },
  });

  async function openFile(path: string) {
    const { data } = await supabase.storage.from("documents").createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  const appCount = applications.data?.length || 0;
  const docCount = documents.data?.length || 0;

  const userDisplayName =
    ((user?.user_metadata as Record<string, unknown> | undefined)?.["full_name"] as string) ||
    ((user?.user_metadata as Record<string, unknown> | undefined)?.["name"] as string) ||
    user?.email?.split("@")[0] ||
    "International Scholar";

  const navItems: NavGroup[] = [
    {
      group: "WORKSPACE & PIPELINE",
      items: [
        {
          id: "applications" as const,
          label: "My Applications",
          icon: FileText,
          badge: appCount > 0 ? String(appCount) : undefined,
          desc: "Track active concierge submissions",
        },
        {
          id: "vault" as const,
          label: "Encrypted Vault",
          icon: FolderOpen,
          badge: docCount > 0 ? String(docCount) : undefined,
          desc: "Transcripts, SOP & credentials",
        },
      ],
    },
    {
      group: "ACADEMIC ENGINE",
      items: [
        {
          id: "cv" as const,
          label: "Academic CV Builder",
          icon: GraduationCap,
          desc: "Harvard & Europass standard",
        },
        {
          id: "language" as const,
          label: "Language & MOI Hub",
          icon: Languages,
          desc: "TOEFL, IELTS & Waiver letter",
        },
        {
          id: "living" as const,
          label: "Living Abroad & Visa",
          icon: Stamp,
          desc: "Proof of funds & affidavits",
        },
      ],
    },
    {
      group: "ACCOUNT & IDENTITY",
      items: [
        {
          id: "profile" as const,
          label: "Scholar Profile",
          icon: User,
          desc: "Academic credentials & targets",
        },
        {
          id: "security" as const,
          label: "Security & Vault Access",
          icon: ShieldCheck,
          desc: "Data privacy & key control",
        },
      ],
    },
  ];

  // Navigation Leftbar Component
  const NavigationSidebar = () => (
    <div className="flex h-full flex-col justify-between p-4 space-y-6">
      <div className="space-y-6">
        {/* Scholar Profile Card */}
        <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-bold text-foreground">{userDisplayName}</p>
              </div>
              <p className="truncate text-[11px] text-muted-foreground">{user?.email}</p>
              <div className="mt-1 flex items-center gap-1">
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] px-1.5 py-0 h-4">
                  <ShieldCheck className="mr-0.5 size-2.5" /> Tier 1 Scholar
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-border/60 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
              <span>Application Readiness</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">85%</span>
            </div>
            <Progress value={85} className="h-1.5 bg-muted" />
          </div>
        </div>

        {/* Grouped Navigation Links */}
        <div className="space-y-5">
          {navItems.map((group) => (
            <div key={group.group} className="space-y-1">
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/70">
                {group.group}
              </span>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileNavOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all ${
                        isActive
                          ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`size-4 shrink-0 ${isActive ? "text-slate-950" : "text-amber-500"}`}
                        />
                        <div className="min-w-0">
                          <p className="truncate leading-tight">{item.label}</p>
                        </div>
                      </div>
                      {item.badge && (
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                            isActive
                              ? "bg-slate-950 text-amber-400"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status & Direct Links */}
      <div className="space-y-3 pt-4 border-t border-border/60">
        <div className="rounded-xl bg-muted/40 p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <HardDrive className="size-3.5 text-amber-500" /> Vault Storage
            </span>
            <span className="font-mono text-[10px]">
              {docCount > 0 ? `${(docCount * 1.8).toFixed(1)} MB / 100 MB` : "0.0 MB"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026/2027 Intakes Live</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-muted-foreground hover:text-foreground h-8"
          >
            <Link to="/">
              <Search className="mr-2 size-3.5 text-amber-500" /> Explore Scholarships
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-muted-foreground hover:text-foreground h-8"
          >
            <Link to="/support">
              <HelpCircle className="mr-2 size-3.5 text-amber-500" /> Support Center
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <div className="mx-auto w-full max-w-7xl flex-1 px-3 py-6 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Left Navigation Bar */}
          <aside className="hidden lg:block w-72 shrink-0 rounded-2xl border border-border bg-card shadow-card sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <NavigationSidebar />
          </aside>

          {/* Main OS Canvas */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            {/* Top Bar with OS Breadcrumb & Mobile Nav Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {/* Mobile Drawer Trigger */}
                <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden size-9 shrink-0">
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 bg-card">
                    <NavigationSidebar />
                  </SheetContent>
                </Sheet>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <span>Scholar OS</span>
                    <ChevronRight className="size-3 text-muted-foreground/60" />
                    <span className="font-bold text-foreground capitalize">
                      {activeTab === "cv"
                        ? "Academic CV Builder"
                        : activeTab === "language"
                          ? "Language & MOI Hub"
                          : activeTab === "living"
                            ? "Living Abroad & Visa Docs"
                            : activeTab === "vault"
                              ? "Encrypted Document Vault"
                              : activeTab === "security"
                                ? "Security & Privacy"
                                : activeTab === "profile"
                                  ? "Scholar Profile"
                                  : "Applications Tracker"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
                >
                  <Link to="/">
                    <Plus className="mr-1.5 size-3.5" /> Find Scholarships
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="text-xs border-border">
                  <Link to="/concierge">
                    <Sparkles className="mr-1.5 size-3.5 text-amber-500" /> Concierge
                  </Link>
                </Button>
              </div>
            </div>

            {/* Dynamic Panel Content */}
            <div className="transition-all duration-200">
              {/* PANEL 1: Applications */}
              {activeTab === "applications" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        My Applications & Filings
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Track the real-time submission progress and official references for all your
                        direct and managed university applications.
                      </p>
                    </div>
                  </div>

                  {applications.isLoading ? (
                    <Skeleton className="h-48 w-full rounded-2xl" />
                  ) : (applications.data ?? []).length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
                        <FileText className="size-6" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">
                        No Applications in Progress
                      </h3>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Explore verified scholarship listings in our directory and start your
                        managed submission with the Concierge team.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs mt-2"
                      >
                        <Link to="/">Browse Active Scholarships</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {applications.data!.map((app) => (
                        <article
                          key={app.id}
                          className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-4 hover:border-amber-500/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-sm leading-snug">
                                {app.scholarships?.title ?? "Scholarship Application"}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {app.scholarships?.university}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusTone(
                                app.status,
                              )}`}
                            >
                              {STATUS_LABELS[app.status]}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs rounded-xl bg-muted/40 p-3">
                            <div>
                              <span className="text-[10px] text-muted-foreground font-medium">
                                Service Type
                              </span>
                              <p className="font-bold capitalize mt-0.5">
                                {app.app_type} Concierge
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] text-muted-foreground font-medium">
                                Target Deadline
                              </span>
                              <p className="font-bold mt-0.5">
                                {deadlineLabel(app.scholarships?.deadline ?? null)}
                              </p>
                            </div>
                            {app.official_app_id && (
                              <div className="col-span-2 pt-1 border-t border-border/60">
                                <span className="text-[10px] text-muted-foreground font-medium">
                                  Official Reference ID
                                </span>
                                <p className="font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                                  {app.official_app_id}
                                </p>
                              </div>
                            )}
                          </div>

                          {app.proof_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-xs h-8 gap-1.5"
                              onClick={() => openFile(app.proof_url!)}
                            >
                              <Download className="size-3.5" /> Download Official Submission Receipt
                            </Button>
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PANEL 2: Document Vault */}
              {activeTab === "vault" && (
                <DocumentVaultTab
                  documents={documents.data ?? []}
                  isLoading={documents.isLoading}
                />
              )}

              {/* PANEL 3: Academic CV Builder */}
              {activeTab === "cv" && <AcademicCvBuilderTab />}

              {/* PANEL 4: Language & MOI Hub */}
              {activeTab === "language" && <LanguageCertificationHubTab />}

              {/* PANEL 5: Living Abroad & Visa Docs */}
              {activeTab === "living" && <LivingAbroadDocumentsTab />}

              {/* PANEL 6: Scholar Profile */}
              {activeTab === "profile" && <StudentProfileTab />}

              {/* PANEL 7: Security & Privacy */}
              {activeTab === "security" && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
                  <div className="flex items-center gap-3 border-b border-border pb-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-foreground">
                        Data Privacy & Vault Security
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Manage your session authentication and encryption certificates.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">
                          Authentication Protocol
                        </span>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px]">
                          JWT Signed Active
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your account is secured with end-to-end encrypted sessions and row-level
                        security policies (RLS).
                      </p>
                    </div>

                    <div className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">
                          Active Account Email
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        To change your primary email or reset password, use the secure magic link
                        service.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleSignOut}
                      className="text-xs font-bold gap-1.5"
                    >
                      <LogOut className="size-3.5" /> Sign Out from Workstation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
