import type { Metadata } from "next";
import { SITE_URL, PAGE_COMPATIBILITY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Game Compatibility - Xenia Canary",
  description:
    "Browse the compatibility status of Xbox 360 games on Xenia Canary. Search and filter games by their emulation status.",
  keywords: [
    "Xenia Canary",
    "Xbox 360 compatibility",
    "game compatibility list",
    "Xbox 360 emulation status",
    "Xenia game database",
  ],
  openGraph: {
    title: "Game Compatibility - Xenia Canary",
    description:
      "Browse the compatibility status of Xbox 360 games on Xenia Canary. Search and filter games by their emulation status.",
    url: PAGE_COMPATIBILITY,
    siteName: "Xenia Manager",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Game Compatibility - Xenia Canary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Compatibility - Xenia Canary",
    description:
      "Browse the compatibility status of Xbox 360 games on Xenia Canary.",
  },
  alternates: {
    canonical: PAGE_COMPATIBILITY,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Game Compatibility - Xenia Canary",
      description:
        "Browse the compatibility status of Xbox 360 games on Xenia Canary. Search and filter games by their emulation status.",
      url: PAGE_COMPATIBILITY,
      isPartOf: {
        "@type": "WebSite",
        name: "Xenia Manager",
        url: `${SITE_URL}/`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Game Compatibility",
          item: PAGE_COMPATIBILITY,
        },
      ],
    },
  ],
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
