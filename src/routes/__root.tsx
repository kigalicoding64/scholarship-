import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NotFoundPage } from "./not-found";
import { ADSENSE_CLIENT } from "@/components/ui/ad-banner";
import { SITE_URL } from "@/lib/env";
import { OnboardingWizardModal } from "@/components/OnboardingWizardModal";
import "@/lib/i18n";

const OG_IMAGE = `${SITE_URL}/elscholaship-logo.jpg`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ElScholarship — Verified Global Scholarships" },
      {
        name: "description",
        content:
          "Verified fully funded scholarships, universities and study guides, plus a managed concierge application service.",
      },
      { name: "google-adsense-account", content: ADSENSE_CLIENT },
      { name: "monetag", content: "1d61c3f38732b434f432e6f238b6c1f7" },
      { property: "og:site_name", content: "ElScholarship" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "ElScholarship — Verified Global Scholarships" },
      {
        property: "og:description",
        content:
          "Verified fully funded scholarships, universities and study guides, plus a managed concierge application service.",
      },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        id: "aclib",
        type: "text/javascript",
        src: "//acscdn.com/script/aclib.js",
      },
      {
        type: "text/javascript",
        children: `
          if (typeof window !== 'undefined') {
            window.aclib = window.aclib || {};
            if (typeof window.aclib.runAutoTag === 'function') {
              window.aclib.runAutoTag({ zoneId: 'pb4p6ccru1' });
            } else {
              window.addEventListener('load', function() {
                if (window.aclib && typeof window.aclib.runAutoTag === 'function') {
                  window.aclib.runAutoTag({ zoneId: 'pb4p6ccru1' });
                }
              });
            }
          }
        `,
      },
      {
        async: true,
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
        crossOrigin: "anonymous",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-full w-full flex-col bg-slate-50 antialiased overflow-x-hidden dark:bg-slate-950">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
          <SiteHeader />
          <main className="flex-1 shrink-0 w-full min-w-0">
            <Outlet />
          </main>
          <SiteFooter />
          <OnboardingWizardModal />
          <Toaster position="top-right" richColors />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
