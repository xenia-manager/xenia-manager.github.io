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
        <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
          <HeroSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <FeaturesSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <DownloadSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <QuickstartSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <ScreenshotsSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <ContributingSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <CommunitySection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "700ms" }}>
          <TranslationProgressSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
