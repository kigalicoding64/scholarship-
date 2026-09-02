import React, { useState } from "react";
import { toast } from "sonner";
import {
  FileText,
  Printer,
  Plus,
  Trash2,
  Sparkles,
  Download,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Languages,
  CheckCircle2,
  RefreshCw,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface CvEducation {
  id: string;
  degree: string;
  institution: string;
  location: string;
  dates: string;
  gpa: string;
  honors: string;
}

export interface CvExperience {
  id: string;
  title: string;
  organization: string;
  location: string;
  dates: string;
  description: string;
}

export interface CvPublication {
  id: string;
  title: string;
  journal: string;
  year: string;
  doi: string;
}

export interface CvData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  summary: string;
  education: CvEducation[];
  experience: CvExperience[];
  publications: CvPublication[];
  skills: string;
  languages: string;
  awards: string;
}

const INITIAL_CV: CvData = {
  fullName: "Marie Claire Mukamana",
  email: "m.mukamana@scholar.ac.rw",
  phone: "+250 788 123 456",
  location: "Kigali, Rwanda",
  linkedIn: "linkedin.com/in/marie-claire-mukamana",
  summary:
    "High-achieving computer science researcher and software engineer specializing in artificial intelligence and health informatics. Dedicated to advancing educational access and scalable tech solutions in sub-Saharan Africa.",
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science (First Class Honours)",
      institution: "University of Rwanda",
      location: "Kigali, Rwanda",
      dates: "2021 – 2025",
      gpa: "3.88 / 4.0",
      honors: "Dean's List (All Semesters), Best Final Year Capstone Project",
    },
  ],
  experience: [
    {
      id: "exp-1",
      title: "Undergraduate Teaching & Research Assistant",
      organization: "Center of Excellence in Biomedical Engineering",
      location: "Kigali, Rwanda",
      dates: "2024 – Present",
      description:
        "Assisted faculty in conducting machine learning experiments for malaria diagnostic imaging; mentored 40+ sophomore students in Python data structures.",
    },
    {
      id: "exp-2",
      title: "Software Engineering Intern",
      organization: "Rwanda Information Society Authority (RISA)",
      location: "Kigali, Rwanda",
      dates: "Jun 2023 – Dec 2023",
      description:
        "Contributed to the development of digitized government services; optimized PostgreSQL database queries reducing API latency by 32%.",
    },
  ],
  publications: [
    {
      id: "pub-1",
      title: "Optimizing Mobile Convolutional Neural Networks for Low-Resource Edge Diagnostics",
      journal: "IEEE African Journal of Computing & AI",
      year: "2024",
      doi: "10.1109/AFRICON.2024.1082194",
    },
  ],
  skills:
    "Python, PyTorch, TypeScript, React, SQL, Git, Linux, Academic Writing, Statistical Data Analysis (R)",
  languages:
    "English (Fluent / Professional Working), French (Advanced / B2), Kinyarwanda (Native), Swahili (Conversational)",
  awards:
    "National STEM Leadership Fellowship (2024), African Youth Innovation Prize Winner (2023)",
};

export const AcademicCvBuilderTab: React.FC = () => {
  const [cv, setCv] = useState<CvData>(INITIAL_CV);
  const [previewMode, setPreviewMode] = useState(false);

  // Education Helpers
  const addEducation = () => {
    setCv((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu-${Date.now()}`,
          degree: "",
          institution: "",
          location: "",
          dates: "",
          gpa: "",
          honors: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setCv((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducation = (id: string, field: keyof CvEducation, value: string) => {
    setCv((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Experience Helpers
  const addExperience = () => {
    setCv((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp-${Date.now()}`,
          title: "",
          organization: "",
          location: "",
          dates: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setCv((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id: string, field: keyof CvExperience, value: string) => {
    setCv((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Publication Helpers
  const addPublication = () => {
    setCv((prev) => ({
      ...prev,
      publications: [
        ...prev.publications,
        {
          id: `pub-${Date.now()}`,
          title: "",
          journal: "",
          year: "",
          doi: "",
        },
      ],
    }));
  };

  const removePublication = (id: string) => {
    setCv((prev) => ({
      ...prev,
      publications: prev.publications.filter((p) => p.id !== id),
    }));
  };

  const updatePublication = (id: string, field: keyof CvPublication, value: string) => {
    setCv((prev) => ({
      ...prev,
      publications: prev.publications.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Academic CV & Resume Builder</h2>
            <Badge className="bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
              Harvard / Europass Standard
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Build ATS-compliant academic curriculum vitae customized for international graduate
            admissions and scholarships.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="text-xs gap-1.5"
          >
            <Eye className="size-3.5" />
            {previewMode ? "Edit Mode" : "Preview CV"}
          </Button>

          <Button
            onClick={handlePrint}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5"
          >
            <Printer className="size-3.5" /> Print / Export PDF
          </Button>
        </div>
      </div>

      {previewMode ? (
        /* Printable / Live Visual Preview */
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
          <div className="text-center border-b border-slate-300 pb-4">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide uppercase text-slate-900">
              {cv.fullName || "Candidate Name"}
            </h1>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              {cv.location} · {cv.email} · {cv.phone}
            </p>
            {cv.linkedIn && (
              <p className="text-xs text-slate-500 font-mono mt-0.5">{cv.linkedIn}</p>
            )}
          </div>

          {/* Summary */}
          {cv.summary && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                Academic Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed mt-2">{cv.summary}</p>
            </div>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                Education
              </h2>
              <div className="space-y-3 mt-2">
                {cv.education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{edu.institution}</span>
                      <span className="font-normal text-slate-600">{edu.dates}</span>
                    </div>
                    <div className="flex justify-between italic text-slate-800">
                      <span>{edu.degree}</span>
                      <span className="font-normal not-italic">{edu.location}</span>
                    </div>
                    {edu.gpa && <p className="text-slate-600 mt-0.5">GPA: {edu.gpa}</p>}
                    {edu.honors && <p className="text-slate-600">Honors: {edu.honors}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research & Publications */}
          {cv.publications.length > 0 && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                Publications & Research
              </h2>
              <div className="space-y-2 mt-2">
                {cv.publications.map((pub) => (
                  <div key={pub.id} className="text-xs text-slate-800">
                    <span className="font-semibold">"{pub.title}."</span>{" "}
                    <span className="italic">{pub.journal}</span> ({pub.year}).
                    {pub.doi && (
                      <span className="text-slate-500 font-mono ml-1">DOI: {pub.doi}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {cv.experience.length > 0 && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                Professional & Teaching Experience
              </h2>
              <div className="space-y-3 mt-2">
                {cv.experience.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>
                        {exp.title} — {exp.organization}
                      </span>
                      <span className="font-normal text-slate-600">{exp.dates}</span>
                    </div>
                    <p className="text-slate-700 mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {cv.awards && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                Honors & Fellowships
              </h2>
              <p className="text-xs text-slate-700 mt-2">{cv.awards}</p>
            </div>
          )}

          {/* Skills & Languages */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cv.skills && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                  Technical & Research Skills
                </h2>
                <p className="text-xs text-slate-700 mt-2">{cv.skills}</p>
              </div>
            )}
            {cv.languages && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 font-serif">
                  Languages
                </h2>
                <p className="text-xs text-slate-700 mt-2">{cv.languages}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Form Editor Mode */
        <div className="space-y-6">
          {/* Header Info */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-2">
              <FileText className="size-4 text-amber-500" /> Contact & Header Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Full Legal Name</Label>
                <Input
                  value={cv.fullName}
                  onChange={(e) => setCv({ ...cv, fullName: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input
                  value={cv.email}
                  onChange={(e) => setCv({ ...cv, email: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Phone / WhatsApp</Label>
                <Input
                  value={cv.phone}
                  onChange={(e) => setCv({ ...cv, phone: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Location (City, Country)</Label>
                <Input
                  value={cv.location}
                  onChange={(e) => setCv({ ...cv, location: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label className="text-xs">LinkedIn / Academic URL</Label>
                <Input
                  value={cv.linkedIn}
                  onChange={(e) => setCv({ ...cv, linkedIn: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Academic Executive Summary</Label>
              <Textarea
                rows={3}
                value={cv.summary}
                onChange={(e) => setCv({ ...cv, summary: e.target.value })}
                className="text-xs resize-none"
              />
            </div>
          </div>

          {/* Education Section */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <GraduationCap className="size-4 text-amber-500" /> Education History
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={addEducation}
                className="text-xs h-7 gap-1"
              >
                <Plus className="size-3" /> Add Degree
              </Button>
            </div>

            {cv.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="rounded-xl border border-border p-4 space-y-3 bg-muted/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">Degree #{idx + 1}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeEducation(edu.id)}
                    className="size-6 text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Degree & Major</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="BSc in Computer Science"
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">University / Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="University of Rwanda"
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Dates / Expected Graduation</Label>
                    <Input
                      value={edu.dates}
                      onChange={(e) => updateEducation(edu.id, "dates", e.target.value)}
                      placeholder="2021 – 2025"
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">GPA / Score Scale</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="3.88 / 4.0"
                      className="text-xs mt-1 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs">Academic Honors / Awards</Label>
                    <Input
                      value={edu.honors}
                      onChange={(e) => updateEducation(edu.id, "honors", e.target.value)}
                      placeholder="Dean's List, Distinction, First Class Honours"
                      className="text-xs mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research & Publications Section */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <BookOpen className="size-4 text-amber-500" /> Publications & Research
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={addPublication}
                className="text-xs h-7 gap-1"
              >
                <Plus className="size-3" /> Add Publication
              </Button>
            </div>

            {cv.publications.map((pub, idx) => (
              <div
                key={pub.id}
                className="rounded-xl border border-border p-4 space-y-3 bg-muted/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">
                    Publication #{idx + 1}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removePublication(pub.id)}
                    className="size-6 text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <Label className="text-xs">Paper Title</Label>
                    <Input
                      value={pub.title}
                      onChange={(e) => updatePublication(pub.id, "title", e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Journal / Conference</Label>
                    <Input
                      value={pub.journal}
                      onChange={(e) => updatePublication(pub.id, "journal", e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Year / DOI</Label>
                    <Input
                      value={pub.year}
                      onChange={(e) => updatePublication(pub.id, "year", e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work & Teaching Experience */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Briefcase className="size-4 text-amber-500" /> Professional & Teaching Experience
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={addExperience}
                className="text-xs h-7 gap-1"
              >
                <Plus className="size-3" /> Add Experience
              </Button>
            </div>

            {cv.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="rounded-xl border border-border p-4 space-y-3 bg-muted/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">Role #{idx + 1}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeExperience(exp.id)}
                    className="size-6 text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Position / Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Organization / Lab</Label>
                    <Input
                      value={exp.organization}
                      onChange={(e) => updateExperience(exp.id, "organization", e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs">Key Contributions & Impact</Label>
                    <Textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      className="text-xs mt-1 resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills, Awards & Languages */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-2">
              <Award className="size-4 text-amber-500" /> Skills, Languages & Honors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Technical & Analytical Skills</Label>
                <Textarea
                  rows={3}
                  value={cv.skills}
                  onChange={(e) => setCv({ ...cv, skills: e.target.value })}
                  className="text-xs resize-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Languages & Proficiency Levels</Label>
                <Textarea
                  rows={3}
                  value={cv.languages}
                  onChange={(e) => setCv({ ...cv, languages: e.target.value })}
                  className="text-xs resize-none"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label className="text-xs">Fellowships, Awards & Honors</Label>
                <Input
                  value={cv.awards}
                  onChange={(e) => setCv({ ...cv, awards: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
