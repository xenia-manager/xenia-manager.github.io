"use client";

import { STATE_METADATA, getStateIcon } from "@/lib/types";
import {
  MouseIcon,
  GlobeCheckIcon,
  EthernetPortIcon,
  Link2Icon,
} from "./Icons";

interface StateFilter {
  value: string;
  label: string;
  color: string;
  description: string;
}

const stateFilters: StateFilter[] = [
  {
    value: "",
    label: "All",
    color: "#0078d4",
    description: "Shows all games regardless of state",
  },
  ...STATE_METADATA.map(({ value, label, color, description }) => ({
    value,
    label,
    color,
    description,
  })),
];

interface StateFilterBarProps {
  stateFilter: string;
  onStateFilterChange: (value: string) => void;
  stateCounts: Record<string, number>;
  optimizedCount: number;
  showOptimizedOnly: boolean;
  onShowOptimizedOnlyChange: (value: boolean) => void;
  mousehookCount: number;
  showMousehookOnly: boolean;
  onShowMousehookOnlyChange: (value: boolean) => void;
  netplayCount: number;
  showNetplayOnly: boolean;
  onShowNetplayOnlyChange: (value: boolean) => void;
  netplayFilterPublic: boolean;
  onNetplayFilterPublicChange: (value: boolean) => void;
  netplayFilterLocal: boolean;
  onNetplayFilterLocalChange: (value: boolean) => void;
  netplayFilterSystemlink: boolean;
  onNetplayFilterSystemlinkChange: (value: boolean) => void;
}

export function StateFilterBar({
  stateFilter,
  onStateFilterChange,
  stateCounts,
  optimizedCount,
  showOptimizedOnly,
  onShowOptimizedOnlyChange,
  mousehookCount,
  showMousehookOnly,
  onShowMousehookOnlyChange,
  netplayCount,
  showNetplayOnly,
  onShowNetplayOnlyChange,
  netplayFilterPublic,
  onNetplayFilterPublicChange,
  netplayFilterLocal,
  onNetplayFilterLocalChange,
  netplayFilterSystemlink,
  onNetplayFilterSystemlinkChange,
}: StateFilterBarProps) {
  return (
    <>
      {/* Row 1: State filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {stateFilters.map((filter) => {
          const isSelected = stateFilter === filter.value;
          const bgColor = isSelected ? filter.color : `${filter.color}20`;
          const textColor = isSelected ? "#000000" : filter.color;
          const borderColor = `${filter.color}60`;
          const count = stateCounts[filter.value] ?? 0;
          const icon = filter.value === "" ? "⋯" : getStateIcon(filter.value);

          return (
            <button
              key={filter.value || "all"}
              onClick={() => onStateFilterChange(filter.value)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
                isSelected ? "scale-105 shadow-lg" : "hover:scale-105"
              }`}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: borderColor,
                borderWidth: "1px",
              }}
              title={filter.description}
            >
              <span className="text-[10px] sm:text-xs">{icon}</span>
              {filter.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? "bg-black/20" : "bg-black/10"
                }`}
                style={{ color: isSelected ? "#000000" : filter.color }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Row 2: Feature toggles */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Optimized Settings toggle */}
        <button
          onClick={() => onShowOptimizedOnlyChange(!showOptimizedOnly)}
          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
            showOptimizedOnly
              ? "bg-[#107c10] text-white border-[#107c10] shadow-lg scale-105"
              : "bg-[var(--bg-secondary)] text-fluent-secondary border-gray-700 hover:bg-[var(--hover-bg)]"
          }`}
          title="Show only games that have optimized emulator settings available"
        >
          <span className="text-[10px] sm:text-xs">⚙</span>
          <span>Optimized Settings</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              showOptimizedOnly ? "bg-white/20" : "bg-black/10"
            }`}
            style={{
              color: showOptimizedOnly ? "#ffffff" : "var(--text-secondary)",
            }}
          >
            {optimizedCount}
          </span>
        </button>

        {/* Mousehook toggle */}
        <button
          onClick={() => onShowMousehookOnlyChange(!showMousehookOnly)}
          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
            showMousehookOnly
              ? "bg-[#CA8A04] text-white border-[#CA8A04] shadow-lg scale-105"
              : "bg-[var(--bg-secondary)] text-fluent-secondary border-gray-700 hover:bg-[var(--hover-bg)]"
          }`}
          title="Show only games that have mousehook support"
        >
          <MouseIcon
            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            style={{ color: "currentColor" }}
          />
          <span>Mousehook</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              showMousehookOnly ? "bg-white/20" : "bg-black/10"
            }`}
            style={{
              color: showMousehookOnly ? "#ffffff" : "var(--text-secondary)",
            }}
          >
            {mousehookCount}
          </span>
        </button>

        {/* Netplay toggle */}
        <button
          onClick={() => onShowNetplayOnlyChange(!showNetplayOnly)}
          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
            showNetplayOnly
              ? "bg-[#0078d4] text-white border-[#0078d4] shadow-lg scale-105"
              : "bg-[var(--bg-secondary)] text-fluent-secondary border-gray-700 hover:bg-[var(--hover-bg)]"
          }`}
          title="Show only games that have netplay support"
        >
          <GlobeCheckIcon
            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            style={{ color: "currentColor" }}
          />
          <span>Netplay</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              showNetplayOnly ? "bg-white/20" : "bg-black/10"
            }`}
            style={{
              color: showNetplayOnly ? "#ffffff" : "var(--text-secondary)",
            }}
          >
            {netplayCount}
          </span>
        </button>
      </div>

      {/* Row 3: Netplay sub-filters (only when netplay is enabled) */}
      {showNetplayOnly && (
        <div className="flex flex-wrap items-center gap-2 mb-3 pl-2 border-l-2 border-[#0078d4]/30">
          <span className="text-[10px] sm:text-xs text-fluent-secondary mr-1">
            Filter by:
          </span>

          <button
            onClick={() => onNetplayFilterPublicChange(!netplayFilterPublic)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
              netplayFilterPublic
                ? "bg-[#0078d4] text-white border-[#0078d4] shadow-md scale-105"
                : "bg-[var(--bg-secondary)] text-fluent-secondary border-gray-700 hover:bg-[var(--hover-bg)]"
            }`}
            title="Show only games with public/online multiplayer support"
          >
            <GlobeCheckIcon
              className="w-2.5 h-2.5 sm:w-3 sm:h-3"
              style={{ color: "currentColor" }}
            />
            Public Online
          </button>

          <button
            onClick={() => onNetplayFilterLocalChange(!netplayFilterLocal)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
              netplayFilterLocal
                ? "bg-[#0078d4] text-white border-[#0078d4] shadow-md scale-105"
                : "bg-[var(--bg-secondary)] text-fluent-secondary border-gray-700 hover:bg-[var(--hover-bg)]"
            }`}
            title="Show only games with local multiplayer support"
          >
            <EthernetPortIcon
              className="w-2.5 h-2.5 sm:w-3 sm:h-3"
              style={{ color: "currentColor" }}
            />
            Local
          </button>

          <button
            onClick={() =>
              onNetplayFilterSystemlinkChange(!netplayFilterSystemlink)
            }
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
              netplayFilterSystemlink
                ? "bg-[#0078d4] text-white border-[#0078d4] shadow-md scale-105"
                : "bg-[var(--bg-secondary)] text-fluent-secondary border-gray-700 hover:bg-[var(--hover-bg)]"
            }`}
            title="Show only games with systemlink/LAN support"
          >
            <Link2Icon
              className="w-2.5 h-2.5 sm:w-3 sm:h-3"
              style={{ color: "currentColor" }}
            />
            Systemlink
          </button>
        </div>
      )}
    </>
  );
}
