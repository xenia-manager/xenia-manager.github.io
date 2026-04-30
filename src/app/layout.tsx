import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollEnabler } from "@/components/SmoothScrollEnabler";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xenia-manager.github.io"),
  title: {
    default: "Xenia Manager - Xbox 360 Emulator Management Tool",
    template: "%s | Xenia Manager",
  },
  description:
    "A comprehensive management tool for the Xenia Xbox 360 emulator. Automatic updates, patch management, per-game configurations, and more.",
  keywords: [
    "Xenia",
    "Xbox 360",
    "Emulator",
    "Game Manager",
    "Xenia Manager",
    "Canary",
    "Netplay",
  ],
  authors: [{ name: "Xenia Manager Team" }],
  creator: "Xenia Manager Team",
  publisher: "Xenia Manager Team",
  alternates: {
    canonical: "https://xenia-manager.github.io/",
  },
  openGraph: {
    title: "Xenia Manager",
    description:
      "A comprehensive management tool for the Xenia Xbox 360 emulator",
    url: "https://xenia-manager.github.io/",
    siteName: "Xenia Manager",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xenia Manager - Xbox 360 Emulator Management Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xenia Manager",
    description:
      "A comprehensive management tool for the Xenia Xbox 360 emulator",
    creator: "@xenia_manager",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Xenia Manager",
      applicationCategory: "UtilityApplication",
      operatingSystem: ["Windows", "Linux"],
      description:
        "A comprehensive management tool for the Xenia Xbox 360 emulator. Automatic updates, patch management, per-game configurations, and more.",
      url: "https://xenia-manager.github.io/",
      author: {
        "@type": "Organization",
        name: "Xenia Manager Team",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "Organization",
      name: "Xenia Manager Team",
      url: "https://xenia-manager.github.io/",
      sameAs: [
        "https://github.com/xenia-manager/xenia-manager",
      ],
    },
    {
      "@type": "WebSite",
      name: "Xenia Manager",
      url: "https://xenia-manager.github.io/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://xenia-manager.github.io/compatibility?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollEnabler />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
