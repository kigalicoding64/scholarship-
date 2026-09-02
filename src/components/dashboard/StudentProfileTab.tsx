import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Globe2,
  Calendar,
  GraduationCap,
  Award,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/hooks/useAuth";

export interface StudentProfileData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  passportNumber: string;
  passportExpiry: string;
  targetDegree: string;
  primaryField: string;
  currentInstitution: string;
  currentGpa: string;
  gpaScale: string;
  targetCountries: string;
  bio: string;
  fundingNeed: string;
}

const DEFAULT_PROFILE: StudentProfileData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "Rwanda",
  countryOfResidence: "Rwanda",
  passportNumber: "",
  passportExpiry: "",
  targetDegree: "Master's",
  primaryField: "Computer Science & Artificial Intelligence",
  currentInstitution: "University of Rwanda",
  currentGpa: "3.85",
  gpaScale: "4.0",
  targetCountries: "United Kingdom, Germany, Canada, United States",
  bio: "Passionate aspiring postgraduate scholar focusing on technology innovation, sustainable development, and global academic exchange.",
  fundingNeed: "100% Fully Funded",
};

export const StudentProfileTab: React.FC = () => {
  const { user } = useSession();
  const [profile, setProfile] = useState<StudentProfileData>(DEFAULT_PROFILE);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`student_profile_${user?.id || "guest"}`);
      if (saved) {
        try {
          setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(saved) });
        } catch {
          // fallback to default
        }
      } else if (user) {
        const meta = user.user_metadata || {};
        const metaName = (meta["full_name"] as string) || (meta["name"] as string) || "";
        setProfile((prev) => ({
          ...prev,
          fullName: metaName,
          email: user.email || "",
        }));
      }
    }
  }, [user]);

  const handleSave = () => {
    setIsSaving(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`student_profile_${user?.id || "guest"}`, JSON.stringify(profile));
      }
      toast.success("Scholar profile successfully updated!");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const calculateCompleteness = () => {
    const fields = Object.values(profile);
    const filled = fields.filter((f) => Boolean(f && f.trim().length > 0));
    return Math.round((filled.length / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xl font-bold">
              <User className="size-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">
                  {profile.fullName || "International Scholar Profile"}
                </h2>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                  <ShieldCheck className="mr-1 size-3" /> Verified Scholar
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {profile.primaryField} · {profile.nationality}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Profile Readiness
              </span>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
                {completeness}% Completed
              </p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5"
            >
              <Save className="size-4" /> Save Profile
            </Button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-2">
              <User className="size-4 text-amber-500" /> Personal Details
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs">
                Full Legal Name (as on Passport)
              </Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                placeholder="e.g. Marie Claire Mukamana"
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="scholar@example.com"
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">
                  WhatsApp / Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+250 788 123 456"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="dob" className="text-xs">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nationality" className="text-xs">
                  Nationality / Citizenship
                </Label>
                <Input
                  id="nationality"
                  value={profile.nationality}
                  onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                  placeholder="e.g. Rwanda, Kenya, Uganda"
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="passportNo" className="text-xs">
                  Passport Number
                </Label>
                <Input
                  id="passportNo"
                  value={profile.passportNumber}
                  onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value })}
                  placeholder="PC1234567"
                  className="text-xs font-mono uppercase"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="passportExp" className="text-xs">
                  Passport Expiry Date
                </Label>
                <Input
                  id="passportExp"
                  type="date"
                  value={profile.passportExpiry}
                  onChange={(e) => setProfile({ ...profile, passportExpiry: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* Academic & Target Preferences */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-2">
              <GraduationCap className="size-4 text-amber-500" /> Academic Background & Targets
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Target Degree Level</Label>
                <Select
                  value={profile.targetDegree}
                  onValueChange={(v) => setProfile({ ...profile, targetDegree: v })}
                >
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Undergraduate">Undergraduate (Bachelor's)</SelectItem>
                    <SelectItem value="Master's">Master's (MSc / MA / MPhil)</SelectItem>
                    <SelectItem value="PhD">Doctorate / PhD</SelectItem>
                    <SelectItem value="Postdoctoral">Postdoctoral Fellowship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Funding Requirement</Label>
                <Select
                  value={profile.fundingNeed}
                  onValueChange={(v) => setProfile({ ...profile, fundingNeed: v })}
                >
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100% Fully Funded">
                      100% Fully Funded (Tuition + Stipend)
                    </SelectItem>
                    <SelectItem value="Partial / Tuition Only">Partial / Tuition Only</SelectItem>
                    <SelectItem value="Research Grant">Research Grant / Assistantship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="primaryField" className="text-xs">
                Field of Study / Academic Discipline
              </Label>
              <Input
                id="primaryField"
                value={profile.primaryField}
                onChange={(e) => setProfile({ ...profile, primaryField: e.target.value })}
                placeholder="e.g. Public Health, Data Science, Mechanical Engineering"
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="institution" className="text-xs">
                  Current / Previous University
                </Label>
                <Input
                  id="institution"
                  value={profile.currentInstitution}
                  onChange={(e) => setProfile({ ...profile, currentInstitution: e.target.value })}
                  placeholder="e.g. University of Rwanda"
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gpa" className="text-xs">
                  Academic Score / GPA (Scale)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="gpa"
                    value={profile.currentGpa}
                    onChange={(e) => setProfile({ ...profile, currentGpa: e.target.value })}
                    placeholder="3.85"
                    className="text-xs flex-1 font-mono"
                  />
                  <Input
                    value={profile.gpaScale}
                    onChange={(e) => setProfile({ ...profile, gpaScale: e.target.value })}
                    placeholder="4.0"
                    className="text-xs w-20 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="targetCountries" className="text-xs">
                Preferred Study Destinations
              </Label>
              <Input
                id="targetCountries"
                value={profile.targetCountries}
                onChange={(e) => setProfile({ ...profile, targetCountries: e.target.value })}
                placeholder="e.g. United Kingdom, Germany, Canada, Japan"
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio" className="text-xs">
                Academic Statement / Professional Bio
              </Label>
              <Textarea
                id="bio"
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Brief summary of your academic achievements, leadership, and research goals..."
                className="text-xs resize-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-end border-t border-border pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-2"
          >
            <CheckCircle2 className="size-4" /> Save Profile Details
          </Button>
        </div>
      </div>
    </div>
  );
};
