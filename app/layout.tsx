import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { JsonLd } from "@/components/JsonLd";
import { buildJsonLd } from "@/lib/json-ld";
import { navItems, heroContent, siteConfig, seoKeywords } from "@/lib/site";

// Self-hosted via next/font: zero layout shift, no external requests.
// Exposed as CSS variables consumed in globals.css (@theme inline).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/* Site-wide SEO defaults. Per-page overrides live in each page/route.
 * Open Graph / Twitter images are NOT declared here on purpose: the
 * file-based convention (app/opengraph-image.tsx) has higher priority and
 * already emits og:image + twitter:image with width, height and alt text
 * from its `size` / `alt` exports — declaring images here too would only
 * risk duplicate tags. */
export const metadata: Metadata = {
  // absolute: resolves every relative URL below against the canonical origin
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  category: "Technology",
  // Self-referencing canonical — keeps / as the single indexable URL
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f11",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-dvh bg-bg font-sans text-primary">
        {/* Structured data: Person + WebSite + SiteNavigationElement graph.
            Explicit identity + nav hierarchy is what gives Google the
            signals it uses to generate Sitelinks. */}
        <JsonLd data={buildJsonLd({ navItems })} />
        {/* Apply the stored theme before first paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.theme==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
        {/* Centered application shell — hard 1600px cap so the layout stays
            grounded and never stretches endlessly on ultra-wide monitors.
            Grid on lg+: fixed-width sidebar column + flexible content column
            with minmax(0,1fr) so long text/code can never push past the
            content area. The sidebar participates in grid flow (sticky, not
            fixed) so the whole shell — identity rail included — centers as
            one unit. Below lg it collapses to a single column. */}
        <div className="mx-auto grid w-full min-h-dvh max-w-[1600px] grid-cols-1 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-8">
          {/* Full-height identity + nav sidebar (desktop); drawer below lg */}
          <Sidebar items={navItems} />

          {/* Top bar (below lg only — the sidebar carries identity and the
              theme toggle on desktop): name left, theme + menu right.
              Sticky + in-flow so it reserves space (no content overlap) and
              an opaque background so scrolled content never shows through. */}
          <header className="sticky top-0 z-40 flex w-full items-center justify-between gap-2 border-b border-card-border bg-bg px-6 py-4 lg:hidden">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center font-heading text-[0.9375rem] font-bold tracking-tight text-primary transition-colors hover:text-accent"
            >
              {heroContent.identity}
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNav items={navItems} />
            </div>
          </header>

          {/* Content column: independent scroll container on lg+, with a thin
              custom scrollbar; smooth-scrolls to section anchors. min-w-0
              (via minmax(0,1fr)) prevents text/code from overflowing the
              column and overlapping the sidebar. */}
          <div
            id="content-scroll"
            className="thin-scrollbar min-w-0 scroll-smooth lg:h-dvh lg:overflow-y-auto"
          >
            <main className="relative">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
