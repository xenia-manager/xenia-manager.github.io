"use client";

import { REPO_SITE, REPO_X360DB } from "@/lib/constants";

export function X360dbFooter() {
  return (
    <footer className="w-full py-4 px-4 mica-surface backdrop-blur-xl border-t border-[var(--border-color)] border-b-0 border-l-0 border-r-0">
      <div className="max-w-5xl mx-auto space-y-3 text-center">
        <p className="text-fluent-secondary text-xs sm:text-sm">
          Powered by Xenia Manager • Not affiliated with Xenia Team
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm">
          <a
            href={REPO_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xbox-green hover:text-xbox-hover transition-colors link-style"
          >
            Source Code
          </a>
          <span className="text-fluent-secondary hidden sm:inline">•</span>
          <a
            href={REPO_X360DB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xbox-green hover:text-xbox-hover transition-colors link-style"
          >
            Database
          </a>
        </div>
      </div>
    </footer>
  );
}
