"use client";

import { motion } from "framer-motion";

interface LoadingErrorOverlayProps {
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
  skeleton?: React.ReactNode;
}

function Spinner() {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-[var(--color-xbox-green)] border-t-transparent rounded-full mb-4"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function LoadingErrorOverlay({
  loading,
  error,
  skeleton,
}: LoadingErrorOverlayProps) {
  if (!loading && !error) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl mica-card">
      {loading ? (
        skeleton ?? (
          <div className="flex flex-col items-center justify-center">
            <Spinner />
            <div className="text-fluent-secondary text-lg">Loading...</div>
          </div>
        )
      ) : error ? (
        <div className="rounded-2xl p-8 mica-card w-full max-w-lg mx-4">
          <div className="notification notification-error">
            <span className="text-xl">&#9888;&#65039;</span>
            <div>
              <h3 className="font-semibold">Error loading data</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
