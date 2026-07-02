"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useDeferredValue,
} from "react";
import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { X360dbFooter } from "@/components/X360dbFooter";
import { GameCard } from "@/components/GameCard";
import { GameDetailModal } from "@/components/GameDetailModal";
import { Pagination } from "@/components/Pagination";
import { CustomSelect } from "@/components/CustomSelect";
import { LetterFilterBar } from "@/components/LetterFilterBar";
import { fetchWithFallback, type FetchConfig } from "@/lib/fetchWithFallback";
import { normalizeForSearch } from "@/lib/searchUtils";
import { getMissingGameEntryUrl } from "@/lib/github";
import { PAGES_X360DB, RAW_X360DB } from "@/lib/constants";
import { SkeletonGameList } from "@/components/Skeleton";
import { AnimatePresence } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

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

const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_OPTIONS = [25, 50, 100, 200];

export default function GamesDatabasePage() {
  const [games, setGames] = useState<GamesEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedGame, setSelectedGame] = useState<{
    id: string;
    title: string;
    alternativeId: string[];
  } | null>(null);

  const [letterFilter, setLetterFilter] = useState("");
  const [hideIndieGames, setHideIndieGames] = useState(true);

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
        const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
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

  const indieCount = useMemo(
    () => games.filter((g) => g.id.startsWith("5855")).length,
    [games],
  );

  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      const matchesLetter =
        letterFilter === "" ||
        (letterFilter === "!" && !/^[a-zA-Z0-9]/.test(g.title)) ||
        (letterFilter === "0-9" && /^[0-9]/.test(g.title)) ||
        (letterFilter.length === 1 &&
          g.title.toUpperCase().startsWith(letterFilter));
      if (!matchesLetter) return false;

      if (hideIndieGames && g.id.startsWith("5855")) return false;

      const normalizedQuery = normalizeForSearch(deferredQuery);
      if (!normalizedQuery) return true;
      if (normalizeForSearch(g.title).includes(normalizedQuery)) return true;
      if (normalizeForSearch(g.id).includes(normalizedQuery)) return true;
      for (const altId of g.alternative_id) {
        if (normalizeForSearch(altId).includes(normalizedQuery)) return true;
      }
      return false;
    });
  }, [games, deferredQuery, letterFilter, hideIndieGames]);

  const totalPages = Math.ceil(filteredGames.length / pageSize);
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredGames.slice(startIndex, endIndex);
  }, [filteredGames, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredQuery, pageSize, letterFilter, hideIndieGames]);

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

          {/* Letter filter */}
          <LetterFilterBar
            letterFilter={letterFilter}
            onLetterFilterChange={setLetterFilter}
          />

          {/* Indie games toggle */}
          <div className="mb-3">
            <button
              onClick={() => setHideIndieGames(!hideIndieGames)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
                hideIndieGames
                  ? "bg-[var(--bg-secondary)] text-fluent-secondary border-[var(--border-color)] hover:bg-[var(--hover-bg)]"
                  : "bg-xbox-button text-white border-[var(--color-xbox-button)] shadow-lg scale-105"
              }`}
            >
              <span>Indie Games</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  hideIndieGames ? "bg-black/10" : "bg-white/20"
                }`}
              >
                {indieCount}
              </span>
            </button>
          </div>

          {/* Search + Results per page */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end mb-3">
            <div className="relative flex-1">
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
            <div className="flex-shrink-0">
              <CustomSelect
                options={PAGE_SIZE_OPTIONS.map((size) => ({
                  value: size,
                  label: `${size} games`,
                }))}
                value={pageSize}
                onChange={(val) => setPageSize(Number(val))}
                className="min-w-[130px] w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="py-4">
              <SkeletonGameList />
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
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {paginatedGames.map((game) => (
                  <StaggerItem key={game.id}>
                    <GameCard
                      id={game.id}
                      title={game.title}
                      boxartUrl={game.boxart}
                      onSelectGame={handleSelectId}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <p className="text-sm text-center text-[var(--foreground)]/50 mt-6">
                Showing {filteredGames.length} of {games.length} games
              </p>
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <X360dbFooter />

      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
