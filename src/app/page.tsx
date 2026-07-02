import { Header } from "@/components/Header";
import { BackgroundLayers } from "@/components/BackgroundLayers";
import { HeroSection } from "@/components/HeroSection";
import { DownloadSection } from "@/components/DownloadSection";
import { QuickstartSection } from "@/components/QuickstartSection";
import { ContributingSection } from "@/components/ContributingSection";
import { CommunitySection } from "@/components/CommunitySection";
import { TranslationProgressSection } from "@/components/TranslationProgressSection";
import { Footer } from "@/components/Footer";
import { HomeClientArea } from "@/components/HomeClientArea";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1" role="main">
        <HeroSection />
        <ScrollReveal as="section">
          <HomeClientArea />
        </ScrollReveal>
        <ScrollReveal as="section">
          <DownloadSection />
        </ScrollReveal>
        <ScrollReveal as="section">
          <QuickstartSection />
        </ScrollReveal>
        <ScrollReveal as="section">
          <ContributingSection />
        </ScrollReveal>
        <ScrollReveal as="section">
          <CommunitySection />
        </ScrollReveal>
        <ScrollReveal as="section">
          <TranslationProgressSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
