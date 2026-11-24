import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AbrarAli S. Portfolio",
    short_name: "AbrarAli S.",
    description: "A portfolio Progressive Web App built by AbrarAli S.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C3B40",
    theme_color: "#0C3B40",
    icons: [
      {
        src: "/Pwa-logos/new-icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/Pwa-logos/new-icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/Pwa-logos/new-icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/Pwa-logos/new-icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/Pwa-logos/card.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/Pwa-logos/card-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
