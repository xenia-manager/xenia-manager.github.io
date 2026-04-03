"use client";

import { useState, useEffect } from "react";
import { OptimizedSettingGame, SettingSection } from "@/lib/types";
import {
  fetchWithFallback,
  FETCH_CONFIGS,
} from "@/lib/fetchWithFallback";
import { fetchOptimizedSettings } from "@/lib/tomlParser";

interface OptimizedSettingsPopupProps {
  onClose: () => void;
}

function OptimizedSettingsPopup({ onClose }: OptimizedSettingsPopupProps) {
  const [games, setGames] = useState<OptimizedSettingGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<OptimizedSettingGame | null>(
    null,
  );
  const [settings, setSettings] = useState<SettingSection[]>([]);
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Handle close
  const handleClose = () => {
    onClose();
  };

  // Fetch optimized settings list
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetchWithFallback(
          FETCH_CONFIGS.optimizedSettingsList,
        );
        const data = await response.json();
        // Sort by last_modified (newest first), then by title (alphabetically)
        const sorted = [...data].sort((a, b) => {
          const dateDiff =
            new Date(b.last_modified).getTime() -
            new Date(a.last_modified).getTime();
          if (dateDiff !== 0) {
            return dateDiff;
          }
          return a.title.localeCompare(b.title);
        });
        setGames(sorted);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load optimized settings",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  // Fetch settings for selected game
  const loadSettings = async (game: OptimizedSettingGame) => {
    setSettingsLoading(true);
    try {
      const fetchedSettings = await fetchOptimizedSettings(game.id);
      if (fetchedSettings) {
        setSettings(fetchedSettings);
        setSelectedGame(game);
      } else {
        setError("Failed to load settings for this game");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Show/hide scrollbar on mount/unmount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-popup-overlay bg-black/70 backdrop-blur-md"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Optimized settings popup"
    >
      <div
        className="glass-card rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-[var(--border-color)] shadow-2xl animate-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-2xl font-bold gradient-text">
              Optimized Settings
            </h2>
            <p className="text-[var(--foreground)]/60 text-sm mt-1">
              Community-driven performance optimizations for {games.length}{" "}
              games
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-[var(--bg-accent)] transition-colors"
            aria-label="Close"
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
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)]">
          {/* Games List */}
          <div
            className={`lg:w-2/5 border-r border-[var(--border-color)] flex flex-col ${selectedGame ? "hidden lg:flex" : "flex"}`}
          >
            {/* Search */}
            <div
              className="border-b border-[var(--border-color)]"
              style={{ height: "64px" }}
            >
              <div className="w-full h-full px-4 flex items-center">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-fluent w-full px-4"
                  style={{ height: "40px" }}
                />
              </div>
            </div>

            {/* Games List */}
            <div className="flex-1 overflow-y-auto p-2">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-pulse text-[var(--foreground)]/60">
                    Loading games...
                  </div>
                </div>
              ) : error ? (
                <div className="text-red-500 p-4 text-center">{error}</div>
              ) : (
                <div className="space-y-1">
                  {filteredGames.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => loadSettings(game)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedGame?.id === game.id
                          ? "bg-[var(--color-xbox-green)]/20 border border-[var(--color-xbox-green)]"
                          : "hover:bg-[var(--bg-accent)] border border-transparent"
                      }`}
                    >
                      <div className="font-medium text-[var(--foreground)]">
                        {game.title}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/50 mt-1 flex items-center gap-2">
                        <span className="font-mono">{game.id}</span>
                        <span>•</span>
                        <span>Updated {formatDate(game.last_modified)}</span>
                      </div>
                    </button>
                  ))}
                  {filteredGames.length === 0 && (
                    <div className="text-center text-[var(--foreground)]/60 p-8">
                      No games found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Settings Display */}
          <div
            className={`lg:w-3/5 flex flex-col ${!selectedGame ? "hidden lg:flex" : "flex"}`}
          >
            {settingsLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-[var(--color-xbox-green)] border-t-transparent rounded-full mx-auto mb-3"></div>
                  <div className="text-[var(--foreground)]/60">
                    Loading settings...
                  </div>
                </div>
              </div>
            ) : selectedGame ? (
              <>
                {/* Mobile back button */}
                <div className="lg:hidden p-4 border-b border-[var(--border-color)]">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="flex items-center gap-2 text-[var(--color-xbox-green)] hover:underline"
                  >
                    <svg
                      className="w-5 h-5"
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
                    Back to games
                  </button>
                </div>

                {/* Settings Header */}
                <div
                  className="border-b border-[var(--border-color)]"
                  style={{ height: "64px" }}
                >
                  <div className="h-full px-4 flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--foreground)]">
                        {selectedGame.title}
                      </h3>
                      <div className="text-sm text-[var(--foreground)]/60 flex items-center justify-between">
                        <span>
                          <span className="font-mono">{selectedGame.id}</span>
                        </span>
                        <span>Last Updated: {formatDate(selectedGame.last_modified)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="font-mono text-sm space-y-4">
                    {settings.map((section, sectionIndex) => (
                      <div key={section.name}>
                        <h4
                          className={`font-bold text-[var(--color-xbox-green)] mb-2 ${
                            sectionIndex === 0 ? "" : "mt-4"
                          }`}
                        >
                          [{section.name}]
                        </h4>
                        <div className="space-y-1.5">
                          {section.entries.map((entry) => (
                            <div
                              key={`${section.name}.${entry.key}`}
                              className="flex items-center gap-2"
                            >
                              <span className="text-[var(--foreground)]">
                                {entry.key} ={" "}
                                <span
                                  className="font-semibold"
                                  style={{
                                    color:
                                      entry.value === "true" ||
                                      entry.value === "false"
                                        ? "var(--color-fluent-accent)"
                                        : /^\d+$/.test(entry.value)
                                          ? "var(--color-xbox-hover)"
                                          : entry.value.startsWith('"')
                                            ? "var(--color-xbox-green)"
                                            : "var(--color-fluent-accent)",
                                  }}
                                >
                                  {entry.value}
                                </span>
                              </span>
                              {entry.comment && (
                                <span className="text-xs italic text-[var(--foreground)]/50">
                                  # {entry.comment}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-[var(--foreground)]/60">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>Select a game to view its optimized settings</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OptimizedSettingsSection() {
  const [gameCount, setGameCount] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch game count on mount
  useEffect(() => {
    async function fetchGameCount() {
      try {
        const response = await fetchWithFallback(
          FETCH_CONFIGS.optimizedSettingsList,
        );
        const data = await response.json();
        const sorted = [...data].sort((a, b) => {
          const dateDiff =
            new Date(b.last_modified).getTime() -
            new Date(a.last_modified).getTime();
          if (dateDiff !== 0) {
            return dateDiff;
          }
          return a.title.localeCompare(b.title);
        });
        setGameCount(sorted.length);
      } catch (err) {
        console.error("Failed to fetch game count:", err);
      }
    }

    fetchGameCount();
  }, []);

  return (
    <>
      <section className="py-16 px-4" id="optimized-settings-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Optimized Settings
          </h2>
          <p className="text-[var(--foreground)]/70 mb-8 max-w-2xl mx-auto">
            Community-driven performance optimizations for your favorite games.
            {gameCount !== null && (
              <span className="block mt-2 text-[var(--color-xbox-green)] font-medium">
                {gameCount} games with optimized configurations available
              </span>
            )}
          </p>
          <a
            href="#optimized-settings"
            className="btn-xbox inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View Optimized Settings
          </a>
        </div>
      </section>
    </>
  );
}

export { OptimizedSettingsPopup };
