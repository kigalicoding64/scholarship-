import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { SEOHead } from "@/components/SEOHead";
import { fetchArticleBySlug, formatDate } from "@/lib/content";
import { SITE_URL } from "@/lib/env";

const FALLBACK_ARTICLE_HERO =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
  errorComponent: ({ error }) => (
    <ArticleMessage title="This guide didn't load" body={error.message} />
  ),
  notFoundComponent: () => (
    <ArticleMessage title="Guide not found" body="This article may have been unpublished." />
  ),
});

function ArticleMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{body}</p>
      <Button asChild variant="outline" size="sm" className="mt-6 text-xs">
        <Link to="/articles">Back to all guides</Link>
      </Button>
    </div>
  );
}

function ArticlePage() {
  const { slug } = Route.useParams();
  const [heroError, setHeroError] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const article = await fetchArticleBySlug(slug);
      if (!article) throw notFound();
      return article;
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-14 sm:px-6">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <ArticleMessage
        title="Guide unavailable"
        body={(error as Error | null)?.message ?? "This article may have been unpublished."}
      />
    );
  }

  const currentUrl = `${SITE_URL}/articles/${data.slug}`;
  const bannerImage =
    heroError || !data.featured_image ? FALLBACK_ARTICLE_HERO : data.featured_image;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.summary || `Expert guidance on ${data.title} by the ElScholarship team.`,
    mainEntityOfPage: currentUrl,
    image: bannerImage,
    datePublished: data.published_at || data.created_at || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: data.author || "ElScholarship Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "ElScholarship",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/elscholaship-logo.jpg`,
      },
    },
    articleSection: data.category,
    keywords: data.target_keywords?.join(", ") || "Scholarships, Guide, Study Abroad",
  };

  return (
    <>
      <SEOHead
        title={data.title}
        description={data.summary || `Comprehensive advisory guide: ${data.title}.`}
        canonicalUrl={currentUrl}
        imageUrl={bannerImage}
        type="article"
        publishedTime={data.published_at || undefined}
        author={data.author || "ElScholarship Editorial Team"}
        keywords={data.target_keywords || [data.category, "Scholarship Guide", "Global Mobility"]}
        jsonLd={articleSchema}
      />

      <article className="w-full bg-slate-50/50 pb-20 dark:bg-slate-950">
        {/* Dynamic Hero Banner */}
        <div className="relative w-full h-[320px] md:h-[420px] bg-slate-950 overflow-hidden">
          <img
            src={bannerImage}
            alt={data.title}
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
                <ArrowLeft className="size-4" /> All Guides & Tips
              </Link>
            </Button>
          </div>

          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">
              <span className="inline-block rounded-md bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                {data.category}
              </span>
              <h1 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {data.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5 text-amber-400" />
                  {data.author || "Editorial Team"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-amber-400" />
                  {formatDate(data.published_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="container mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {data.summary && (
              <div className="mb-8 rounded-xl border-l-4 border-amber-500 bg-amber-50/50 p-4 text-sm font-medium leading-relaxed text-slate-700 dark:bg-amber-950/20 dark:text-slate-300">
                {data.summary}
              </div>
            )}

            <AdBanner slot="2345678901" className="mb-8" />

            <div className="prose-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
            </div>

            <AdBanner slot="3456789012" className="mt-10" />
          </div>

          {/* Quick Support & Concierge CTA Card */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white dark:border-slate-800 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">Need assistance applying to these programs?</h3>
              <p className="mt-1 text-xs text-slate-300 max-w-lg">
                Let our senior advisory officers audit your Statement of Purpose, verify your
                transcripts, and submit on your behalf.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button
                asChild
                className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs"
              >
                <Link to="/concierge">Apply with Concierge</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 text-xs"
              >
                <Link to="/support">Support Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
