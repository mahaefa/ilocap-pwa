import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ILOCAP - Transformation Digitale",
    short_name: "ILOCAP",
    description: "Conseil en stratégie et transformation digitale. Donner du sens à votre performance.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F1EC",
    theme_color: "#073642",
    orientation: "portrait",
    scope: "/",
    lang: "fr",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}