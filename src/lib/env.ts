import { z } from "zod";

/**
 * Universal Environment Schema with Safe Fallback Defaults.
 * Validates SITE_URL across Server (Node/Nitro SSR) and Client (Vite)
 * guaranteeing a valid URL fallback ("https://elschoral.vercel.app").
 */
export const envSchema = z.object({
  SITE_URL: z.string().url().default("https://elschoral.vercel.app"),
  VITE_SITE_URL: z.string().url().optional().default("https://elschoral.vercel.app"),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  VITE_SUPABASE_URL: z.string().optional(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  VITE_GOOGLE_CLIENT_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function getRawEnv(): Record<string, unknown> {
  const raw: Record<string, unknown> = {};

  if (typeof process !== "undefined" && process?.env) {
    Object.assign(raw, process.env);
  }

  if (
    typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, unknown> })?.env
  ) {
    Object.assign(raw, (import.meta as unknown as { env: Record<string, unknown> }).env);
  }

  if (!raw["SITE_URL"] && raw["VITE_SITE_URL"]) {
    raw["SITE_URL"] = raw["VITE_SITE_URL"];
  }

  return raw;
}

const parsedEnv = envSchema.safeParse(getRawEnv());

export const env: Env = parsedEnv.success
  ? parsedEnv.data
  : {
      SITE_URL: "https://elschoral.vercel.app",
      VITE_SITE_URL: "https://elschoral.vercel.app",
    };

export const SITE_URL: string = env.SITE_URL || "https://elschoral.vercel.app";

export function getSiteUrl(): string {
  return SITE_URL;
}
