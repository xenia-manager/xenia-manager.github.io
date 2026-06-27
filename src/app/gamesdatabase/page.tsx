"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useDeferredValue,
  useRef,
} from "react";
import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { X360dbFooter } from "@/components/X360dbFooter";
import { GameCard } from "@/components/GameCard";
import { GameDetailModal } from "@/components/GameDetailModal";
import { fetchWithFallback, type FetchConfig } from "@/lib/fetchWithFallback";
import { normalizeForSearch } from "@/lib/searchUtils";
import { getMissingGameEntryUrl } from "@/lib/github";
import { PAGES_X360DB, RAW_X360DB } from "@/lib/constants";

const X360DB_GAMES_CONFIG: FetchConfig = {
  primary: `${PAGES_X360DB}/games.json`,
  backup: `${RAW_X360DB}/games.json`,
};

interface GamesEntry {
  id: string;
  alternative_id: string[];
  title: string;
  boxart: string | null;
  media_id: string[];
}

const CACHE_KEY = "x360db_games_v1";
const CACHE_TTL = 24 * 60 * 60 * 1000;

interface CacheEntry {
  timestamp: number;
  games: GamesEntry[];
}

function loadCachedGames(): GamesEntry[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.games;
  } catch {
    return null;
  }
}

function saveCachedGames(games: GamesEntry[]) {
  try {
    const entry: CacheEntry = { timestamp: Date.now(), games };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {}
}

export default function GamesDatabasePage() {
  const [games, setGames] = useState<GamesEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const [selectedGame, setSelectedGame] = useState<{
    id: string;
    title: string;
    alternativeId: string[];
  } | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchStuck, setSearchStuck] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cached = loadCachedGames();
    if (cached) {
      setGames(cached);
      setLoading(false);
    }

    async function fetchGames() {
      try {
        const response = await fetchWithFallback(X360DB_GAMES_CONFIG);
        const data: GamesEntry[] = await response.json();
        const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
        if (!cancelled) {
          setGames(sorted);
          saveCachedGames(sorted);
        }
      } catch (err) {
        if (!cancelled && !cached) {
          setError(
            err instanceof Error ? err.message : "Failed to load game database",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGames();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectId = useCallback(
    (id: string) => {
      const game = games.find((g) => g.id === id);
      setSelectedGame({
        id,
        title: game?.title ?? "",
        alternativeId: game?.alternative_id ?? [],
      });
    },
    [games],
  );

  useEffect(() => {
    const el = searchContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSearchStuck(!entry.isIntersecting),
      { rootMargin: "-65px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredGames = useMemo(() => {
    const normalizedQuery = normalizeForSearch(deferredQuery);
    if (!normalizedQuery) return games;
    return games.filter((g) => {
      if (normalizeForSearch(g.title).includes(normalizedQuery)) return true;
      if (normalizeForSearch(g.id).includes(normalizedQuery)) return true;
      for (const altId of g.alternative_id) {
        if (normalizeForSearch(altId).includes(normalizedQuery)) return true;
      }
      return false;
    });
  }, [games, deferredQuery]);

  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1" role="main">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
                Xbox 360 Database
              </h1>
              <p className="text-[var(--foreground)]/60 text-sm sm:text-base mt-2">
                Browse {loading ? "..." : games.length} Xbox 360 games with
                artwork, metadata, and screenshots
              </p>
            </div>
            {!loading && (
              <a
                href={getMissingGameEntryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Submit missing game entry"
                className="p-1.5 rounded-md bg-[var(--color-xbox-button)] text-white hover:bg-[var(--color-xbox-hover)] transition-colors flex-shrink-0 focus-indicator mt-2"
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* Search */}
          <div
            ref={searchContainerRef}
            className={`sticky top-16 z-40 mb-6 ${
              searchStuck
                ? "glass-card border-b border-[var(--border-color)]"
                : ""
            }`}
          >
            <div className="relative max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-fluent w-full pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-colors text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] focus-indicator"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin w-10 h-10 border-2 border-[var(--color-xbox-green)] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-[var(--foreground)]/60 text-sm">
                  Loading game database...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-[var(--color-error)] mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-xbox-secondary px-6 py-2 rounded-lg text-sm"
              >
                Retry
              </button>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-[var(--foreground)]/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-[var(--foreground)]/50 text-lg font-medium">
                No games found
              </p>
              <p className="text-[var(--foreground)]/40 text-sm mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    boxartUrl={game.boxart}
                    onSelectGame={handleSelectId}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-[var(--foreground)]/50 mt-6">
                Showing {filteredGames.length} of {games.length} games
              </p>
            </>
          )}
        </div>
      </main>
      <X360dbFooter />

      {selectedGame && (
        <GameDetailModal
          key={selectedGame.id}
          gameId={selectedGame.id}
          gameTitle={selectedGame.title}
          alternativeId={selectedGame.alternativeId}
          onClose={() => setSelectedGame(null)}
          onSelectId={handleSelectId}
        />
      )}
    </>
  );
}
