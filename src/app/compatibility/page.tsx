import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { GameCompatibilityFooter } from "@/components/GameCompatibilityFooter";
import GameCompatibilityList from "@/components/GameCompatibilityList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xenia Canary - Compatibility",
};

export default function GameCompatibilityPage() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
          <div className="mb-4 sm:mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <p className="text-[var(--foreground)]/80 text-sm sm:text-base">
              Browse the compatibility status of Xbox 360 games on Xenia Canary
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <GameCompatibilityList />
          </div>
        </div>
      </main>
      <GameCompatibilityFooter />
    </>
  );
}
