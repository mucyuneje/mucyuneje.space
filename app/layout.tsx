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
            Sidebar participates in flex flow (sticky, not fixed) so the
            whole shell — identity rail included — centers as one unit. */}
        <div className="mx-auto flex w-full max-w-[1600px]">
          {/* Full-height identity + nav sidebar (desktop); drawer below lg */}
          <Sidebar items={navItems} />

          {/* Top bar (below lg only — the sidebar carries identity and the
              theme toggle on desktop): name left, theme + menu right */}
          <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-2 px-6 py-5 lg:hidden">
            <Link
              href="/"
              className="font-heading text-[0.9375rem] font-bold tracking-tight text-primary transition-colors hover:text-accent"
            >
              {heroContent.identity}
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNav items={navItems} />
            </div>
          </header>

          {/* Content column: independent scroll container on lg+, with a thin
              custom scrollbar; smooth-scrolls to section anchors */}
          <div
            id="content-scroll"
            className="thin-scrollbar min-w-0 flex-1 scroll-smooth lg:h-dvh lg:overflow-y-auto"
          >
            <main className="relative">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
