/**
 * Game compatibility data structure from Xenia Canary repository
 */
export interface GameCompatibility {
  /** GitHub issue number for the game */
  issue: number;
  /** Game title ID (e.g., "415407D2") */
  id: string;
  /** Full game title */
  title: string;
  /** Last update timestamp (ISO 8601) */
  updated: string;
  /** Compatibility state: Playable, Gameplay, Loads, Unplayable, or Unknown */
  state: string;
  /** Additional labels/tags from GitHub */
  labels: string[];
  /** GitHub issue URL */
  url: string;
}

/**
 * Optimized settings game entry
 */
export interface OptimizedSettingGame {
  /** Game title ID */
  id: string;
  /** Game title */
  title: string;
  /** Last modified timestamp (ISO 8601) */
  last_modified: string;
}

/**
 * Parsed TOML setting entry
 */
export interface SettingEntry {
  /** Setting key name */
  key: string;
  /** Setting value */
  value: string;
  /** Optional comment/description */
  comment?: string;
}

/**
 * TOML section with multiple entries
 */
export interface SettingSection {
  /** Section name (e.g., "GPU", "APU") */
  name: string;
  /** List of settings in this section */
  entries: SettingEntry[];
}

/**
 * Compatibility states in display order (best to worst)
 */
export const STATE_ORDER = [
  "Playable",
  "Gameplay",
  "Loads",
  "Unplayable",
  "Unknown",
] as const;

export type CompatibilityState = (typeof STATE_ORDER)[number];

export interface StateMetadata {
  value: CompatibilityState;
  label: string;
  color: string;
  description: string;
  icon: string;
}

export const STATE_METADATA: StateMetadata[] = [
  {
    value: "Playable",
    label: "Playable",
    color: "#166534",
    description: "Game working from start to finish with minor issues",
    icon: "✓",
  },
  {
    value: "Gameplay",
    label: "Gameplay",
    color: "#65A30D",
    description:
      "You can get into the game, but it's not known to have been finished but possibly could be",
    icon: "\u25B6\uFE0E",
  },
  {
    value: "Loads",
    label: "Loads",
    color: "#CA8A04",
    description: "Games that boot but don't reach gameplay",
    icon: "⏻",
  },
  {
    value: "Unplayable",
    label: "Unplayable",
    color: "#DC2626",
    description: "Games that crash or have major issues",
    icon: "✕",
  },
  {
    value: "Unknown",
    label: "Unknown",
    color: "#737373",
    description: "Games that haven't been tested yet",
    icon: "?",
  },
];

/**
 * Get metadata for a specific compatibility state
 * @param state - The compatibility state string
 * @returns StateMetadata object or default (Unknown) if not found
 */
export function getStateMetadata(state: string): StateMetadata {
  return (
    STATE_METADATA.find((s) => s.value === state) ??
    STATE_METADATA.find((s) => s.value === "Unknown")!
  );
}

/**
 * Get display color for a compatibility state
 * @param state - The compatibility state string
 * @returns Hex color string
 */
export function getStateColor(state: string): string {
  return getStateMetadata(state).color;
}

/**
 * Get display label for a compatibility state
 * @param state - The compatibility state string
 * @returns Display label string
 */
export function getStateLabel(state: string): string {
  return getStateMetadata(state).label;
}

/**
 * Get description for a compatibility state
 * @param state - The compatibility state string
 * @returns Description string
 */
export function getStateDescription(state: string): string {
  return getStateMetadata(state).description;
}

/**
 * Get icon character for a compatibility state
 * @param state - The compatibility state string
 * @returns Icon character string
 */
export function getStateIcon(state: string): string {
  return getStateMetadata(state).icon;
}

/**
 * Get numeric sort value for a compatibility state
 * Lower values = better compatibility
 * @param state - The compatibility state string
 * @returns Numeric value for sorting (0 = Playable, 4 = Unknown)
 */
export function getStateSortValue(state: string): number {
  const index = STATE_ORDER.indexOf(state as CompatibilityState);
  return index === -1 ? STATE_ORDER.length : index;
}

export function sortOptimizedSettings(
  games: OptimizedSettingGame[],
): OptimizedSettingGame[] {
  return [...games].sort((a, b) => {
    const dateDiff =
      new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.title.localeCompare(b.title);
  });
}

// === Mousehook ===

export type MousehookSupport = "Good" | "Fair" | "Poor";

export interface MousehookGame {
  id: string | string[];
  title: string;
  mouse_support: MousehookSupport;
  supported_versions: string;
  notes: string;
}

export interface MousehookMetadata {
  support: MousehookSupport;
  color: string;
  description: string;
}

export const MOUSEHOOK_METADATA: Record<MousehookSupport, MousehookMetadata> = {
  Good: {
    support: "Good",
    color: "#166534",
    description: "Mousehook works well with minor or no issues",
  },
  Fair: {
    support: "Fair",
    color: "#CA8A04",
    description: "Mousehook works but with noticeable issues",
  },
  Poor: {
    support: "Poor",
    color: "#DC2626",
    description: "Mousehook has significant issues",
  },
};

export function getMousehookColor(support: string): string {
  return MOUSEHOOK_METADATA[support as MousehookSupport]?.color ?? "#737373";
}

// === Netplay ===

export type NetplayStatusValue = "ok" | "partial" | "fail";

export interface NetplayStatus {
  working_public: NetplayStatusValue | null;
  tested_locally: NetplayStatusValue | null;
  only_local: "ok" | null;
  systemlink: NetplayStatusValue | null;
}

export interface NetplayLink {
  text: string;
  url: string;
}

export interface NetplayGame {
  id: string;
  title: string;
  status: NetplayStatus;
  comments: string;
  links: NetplayLink[];
}
