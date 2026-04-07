"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { GameCompatibilityFooter } from "@/components/GameCompatibilityFooter";
import GameCompatibilityList from "@/components/GameCompatibilityList";
import StateProgressBar from "@/components/StateProgressBar";

export default function GameCompatibilityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stateCounts, setStateCounts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
          <div className={`mb-4 sm:mb-6 md:mb-8 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-[var(--foreground)]/80 text-sm sm:text-base">
              Browse the compatibility status of Xbox 360 games on Xenia Canary
            </p>
          </div>

          {/* State progress bars */}
          {!isLoading && totalCount > 0 && (
            <div className={`mb-4 sm:mb-6 md:mb-8 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              <StateProgressBar
                stateCounts={stateCounts}
                totalCount={totalCount}
              />
            </div>
          )}

          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <GameCompatibilityList
              onLoadingChange={setIsLoading}
              onStateCountsChange={setStateCounts}
              onTotalCountChange={setTotalCount}
            />
          </div>
        </div>
      </main>
      <GameCompatibilityFooter />
    </>
  );
}
