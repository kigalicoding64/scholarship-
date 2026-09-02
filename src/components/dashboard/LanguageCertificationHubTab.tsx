import React, { useState } from "react";
import { toast } from "sonner";
import {
  Languages,
  BookOpen,
  Award,
  FileCheck2,
  Printer,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Download,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LanguageCertificationHubTab: React.FC = () => {
  // MOI Waiver Form State
  const [moiStudentName, setMoiStudentName] = useState("Marie Claire Mukamana");
  const [moiPassport, setMoiPassport] = useState("PC1234567");
  const [moiGradUniversity, setMoiGradUniversity] = useState("University of Rwanda");
  const [moiDegree, setMoiDegree] = useState("Bachelor of Science in Computer Science");
  const [moiGradYear, setMoiGradYear] = useState("2025");
  const [moiTargetUniversity, setMoiTargetUniversity] = useState(
    "University of Oxford / DAAD Host University",
  );
  const [moiProgram, setMoiProgram] = useState("MSc in Advanced Computer Science");

  const [ieltsScore, setIeltsScore] = useState("7.5");
  const [toeflScore, setToeflScore] = useState("102");
  const [detScore, setDetScore] = useState("130");

  const handlePrintMoi = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">
              Language Certification & Waiver Hub
            </h2>
            <Badge className="bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
              Global Admissions Standard
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track test scores (TOEFL, IELTS, Duolingo DET), access free simulation resources, or
            generate an official Medium of Instruction (MOI) English Waiver Letter.
          </p>
        </div>
      </div>

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md h-10">
          <TabsTrigger value="tests" className="text-xs">
            <Award className="mr-1.5 size-3.5" /> Language Tests & Scores
          </TabsTrigger>
          <TabsTrigger value="moi" className="text-xs">
            <FileCheck2 className="mr-1.5 size-3.5" /> MOI English Waiver Generator
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Language Tests & Score Equivalency */}
        <TabsContent value="tests" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* IELTS */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">IELTS Academic</h3>
                <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px]">
                  UK / Global
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Widely recognized across UK, Australia, Europe, and Canada. Most top grants require{" "}
                <strong>Band 7.0–7.5+</strong>.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-border/60">
                <Label className="text-xs">Your Current / Target Band</Label>
                <Input
                  value={ieltsScore}
                  onChange={(e) => setIeltsScore(e.target.value)}
                  className="text-xs font-mono font-bold"
                />
              </div>
              <div className="pt-2">
                <a
                  href="https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-amber-600 hover:underline inline-flex items-center gap-1"
                >
                  British Council Free Practice Tests <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* TOEFL iBT */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">TOEFL iBT</h3>
                <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px]">
                  USA / Global
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Preferred by North American institutions & Fulbright. Target score for full funding
                is <strong>100–110+</strong>.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-border/60">
                <Label className="text-xs">Your Current / Target Score (Max 120)</Label>
                <Input
                  value={toeflScore}
                  onChange={(e) => setToeflScore(e.target.value)}
                  className="text-xs font-mono font-bold"
                />
              </div>
              <div className="pt-2">
                <a
                  href="https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-amber-600 hover:underline inline-flex items-center gap-1"
                >
                  ETS TOEFL Official Test Practice <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Duolingo English Test */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Duolingo Test (DET)</h3>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px]">
                  Online / Cost-Effective
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Accepted by 4,500+ universities worldwide. Fast results in 48 hours. Target:{" "}
                <strong>125–140+</strong>.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-border/60">
                <Label className="text-xs">Your Current / Target Score (Max 160)</Label>
                <Input
                  value={detScore}
                  onChange={(e) => setDetScore(e.target.value)}
                  className="text-xs font-mono font-bold"
                />
              </div>
              <div className="pt-2">
                <a
                  href="https://englishtest.duolingo.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-amber-600 hover:underline inline-flex items-center gap-1"
                >
                  Duolingo Free Mock Test <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Score Conversion Matrix */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-amber-500" /> International Score Equivalency Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-secondary/60 text-left font-semibold">
                  <tr>
                    <th className="p-2.5">Proficiency Level (CEFR)</th>
                    <th className="p-2.5">IELTS Academic</th>
                    <th className="p-2.5">TOEFL iBT</th>
                    <th className="p-2.5">Duolingo DET</th>
                    <th className="p-2.5">Admissions Competitiveness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-2.5 font-bold text-amber-600 dark:text-amber-400">
                      C2 Mastery
                    </td>
                    <td className="p-2.5 font-mono">8.5 – 9.0</td>
                    <td className="p-2.5 font-mono">115 – 120</td>
                    <td className="p-2.5 font-mono">145 – 160</td>
                    <td className="p-2.5 text-emerald-600 font-semibold">
                      Exceeds all Oxford/Ivy League criteria
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-600 dark:text-amber-400">
                      C1 Advanced
                    </td>
                    <td className="p-2.5 font-mono">7.0 – 8.0</td>
                    <td className="p-2.5 font-mono">94 – 114</td>
                    <td className="p-2.5 font-mono">120 – 140</td>
                    <td className="p-2.5 text-emerald-600 font-semibold">
                      Meets 98% of European & UK grants
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">B2 Upper Intermediate</td>
                    <td className="p-2.5 font-mono">5.5 – 6.5</td>
                    <td className="p-2.5 font-mono">72 – 93</td>
                    <td className="p-2.5 font-mono">95 – 115</td>
                    <td className="p-2.5 text-amber-600 font-semibold">
                      Eligible for most conditional admissions
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: MOI English Proficiency Waiver Generator */}
        <TabsContent value="moi" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generator Inputs */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-sm font-bold text-foreground">MOI Waiver Letter Information</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Fill in your academic background to generate an official Medium of Instruction
                  waiver request letter.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Applicant Full Name</Label>
                  <Input
                    value={moiStudentName}
                    onChange={(e) => setMoiStudentName(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Passport Number</Label>
                    <Input
                      value={moiPassport}
                      onChange={(e) => setMoiPassport(e.target.value)}
                      className="text-xs mt-1 uppercase font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Graduation Year</Label>
                    <Input
                      value={moiGradYear}
                      onChange={(e) => setMoiGradYear(e.target.value)}
                      className="text-xs mt-1 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Undergraduate University</Label>
                  <Input
                    value={moiGradUniversity}
                    onChange={(e) => setMoiGradUniversity(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Degree Conferred</Label>
                  <Input
                    value={moiDegree}
                    onChange={(e) => setMoiDegree(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Target University / Scholarship Board</Label>
                  <Input
                    value={moiTargetUniversity}
                    onChange={(e) => setMoiTargetUniversity(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Target Graduate Program</Label>
                  <Input
                    value={moiProgram}
                    onChange={(e) => setMoiProgram(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>

                <Button
                  onClick={handlePrintMoi}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 mt-2"
                >
                  <Printer className="size-3.5" /> Print / Export Official Waiver Letter (PDF)
                </Button>
              </div>
            </div>

            {/* Formatted Letter Preview */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl space-y-4 print:p-0 print:border-none print:shadow-none text-slate-900 bg-white">
              <div className="border-b border-slate-300 pb-3 text-right text-xs text-slate-500 font-mono">
                Date:{" "}
                {new Date().toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <div className="text-xs space-y-1 text-slate-800 font-sans">
                <p className="font-bold">
                  To: The Admissions Committee & Scholarship Selection Board
                </p>
                <p className="font-medium text-slate-700">{moiTargetUniversity}</p>
              </div>

              <div className="pt-2 text-xs font-bold uppercase tracking-wide text-slate-900 border-b border-slate-300 pb-1">
                Subject: Formal Request for English Language Proficiency Test Waiver (Medium of
                Instruction)
              </div>

              <div className="text-xs text-slate-800 space-y-3 leading-relaxed font-sans">
                <p>Dear Admissions Committee,</p>
                <p>
                  I am writing to formally request a waiver of the standardized English language
                  proficiency requirement (e.g., IELTS/TOEFL) for my application to the{" "}
                  <strong>{moiProgram}</strong>.
                </p>
                <p>
                  I hold a <strong>{moiDegree}</strong> from <strong>{moiGradUniversity}</strong>{" "}
                  (graduated {moiGradYear}), where the sole and official Medium of Instruction
                  (MOI), evaluation, course examinations, and thesis defense was{" "}
                  <strong>English</strong> throughout my entire academic degree program.
                </p>
                <p>
                  Having completed four years of rigorous university-level academic coursework,
                  technical research papers, and seminar presentations conducted exclusively in
                  English, I possess full academic proficiency and fluency across listening,
                  reading, writing, and speaking competencies.
                </p>
                <p>
                  Attached to this application, you will find my official university degree
                  certificate, certified academic transcripts, and institutional Medium of
                  Instruction declaration.
                </p>
                <p>Thank you very much for your kind consideration of my waiver request.</p>
              </div>

              <div className="pt-6 text-xs text-slate-900 font-sans">
                <p>Sincerely,</p>
                <p className="font-bold text-sm mt-2">{moiStudentName}</p>
                <p className="text-slate-600 font-mono">Passport No: {moiPassport}</p>
                <p className="text-slate-600">Applicant for {moiProgram}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
