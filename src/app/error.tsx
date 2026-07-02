"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FadeInUp } from "@/components/animations/FadeInUp";

export default function Error({
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
    <FadeInUp className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl max-w-md w-full p-8 text-center border border-[var(--border-color)]">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Something went wrong
        </h2>
        <p className="text-[var(--foreground)]/60 text-sm mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-xbox px-6 py-2 rounded-lg text-sm"
          >
            Try again
          </button>
          <Link
            href="/"
            className="btn-xbox-secondary px-6 py-2 rounded-lg text-sm inline-block text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </FadeInUp>
  );
}
