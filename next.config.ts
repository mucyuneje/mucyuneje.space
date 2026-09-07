import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Prevents Turbopack from
  // inferring a wrong root from stray lockfiles in parent directories.
  turbopack: {
    root: import.meta.dirname,
  },

  // Hide the floating dev-tools "N" button so it never overlaps content.
  // Errors still surface normally; production is unaffected either way.
  devIndicators: false,

  // 308 redirect the www host to the canonical non-www origin. Without this,
  // www.mucyuneje.space serves a duplicate of every page with a canonical tag
  // pointing at the non-www host — Google then marks those pages "Alternate
  // page with proper canonical tag" instead of indexing them (WNC-20237597).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "^www\\.mucyuneje\\.space",
          },
        ],
        destination: "https://mucyuneje.space/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
