import type { Metadata } from "next";
import { SITE_URL, PAGE_GAMES_DATABASE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Xbox 360 Database - Game Library",
  description:
    "Browse the complete Xbox 360 game library from the x360db project. Search through thousands of games with artwork, metadata, and screenshots.",
  keywords: [
    "Xbox 360",
    "game database",
    "Xbox 360 games",
    "game library",
    "x360db",
    "Xbox 360 game list",
  ],
  openGraph: {
    title: "Xbox 360 Database - Game Library",
    description:
      "Browse the complete Xbox 360 game library from the x360db project.",
      url: PAGE_GAMES_DATABASE,
    siteName: "Xenia Manager",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xbox 360 Database - Game Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xbox 360 Database - Game Library",
    description:
      "Browse the complete Xbox 360 game library from the x360db project.",
  },
  alternates: {
    canonical: PAGE_GAMES_DATABASE,
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
      name: "Xbox 360 Database - Game Library",
      description:
        "Browse the complete Xbox 360 game library from the x360db project. Search through thousands of games with artwork, metadata, and screenshots.",
    url: PAGE_GAMES_DATABASE,
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
          name: "Xbox 360 Database",
          item: PAGE_GAMES_DATABASE,
        },
      ],
    },
  ],
};

export default function GamesDatabaseLayout({
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
