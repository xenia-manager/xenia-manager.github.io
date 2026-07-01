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

export default function Home() {
  return (
    <>
      <Header />
      <BackgroundLayers />
      <main className="flex-1" role="main">
        <div className="fade-in-up" style={{ animationDelay: "0ms" }}>
          <HeroSection />
        </div>
        <HomeClientArea />
        <div className="fade-in-up" style={{ animationDelay: "200ms" }}>
          <DownloadSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "300ms" }}>
          <QuickstartSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "500ms" }}>
          <ContributingSection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "600ms" }}>
          <CommunitySection />
        </div>
        <div className="fade-in-up" style={{ animationDelay: "700ms" }}>
          <TranslationProgressSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
