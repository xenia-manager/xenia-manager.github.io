import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xenia Canary Releases - Latest Builds",
  description:
    "Download the latest Xenia Canary builds and experimental releases for Xbox 360 emulation. Stay up to date with the newest features and fixes.",
  keywords: [
    "Xenia Canary",
    "Xenia Canary releases",
    "Xbox 360 emulator download",
    "Xenia builds",
    "experimental emulator",
    "Xenia Canary latest",
  ],
  openGraph: {
    title: "Xenia Canary Releases - Latest Builds",
    description:
      "Download the latest Xenia Canary builds and experimental releases for Xbox 360 emulation.",
    url: "https://xenia-manager.github.io/xenia-canary-releases",
    siteName: "Xenia Manager",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xenia Canary Releases - Latest Builds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xenia Canary Releases - Latest Builds",
    description:
      "Download the latest Xenia Canary builds and experimental releases.",
  },
  alternates: {
    canonical: "https://xenia-manager.github.io/xenia-canary-releases",
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
      "@type": "SoftwareApplication",
      name: "Xenia Canary",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Windows",
      description:
        "Xenia Canary - Experimental builds of the Xenia Xbox 360 emulator with the latest features and fixes.",
      url: "https://xenia-manager.github.io/xenia-canary-releases",
      author: {
        "@type": "Organization",
        name: "Xenia Canary Team",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
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
          name: "Xenia Canary Releases",
          item: "https://xenia-manager.github.io/xenia-canary-releases",
        },
      ],
    },
  ],
};

export default function XeniaCanaryReleasesLayout({
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
