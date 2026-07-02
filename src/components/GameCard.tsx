"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { PAGES_X360DB as X360DB_BASE } from "@/lib/constants";
import { ImageWithFallback } from "./ImageWithFallback";

interface GameCardProps {
  id: string;
  title: string;
  boxartUrl: string | null;
  onSelectGame?: (id: string) => void;
}

export const GameCard = memo(function GameCard({
  id,
  title,
  boxartUrl,
  onSelectGame,
}: GameCardProps) {
  const primarySrc = `${X360DB_BASE}/titles/${id}/artwork/boxart.jpg`;

  return (
    <motion.button
      onClick={() => onSelectGame?.(id)}
      title={title}
      className="w-full text-left mica-card rounded-xl overflow-hidden cursor-pointer group focus-indicator flex flex-col"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 290px" }}
      whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(119, 185, 0, 0.25)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative bg-[var(--bg-secondary)] overflow-hidden"
        style={{ paddingBottom: "133.33%" }}
      >
        <ImageWithFallback
          src={primarySrc}
          alt={title}
          fallbackSrc={boxartUrl ?? undefined}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
          fallbackElement={
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-[var(--foreground)]/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xs text-[var(--foreground)]/30 break-words">
                  {title}
                </p>
              </div>
            </div>
          }
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="p-2 sm:p-3 flex-1">
        <p className="text-xs sm:text-sm font-medium text-[var(--foreground)] leading-snug line-clamp-2">
          {title}
        </p>
        <p className="text-[10px] sm:text-xs font-mono text-[var(--foreground)]/40 mt-0.5">
          {id}
        </p>
      </div>
    </motion.button>
  );
});
