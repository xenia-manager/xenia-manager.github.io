"use client";

import { useState, useCallback, useEffect } from "react";
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
import { slides } from "@/lib/slides";

export default function Home() {
  const [showOptimizedSettings, setShowOptimizedSettings] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    title: string;
    description: string;
    index: number;
  } | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number | null>(
    null,
  );

  // Check for hash on mount to open optimized settings popup
  useEffect(() => {
    if (window.location.hash === "#optimized-settings") {
      setShowOptimizedSettings(true);
    }
  }, []);

  const handleOpenOptimizedSettings = useCallback(() => {
    setShowOptimizedSettings(true);
    window.location.hash = "optimized-settings";
  }, []);

  const handleCloseOptimizedSettings = useCallback(() => {
    setShowOptimizedSettings(false);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }, []);

  const handleZoomImage = useCallback(
    (slide: {
      src: string;
      title: string;
      description: string;
      index: number;
    }) => {
      setZoomedImage(slide);
      setCurrentSlideIndex(slide.index);
    },
    [],
  );

  const handleCloseZoom = useCallback(() => {
    setZoomedImage(null);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev === null) return 0;
      const newIndex = (prev - 1 + slides.length) % slides.length;
      setZoomedImage({
        src: slides[newIndex].src,
        title: slides[newIndex].title,
        description: slides[newIndex].description,
        index: newIndex,
      });
      return newIndex;
    });
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev === null) return 0;
      const newIndex = (prev + 1) % slides.length;
      setZoomedImage({
        src: slides[newIndex].src,
        title: slides[newIndex].title,
        description: slides[newIndex].description,
        index: newIndex,
      });
      return newIndex;
    });
  }, []);

  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="fade-in-up" style={{ animationDelay: "0ms" }}>
          <HeroSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "100ms" }}>
          <FeaturesSection
            onOpenOptimizedSettings={handleOpenOptimizedSettings}
          />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "200ms" }}>
          <DownloadSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "300ms" }}>
          <QuickstartSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "400ms" }}>
          <ScreenshotsSection
            onZoomImage={handleZoomImage}
            currentSlideIndex={currentSlideIndex ?? undefined}
          />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "500ms" }}>
          <ContributingSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "600ms" }}>
          <CommunitySection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "700ms" }}>
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
