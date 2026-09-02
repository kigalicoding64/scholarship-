import React, { useState } from "react";
import { toast } from "sonner";
import {
  Globe2,
  DollarSign,
  FileCheck2,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Plane,
  Building,
  HeartPulse,
  Stamp,
  ExternalLink,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export const LivingAbroadDocumentsTab: React.FC = () => {
  // Financial Calculator State
  const [selectedCountry, setSelectedCountry] = useState("germany");
  const [hasScholarship, setHasScholarship] = useState(true);

  // Affidavit Generator State
  const [sponsorName, setSponsorName] = useState("Jean Baptiste Mukamana");
  const [sponsorRelation, setSponsorRelation] = useState("Father / Legal Guardian");
  const [sponsorPassport, setSponsorPassport] = useState("PC9876543");
  const [sponsorAddress, setSponsorAddress] = useState("KG 125 St, Gasabo, Kigali, Rwanda");
  const [studentName, setStudentName] = useState("Marie Claire Mukamana");
  const [studentPassport, setStudentPassport] = useState("PC1234567");
  const [targetUni, setTargetUni] = useState("Technical University of Munich (TUM)");
  const [monthlyAllowance, setMonthlyAllowance] = useState("€1,000 EUR");

  // Visa Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    passport: true,
    admission: true,
    scholarship_letter: true,
    transcripts_apostille: false,
    tb_medical: false,
    police_clearance: true,
    accommodation: false,
    insurance: false,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrintAffidavit = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">
              Living Abroad & Visa Document Center
            </h2>
            <Badge className="bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
              Embassy & Legal Standard
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Calculate national proof of funds requirements, generate legal Financial Sponsorship
            Affidavits, and track embassy visa readiness.
          </p>
        </div>
      </div>

      <Tabs defaultValue="funds" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg h-10">
          <TabsTrigger value="funds" className="text-xs">
            <Coins className="mr-1.5 size-3.5" /> Proof of Funds
          </TabsTrigger>
          <TabsTrigger value="affidavit" className="text-xs">
            <Stamp className="mr-1.5 size-3.5" /> Sponsor Affidavit
          </TabsTrigger>
          <TabsTrigger value="checklist" className="text-xs">
            <FileCheck2 className="mr-1.5 size-3.5" /> Visa Readiness
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Proof of Funds & Living Cost Calculator */}
        <TabsContent value="funds" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Germany */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Germany (Sperrkonto)</h3>
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px]">
                  €11,904 / yr
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                German law mandates <strong>€992/month</strong> in a certified blocked account.
                Fully waived if holding a DAAD or Erasmus scholarship grant!
              </p>
              <div className="rounded-lg bg-muted/40 p-2.5 text-[11px] text-muted-foreground space-y-1">
                <p>✓ Approved Providers: Expatrio, Coracle, Fintiba</p>
                <p>✓ Public Health Insurance: TK / Barmer (~€125/mo)</p>
              </div>
            </div>

            {/* United Kingdom */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">UK Student Visa (CAS)</h3>
                <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px]">
                  £9,207 – £12,006
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Requires <strong>£1,023/mo</strong> (outside London) or <strong>£1,334/mo</strong>{" "}
                (London) for 9 months held for 28 consecutive days.
              </p>
              <div className="rounded-lg bg-muted/40 p-2.5 text-[11px] text-muted-foreground space-y-1">
                <p>✓ Chevening / Rhodes provides full financial CAS waiver</p>
                <p>✓ IHS Surcharge: £776/year of study</p>
              </div>
            </div>

            {/* Canada */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Canada (Study Permit)</h3>
                <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 font-mono text-[10px]">
                  $20,635 CAD
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                IRCC updated cost of living requirement to <strong>$20,635 CAD</strong> (outside
                Quebec) plus first year tuition fees via GIC.
              </p>
              <div className="rounded-lg bg-muted/40 p-2.5 text-[11px] text-muted-foreground space-y-1">
                <p>✓ Mastercard Foundation covers 100% with IRCC exemption</p>
                <p>✓ GIC Banks: Scotiabank, CIBC, RBC</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Financial Sponsorship Affidavit Generator */}
        <TabsContent value="affidavit" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Affidavit Inputs */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-sm font-bold text-foreground">Sponsor & Student Information</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Generate a notarizable Declaration of Financial Support for embassy visa officers.
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Sponsor Full Name</Label>
                    <Input
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Relationship</Label>
                    <Input
                      value={sponsorRelation}
                      onChange={(e) => setSponsorRelation(e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Sponsor Passport / ID</Label>
                    <Input
                      value={sponsorPassport}
                      onChange={(e) => setSponsorPassport(e.target.value)}
                      className="text-xs mt-1 uppercase font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Monthly Financial Commitment</Label>
                    <Input
                      value={monthlyAllowance}
                      onChange={(e) => setMonthlyAllowance(e.target.value)}
                      className="text-xs mt-1 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Sponsor Residential Address</Label>
                  <Input
                    value={sponsorAddress}
                    onChange={(e) => setSponsorAddress(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Student Full Name</Label>
                    <Input
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Student Passport No.</Label>
                    <Input
                      value={studentPassport}
                      onChange={(e) => setStudentPassport(e.target.value)}
                      className="text-xs mt-1 uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Host University & Country</Label>
                  <Input
                    value={targetUni}
                    onChange={(e) => setTargetUni(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <Button
                  onClick={handlePrintAffidavit}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 mt-2"
                >
                  <Printer className="size-3.5" /> Print / Export Sponsorship Affidavit (PDF)
                </Button>
              </div>
            </div>

            {/* Formatted Affidavit Preview */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl space-y-4 print:p-0 print:border-none print:shadow-none text-slate-900 bg-white">
              <div className="text-center border-b border-slate-300 pb-3">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900 font-serif">
                  AFFIDAVIT OF FINANCIAL SUPPORT & SPONSORSHIP DECLARATION
                </h1>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  TO BE PRESENTED TO THE EMBASSY / CONSULATE VISA SECTION
                </p>
              </div>

              <div className="text-xs text-slate-800 space-y-3 leading-relaxed font-sans">
                <p>
                  I, the undersigned <strong>{sponsorName}</strong>, holder of Passport / National
                  ID <strong>{sponsorPassport}</strong>, residing at{" "}
                  <strong>{sponsorAddress}</strong>, do hereby solemnly swear, declare, and state
                  under oath as follows:
                </p>
                <p>
                  1. That I am the <strong>{sponsorRelation}</strong> of the student applicant,{" "}
                  <strong>{studentName}</strong>, holder of Passport{" "}
                  <strong>{studentPassport}</strong>.
                </p>
                <p>
                  2. That <strong>{studentName}</strong> has applied for admission and study visa to
                  pursue higher education at <strong>{targetUni}</strong>.
                </p>
                <p>
                  3. That I am fully employed / in business with sufficient financial solvency, and
                  I hereby undertake full and unconditional legal and financial responsibility to
                  cover all living expenses, accommodation, medical health insurance, books, and
                  return travel costs, committing a minimum of <strong>{monthlyAllowance}</strong>{" "}
                  for the entire duration of study.
                </p>
                <p>
                  4. Attached to this affidavit are certified copies of my official bank statements
                  (past 6 months), employment verification letter, and proof of identification.
                </p>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-6 text-xs text-slate-900 font-sans border-t border-slate-300">
                <div>
                  <p className="font-bold">Declared & Signed by Sponsor:</p>
                  <div className="mt-8 border-b border-slate-400 w-36" />
                  <p className="font-semibold mt-1">{sponsorName}</p>
                  <p className="text-[10px] text-slate-500">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Notary Public / Commissioner for Oaths:</p>
                  <div className="mt-8 border-b border-slate-400 w-36" />
                  <p className="text-[10px] text-slate-500 mt-1">Official Seal & Signature</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Visa Readiness Checklist */}
        <TabsContent value="checklist" className="mt-6 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-amber-500" /> Student Visa Application Preparation
              Checklist
            </h3>
            <p className="text-xs text-muted-foreground">
              Complete these critical milestones before booking your visa appointment at the embassy
              or VFS/TLScontact center:
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  id: "passport",
                  label: "Valid Biometric Passport",
                  desc: "Must have at least 2 blank pages and 6+ months validity beyond course end date.",
                },
                {
                  id: "admission",
                  label: "Unconditional University Admission Letter",
                  desc: "Official signed acceptance letter or CAS statement (UK) / I-20 (USA).",
                },
                {
                  id: "scholarship_letter",
                  label: "Official Scholarship Award Letter",
                  desc: "Signed confirmation of scholarship stipend, tuition waiver, and airfare grants.",
                },
                {
                  id: "transcripts_apostille",
                  label: "Legalized Transcripts & Degrees (Apostille / MINAFFET)",
                  desc: "Certified by Ministry of Education and Ministry of Foreign Affairs.",
                },
                {
                  id: "tb_medical",
                  label: "Tuberculosis (TB) Medical Clearance",
                  desc: "IOM / designated clinic diagnostic certificate (mandatory for UK/Canada/Korea).",
                },
                {
                  id: "police_clearance",
                  label: "National Police Clearance Certificate",
                  desc: "Criminal background check issued within the last 3 months.",
                },
                {
                  id: "accommodation",
                  label: "Proof of Accommodation / Student Dormitory",
                  desc: "Dormitory allocation letter or verified rental contract.",
                },
                {
                  id: "insurance",
                  label: "International Travel & Health Insurance",
                  desc: "Minimum €30,000 / $50,000 coverage compliant with Schengen/national rules.",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                    checkedItems[item.id]
                      ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                      : "border-border bg-card"
                  }`}
                >
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={() => toggleCheck(item.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-xs font-bold ${checkedItems[item.id] ? "text-emerald-700 dark:text-emerald-400 line-through" : "text-foreground"}`}
                    >
                      {item.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
