import { harvestScholarshipOpportunities } from "@/lib/scholarship-ai-harvester";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || undefined;
  const region = searchParams.get("region") || undefined;
  const degree = searchParams.get("degree") || undefined;
  const geminiApiKey =
    searchParams.get("apiKey") ||
    process.env["GEMINI_API_KEY"] ||
    process.env["VITE_GEMINI_API_KEY"] ||
    undefined;

  try {
    const scholarships = await harvestScholarshipOpportunities({
      query,
      region,
      degree,
      geminiApiKey,
    });

    return Response.json({
      success: true,
      count: scholarships.length,
      scholarships,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to harvest scholarships";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, string | undefined>;
    const query = body["query"] || undefined;
    const region = body["region"] || undefined;
    const degree = body["degree"] || undefined;
    const geminiApiKey =
      body["geminiApiKey"] ||
      process.env["GEMINI_API_KEY"] ||
      process.env["VITE_GEMINI_API_KEY"] ||
      undefined;

    const scholarships = await harvestScholarshipOpportunities({
      query,
      region,
      degree,
      geminiApiKey,
    });

    return Response.json({
      success: true,
      count: scholarships.length,
      scholarships,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to harvest scholarships";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
