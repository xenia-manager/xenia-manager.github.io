"use client";

import { XeniaCanaryRelease } from "@/lib/xeniaCanaryTypes";

interface XeniaCanaryReleaseCardProps {
  release: XeniaCanaryRelease;
}

export default function XeniaCanaryReleaseCard({
  release,
}: XeniaCanaryReleaseCardProps) {
  const dateFormatted = (() => {
    try {
      const date = new Date(release.published_at);
      if (isNaN(date.getTime())) {
        return "Unknown date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  })();

  const getAssetLabel = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("linux")) return "🐧 Linux";
    return "🪟 Windows";
  };

  return (
    <div
      className="glass-card rounded-xl p-6 shadow-md
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-xbox-green)]/10
                  border border-[var(--border-color)]"
    >
      <div className="text-lg font-semibold mb-3 break-words">
        <a
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-xbox-hover hover:underline transition-colors link-style text-fluent-primary break-words"
        >
          {release.changelog.title || release.tag_name}
        </a>
      </div>

      {release.changelog.changes && (
        <div className="text-sm mb-4 whitespace-pre-wrap p-3 rounded-lg bg-[var(--bg-accent)] text-fluent-secondary break-words overflow-wrap-anywhere">
          {release.changelog.changes}
        </div>
      )}

      <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
        <div className="text-xbox-green font-medium min-w-0 flex items-center">
          <a
            href={release.commit_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-xbox-hover hover:underline transition-colors link-style truncate"
          >
            <code
              className="px-3 py-1 rounded-md text-sm font-mono bg-[var(--bg-accent)] text-fluent-primary block truncate max-w-[468px]"
              title={release.target_commitish}
            >
              {release.target_commitish}
            </code>
          </a>
        </div>
        <div className="text-sm flex items-center gap-2 px-3 py-1.5 rounded-lg mica-surface text-fluent-primary">
          <span className="text-xbox-green">📅</span>
          <span className="font-medium">{dateFormatted}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {release.assets.map((asset, index) => (
          <a
            key={index}
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 px-4 btn-xbox rounded-lg
                       transition-all duration-200 min-w-[140px] flex items-center justify-center gap-2"
          >
            <span>{getAssetLabel(asset.name)}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
