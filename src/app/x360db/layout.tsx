import type { Metadata } from "next";

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
    url: "https://xenia-manager.github.io/x360db",
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
    canonical: "https://xenia-manager.github.io/x360db",
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
      url: "https://xenia-manager.github.io/x360db",
      isPartOf: {
        "@type": "WebSite",
        name: "Xenia Manager",
        url: "https://xenia-manager.github.io/",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://xenia-manager.github.io/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Xbox 360 Database",
          item: "https://xenia-manager.github.io/x360db",
        },
      ],
    },
  ],
};

export default function X360dbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {children}
    </>
  );
}
