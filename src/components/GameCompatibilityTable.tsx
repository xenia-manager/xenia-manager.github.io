"use client";

import { useState, Fragment } from "react";
import { GameCompatibility, OptimizedSettingGame, SettingSection, getStateColor, getStateLabel, getStateDescription, getStateIcon } from "@/lib/types";
import { fetchOptimizedSettings } from "@/lib/tomlParser";
import TomlDisplay from "./TomlDisplay";

type SortColumn = "title" | "state" | "updated" | null;
type SortDirection = "asc" | "desc";

interface GameCompatibilityTableProps {
  games: GameCompatibility[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  optimizedGames: OptimizedSettingGame[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface SortableHeaderProps {
  column: SortColumn;
  currentSort: SortColumn;
  direction: SortDirection;
  onSort: (column: SortColumn) => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
}

function SortableHeader({
  column,
  currentSort,
  direction,
  onSort,
  children,
  className = "",
  width,
}: SortableHeaderProps) {
  const isActive = currentSort === column;

  return (
    <th
      className={`text-left py-3 px-4 font-semibold cursor-pointer hover:opacity-80 transition-opacity text-fluent-primary ${className}`}
      style={{ width }}
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-2">
        {children}
        <span className="text-xs">
          {isActive ? (direction === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </div>
    </th>
  );
}

export default function GameCompatibilityTable({
  games,
  sortColumn,
  sortDirection,
  onSort,
  optimizedGames,
}: GameCompatibilityTableProps) {
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const [loadingSettings, setLoadingSettings] = useState<number | null>(null);
  const [settingsCache, setSettingsCache] = useState<Record<string, SettingSection[]>>({});

  const hasOptimizedSettings = (gameId: string) => {
    return optimizedGames.some((g) => g.id === gameId);
  };

  const getOptimizedGame = (gameId: string) => {
    return optimizedGames.find((g) => g.id === gameId);
  };

  const handleTitleClick = async (gameId: string, issue: number) => {
    const isExpanded = expandedIssues.has(issue);

    if (isExpanded) {
      // Collapse this entry
      setExpandedIssues((prev) => {
        const newSet = new Set(prev);
        newSet.delete(issue);
        return newSet;
      });
      return;
    }

    if (!hasOptimizedSettings(gameId)) {
      return;
    }

    // Expand this entry (keep others expanded)
    setExpandedIssues((prev) => new Set(prev).add(issue));

    // Fetch settings if not cached
    if (!settingsCache[gameId]) {
      setLoadingSettings(issue);
      const sections = await fetchOptimizedSettings(gameId);
      if (sections) {
        setSettingsCache((prev) => ({ ...prev, [gameId]: sections }));
      }
      setLoadingSettings(null);
    }
  };

  if (games.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-4xl sm:text-5xl mb-4">🎮</div>
        <p className="text-fluent-secondary text-base sm:text-lg mb-2">
          No games found
        </p>
        <p className="text-fluent-secondary text-sm sm:text-base">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[350px]">
        <thead>
          <tr className="border-b border-[var(--table-border)]">
            <th className="text-left py-3 px-2 sm:px-4 font-semibold text-fluent-secondary text-xs sm:text-sm whitespace-nowrap" style={{ width: "60px" }}>
              ID
            </th>
            <SortableHeader
              column="title"
              currentSort={sortColumn}
              direction={sortDirection}
              onSort={onSort}
              width="45%"
              className="text-xs sm:text-sm"
            >
              Title
            </SortableHeader>
            <SortableHeader
              column="state"
              currentSort={sortColumn}
              direction={sortDirection}
              onSort={onSort}
              width="70px"
              className="text-xs sm:text-sm"
            >
              State
            </SortableHeader>
            <SortableHeader
              column="updated"
              currentSort={sortColumn}
              direction={sortDirection}
              onSort={onSort}
              width="100px"
              className="hidden md:table-cell text-xs sm:text-sm"
            >
              Updated
            </SortableHeader>
            <th className="text-left py-3 px-2 sm:px-4 font-semibold text-fluent-primary text-xs sm:text-sm whitespace-nowrap" style={{ width: "45px" }}></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            const isExpanded = expandedIssues.has(game.issue);
            const hasSettings = hasOptimizedSettings(game.id);
            const isLoading = loadingSettings === game.issue;
            const sections = settingsCache[game.id];

            return (
              <Fragment key={game.issue}>
                <tr
                  className={`border-b transition-colors duration-200 border-[var(--table-border)] ${
                    isExpanded ? "bg-[var(--table-hover)]" : "hover:bg-[var(--table-hover)]"
                  }`}
                >
                  <td className="py-3 px-2 sm:px-4 align-middle">
                    <code className="font-mono text-[10px] sm:text-sm text-fluent-secondary whitespace-nowrap">
                      {game.id}
                    </code>
                  </td>
                  <td className="py-3 px-2 sm:px-4 max-w-[60px] sm:max-w-none align-middle">
                    <button
                      onClick={() => handleTitleClick(game.id, game.issue)}
                      className={`text-left font-medium transition-colors duration-200 text-xs sm:text-sm break-words leading-relaxed ${
                        hasSettings
                          ? "text-xbox-green hover:text-xbox-accent cursor-pointer"
                          : "text-fluent-primary"
                      }`}
                      disabled={!hasSettings}
                      title={
                        hasSettings
                          ? "Click to view optimized settings"
                          : "No optimized settings available"
                      }
                    >
                      {game.title}
                    </button>
                  </td>
                  <td className="py-3 px-3 sm:px-4 align-middle">
                    <span
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold"
                      style={{
                        backgroundColor: `${getStateColor(game.state)}20`,
                        color: getStateColor(game.state),
                        border: `1px solid ${getStateColor(game.state)}60`,
                      }}
                      title={getStateDescription(game.state)}
                    >
                      <span className={`text-[10px] sm:text-xs ${game.state === "Gameplay" ? "text-sm sm:text-base" : ""}`} style={{ fontFamily: "inherit" }}>
                        {getStateIcon(game.state)}
                      </span>
                      <span className="hidden sm:inline text-xs sm:text-sm">{getStateLabel(game.state)}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 hidden sm:table-cell align-middle">
                    <span className="text-xs sm:text-sm text-fluent-secondary">
                      {formatDate(game.updated)}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 align-middle">
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-style text-xs sm:text-sm font-medium"
                    >
                      #{game.issue}
                    </a>
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={5} className="py-0 px-0 align-top">
                      <ExpandedContent
                        isLoading={isLoading}
                        sections={sections}
                        lastModified={getOptimizedGame(game.id)?.last_modified}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ExpandedContent({
  isLoading,
  sections,
  lastModified,
}: {
  isLoading: boolean;
  sections?: SettingSection[];
  lastModified?: string;
}) {
  return (
    <div className="overflow-x-auto pr-2 sm:pr-4 pt-4 pb-2">
      {isLoading ? (
        <div className="flex items-center gap-2 py-4">
          <div className="spinner"></div>
          <span className="text-fluent-secondary text-sm">
            Loading optimized settings...
          </span>
        </div>
      ) : sections ? (
        <div className="mb-4">
          <TomlDisplay sections={sections} lastModified={lastModified} />
        </div>
      ) : (
        <p className="text-fluent-secondary text-sm pb-4">Failed to load settings</p>
      )}
    </div>
  );
}
