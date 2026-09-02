export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Verified Global Scholarship 2026/2027").slice(0, 90);
  const country = (searchParams.get("country") || "International / Global").slice(0, 40);
  const coverage = (
    searchParams.get("coverage") || "100% Full Tuition + Living Stipend + Airfare"
  ).slice(0, 80);
  const deadline = (searchParams.get("deadline") || "Upcoming Intake 2026/2027").slice(0, 30);
  const institution = (
    searchParams.get("institution") ||
    searchParams.get("university") ||
    "World-Class Partner Institution"
  ).slice(0, 60);

  // Clean XML-safe strings
  const escapeXml = (unsafe: string) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const safeTitle = escapeXml(title);
  const safeCountry = escapeXml(country);
  const safeCoverage = escapeXml(coverage);
  const safeDeadline = escapeXml(deadline);
  const safeInstitution = escapeXml(institution);

  // SVG 1200x630 Social Banner
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030712" />
      <stop offset="60%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="rgba(16, 185, 129, 0.25)" />
      <stop offset="100%" stop-color="rgba(3, 7, 18, 0)" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background Layer -->
  <rect width="1200" height="630" fill="url(#bgGradient)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <circle cx="950" cy="150" r="350" fill="url(#glow)" />

  <!-- Top Accent Bar -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#accentGradient)" />

  <!-- Header Brand Row -->
  <g transform="translate(60, 60)">
    <!-- Logo Badge -->
    <rect x="0" y="0" width="44" height="44" rx="10" fill="#10B981" />
    <path d="M 12 28 L 22 14 L 32 28 Z" fill="#030712" />
    <path d="M 17 28 L 22 21 L 27 28 Z" fill="#ffffff" />
    
    <text x="56" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      El<tspan fill="#10B981">Scholarship</tspan>
    </text>
    <text x="56" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" letter-spacing="2">
      VERIFIED GLOBAL ACADEMIC MOBILITY
    </text>

    <!-- Verification Pill -->
    <rect x="860" y="4" width="220" height="36" rx="18" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="1.5" />
    <circle cx="880" cy="22" r="5" fill="#10B981" />
    <text x="894" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#10B981" letter-spacing="0.5">
      100% OFFICIAL PORTAL
    </text>
  </g>

  <!-- Middle Content Area -->
  <g transform="translate(60, 170)">
    <!-- Country & Institution Tag -->
    <rect x="0" y="0" width="auto" height="32" rx="8" fill="rgba(245, 158, 11, 0.15)" />
    <text x="12" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#F59E0B" letter-spacing="1">
      📍 ${safeCountry.toUpperCase()} • ${safeInstitution.toUpperCase()}
    </text>

    <!-- Main Title (Multi-line layout) -->
    <text x="0" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="#F8FAFC" letter-spacing="-1">
      ${safeTitle}
    </text>

    <!-- Benefits Highlight Card -->
    <rect x="0" y="140" width="1080" height="110" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />
    
    <text x="30" y="178" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#94A3B8" letter-spacing="1">
      SCHOLARSHIP COVERAGE &amp; BENEFITS:
    </text>
    <text x="30" y="215" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#34D399">
      ✨ ${safeCoverage}
    </text>
  </g>

  <!-- Footer Info Bar -->
  <g transform="translate(60, 520)">
    <!-- Deadline Indicator -->
    <rect x="0" y="0" width="460" height="50" rx="12" fill="rgba(30, 41, 59, 0.8)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
    <text x="24" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#CBD5E1">
      ⏳ <tspan font-weight="700" fill="#F8FAFC">Deadline:</tspan> ${safeDeadline}
    </text>

    <!-- Concierge Execution Badge -->
    <rect x="480" y="0" width="600" height="50" rx="12" fill="rgba(16, 185, 129, 0.12)" stroke="#10B981" stroke-width="1" />
    <text x="504" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#10B981">
      🚀 Apply Directly or via Managed Concierge on ElScholarship
    </text>
  </g>
</svg>
`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
