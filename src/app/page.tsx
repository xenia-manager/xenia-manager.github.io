"use client";

import { useState, useEffect, useCallback } from "react";
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
import { OptimizedSettingsPopup } from "@/components/OptimizedSettingsSection";

export default function Home() {
  const [showOptimizedSettings, setShowOptimizedSettings] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check URL hash on mount and when hash changes
  useEffect(() => {
    if (!isClient) return;

    const checkHash = () => {
      if (window.location.hash === "#optimized-settings") {
        setShowOptimizedSettings(true);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [isClient]);

  const handleOpenOptimizedSettings = useCallback(() => {
    setShowOptimizedSettings(true);
    window.location.hash = "optimized-settings";
  }, []);

  const handleCloseOptimizedSettings = useCallback(() => {
    setShowOptimizedSettings(false);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
          <HeroSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <FeaturesSection onOpenOptimizedSettings={handleOpenOptimizedSettings} />
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
      {showOptimizedSettings && (
        <OptimizedSettingsPopup onClose={handleCloseOptimizedSettings} />
      )}
    </>
  );
}
