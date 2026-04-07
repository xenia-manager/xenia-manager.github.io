"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { XeniaCanaryRelease } from "@/lib/xeniaCanaryTypes";
import XeniaCanaryReleaseCard from "./XeniaCanaryReleaseCard";
import XeniaCanaryFilterBar from "./XeniaCanaryFilterBar";
import LoadingErrorOverlay from "./LoadingErrorOverlay";

const BATCH_SIZE = 20;

interface XeniaCanaryReleasesListProps {
  onLoadingChange?: (loading: boolean) => void;
}

export default function XeniaCanaryReleasesList({
  onLoadingChange,
}: XeniaCanaryReleasesListProps) {
  const [allReleases, setAllReleases] = useState<XeniaCanaryRelease[]>([]);
  const [displayedReleases, setDisplayedReleases] = useState<
    XeniaCanaryRelease[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [earliestDate, setEarliestDate] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);
  const lastReleaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchReleases() {
      const primaryUrl =
        "https://xenia-manager.github.io/database/data/xenia-releases/canary.json";
      const fallbackUrl =
        "https://raw.githubusercontent.com/xenia-manager/database/refs/heads/main/data/xenia-releases/canary.json";

      try {
        let response = await fetch(primaryUrl);
        if (!response.ok) {
          console.warn("Primary URL failed, trying fallback...");
          response = await fetch(fallbackUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch releases");
          }
        }
        const data = await response.json();
        setAllReleases(data);
        setDisplayedReleases(data.slice(0, BATCH_SIZE));
        setHasMore(data.length > BATCH_SIZE);

        if (data.length > 0) {
          const dates = data
            .map((r: XeniaCanaryRelease) => new Date(r.published_at).getTime())
            .filter((d: number) => !isNaN(d));

          if (dates.length > 0) {
            const earliest = new Date(Math.min(...dates));
            setEarliestDate(earliest.toISOString().split("T")[0]);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  // Notify parent of loading state changes
  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  const filteredReleases = useMemo(() => {
    return allReleases.filter((rel) => {
      if (!rel.changelog || !rel.changelog.title) {
        return false;
      }

      const searchLower = searchValue.toLowerCase();
      const inTitle = rel.changelog.title.toLowerCase().includes(searchLower);
      const inCommit = rel.target_commitish.toLowerCase().includes(searchLower);
      const matchesSearch = searchValue === "" || inTitle || inCommit;

      let matchesDate = true;

      let releaseDate: Date | null = null;
      try {
        releaseDate = new Date(rel.published_at);
        if (isNaN(releaseDate.getTime())) {
          console.warn(
            `Invalid date for release: ${rel.tag_name}, date: ${rel.published_at}`,
          );
          return false;
        }
      } catch (error) {
        console.warn(
          `Error parsing date for release: ${rel.tag_name}, date: ${rel.published_at}`,
          error,
        );
        return false;
      }

      if (fromDate) {
        try {
          const from = new Date(fromDate);
          if (isNaN(from.getTime())) throw new Error("Invalid from date");
          from.setHours(0, 0, 0, 0);
          if (releaseDate < from) matchesDate = false;
        } catch (error) {
          console.warn(`Error parsing from date: ${fromDate}`, error);
          matchesDate = false;
        }
      }
      if (toDate) {
        try {
          const to = new Date(toDate);
          if (isNaN(to.getTime())) throw new Error("Invalid to date");
          to.setHours(23, 59, 59, 999);
          if (releaseDate > to) matchesDate = false;
        } catch (error) {
          console.warn(`Error parsing to date: ${toDate}`, error);
          matchesDate = false;
        }
      }

      return matchesSearch && matchesDate;
    });
  }, [allReleases, searchValue, fromDate, toDate]);

  const sortedReleases = useMemo(() => {
    return [...filteredReleases].sort((a, b) => {
      const dateA = new Date(a.published_at).getTime();
      const dateB = new Date(b.published_at).getTime();

      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      }

      if (sortOption === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [filteredReleases, sortOption]);

  const loadMoreReleases = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedReleases.length;
      const nextReleases = sortedReleases.slice(
        currentLength,
        currentLength + BATCH_SIZE,
      );
      setDisplayedReleases((prev) => [...prev, ...nextReleases]);
      setHasMore(currentLength + nextReleases.length < sortedReleases.length);
      setLoadingMore(false);
    }, 300);
  }, [displayedReleases.length, sortedReleases, hasMore, loadingMore]);

  useEffect(() => {
    setDisplayedReleases(sortedReleases.slice(0, BATCH_SIZE));
    setHasMore(sortedReleases.length > BATCH_SIZE);
  }, [sortedReleases]);

  useEffect(() => {
    if (loading || loadingMore) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        loadMoreReleases();
      }
    });

    const timer = setTimeout(() => {
      if (lastReleaseRef.current && observer.current) {
        observer.current.observe(lastReleaseRef.current);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [
    hasMore,
    loadingMore,
    loading,
    loadMoreReleases,
    displayedReleases.length,
    sortOption,
  ]);

  const handleClear = () => {
    setSearchValue("");
    setFromDate("");
    setToDate("");
  };

  return (
    <>
      <XeniaCanaryFilterBar
        searchValue={searchValue}
        fromDate={fromDate}
        toDate={toDate}
        sortOption={sortOption}
        earliestDate={earliestDate}
        onSearchChange={setSearchValue}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onSortChange={setSortOption}
        onClear={handleClear}
      />

      {/* Loading/error overlay wrapper - maintains stable layout */}
      <div className="relative">
        <LoadingErrorOverlay
          loading={loading}
          error={error}
          loadingMessage="Loading releases..."
        />

        {/* Main content - parent component handles fade-in animation */}
        <div>
          <section className="rounded-2xl p-6 shadow-lg bg-[var(--bg-secondary)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-fluent-primary">
                Releases
              </h2>
              <div className="text-sm text-fluent-secondary">
                {sortedReleases.length}{" "}
                {sortedReleases.length === 1 ? "release" : "releases"} found
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {sortedReleases.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-fluent-secondary text-lg mb-2">
                    No results found
                  </p>
                  <p className="text-fluent-secondary">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <>
                  {displayedReleases.map((release, index) => {
                    if (index === displayedReleases.length - 1) {
                      return (
                        <div key={release.tag_name} ref={lastReleaseRef}>
                          <XeniaCanaryReleaseCard release={release} />
                        </div>
                      );
                    }
                    return (
                      <XeniaCanaryReleaseCard
                        key={release.tag_name}
                        release={release}
                      />
                    );
                  })}

                  {loadingMore && (
                    <div className="flex justify-center py-6">
                      <div className="spinner"></div>
                    </div>
                  )}

                  {!hasMore && displayedReleases.length > 0 && (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center gap-2 text-lg font-medium">
                        <span className="text-fluent-secondary">
                          You&apos;ve reached the end!
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
