import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { SITE_URL } from "@/lib/env";

const FALLBACK_GUIDE_HERO =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop";

export const Route = createFileRoute("/guides/$category/$slug")({
  component: GuideArticlePage,
});

function GuideArticlePage() {
  const { category, slug } = Route.useParams();
  const [heroError, setHeroError] = useState(false);

  const formattedTitle = (slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
  const currentUrl = `${SITE_URL}/guides/${category}/${slug}`;
  const bannerImage = heroError
    ? FALLBACK_GUIDE_HERO
    : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: formattedTitle,
    description: `Comprehensive advisory guide regarding ${formattedTitle} in ${category}.`,
    mainEntityOfPage: currentUrl,
    image: bannerImage,
    datePublished: new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "ElScholarship",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/elscholaship-logo.jpg`,
      },
    },
    author: {
      "@type": "Organization",
      name: "ElScholarship Advisory Team",
    },
  };

  return (
    <>
      <SEOHead
        title={formattedTitle}
        description={`Read our step-by-step student advisory guide on ${formattedTitle}. Actionable strategies for winning fully funded scholarships.`}
        canonicalUrl={currentUrl}
        imageUrl={bannerImage}
        type="article"
        publishedTime={new Date().toISOString()}
        author="ElScholarship Advisory Team"
        keywords={[category, formattedTitle, "Scholarship Guide", "Student Mobility"]}
        jsonLd={articleSchema}
      />

      <article className="w-full bg-slate-50/50 pb-20 dark:bg-slate-950">
        {/* Dynamic Hero Banner */}
        <div className="relative w-full h-[320px] md:h-[420px] bg-slate-950 overflow-hidden">
          <img
            src={bannerImage}
            alt={formattedTitle}
            onError={() => setHeroError(true)}
            className="w-full h-full object-cover opacity-50 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-6 left-6 z-10">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="gap-2 backdrop-blur-md bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700"
            >
              <Link to="/articles">
                <ArrowLeft className="size-4" /> All Guides
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">
              <span className="inline-block rounded-md bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                {category}
              </span>
              <h1 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {formattedTitle}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5 text-amber-400" />
                  ElScholarship Advisory Team
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-amber-400" />
                  Updated for 2026 Academic Year
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              This comprehensive guide breaks down everything you need to know about{" "}
              <strong>{formattedTitle.toLowerCase()}</strong>. From eligibility criteria and
              university entrance rubrics to securing full-ride tuition waivers and living stipends,
              our officers have distilled proven advice for international applicants.
            </p>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-amber-600 dark:text-amber-400" /> Key Takeaways
                for Applicants
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-5">
                <li>
                  Prepare and legalize your academic transcripts and grading scale keys at least 3
                  months prior to deadlines.
                </li>
                <li>
                  Tailor your Statement of Purpose (SOP) to specific research centers and faculty
                  profiles.
                </li>
                <li>
                  Verify English proficiency waiver options (Medium of Instruction - MOI) to avoid
                  unnecessary test fees.
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <Button
                asChild
                className="bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 font-bold text-xs"
              >
                <Link to="/concierge">Apply with Managed Concierge</Link>
              </Button>
              <Button asChild variant="outline" className="text-xs">
                <Link to="/support">Visit Support Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
