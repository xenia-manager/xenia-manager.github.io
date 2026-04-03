import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { XeniaCanaryFooter } from "@/components/XeniaCanaryFooter";
import HeroSection from "@/components/XeniaCanaryHeroSection";
import ReleasesList from "@/components/XeniaCanaryReleasesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xenia Canary - Releases",
};

export default function XeniaCanaryReleasesPage() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <HeroSection />
          <ReleasesList />
        </div>
      </main>
      <XeniaCanaryFooter />
    </>
  );
}
