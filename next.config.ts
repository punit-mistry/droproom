import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets verification builds run beside a live `next dev` without clobbering its .next cache.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  cacheComponents: true,
  images: { qualities: [75, 90] },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
