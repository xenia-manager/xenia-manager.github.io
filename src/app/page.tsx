"use client";

import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { DownloadSection } from "@/components/DownloadSection";
import { ScreenshotsSection } from "@/components/ScreenshotsSection";
import { TranslationProgressSection } from "@/components/TranslationProgressSection";
import { Footer } from "@/components/Footer";
import { QuickstartSection } from "@/components/QuickstartSection";
import { ContributingSection } from "@/components/ContributingSection";
import { CommunitySection } from "@/components/CommunitySection";

export default function Home() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DownloadSection />
        <QuickstartSection />
        <ScreenshotsSection />
        <ContributingSection />
        <CommunitySection />
        <TranslationProgressSection />
      </main>
      <Footer />
    </>
  );
}
