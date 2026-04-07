"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { XeniaCanaryFooter } from "@/components/XeniaCanaryFooter";
import HeroSection from "@/components/XeniaCanaryHeroSection";
import ReleasesList from "@/components/XeniaCanaryReleasesList";

export default function XeniaCanaryReleasesPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <HeroSection />
          </div>
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <ReleasesList onLoadingChange={setIsLoading} />
          </div>
        </div>
      </main>
      <XeniaCanaryFooter />
    </>
  );
}
