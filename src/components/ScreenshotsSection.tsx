"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/Screenshots";

const slides: Slide[] = [
  {
    image: `${GITHUB_RAW_BASE}/1.%20Library.png`,
    title: "Game Library",
    description: "Browse and manage your Xbox 360 game collection",
  },
  {
    image: `${GITHUB_RAW_BASE}/2.%20Library%20Options.png`,
    title: "Library Options",
    description: "Customize your library view and settings",
  },
  {
    image: `${GITHUB_RAW_BASE}/3.%20Library%20Game%20Right%20Click.png`,
    title: "Game Context Menu",
    description: "Quick access to game-specific actions and settings",
  },
  {
    image: `${GITHUB_RAW_BASE}/4.%20Content%20Viewer.png`,
    title: "Content Viewer",
    description: "Manage DLC, game updates, and save data",
  },
  {
    image: `${GITHUB_RAW_BASE}/5.%20Patch%20Downloader.png`,
    title: "Patch Downloader",
    description: "Download and install game patches easily",
  },
  {
    image: `${GITHUB_RAW_BASE}/6.%20Patch%20Configurator.png`,
    title: "Patch Configurator",
    description: "Configure and customize game patches",
  },
  {
    image: `${GITHUB_RAW_BASE}/7.%20Game%20Details%20Editor.png`,
    title: "Game Details Editor",
    description: "Edit game metadata and information",
  },
  {
    image: `${GITHUB_RAW_BASE}/8.%20Game%20Settings%20Editor.png`,
    title: "Game Settings Editor",
    description: "Fine-tune per-game configuration settings",
  },
  {
    image: `${GITHUB_RAW_BASE}/9.%20Mousehook%20Controls%20Editor.png`,
    title: "Mousehook Controls",
    description: "Configure mouse and keyboard controls",
  },
  {
    image: `${GITHUB_RAW_BASE}/10.%20Xenia%20Settings.png`,
    title: "Xenia Settings",
    description: "Comprehensive emulator configuration options",
  },
  {
    image: `${GITHUB_RAW_BASE}/11.%20Xenia%20Settings%20-%20Optimized%20Settings.png`,
    title: "Optimized Settings",
    description: "Community-driven performance optimizations",
  },
  {
    image: `${GITHUB_RAW_BASE}/12.%20Manage%20Xenia.png`,
    title: "Manage Xenia",
    description: "Switch between Xenia builds and versions",
  },
  {
    image: `${GITHUB_RAW_BASE}/13.%20Install%20Content.png`,
    title: "Install Content",
    description: "Install DLC and game updates seamlessly",
  },
  {
    image: `${GITHUB_RAW_BASE}/14.%20Manage%20Profiles.png`,
    title: "Manage Profiles",
    description: "Import, export, and edit Xenia profiles",
  },
  {
    image: `${GITHUB_RAW_BASE}/15.%20Manager%20Settings.png`,
    title: "Manager Settings",
    description: "Configure Xenia Manager preferences",
  },
  {
    image: `${GITHUB_RAW_BASE}/16.%20About%20Page.png`,
    title: "About Page",
    description: "Learn about Xenia Manager and contributors",
  },
];

export function ScreenshotsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoomedIn, setZoomedIn] = useState(false);
  const slideshowRef = useRef<HTMLDivElement>(null);

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

  // Handle zoom in/out
  const handleZoomIn = useCallback(() => {
    setZoomedIn(true);
    setIsPlaying(false);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomedIn(false);
  }, []);

  // Close zoom on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomedIn && e.key === "Escape") {
        handleZoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedIn, handleZoomOut]);

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
          Use arrow keys to navigate • Space to pause/play • Home/End for
          first/last
        </p>

        {/* Steam-style Slideshow Container */}
        <div className="glass-card rounded-2xl overflow-hidden border border-[var(--border-color)]">
          {/* Main Image Area */}
          <div className="relative aspect-video bg-[#0f1922]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  onClick={handleZoomIn}
                  className="w-full h-full object-contain p-4 cursor-zoom-in hover:brightness-110 transition-all duration-300"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8 pointer-events-none">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-white/80">{slide.description}</p>
                  </div>
                </div>
                {/* Zoom Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-[var(--color-xbox-green)] flex items-center justify-center text-white transition-colors"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-[var(--color-xbox-green)] flex items-center justify-center text-white transition-colors"
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
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-[var(--color-xbox-green)] flex items-center justify-center text-white transition-colors"
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
          <div className="p-4 bg-[#1b2838]/50">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
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
                    src={slide.image}
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
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedIn && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={handleZoomOut}
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed screenshot view"
        >
          {/* Close button */}
          <button
            onClick={handleZoomOut}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
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

          {/* Zoomed Image */}
          <div
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="text-center text-white mt-4">
              <h3 className="text-xl font-bold mb-1">
                {slides[currentSlide].title}
              </h3>
              <p className="text-white/70">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>

          {/* Navigation arrows in zoom mode */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
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
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
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
      )}
    </section>
  );
}
