import type { MetadataRoute } from "next";

export const revalidate = 86400;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xenia Manager - Xbox 360 Emulator Management Tool",
    short_name: "Xenia Manager",
    description:
      "A comprehensive management tool for the Xenia Xbox 360 emulator. Automatic updates, patch management, per-game configurations, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#107c10",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
