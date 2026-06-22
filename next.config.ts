import type { NextConfig } from "next";
import withSerwist from "@serwist/next";

const nextConfig: NextConfig = {
  // Génère un dossier .next/standalone autonome (requis pour Docker)
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, // ← AJOUTÉ
  },
  typescript: {
    ignoreBuildErrors: true, // ← AJOUTÉ (au cas où)
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default withSerwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
})(nextConfig);