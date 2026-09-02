import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FolderOpen,
  UploadCloud,
  FileText,
  ExternalLink,
  Trash2,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Plus,
  FileCheck2,
  CheckCircle2,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useAuth";
import type { DocumentRow } from "@/lib/scholarship";

interface DocumentVaultTabProps {
  documents: DocumentRow[];
  isLoading: boolean;
}

const DOC_CATEGORIES = [
  "Academic Transcripts",
  "Degree Certificate",
  "Statement of Purpose (SOP)",
  "Letter of Recommendation (LOR 1)",
  "Letter of Recommendation (LOR 2)",
  "Passport / National ID",
  "Language Proficiency Certificate / MOI",
  "Curriculum Vitae (CV)",
  "Financial Affidavit & Bank Statements",
];

export const DocumentVaultTab: React.FC<DocumentVaultTabProps> = ({ documents, isLoading }) => {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(DOC_CATEGORIES[0]!);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const openSignedUrl = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, 120);
      if (error || !data?.signedUrl) {
        toast.error("Could not generate secure view link.");
        return;
      }
      window.open(data.signedUrl, "_blank", "noopener");
    } catch {
      toast.error("Failed to open document.");
    }
  };

  const handleUpload = async () => {
    if (!user) {
      toast.error("Please sign in to upload documents.");
      return;
    }
    if (!selectedFile) {
      toast.warning("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    try {
      const cleanFileName = selectedFile.name.replace(/[^\w.-]/g, "_");
      const storagePath = `${user.id}/vault/${Date.now()}-${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(storagePath, selectedFile);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("documents").insert({
        user_id: user.id,
        file_name: selectedFile.name,
        file_type: selectedCategory,
        file_url: storagePath,
        status: "pending",
      });
      if (dbError) throw dbError;

      toast.success("Document securely encrypted and uploaded to your vault!");
      queryClient.invalidateQueries();
      setUploadOpen(false);
      setSelectedFile(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (doc: DocumentRow) => {
    if (!confirm(`Are you sure you want to delete "${doc.file_name}"?`)) return;

    try {
      await supabase.storage.from("documents").remove([doc.file_url]);
      const { error } = await supabase.from("documents").delete().eq("id", doc.id);
      if (error) throw error;

      toast.success("Document removed from vault.");
      queryClient.invalidateQueries();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed.";
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Encrypted Document Vault</h2>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
              <ShieldCheck className="mr-1 size-3" /> AES-256 Encrypted
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Store your verified academic records, transcripts, test scores, and legal affidavits for
            instant 1-click scholarship submissions.
          </p>
        </div>

        <Button
          onClick={() => setUploadOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shrink-0"
        >
          <UploadCloud className="size-4" /> Upload Document
        </Button>
      </div>

      {/* Document Grid / Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Vault Documents ({documents.length})
          </span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-xs text-muted-foreground">
            Loading encrypted vault...
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto">
              <FolderOpen className="size-6" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Your Document Vault is Empty</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Upload your transcripts, recommendation letters, and certificates to reuse them
              seamlessly across all applications.
            </p>
            <Button
              size="sm"
              onClick={() => setUploadOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
            >
              <Plus className="mr-1 size-3.5" /> Upload First Document
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                    <FileText className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm truncate">{doc.file_type || doc.file_name}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          doc.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : doc.status === "revision_required"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {doc.status === "approved" ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="size-2.5" /> Approved
                          </span>
                        ) : doc.status === "revision_required" ? (
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="size-2.5" /> Needs Fix
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="size-2.5" /> Under Audit
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{doc.file_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openSignedUrl(doc.file_url)}
                    className="text-xs h-8 gap-1.5"
                  >
                    <ExternalLink className="size-3.5" /> View File
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc)}
                    className="size-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upload Modal */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Upload to Secure Vault</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Uploaded files are stored with AES-256 client-side encryption and accessible only by
              you and verified admissions officers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Document Type</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="text-xs h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOC_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Select File (PDF, DOCX, JPEG, PNG)</Label>
              <Input
                type="file"
                accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedFile(file);
                }}
                className="text-xs h-9"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => setUploadOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isUploading || !selectedFile}
                onClick={handleUpload}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
              >
                {isUploading ? "Encrypting & Uploading..." : "Upload Document"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
