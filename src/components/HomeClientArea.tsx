"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ScreenshotsSection } from "@/components/ScreenshotsSection";
import { slides } from "@/lib/slides";
import { FadeInUp } from "@/components/animations/FadeInUp";

const OptimizedSettingsPopup = dynamic(() =>
  import("@/components/OptimizedSettingsSection").then(
    (m) => m.OptimizedSettingsPopup,
  ),
);

const ScreenshotZoomModal = dynamic(() =>
  import("@/components/ScreenshotsSection").then(
    (m) => m.ScreenshotZoomModal,
  ),
);

export function HomeClientArea() {
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
      <FadeInUp delay={0.1}>
        <FeaturesSection
          onOpenOptimizedSettings={handleOpenOptimizedSettings}
        />
      </FadeInUp>
      <FadeInUp delay={0.4}>
        <ScreenshotsSection
          onZoomImage={handleZoomImage}
          currentSlideIndex={currentSlideIndex ?? undefined}
        />
      </FadeInUp>
      <AnimatePresence>
        {showOptimizedSettings && (
          <OptimizedSettingsPopup onClose={handleCloseOptimizedSettings} />
        )}
      </AnimatePresence>
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
