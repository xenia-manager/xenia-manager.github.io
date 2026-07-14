"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import {
  GameCompatibility,
  OptimizedSettingGame,
  MousehookGame,
  NetplayGame,
  getStateSortValue,
  STATE_ORDER,
} from "@/lib/types";
import { GameCompatibilityTable } from "./GameCompatibilityTable";
import { StateFilterBar } from "./StateFilterBar";
import { CustomSelect } from "./CustomSelect";
import { LetterFilterBar } from "./LetterFilterBar";
import { Pagination } from "./Pagination";
import { LoadingErrorOverlay } from "./LoadingErrorOverlay";
import { SkeletonTable } from "./Skeleton";
import { fetchWithFallback, FETCH_CONFIGS } from "@/lib/fetchWithFallback";
import { normalizeForSearch } from "@/lib/searchUtils";
import { useSearchFocus } from "@/lib/hooks";

type SortColumn = "title" | "state" | "updated" | null;
type SortDirection = "asc" | "desc";

const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_OPTIONS = [25, 50, 100, 200];

interface GameCompatibilityListProps {
  onLoadingChange?: (loading: boolean) => void;
  onStateCountsChange?: (counts: Record<string, number>) => void;
  onTotalCountChange?: (count: number) => void;
}

export function GameCompatibilityList({
  onLoadingChange,
  onStateCountsChange,
  onTotalCountChange,
}: GameCompatibilityListProps) {
  const [allGames, setAllGames] = useState<GameCompatibility[]>([]);
  const [optimizedGames, setOptimizedGames] = useState<OptimizedSettingGame[]>(
    [],
  );
  const [mousehookGames, setMousehookGames] = useState<MousehookGame[]>([]);
  const [netplayGames, setNetplayGames] = useState<NetplayGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Filter states
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [letterFilter, setLetterFilter] = useState("");
  const [showOptimizedOnly, setShowOptimizedOnly] = useState(false);
  const [showMousehookOnly, setShowMousehookOnly] = useState(false);
  const [showNetplayOnly, setShowNetplayOnly] = useState(false);
  const [netplayFilterPublic, setNetplayFilterPublic] = useState(false);
  const [netplayFilterLocal, setNetplayFilterLocal] = useState(false);
  const [netplayFilterSystemlink, setNetplayFilterSystemlink] = useState(false);

  useSearchFocus(searchRef);

  // Sorting
  const [sortColumn, setSortColumn] = useState<SortColumn>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Fetch all games initially
  useEffect(() => {
    async function fetchData() {
      try {
        const [
          gamesResponse,
          settingsResponse,
          mousehookResponse,
          netplayResponse,
        ] = await Promise.all([
          fetchWithFallback(FETCH_CONFIGS.gameCompatibility),
          fetchWithFallback(FETCH_CONFIGS.optimizedSettingsList),
          fetchWithFallback(FETCH_CONFIGS.mousehook),
          fetchWithFallback(FETCH_CONFIGS.netplay),
        ]);

        const gamesData = await gamesResponse.json();
        const settingsData = await settingsResponse.json();
        const mousehookData = await mousehookResponse.json();
        const netplayData = await netplayResponse.json();

        setAllGames(gamesData);
        setOptimizedGames(settingsData);
        setMousehookGames(mousehookData);
        setNetplayGames(netplayData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Notify parent of loading state changes
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  // Build lookup sets for mousehook and netplay game IDs
  const mousehookIdSet = useMemo(() => {
    const ids = new Set<string>();
    for (const game of mousehookGames) {
      if (Array.isArray(game.id)) {
        game.id.forEach((id) => ids.add(id));
      } else {
        ids.add(game.id);
      }
    }
    return ids;
  }, [mousehookGames]);

  const netplayIdSet = useMemo(() => {
    return new Set(netplayGames.map((g) => g.id));
  }, [netplayGames]);

  // Filter games based on search and state
  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      // Skip invalid entries
      if (!game.title || !game.id || !game.updated) {
        return false;
      }

      // Optimized settings filter
      const hasOptimizedSettings = optimizedGames.some((g) => g.id === game.id);
      if (showOptimizedOnly && !hasOptimizedSettings) {
        return false;
      }

      // Mousehook filter
      if (showMousehookOnly && !mousehookIdSet.has(game.id)) {
        return false;
      }

      // Netplay filter
      if (showNetplayOnly && !netplayIdSet.has(game.id)) {
        return false;
      }

      // Netplay sub-filters (only apply when showNetplayOnly is true)
      if (showNetplayOnly) {
        const netplayEntry = netplayGames.find((g) => g.id === game.id);
        if (!netplayEntry) return false;

        const anySubFilterActive =
          netplayFilterPublic || netplayFilterLocal || netplayFilterSystemlink;
        if (anySubFilterActive) {
          const { status } = netplayEntry;
          const matchesPublic =
            !netplayFilterPublic || status.working_public !== null;
          const matchesLocal =
            !netplayFilterLocal ||
            status.tested_locally !== null ||
            status.only_local !== null;
          const matchesSystemlink =
            !netplayFilterSystemlink || status.systemlink !== null;
          if (!matchesPublic || !matchesLocal || !matchesSystemlink) {
            return false;
          }
        }
      }

      // Search filter
      const searchLower = normalizeForSearch(searchValue);
      const inTitle = normalizeForSearch(game.title).includes(searchLower);
      const inId = normalizeForSearch(game.id).includes(searchLower);
      const matchesSearch = !searchValue || inTitle || inId;

      // State filter
      const matchesState = stateFilter === "" || game.state === stateFilter;

      // Letter filter
      const matchesLetter =
        letterFilter === "" ||
        (letterFilter === "!" && !/^[a-zA-Z0-9]/.test(game.title)) ||
        (letterFilter === "0-9" && /^[0-9]/.test(game.title)) ||
        (letterFilter.length === 1 &&
          game.title.toUpperCase().startsWith(letterFilter));

      return matchesSearch && matchesState && matchesLetter;
    });
  }, [
    allGames,
    optimizedGames,
    mousehookIdSet,
    netplayIdSet,
    netplayGames,
    searchValue,
    stateFilter,
    letterFilter,
    showOptimizedOnly,
    showMousehookOnly,
    showNetplayOnly,
    netplayFilterPublic,
    netplayFilterLocal,
    netplayFilterSystemlink,
  ]);

  // Sort filtered games
  const sortedGames = useMemo(() => {
    if (!sortColumn) {
      return filteredGames;
    }

    return [...filteredGames].sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "state":
          comparison = getStateSortValue(a.state) - getStateSortValue(b.state);
          break;
        case "updated":
          comparison =
            new Date(a.updated).getTime() - new Date(b.updated).getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredGames, sortColumn, sortDirection]);

  // Calculate state counts for filter buttons
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "": allGames.length, // All states
    };
    for (const state of STATE_ORDER) {
      counts[state] = 0;
    }

    allGames.forEach((game) => {
      if (game.state in counts) {
        counts[game.state]++;
      }
    });

    return counts;
  }, [allGames]);

  // Calculate optimized games count
  const optimizedCount = useMemo(() => {
    return optimizedGames.length;
  }, [optimizedGames]);

  // Calculate mousehook and netplay counts
  const mousehookCount = useMemo(() => {
    return mousehookGames.length;
  }, [mousehookGames]);

  const netplayCount = useMemo(() => {
    return netplayGames.length;
  }, [netplayGames]);

  // Notify parent of state counts changes
  useEffect(() => {
    onStateCountsChange?.(stateCounts);
  }, [stateCounts, onStateCountsChange]);

  // Notify parent of total count changes
  useEffect(() => {
    onTotalCountChange?.(allGames.length);
  }, [allGames.length, onTotalCountChange]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedGames.length / pageSize);
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedGames.slice(startIndex, endIndex);
  }, [sortedGames, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchValue,
    stateFilter,
    letterFilter,
    showOptimizedOnly,
    showMousehookOnly,
    showNetplayOnly,
    netplayFilterPublic,
    netplayFilterLocal,
    netplayFilterSystemlink,
    pageSize,
  ]);

  const handleClear = () => {
    setSearchValue("");
    setStateFilter("");
    setLetterFilter("");
    setShowOptimizedOnly(false);
    setShowMousehookOnly(false);
    setShowNetplayOnly(false);
    setNetplayFilterPublic(false);
    setNetplayFilterLocal(false);
    setNetplayFilterSystemlink(false);
  };

  const handleSort = (column: SortColumn) => {
    if (column === sortColumn) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New column, default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="relative">
      <LoadingErrorOverlay
        loading={loading}
        error={error}
        loadingMessage="Loading game compatibility data..."
        skeleton={<SkeletonTable />}
      />

      {/* Main content - parent component handles fade-in animation */}
      <div>
        <section className="rounded-2xl p-4 sm:p-6 mica-card">
          <div className="flex flex-col gap-3">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                <label className="block text-xs font-medium mb-1.5 text-fluent-secondary">
                  Search
                </label>
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search by title or ID..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="input-fluent transition-all duration-200 text-sm py-3 pr-10 min-h-[52px]"
                  />
                  {searchValue && (
                    <button
                      onClick={() => setSearchValue("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-colors text-fluent-secondary hover:bg-white/10"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <label className="block text-xs font-medium mb-1.5 text-fluent-secondary">
                  Results per page
                </label>
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

              <div className="w-full sm:w-auto pt-[26px]">
                <button
                  onClick={handleClear}
                  className="btn-xbox transition-all duration-200 min-w-[80px] w-full sm:w-auto text-sm py-3 px-3 hover:!transform-none hover:!translate-y-0 min-h-[52px]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* State filter buttons */}
            <StateFilterBar
              stateFilter={stateFilter}
              onStateFilterChange={setStateFilter}
              stateCounts={stateCounts}
              optimizedCount={optimizedCount}
              showOptimizedOnly={showOptimizedOnly}
              onShowOptimizedOnlyChange={setShowOptimizedOnly}
              mousehookCount={mousehookCount}
              showMousehookOnly={showMousehookOnly}
              onShowMousehookOnlyChange={setShowMousehookOnly}
              netplayCount={netplayCount}
              showNetplayOnly={showNetplayOnly}
              onShowNetplayOnlyChange={setShowNetplayOnly}
              netplayFilterPublic={netplayFilterPublic}
              onNetplayFilterPublicChange={setNetplayFilterPublic}
              netplayFilterLocal={netplayFilterLocal}
              onNetplayFilterLocalChange={setNetplayFilterLocal}
              netplayFilterSystemlink={netplayFilterSystemlink}
              onNetplayFilterSystemlinkChange={setNetplayFilterSystemlink}
            />

            {/* Letter filter buttons */}
            <LetterFilterBar
              letterFilter={letterFilter}
              onLetterFilterChange={setLetterFilter}
            />
          </div>

          {/* Games table */}
          <div className="mt-6">
            <GameCompatibilityTable
              games={paginatedGames}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              optimizedGames={optimizedGames}
              mousehookGames={mousehookGames}
              netplayGames={netplayGames}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
