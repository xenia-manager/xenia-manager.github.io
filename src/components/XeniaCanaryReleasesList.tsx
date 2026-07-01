"use client";

import { useEffect, useState, useMemo } from "react";
import { XeniaCanaryRelease } from "@/lib/xeniaCanaryTypes";
import { fetchWithFallback, FETCH_CONFIGS } from "@/lib/fetchWithFallback";
import { normalizeForSearch } from "@/lib/searchUtils";
import { XeniaCanaryReleaseCard } from "./XeniaCanaryReleaseCard";
import { XeniaCanaryFilterBar } from "./XeniaCanaryFilterBar";
import { CustomSelect } from "./CustomSelect";
import { Pagination } from "./Pagination";
import { LoadingErrorOverlay } from "./LoadingErrorOverlay";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface XeniaCanaryReleasesListProps {
  onLoadingChange?: (loading: boolean) => void;
}

export function XeniaCanaryReleasesList({
  onLoadingChange,
}: XeniaCanaryReleasesListProps) {
  const [allReleases, setAllReleases] = useState<XeniaCanaryRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [earliestDate, setEarliestDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);

  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetchWithFallback(
          FETCH_CONFIGS.xeniaCanaryReleases,
        );
        const data = await response.json();
        setAllReleases(data);

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

      const searchLower = normalizeForSearch(searchValue);
      const inTitle = normalizeForSearch(rel.changelog.title).includes(searchLower);
      const inCommit = normalizeForSearch(rel.target_commitish).includes(searchLower);
      const matchesSearch = !searchValue || inTitle || inCommit;

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

  const totalPages = Math.ceil(sortedReleases.length / pageSize);
  const paginatedReleases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedReleases.slice(start, start + pageSize);
  }, [sortedReleases, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, fromDate, toDate, sortOption, pageSize]);

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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-xl font-semibold text-fluent-primary">
                Releases
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-fluent-secondary">
                    Per page
                  </label>
                  <CustomSelect
                    options={PAGE_SIZE_OPTIONS.map((size) => ({
                      value: size,
                      label: `${size}`,
                    }))}
                    value={pageSize}
                    onChange={(val) => setPageSize(Number(val))}
                    className="w-[110px]"
                  />
                </div>
                <div className="text-sm text-fluent-secondary">
                  {sortedReleases.length}{" "}
                  {sortedReleases.length === 1 ? "release" : "releases"} found
                </div>
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
                  {paginatedReleases.map((release) => (
                    <XeniaCanaryReleaseCard
                      key={release.tag_name}
                      release={release}
                    />
                  ))}
                </>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
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
    </>
  );
}
