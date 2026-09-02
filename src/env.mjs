import { z } from "zod";

/**
 * Universal Environment Schema with Safe Fallback Defaults.
 * Validates SITE_URL and Supabase credentials across both Server (Node/Nitro/Cloudflare SSR)
 * and Client (Vite/Browser) execution environments without throwing runtime validation errors.
 */
const envSchema = z.object({
  SITE_URL: z.string().url().default("https://elschoral.vercel.app"),
  VITE_SITE_URL: z.string().url().optional().default("https://elschoral.vercel.app"),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  VITE_SUPABASE_URL: z.string().optional(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  VITE_GOOGLE_CLIENT_ID: z.string().optional(),
});

/**
 * Reads environment variables from process.env (Node/SSR) or import.meta.env (Vite client).
 */
function getRawEnv() {
  const raw = {};

  // Server-side environment variables
  if (typeof process !== "undefined" && process?.env) {
    Object.assign(raw, process.env);
  }

  // Client-side Vite environment variables
  if (typeof import.meta !== "undefined" && import.meta?.env) {
    Object.assign(raw, import.meta.env);
  }

  // Prefer VITE_SITE_URL or SITE_URL if defined
  if (!raw.SITE_URL && raw.VITE_SITE_URL) {
    raw.SITE_URL = raw.VITE_SITE_URL;
  }

  return raw;
}

const parsedEnv = envSchema.safeParse(getRawEnv());

export const env = parsedEnv.success
  ? parsedEnv.data
  : {
      SITE_URL: "https://elschoral.vercel.app",
      VITE_SITE_URL: "https://elschoral.vercel.app",
    };

export const SITE_URL = env.SITE_URL || "https://elschoral.vercel.app";
