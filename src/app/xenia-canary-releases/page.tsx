"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { XeniaCanaryFooter } from "@/components/XeniaCanaryFooter";
import { XeniaCanaryHeroSection as HeroSection } from "@/components/XeniaCanaryHeroSection";
import { XeniaCanaryReleasesList as ReleasesList } from "@/components/XeniaCanaryReleasesList";

export default function XeniaCanaryReleasesPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <HeroSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <ReleasesList onLoadingChange={setIsLoading} />
          </motion.div>
        </div>
      </main>
      <XeniaCanaryFooter />
    </>
  );
}
