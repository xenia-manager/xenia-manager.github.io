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
  title: "Xenia Manager - Xbox 360 Emulator Management Tool",
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
  openGraph: {
    title: "Xenia Manager",
    description:
      "A comprehensive management tool for the Xenia Xbox 360 emulator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xenia Manager",
    description:
      "A comprehensive management tool for the Xenia Xbox 360 emulator",
  },
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
      <body className="min-h-full flex flex-col">
        <SmoothScrollEnabler />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
