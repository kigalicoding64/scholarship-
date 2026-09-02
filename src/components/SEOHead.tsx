import React from "react";
import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  fullDescription?: string | undefined;
  canonicalUrl: string;
  imageUrl?: string | undefined;
  type?: "website" | "article" | undefined;
  publishedTime?: string | undefined;
  author?: string | undefined;
  keywords?: string[] | undefined;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>> | undefined;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  fullDescription,
  canonicalUrl,
  imageUrl = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
  type = "website",
  publishedTime,
  author = "ElScholarship Team",
  keywords = ["Scholarships", "East Africa", "University Grants", "Education", "Fully Funded"],
  jsonLd,
}) => {
  const siteName = "ElScholarship";
  const formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const searchMetaDescription =
    description && description.length > 250
      ? `${description.slice(0, 247)}...`
      : description || "Verified fully funded scholarships and university guidance worldwide.";

  const socialDescription = fullDescription || description || searchMetaDescription;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={searchMetaDescription} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.filter(Boolean).join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article-Specific Tags */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && <meta property="article:author" content={author} />}

      {/* JSON-LD Structured Data Schema */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
