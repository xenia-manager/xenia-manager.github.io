/**
 * Fetch configuration with primary and backup URLs
 */
export interface FetchConfig {
  /** Primary URL (GitHub Pages) */
  primary: string;
  /** Backup URL (Raw GitHub) */
  backup: string;
}

/**
 * Predefined fetch configurations for Xenia Manager data sources
 */
import {
  PAGES_DATABASE,
  RAW_DATABASE,
  PAGES_OPTIMIZED_SETTINGS,
  RAW_OPTIMIZED_SETTINGS,
  PAGES_X360DB,
  RAW_X360DB,
} from "@/lib/constants";

export const FETCH_CONFIGS = {
  gameCompatibility: {
    primary: `${PAGES_DATABASE}/data/game-compatibility/canary.json`,
    backup: `${RAW_DATABASE}/data/game-compatibility/canary.json`,
  },
  optimizedSettingsList: {
    primary: `${PAGES_OPTIMIZED_SETTINGS}/data/settings.json`,
    backup: `${RAW_OPTIMIZED_SETTINGS}/data/settings.json`,
  },
  xeniaCanaryReleases: {
    primary: `${PAGES_DATABASE}/data/xenia-releases/canary.json`,
    backup: `${RAW_DATABASE}/data/xenia-releases/canary.json`,
  },
  mousehook: {
    primary: `${PAGES_DATABASE}/data/game-compatibility/mousehook.json`,
    backup: `${RAW_DATABASE}/data/game-compatibility/mousehook.json`,
  },
  netplay: {
    primary: `${PAGES_DATABASE}/data/game-compatibility/netplay.json`,
    backup: `${RAW_DATABASE}/data/game-compatibility/netplay.json`,
  },
} as const;

/**
 * Fetch from a primary URL with fallback to backup URL
 * @param config - Fetch configuration with primary and backup URLs
 * @param init - Optional fetch init options
 * @returns Promise resolving to Response object
 * @throws Error if both primary and backup URLs fail
 */
export async function fetchWithFallback(
  config: FetchConfig,
  init?: RequestInit,
): Promise<Response> {
  try {
    const response = await fetch(config.primary, init);
    if (response.ok) {
      return response;
    }
    // If primary returns 4xx or 5xx, try backup
    console.warn(
      `Primary URL failed with status ${response.status}, trying backup...`,
    );
  } catch (error) {
    console.warn(
      `Primary URL failed: ${error instanceof Error ? error.message : "Unknown error"}, trying backup...`,
    );
  }

  // Try backup URL
  const backupResponse = await fetch(config.backup, init);
  if (!backupResponse.ok) {
    throw new Error(
      `Failed to fetch from both primary and backup URLs (backup status: ${backupResponse.status})`,
    );
  }

  return backupResponse;
}

/**
 * Build settings URL for a specific game with fallback support
 * @param gameId - Game title ID (e.g., "415407D2")
 * @returns Fetch configuration for game settings
 */
export function getSettingsConfig(gameId: string): FetchConfig {
  const upperGameId = gameId.toUpperCase();
  return {
    primary: `${PAGES_OPTIMIZED_SETTINGS}/settings/${upperGameId}.toml`,
    backup: `${RAW_OPTIMIZED_SETTINGS}/settings/${upperGameId}.toml`,
  };
}

export function getX360dbInfoConfig(id: string): FetchConfig {
  const path = `/titles/${id}/info.json`;
  return { primary: `${PAGES_X360DB}${path}`, backup: `${RAW_X360DB}${path}` };
}
