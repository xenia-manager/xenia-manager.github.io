"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GameCompatibility,
  OptimizedSettingGame,
  SettingSection,
  MousehookGame,
  NetplayGame,
  getMousehookColor,
  getStateColor,
  getStateLabel,
  getStateDescription,
  getStateIcon,
} from "@/lib/types";
import { fetchOptimizedSettings } from "@/lib/tomlParser";
import { formatDate, formatDateShort } from "@/lib/dateUtils";
import { TomlDisplay } from "./TomlDisplay";
import {
  MouseIcon,
  GlobeCheckIcon,
  GlobeLockIcon,
  GlobeXIcon,
  EthernetPortIcon,
  Link2Icon,
  Unlink2Icon,
  Link2OffIcon,
} from "./Icons";

type SortColumn = "title" | "state" | "updated" | null;
type SortDirection = "asc" | "desc";

interface GameCompatibilityTableProps {
  games: GameCompatibility[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  optimizedGames: OptimizedSettingGame[];
  mousehookGames: MousehookGame[];
  netplayGames: NetplayGame[];
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

export function GameCompatibilityTable({
  games,
  sortColumn,
  sortDirection,
  onSort,
  optimizedGames,
  mousehookGames,
  netplayGames,
}: GameCompatibilityTableProps) {
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const [loadingSettings, setLoadingSettings] = useState<number | null>(null);
  const [settingsCache, setSettingsCache] = useState<
    Record<string, SettingSection[]>
  >({});
  const [clickedTooltip, setClickedTooltip] = useState<{
    text: string;
    rect: DOMRect;
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close tooltip on click outside
  useEffect(() => {
    if (!clickedTooltip) return;
    const handleClick = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setClickedTooltip(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [clickedTooltip]);

  // Build netplay lookup map (id -> NetplayGame)
  const netplayMap = new Map<string, NetplayGame>();
  for (const game of netplayGames) {
    netplayMap.set(game.id, game);
  }

  // Build mousehook lookup map (id -> MousehookGame)
  // Note: mousehookIdSet already handles multi-id entries

  const getMousehookGame = (gameId: string): MousehookGame | undefined => {
    for (const game of mousehookGames) {
      if (Array.isArray(game.id)) {
        if (game.id.includes(gameId)) return game;
      } else if (game.id === gameId) {
        return game;
      }
    }
    return undefined;
  };

  const buildMousehookTooltip = (game: MousehookGame): string => {
    const lines = [`Mousehook: ${game.mouse_support}`];
    if (game.supported_versions)
      lines.push(`Versions: ${game.supported_versions}`);
    if (game.notes) lines.push(`Notes: ${game.notes}`);
    return lines.join("\n");
  };

  const buildNetplayPublicTooltip = (game: NetplayGame): string => {
    const value = game.status.working_public;
    const label =
      value === null
        ? "Not tested"
        : value.charAt(0).toUpperCase() + value.slice(1);
    const lines = [`Public Online: ${label}`];
    if (game.comments) lines.push(`Notes: ${game.comments}`);
    if (game.links.length > 0) {
      game.links.forEach((l) => lines.push(`${l.text}: ${l.url}`));
    }
    return lines.join("\n");
  };

  const buildNetplayLocalTooltip = (game: NetplayGame): string => {
    const { status } = game;
    const localValue = status.tested_locally ?? status.only_local;
    const label =
      localValue === null
        ? "Not tested"
        : localValue === "ok"
          ? "OK"
          : localValue === "partial"
            ? "Partial"
            : localValue;
    const lines = [`Local: ${label}`];
    if (status.tested_locally !== null)
      lines.push(`Tested locally: ${status.tested_locally}`);
    if (status.only_local !== null)
      lines.push(`Only local: ${status.only_local}`);
    if (game.comments) lines.push(`Notes: ${game.comments}`);
    return lines.join("\n");
  };

  const buildNetplaySystemlinkTooltip = (game: NetplayGame): string => {
    const value = game.status.systemlink;
    const label =
      value === null
        ? "Not tested"
        : value.charAt(0).toUpperCase() + value.slice(1);
    return `Systemlink: ${label}`;
  };

  const handleIconClick = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setClickedTooltip((prev) => (prev?.rect === rect ? null : { text, rect }));
  };

  const hasOptimizedSettings = (gameId: string) => {
    return optimizedGames.some((g) => g.id === gameId);
  };

  const getOptimizedGame = (gameId: string) => {
    return optimizedGames.find((g) => g.id === gameId);
  };

  const handleTitleClick = async (gameId: string, issue: number) => {
    setClickedTooltip(null);
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
    <div ref={wrapperRef} className="relative overflow-x-auto">
      <table className="w-full min-w-[350px]">
        <thead>
          <tr className="border-b border-[var(--table-border)]">
            <th
              className="text-left py-3 px-2 sm:px-4 font-semibold text-fluent-secondary text-xs sm:text-sm whitespace-nowrap"
              style={{ width: "60px" }}
            >
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
            <th
              className="py-3 px-2 sm:px-4 whitespace-nowrap"
              style={{ width: "80px" }}
            ></th>
            <SortableHeader
              column="updated"
              currentSort={sortColumn}
              direction={sortDirection}
              onSort={onSort}
              width="100px"
              className="text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Updated</span>
              <span className="sm:hidden">Upd.</span>
            </SortableHeader>
            <th
              className="text-left py-3 px-2 sm:px-4 font-semibold text-fluent-primary text-xs sm:text-sm whitespace-nowrap"
              style={{ width: "45px" }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            const isExpanded = expandedIssues.has(game.issue);
            const hasSettings = hasOptimizedSettings(game.id);
            const isLoading = loadingSettings === game.issue;
            const sections = settingsCache[game.id];
            const mousehookGame = getMousehookGame(game.id);
            const netplayGame = netplayMap.get(game.id);

            return (
              <Fragment key={game.issue}>
                <tr
                  className={`border-b transition-colors duration-200 border-[var(--table-border)] ${
                    isExpanded
                      ? "bg-[var(--table-hover)]"
                      : "hover:bg-[var(--table-hover)]"
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
                      <span
                        className={`text-[10px] sm:text-xs ${game.state === "Gameplay" ? "text-sm sm:text-base" : ""}`}
                        style={{ fontFamily: "inherit" }}
                      >
                        {getStateIcon(game.state)}
                      </span>
                      <span className="hidden sm:inline text-xs sm:text-sm">
                        {getStateLabel(game.state)}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 align-middle">
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                      {/* Mousehook icon */}
                      {mousehookGame && (
                        <button
                          className="inline-flex items-center cursor-pointer p-0.5 rounded hover:bg-white/10 transition-colors"
                          onClick={(e) =>
                            handleIconClick(
                              e,
                              buildMousehookTooltip(mousehookGame),
                            )
                          }
                        >
                          <MouseIcon
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            style={
                              {
                                color: getMousehookColor(
                                  mousehookGame.mouse_support,
                                ),
                              } as React.CSSProperties
                            }
                          />
                        </button>
                      )}

                      {/* Netplay icons */}
                      {netplayGame &&
                        (() => {
                          const { status } = netplayGame;
                          return (
                            <>
                              {/* Globe (working_public) */}
                              <button
                                className="inline-flex items-center cursor-pointer p-0.5 rounded hover:bg-white/10 transition-colors"
                                onClick={(e) =>
                                  handleIconClick(
                                    e,
                                    buildNetplayPublicTooltip(netplayGame),
                                  )
                                }
                              >
                                {status.working_public === "ok" && (
                                  <GlobeCheckIcon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#166534",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                                {status.working_public === "partial" && (
                                  <GlobeLockIcon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#CA8A04",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                                {(status.working_public === "fail" ||
                                  status.working_public === null) && (
                                  <GlobeXIcon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#DC2626",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                              </button>

                              {/* Ethernet (local) */}
                              <button
                                className="inline-flex items-center cursor-pointer p-0.5 rounded hover:bg-white/10 transition-colors"
                                onClick={(e) =>
                                  handleIconClick(
                                    e,
                                    buildNetplayLocalTooltip(netplayGame),
                                  )
                                }
                              >
                                {(status.tested_locally === "ok" ||
                                  status.only_local === "ok") && (
                                  <EthernetPortIcon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#166534",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                                {status.tested_locally === "partial" && (
                                  <EthernetPortIcon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#CA8A04",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                                {status.tested_locally === null &&
                                  status.only_local === null && (
                                    <EthernetPortIcon
                                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                      style={
                                        {
                                          color: "#DC2626",
                                        } as React.CSSProperties
                                      }
                                    />
                                  )}
                              </button>

                              {/* Link (systemlink) */}
                              <button
                                className="inline-flex items-center cursor-pointer p-0.5 rounded hover:bg-white/10 transition-colors"
                                onClick={(e) =>
                                  handleIconClick(
                                    e,
                                    buildNetplaySystemlinkTooltip(netplayGame),
                                  )
                                }
                              >
                                {status.systemlink === "ok" && (
                                  <Link2Icon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#166534",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                                {status.systemlink === "partial" && (
                                  <Unlink2Icon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#CA8A04",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                                {(status.systemlink === "fail" ||
                                  status.systemlink === null) && (
                                  <Link2OffIcon
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    style={
                                      {
                                        color: "#DC2626",
                                      } as React.CSSProperties
                                    }
                                  />
                                )}
                              </button>
                            </>
                          );
                        })()}
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4 align-middle">
                    <span className="text-xs sm:text-sm text-fluent-secondary">
                      <span className="hidden sm:inline">
                        {formatDate(game.updated)}
                      </span>
                      <span className="sm:hidden">
                        {formatDateShort(game.updated)}
                      </span>
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
                <AnimatePresence>
                  {isExpanded && (
                    <motion.tr
                      key={`${game.issue}-expanded`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <td colSpan={6} className="py-0 px-0 align-top">
                        <ExpandedContent
                          isLoading={isLoading}
                          sections={sections}
                          lastModified={
                            getOptimizedGame(game.id)?.last_modified
                          }
                          gameId={game.id}
                          gameTitle={game.title}
                        />
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Click tooltip popover */}
      <AnimatePresence>
        {clickedTooltip &&
          wrapperRef.current &&
          (() => {
            const wrapperRect = wrapperRef.current.getBoundingClientRect();
            const left =
              clickedTooltip.rect.left -
              wrapperRect.left +
              wrapperRef.current.scrollLeft;
            const top = clickedTooltip.rect.bottom - wrapperRect.top + 6;
            return (
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute z-50 px-3 py-2 rounded-lg text-xs text-white shadow-lg border border-white/10 max-w-xs whitespace-pre-wrap pointer-events-auto"
                style={{
                  backgroundColor: "rgba(30, 30, 30, 0.95)",
                  left,
                  top,
                }}
              >
                {clickedTooltip.text}
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </div>
  );
}

function ExpandedContent({
  isLoading,
  sections,
  lastModified,
  gameId,
  gameTitle,
}: {
  isLoading: boolean;
  sections?: SettingSection[];
  lastModified?: string;
  gameId?: string;
  gameTitle?: string;
}) {
  return (
    <div className="overflow-x-auto pr-2 sm:pr-4 pt-4 pb-2">
      {isLoading ? (
        <div className="flex items-center gap-2 py-4">
          <motion.div
            className="w-6 h-6 border-2 border-[var(--color-xbox-green)] border-t-transparent rounded-full flex-shrink-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-fluent-secondary text-sm">
            Loading optimized settings...
          </span>
        </div>
      ) : sections ? (
        <div className="mb-4">
          <TomlDisplay
            sections={sections}
            lastModified={lastModified}
            gameId={gameId}
            gameTitle={gameTitle}
          />
        </div>
      ) : (
        <p className="text-fluent-secondary text-sm pb-4">
          Failed to load settings
        </p>
      )}
    </div>
  );
}
