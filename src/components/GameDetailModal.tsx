"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getInvalidGameEntryUrl } from "@/lib/github";
import { fetchWithFallback, getX360dbInfoConfig } from "@/lib/fetchWithFallback";
import { useBodyScrollLock } from "@/lib/hooks";

interface GameInfo {
  id: string;
  title: { full: string; reduced: string };
  genre: string[];
  developer: string;
  publisher: string;
  release_date: string | null;
  user_rating: string | null;
  description: { full: string; short: string };
  media: { media_id: string; title: string; edition: string; region: string }[];
  artwork: {
    background: string | null;
    banner: string | null;
    boxart: string | null;
    icon: string | null;
    gallery: string[];
  };
  products: {
    parent: { id: string; title: string }[];
    related: string[];
  };
}

interface GameDetailModalProps {
  gameId: string;
  gameTitle: string;
  alternativeId?: string[];
  onClose: () => void;
  onSelectId?: (id: string) => void;
}

async function fetchInfo(id: string): Promise<GameInfo> {
  const response = await fetchWithFallback(getX360dbInfoConfig(id));
  return response.json();
}

function toHttps(url: string): string {
  if (url.includes("download.xbox.com")) return url;
  return url.replace(/^http:/, "https:").replace(/:80\//, "/");
}

function GalleryImage({
  url,
  alt,
  className,
}: {
  url: string;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState(() => toHttps(url));
  const [fallbackTried, setFallbackTried] = useState(false);
  const [failed, setFailed] = useState(false);
  const prevUrl = useRef(url);

  if (url !== prevUrl.current) {
    prevUrl.current = url;
    setSrc(toHttps(url));
    setFallbackTried(false);
    setFailed(false);
  }

  const handleError = () => {
    if (!fallbackTried && url !== src) {
      setFallbackTried(true);
      setSrc(url);
    } else {
      setFailed(true);
    }
  };

  if (failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
    />
  );
}

function ArtworkImage({
  localPath,
  fallbackUrl,
  alt,
  className,
}: {
  localPath: string;
  fallbackUrl: string | null;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState(`https://xenia-manager.github.io/x360db${localPath}`);
  const [fallbackTried, setFallbackTried] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!fallbackTried && fallbackUrl) {
      setFallbackTried(true);
      setSrc(toHttps(fallbackUrl));
    } else {
      setErrored(true);
    }
  };

  if (errored) return null;

  return (
    <img src={src} alt={alt} onError={handleError} className={className} />
  );
}

function RatingStars({ rating }: { rating: string | null }) {
  if (!rating) return null;
  const num = parseFloat(rating);
  if (isNaN(num) || num === 0) return null;
  const stars = Math.round(num);
  return (
    <span className="text-yellow-500 text-sm" title={`${num}/5`}>
      {"★".repeat(Math.min(stars, 5))}
      {"☆".repeat(Math.max(0, 5 - stars))}
    </span>
  );
}

export function GameDetailModal({
  gameId,
  gameTitle,
  alternativeId,
  onClose,
  onSelectId,
}: GameDetailModalProps) {
  const [info, setInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState(false);

  useBodyScrollLock();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchInfo(gameId);
        setInfo(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load game details",
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [gameId]);

  useEffect(() => {
    if (!info) return;

    setImagesReady(false);

    const urls: string[] = [];
    urls.push(`https://xenia-manager.github.io/x360db/titles/${gameId}/artwork/background.jpg`);
    if (info.artwork.background) {
      urls.push(toHttps(info.artwork.background));
    }

    urls.push(`https://xenia-manager.github.io/x360db/titles/${gameId}/artwork/boxart.jpg`);
    if (info.artwork.boxart) {
      urls.push(toHttps(info.artwork.boxart));
    }

    for (const url of info.artwork.gallery) {
      urls.push(toHttps(url));
    }

    Promise.allSettled(
      urls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          }),
      ),
    ).then(() => setImagesReady(true));
  }, [info, gameId]);

  const galleryUrls = info?.artwork.gallery ?? [];
  const totalGallery = galleryUrls.length;

  const goNext = useCallback(() => {
    setGalleryIndex((prev) =>
      prev !== null ? (prev + 1) % totalGallery : null,
    );
  }, [totalGallery]);

  const goPrev = useCallback(() => {
    setGalleryIndex((prev) =>
      prev !== null ? (prev - 1 + totalGallery) % totalGallery : null,
    );
  }, [totalGallery]);

  useEffect(() => {
    if (galleryIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [galleryIndex, goNext, goPrev]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (galleryIndex !== null) {
        setGalleryIndex(null);
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-popup-overlay"
      style={{ backgroundColor: "var(--bg-overlay)" }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={gameTitle}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-[var(--border-color)] shadow-2xl animate-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border-color)]">
          <div className="min-w-0 flex-1 mr-4">
            <h2 className="text-lg sm:text-xl font-bold gradient-text truncate">
              {info?.title.full || gameTitle}
            </h2>
            {info && (
              <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mt-1">
                {info.genre.join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={getInvalidGameEntryUrl(
                gameId,
                info?.title.full || gameTitle,
              )}
              target="_blank"
              rel="noopener noreferrer"
              title="Submit invalid game entry"
              className="p-1.5 rounded-md border border-[var(--color-xbox-green)] text-[var(--color-xbox-green)] hover:bg-[rgba(119,185,0,0.1)] transition-colors flex-shrink-0 focus-indicator"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-[var(--foreground)] flex-shrink-0 focus-indicator"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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
          </div>
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 80px)" }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin w-10 h-10 border-2 border-[var(--color-xbox-green)] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-[var(--foreground)]/60 text-sm">
                  Loading game details...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-[var(--color-error)]">{error}</p>
              <button
                onClick={onClose}
                className="mt-4 btn-xbox-secondary px-6 py-2 rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          ) : !imagesReady ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin w-10 h-10 border-2 border-[var(--color-xbox-green)] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-[var(--foreground)]/60 text-sm">
                  Loading images...
                </p>
              </div>
            </div>
          ) : info ? (
            <div className="p-4 sm:p-6 pt-2 sm:pt-3 space-y-6">
              <ArtworkImage
                localPath={`/titles/${gameId}/artwork/background.jpg`}
                fallbackUrl={info.artwork.background}
                alt={`${info.title.full} background`}
                className="w-full h-32 sm:h-48 object-cover rounded-xl"
              />

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="w-32 sm:w-40 flex-shrink-0 mx-auto sm:mx-0">
                  <ArtworkImage
                    localPath={`/titles/${gameId}/artwork/boxart.jpg`}
                    fallbackUrl={info.artwork.boxart}
                    alt={`${info.title.full} boxart`}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {info.developer &&
                      info.developer !== "Developer String" && (
                        <>
                          <span className="text-[var(--foreground)]/50">
                            Developer
                          </span>
                          <span className="text-[var(--foreground)]">
                            {info.developer}
                          </span>
                        </>
                      )}
                    {info.publisher &&
                      info.publisher !== "Publisher String" && (
                        <>
                          <span className="text-[var(--foreground)]/50">
                            Publisher
                          </span>
                          <span className="text-[var(--foreground)]">
                            {info.publisher}
                          </span>
                        </>
                      )}
                    {info.release_date && (
                      <>
                        <span className="text-[var(--foreground)]/50">
                          Release
                        </span>
                        <span className="text-[var(--foreground)]">
                          {info.release_date}
                        </span>
                      </>
                    )}
                    {info.user_rating && (
                      <>
                        <span className="text-[var(--foreground)]/50">
                          Rating
                        </span>
                        <span className="text-[var(--foreground)]">
                          <RatingStars rating={info.user_rating} />
                        </span>
                      </>
                    )}
                  </div>

                  {info.media && info.media.length > 0 && (
                    <div className="text-sm">
                      <button
                        onClick={() => setExpandedMedia(!expandedMedia)}
                        className="text-[var(--foreground)]/50 hover:text-[var(--color-xbox-green)] transition-colors text-left"
                      >
                        Media: {info.media.length} disc
                        {info.media.length > 1 ? "s" : ""}
                        <svg
                          className={`w-3 h-3 inline-block ml-1 transition-transform ${expandedMedia ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedMedia && (
                        <div className="mt-2 space-y-2">
                          {info.media.map((m, i) => (
                            <div
                              key={i}
                              className="text-xs text-[var(--foreground)]/70 space-y-0.5 p-2 rounded bg-[var(--bg-secondary)]/50"
                            >
                              <p className="font-mono text-[var(--foreground)]/40">
                                {m.media_id}
                              </p>
                              <p className="font-medium">{m.title}</p>
                              {m.edition && (
                                <p className="text-[var(--foreground)]/50">
                                  {m.edition}
                                </p>
                              )}
                              {m.region && (
                                <p className="text-[var(--foreground)]/40">
                                  {m.region}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {info.genre.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {info.genre.map((g) => (
                        <span key={g} className="tag text-xs">
                          {g}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs font-mono text-[var(--foreground)]/30">
                    ID: {info.id}
                  </p>
                  {alternativeId && alternativeId.length > 0 && (
                    <div className="text-[11px] font-mono text-[var(--foreground)]/20">
                      <span>Alternative IDs: </span>
                      {alternativeId.map((altId, i) => (
                        <span key={altId}>
                          {i > 0 && <span>, </span>}
                          {onSelectId ? (
                            <button
                              onClick={() => onSelectId(altId)}
                              className="hover:text-[var(--color-xbox-green)] transition-colors"
                            >
                              {altId}
                            </button>
                          ) : (
                            altId
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                  {info.products.parent.length > 0 && (
                    <div className="text-[11px] font-mono text-[var(--foreground)]/20 mt-1">
                      <span>Parent: </span>
                      {info.products.parent.map((p, i) => (
                        <span key={p.id}>
                          {i > 0 && <span>, </span>}
                          {onSelectId ? (
                            <button
                              onClick={() => onSelectId(p.id)}
                              className="hover:text-[var(--color-xbox-green)] transition-colors"
                            >
                              {p.title}
                            </button>
                          ) : (
                            p.title
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {info.description.full && (
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]/70 uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                    {info.description.full}
                  </p>
                </div>
              )}

              {totalGallery > 0 && (
                <div className="pb-6">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]/70 uppercase tracking-wider mb-3">
                    Gallery ({totalGallery})
                  </h3>
                  <div className="flex gap-3 overflow-x-auto items-start pb-3">
                    {galleryUrls.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className="flex-shrink-0 focus-indicator rounded-lg overflow-hidden border-2 border-transparent hover:border-[var(--color-xbox-green)] transition-colors"
                      >
                        <GalleryImage
                          url={url}
                          alt={`${info.title.full} screenshot ${i + 1}`}
                          className="h-20 sm:h-28 w-auto object-cover rounded-lg"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Gallery Viewer */}
      {galleryIndex !== null && galleryUrls[galleryIndex] && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center animate-popup-overlay"
          style={{ backgroundColor: "var(--modal-overlay)" }}
          onClick={() => setGalleryIndex(null)}
        >
          <button
            onClick={() => setGalleryIndex(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white modal-button"
            aria-label="Close gallery"
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

          <span className="absolute top-4 left-4 z-20 text-white/70 text-sm font-mono">
            {galleryIndex + 1} / {totalGallery}
          </span>

          {totalGallery > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white modal-button"
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
                  goNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white modal-button"
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
            </>
          )}

          <div
            className="flex flex-col items-center justify-center max-w-full max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <GalleryImage
              url={galleryUrls[galleryIndex]}
              alt={`Screenshot ${galleryIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg animate-popup-content"
            />
          </div>
        </div>
      )}
    </div>
  );
}
