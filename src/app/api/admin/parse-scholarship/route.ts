import { parseScholarshipMultiModal, buildScholarshipSummary } from "@/lib/gemini-parser";
import { supabase } from "@/integrations/supabase/client";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const text = typeof body["text"] === "string" ? body["text"] : undefined;
    const fileBase64 = typeof body["fileBase64"] === "string" ? body["fileBase64"] : undefined;
    const mimeType = typeof body["mimeType"] === "string" ? body["mimeType"] : undefined;
    const autoPublish = body["autoPublish"] !== false;
    const geminiApiKey =
      typeof body["geminiApiKey"] === "string" && body["geminiApiKey"].trim()
        ? (body["geminiApiKey"] as string)
        : process.env["GEMINI_API_KEY"] || process.env["VITE_GEMINI_API_KEY"] || undefined;

    if (!text && !fileBase64) {
      return Response.json(
        { success: false, error: "Please provide either text or a file/poster image to parse." },
        { status: 400 },
      );
    }

    // 1. Run Gemini multi-modal extraction
    const parsed = await parseScholarshipMultiModal({
      text,
      fileBase64,
      mimeType,
      geminiApiKey,
    });

    const formattedSummary = buildScholarshipSummary(parsed);

    // 2. Persist directly to Supabase scholarships table
    let scholarshipId = `parsed-${Date.now()}`;
    let savedRecord = null;

    try {
      const payload = {
        title: parsed.title,
        university: parsed.institution,
        country: parsed.country,
        degree_levels: [parsed.degreeLevel || "Master's"],
        funding_type: parsed.fundingType,
        coverage_details: parsed.coverageDetails,
        official_link: parsed.officialLink,
        deadline: parsed.deadline,
        status: autoPublish ? "published" : "draft",
      };

      const { data, error } = await supabase.from("scholarships").insert(payload).select().single();
      if (!error && data) {
        scholarshipId = data.id;
        savedRecord = data;
      }
    } catch (dbErr) {
      console.warn("Supabase insert notice in parse-scholarship:", dbErr);
    }

    return Response.json({
      success: true,
      scholarshipId,
      scholarship: savedRecord || {
        id: scholarshipId,
        title: parsed.title,
        university: parsed.institution,
        country: parsed.country,
        degree_levels: [parsed.degreeLevel],
        funding_type: parsed.fundingType,
        coverage_details: parsed.coverageDetails,
        official_link: parsed.officialLink,
        deadline: parsed.deadline,
        status: "published",
      },
      parsed,
      summaryPoints: parsed.summaryPoints,
      formattedSummary,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to parse scholarship";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
