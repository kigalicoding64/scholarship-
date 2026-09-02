import { useState, useEffect } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Lock,
  ExternalLink,
  Activity,
} from "lucide-react";
import { verifyHostedUrl, type UrlVerificationResult } from "@/lib/url-verifier";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface UrlVerificationBadgeProps {
  url?: string | null;
  className?: string;
  showDetails?: boolean;
  size?: "sm" | "md";
}

export function UrlVerificationBadge({
  url,
  className = "",
  showDetails = false,
  size = "sm",
}: UrlVerificationBadgeProps) {
  const [result, setResult] = useState<UrlVerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    setLoading(true);

    verifyHostedUrl(url)
      .then((res) => {
        if (isMounted) {
          setResult(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (!url) return null;

  const handleRecheck = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!url || loading) return;
    setLoading(true);
    verifyHostedUrl(url, { forceFresh: true })
      .then((res) => {
        setResult(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading || !result) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400 ${className}`}
      >
        <RefreshCw className="size-3 animate-spin text-slate-400" />
        <span>Verifying URL...</span>
      </span>
    );
  }

  const isLive = result.status === "verified_active";
  const isRedirect = result.status === "redirect";
  const isBroken =
    result.status === "client_error" ||
    result.status === "server_error" ||
    result.status === "invalid_syntax" ||
    result.status === "unreachable";

  const badgeContent = (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold transition-colors ${
        size === "sm" ? "text-[10px]" : "text-xs px-2.5 py-1"
      } ${
        isLive
          ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-500/30"
          : isRedirect
            ? "bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-500/30"
            : "bg-rose-500/10 text-rose-700 border border-rose-500/20 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-500/30"
      } ${className}`}
    >
      {isLive ? (
        <ShieldCheck className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : isRedirect ? (
        <AlertTriangle className="size-3 text-amber-600 dark:text-amber-400 shrink-0" />
      ) : (
        <XCircle className="size-3 text-rose-600 dark:text-rose-400 shrink-0" />
      )}
      <span>
        {isLive
          ? "Live & Verified Portal"
          : isRedirect
            ? "Redirecting Portal"
            : "Link Pending Check"}
      </span>
    </span>
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="inline-block cursor-help">{badgeContent}</div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs space-y-2 rounded-lg border border-slate-200 bg-slate-900 p-3 text-white shadow-xl dark:border-slate-800"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-1.5 text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Activity className="size-3.5 text-emerald-400" /> URL Health Report
            </span>
            <span
              className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                result.safetyScore >= 80
                  ? "bg-emerald-500/20 text-emerald-300"
                  : result.safetyScore >= 50
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-rose-500/20 text-rose-300"
              }`}
            >
              Score: {result.safetyScore}/100
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Host Domain:</span>
              <span className="font-mono font-medium text-slate-200">{result.domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Security:</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Lock className="size-2.5" /> {result.isHttps ? "SSL Encrypted" : "Insecure"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Response Speed:</span>
              <span className="font-medium text-slate-200">{result.latencyMs}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Institution Verified:</span>
              <span className="font-medium text-emerald-400">
                {result.isOfficialDomain ? "Yes (Official)" : "Verified Partner"}
              </span>
            </div>
          </div>

          {result.notes.length > 0 && (
            <div className="border-t border-slate-800 pt-1.5 text-[10px] text-slate-400">
              {result.notes[0]}
            </div>
          )}

          <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-slate-800/80">
            <span>Checked just now</span>
            <button
              type="button"
              onClick={handleRecheck}
              className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:underline"
            >
              <RefreshCw className="size-2.5" /> Re-verify
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
