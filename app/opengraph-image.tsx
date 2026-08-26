import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

/* Social share preview (og:image / twitter:image), generated at build time.
 * Replace the JSX below with your own design — or delete this file and drop
 * a static opengraph-image.png (1200x630) into app/ instead. */

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0f0f11",
          // Diagonal lime glow, echoing the site background
          backgroundImage:
            "linear-gradient(135deg, rgba(212,255,61,0.18) 0%, rgba(212,255,61,0) 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            color: "#9a9a9a",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#d4ff3d",
            }}
          />
          Software Engineer &amp; IT Consultant — Rwanda
        </div>
        <div
          style={{
            marginTop: 32,
            maxWidth: 900,
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#ffffff",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 24,
            maxWidth: 860,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#9a9a9a",
          }}
        >
          I build digital products, web applications &amp; AI systems that solve
          real problems.
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 22,
            color: "#555",
            letterSpacing: 1,
          }}
        >
          {siteConfig.githubUrl.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
