"use client";

import { SettingSection } from "@/lib/types";
import { getOutdatedSettingsIssueUrl } from "@/lib/github";

interface TomlDisplayProps {
  sections: SettingSection[];
  lastModified?: string;
  gameId?: string;
  gameTitle?: string;
}

export default function TomlDisplay({
  sections,
  lastModified,
  gameId,
  gameTitle,
}: TomlDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getValueColor = (value: string) => {
    // Boolean values
    if (value === "true" || value === "false") {
      return "var(--color-fluent-accent)";
    }
    // Numeric values
    if (/^\d+$/.test(value)) {
      return "var(--color-xbox-hover)";
    }
    // String values (quoted)
    if (value.startsWith('"') && value.endsWith('"')) {
      return "var(--color-xbox-green)";
    }
    // Default for other values (like "new", "full", etc.)
    return "var(--color-fluent-accent)";
  };

  return (
    <div className="font-mono text-sm rounded-xl overflow-hidden border backdrop-blur-xl mica-surface border-[var(--border-color)]">
      <div className="p-4 pt-3">
        {sections.map((section, sectionIndex) => (
          <div key={section.name} className="space-y-1.5">
            <h4 className={`font-bold ${sectionIndex === 0 ? "mt-0" : "mt-3"} text-xbox-green`}>
              [{section.name}]
            </h4>
            {section.entries.map((entry) => (
              <div
                key={`${section.name}.${entry.key}`}
                className="flex items-center gap-2"
              >
                <span className="text-fluent-primary">
                  {entry.key} ={" "}
                  <span
                    className="font-semibold"
                    style={{ color: getValueColor(entry.value) }}
                  >
                    {entry.value}
                  </span>
                </span>
                {entry.comment && (
                  <span className="text-xs italic text-fluent-secondary">
                    # {entry.comment}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
        {lastModified && (
          <div className="flex items-center justify-between text-xs pt-2 mt-2 border-t border-[var(--border-color)] text-fluent-secondary">
            <span>
              {gameId && gameTitle && (
                <a
                  href={getOutdatedSettingsIssueUrl(gameId, gameTitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[var(--color-xbox-green)] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Report outdated settings
                </a>
              )}
            </span>
            <span>Last Updated: {formatDate(lastModified)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
