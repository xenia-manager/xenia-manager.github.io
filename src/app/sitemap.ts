import type { MetadataRoute } from "next";

const baseUrl = "https://xenia-manager.github.io";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/xenia-canary-releases`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compatibility`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
