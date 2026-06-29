"use client";

import { useEffect } from "react";

export default function GamesDatabaseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl max-w-md w-full p-8 text-center border border-[var(--border-color)]">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Failed to load game database
        </h2>
        <p className="text-[var(--foreground)]/60 text-sm mb-6">
          Could not load the Xbox 360 game database. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-xbox px-6 py-2 rounded-lg text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
