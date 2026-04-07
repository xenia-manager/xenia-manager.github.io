"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { slides } from "@/lib/slides";

interface ScreenshotsSectionProps {
  onZoomImage?: (slide: {
    src: string;
    title: string;
    description: string;
    index: number;
  }) => void;
  currentSlideIndex?: number;
}

export function ScreenshotsSection({
  onZoomImage,
  currentSlideIndex,
}: ScreenshotsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const hasInteractedWithZoom = useRef(false);

  // Scroll thumbnail into view when slide changes from zoom modal navigation
  useEffect(() => {
    // Only scroll thumbnails if user has interacted with zoom modal
    if (
      !hasInteractedWithZoom.current ||
      currentSlideIndex === null ||
      currentSlideIndex === undefined
    )
      return;

    if (currentSlideIndex !== currentSlide) {
      setCurrentSlide(currentSlideIndex);
    }
  }, [currentSlideIndex, currentSlide]);

  // Mark that user has interacted with zoom modal
  useEffect(() => {
    // Only mark as interacted if currentSlideIndex is a number (not null/undefined)
    // and ensure this doesn't happen on initial mount
    if (typeof currentSlideIndex === "number" && currentSlideIndex >= 0) {
      const timer = setTimeout(() => {
        hasInteractedWithZoom.current = true;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex]);

  // Auto-scroll thumbnails when currentSlide changes
  useEffect(() => {
    if (
      thumbnailsRef.current &&
      currentSlide >= 0 &&
      hasInteractedWithZoom.current
    ) {
      const thumbnail = thumbnailsRef.current.children[
        currentSlide
      ] as HTMLElement;
      if (thumbnail) {
        // Use scrollLeft to scroll only the thumbnail container without affecting page scroll
        const container = thumbnailsRef.current;
        const thumbnailLeft = thumbnail.offsetLeft;
        const containerWidth = container.offsetWidth;
        const scrollTarget =
          thumbnailLeft - containerWidth / 2 + thumbnail.offsetWidth / 2;

        container.scrollTo({
          left: scrollTarget,
          behavior: "smooth",
        });
      }
    }
  }, [currentSlide]);

  const handleZoomIn = useCallback(() => {
    if (onZoomImage) {
      onZoomImage({
        src: slides[currentSlide].src,
        title: slides[currentSlide].title,
        description: slides[currentSlide].description,
        index: currentSlide,
      });
    }
    setIsPlaying(false);
  }, [currentSlide, onZoomImage]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToFirst = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentSlide(slides.length - 1);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when slideshow is focused
      if (!slideshowRef.current?.contains(document.activeElement)) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          prevSlide();
          setIsPlaying(false);
          break;
        case "ArrowRight":
          nextSlide();
          setIsPlaying(false);
          break;
        case " ":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case "Home":
          goToFirst();
          setIsPlaying(false);
          break;
        case "End":
          goToLast();
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToFirst, goToLast]);

  // Pause on user interaction
  const handleUserInteraction = () => {
    setIsPlaying(false);
  };

  return (
    <section
      className="py-16 px-4"
      ref={slideshowRef}
      tabIndex={0}
      role="region"
      aria-label="Screenshots slideshow"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 gradient-text">
          Screenshots
        </h2>
        <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
          Use arrow keys to navigate • Space to pause/play
        </p>

        {/* Steam-style Slideshow Container */}
        <div className="glass-card rounded-2xl overflow-hidden border border-[var(--border-color)]">
          {/* Main Image Area */}
          <div
            className="relative aspect-video"
            style={{ backgroundColor: "var(--slide-bg)" }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  onClick={handleZoomIn}
                  className="w-full h-full object-contain p-4 cursor-zoom-in hover:brightness-110 transition-all duration-300"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8 pointer-events-none">
                  <div className="pointer-events-auto">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-white/80">{slide.description}</p>
                  </div>
                </div>
                {/* Zoom Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: "var(--slide-badge)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                    Click to zoom
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                prevSlide();
                handleUserInteraction();
              }}
              className="slide-nav-button absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white"
              aria-label="Previous screenshot"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                nextSlide();
                handleUserInteraction();
              }}
              className="slide-nav-button absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white"
              aria-label="Next screenshot"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="slide-nav-button absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Thumbnails */}
          <div
            className="p-4"
            style={{ backgroundColor: "var(--thumbnails-bg)" }}
          >
            <div
              ref={thumbnailsRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
            >
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToSlide(index);
                    handleUserInteraction();
                  }}
                  className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentSlide
                      ? "border-[var(--color-xbox-green)] scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Go to ${slide.title}`}
                  aria-current={index === currentSlide ? "true" : "false"}
                >
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToSlide(index);
                    handleUserInteraction();
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-[var(--color-xbox-green)]"
                      : "hover:opacity-75"
                  }`}
                  style={{
                    backgroundColor:
                      index === currentSlide
                        ? undefined
                        : "var(--dot-inactive)",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ScreenshotZoomModal({
  imageSrc,
  title,
  description,
  onClose,
  onPrev,
  onNext,
}: {
  imageSrc: string;
  title: string;
  description: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [prevImageSrc, setPrevImageSrc] = useState(imageSrc);
  const [animationClass, setAnimationClass] = useState("animate-popup-content");
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Hide scrollbar when modal is open and handle keyboard navigation
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  // Update animation based on navigation direction
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      setPrevImageSrc(imageSrc);
      return;
    }

    if (imageSrc !== prevImageSrc) {
      setAnimationClass(
        imageSrc > prevImageSrc
          ? "animate-slide-in-right"
          : "animate-slide-in-left",
      );
      setPrevImageSrc(imageSrc);
    }
  }, [imageSrc, prevImageSrc, isFirstRender]);

  if (!imageSrc) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-popup-overlay"
      style={{ backgroundColor: "var(--modal-overlay)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Zoomed screenshot view"
    >
      <button
        onClick={onClose}
        className="modal-button absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white"
        aria-label="Close zoom"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className="flex flex-col items-center justify-center max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={imageSrc}
          src={imageSrc}
          alt={title}
          className={`max-w-full max-h-[80vh] object-contain ${animationClass}`}
        />
        {title && (
          <div
            className="text-center mt-4 px-4"
            style={{ color: "var(--slide-text)" }}
          >
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            {description && (
              <p
                style={{
                  color: "var(--slide-text-secondary)",
                  fontSize: "0.875rem",
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="modal-button absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white z-10"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="modal-button absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white z-10"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
