"use client";

import { motion } from "framer-motion";
import { REPO_GAME_PATCHES, WEBSERVICES_URL, OPTIMIZED_SETTINGS_CONTRIB_URL } from "@/lib/constants";
import { LightningIcon, RefreshIcon, SettingsIcon, FolderIcon, ShoppingBagIcon, PuzzleIcon, PlayIcon, MagicIcon, CopyIcon, EyeIcon } from "./Icons";
import { StaggerScrollReveal, StaggerScrollItem } from "@/components/animations/StaggerScrollReveal";

interface FeaturesSectionProps {
  onOpenOptimizedSettings?: () => void;
}

export function FeaturesSection({
  onOpenOptimizedSettings,
}: FeaturesSectionProps) {
  const handleOpenPopup = () => {
    onOpenOptimizedSettings?.();
    window.location.hash = "#optimized-settings";
  };

  const features = [
    {
      icon: <LightningIcon className="w-8 h-8" />,
      title: "1-Click Setup",
      description: "Easy setup for Xenia with automatic profile creation.",
    },
    {
      icon: <RefreshIcon className="w-8 h-8" />,
      title: "Automatic Updater",
      description:
        "Stay up-to-date with the latest Xenia builds automatically.",
    },
    {
      icon: <SettingsIcon className="w-8 h-8" />,
      title: "Game Patches",
      description: (
        <>
          Support for{" "}
          <a
            href={REPO_GAME_PATCHES}
            className="text-[var(--color-xbox-green)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Canary
          </a>{" "}
          &{" "}
          <a
            href={WEBSERVICES_URL}
            className="text-[var(--color-xbox-green)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netplay
          </a>{" "}
          patches.
        </>
      ),
    },
    {
      icon: <FolderIcon className="w-8 h-8" />,
      title: "DLC & Updates",
      description:
        "Easy management of DLC and game updates without launching Xenia.",
    },
    {
      icon: <ShoppingBagIcon className="w-8 h-8" />,
      title: "Profile Management",
      description:
        "Import, export, and edit Xenia profiles with automatic save backups.",
    },
    {
      icon: <PuzzleIcon className="w-8 h-8" />,
      title: "Per-Game Profiles",
      description:
        "Custom configuration profiles for each game in your library.",
    },
    {
      icon: <SettingsIcon className="w-8 h-8" />,
      title: "Dynamic Settings UI",
      description: "Automatically adapts to Xenia's config file structure.",
    },
    {
      icon: <PlayIcon className="w-8 h-8" />,
      title: "Steam Shortcuts",
      description: "Creates Steam shortcuts with full artwork support.",
    },
    {
      icon: <MagicIcon className="w-8 h-8" />,
      title: "Input Listener",
      description:
        "Cross-platform keyboard/mouse input detection using Avalonia.",
    },
    {
      icon: <CopyIcon className="w-8 h-8" />,
      title: "Save Management",
      description: "Import/export game saves with XUID-based backup system.",
    },
    {
      icon: <LightningIcon className="w-8 h-8" />,
      title: "Low Resource Usage",
      description: "On-demand loading and caching for optimal performance.",
    },
  ];

  const optimizedSettingsFeature = {
    icon: <EyeIcon className="w-8 h-8" />,
    title: "Optimized Settings",
    description: "Community-driven optimized settings for better performance.",
  };

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Main Features
          </h2>
          <StaggerScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <StaggerScrollItem key={index}>
                <motion.div
                  className="glass-card rounded-2xl p-6 border border-[var(--border-color)] flex flex-col h-full"
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(119, 185, 0, 0.2)" }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--foreground)]/70 leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerScrollItem>
            ))}
          </StaggerScrollReveal>

          <div className="mt-6">
            <motion.div
              className="glass-card rounded-2xl p-8 border border-[var(--border-color)] flex flex-col items-center text-center cursor-pointer"
              onClick={handleOpenPopup}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(119, 185, 0, 0.2)" }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white mb-4">
                {optimizedSettingsFeature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
                {optimizedSettingsFeature.title}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed max-w-2xl mb-4">
                {optimizedSettingsFeature.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    className="btn-xbox inline-flex items-center gap-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenPopup();
                    }}
                  >
                    <EyeIcon className="w-5 h-5" />
                    View Optimized Settings
                  </button>
                  <a
                    href={OPTIMIZED_SETTINGS_CONTRIB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-xbox btn-xbox-secondary inline-flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Contributing Guide
                  </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

