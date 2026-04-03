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
import { ScreenshotZoomModal } from "@/components/ScreenshotsSection";

export default function Home() {
  const [showOptimizedSettings, setShowOptimizedSettings] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string; description: string; index: number } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number | null>(null);

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

  const handleZoomImage = useCallback((slide: { src: string; title: string; description: string; index: number }) => {
    setZoomedImage(slide);
    setCurrentSlideIndex(slide.index);
  }, []);

  const handleCloseZoom = useCallback(() => {
    setZoomedImage(null);
  }, []);

  const slides = [
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/1.%20Library.png", title: "Game Library", description: "Browse and manage your Xbox 360 game collection" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/2.%20Library%20Options.png", title: "Library Options", description: "Customize your library view and settings" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/3.%20Library%20Game%20Right%20Click.png", title: "Game Context Menu", description: "Quick access to game-specific actions and settings" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/4.%20Content%20Viewer.png", title: "Content Viewer", description: "Manage DLC, game updates, and save data" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/5.%20Patch%20Downloader.png", title: "Patch Downloader", description: "Download and install game patches easily" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/6.%20Patch%20Configurator.png", title: "Patch Configurator", description: "Configure and customize game patches" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/7.%20Game%20Details%20Editor.png", title: "Game Details Editor", description: "Edit game metadata and information" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/8.%20Game%20Settings%20Editor.png", title: "Game Settings Editor", description: "Fine-tune per-game configuration settings" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/9.%20Mousehook%20Controls%20Editor.png", title: "Mousehook Controls", description: "Configure mouse and keyboard controls" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/10.%20Xenia%20Settings.png", title: "Xenia Settings", description: "Comprehensive emulator configuration options" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/11.%20Xenia%20Settings%20-%20Optimized%20Settings.png", title: "Optimized Settings", description: "Community-driven performance optimizations" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/12.%20Manage%20Xenia.png", title: "Manage Xenia", description: "Switch between Xenia builds and versions" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/13.%20Install%20Content.png", title: "Install Content", description: "Install DLC and game updates seamlessly" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/14.%20Manage%20Profiles.png", title: "Manage Profiles", description: "Import, export, and edit Xenia profiles" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/15.%20Manager%20Settings.png", title: "Manager Settings", description: "Configure Xenia Manager preferences" },
    { src: "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots/16.%20About%20Page.png", title: "About Page", description: "Learn about Xenia Manager and contributors" },
  ];

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      const newIndex = (prev - 1 + slides.length) % slides.length;
      setZoomedImage({ src: slides[newIndex].src, title: slides[newIndex].title, description: slides[newIndex].description, index: newIndex });
      return newIndex;
    });
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      const newIndex = (prev + 1) % slides.length;
      setZoomedImage({ src: slides[newIndex].src, title: slides[newIndex].title, description: slides[newIndex].description, index: newIndex });
      return newIndex;
    });
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
          <ScreenshotsSection onZoomImage={handleZoomImage} currentSlideIndex={currentSlideIndex} />
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
      {zoomedImage && (
        <ScreenshotZoomModal
          imageSrc={zoomedImage.src}
          title={zoomedImage.title}
          description={zoomedImage.description}
          onClose={handleCloseZoom}
          onPrev={handlePrevSlide}
          onNext={handleNextSlide}
        />
      )}
    </>
  );
}
