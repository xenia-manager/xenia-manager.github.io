export interface Slide {
  src: string;
  title: string;
  description: string;
}

import { SCREENSHOTS_BASE } from "@/lib/constants";

export const slides: Slide[] = [
  {
    src: `${SCREENSHOTS_BASE}/1.%20Library.png`,
    title: "Game Library",
    description: "Browse and manage your Xbox 360 game collection",
  },
  {
    src: `${SCREENSHOTS_BASE}/2.%20Library%20Options.png`,
    title: "Library Options",
    description: "Customize your library view and settings",
  },
  {
    src: `${SCREENSHOTS_BASE}/3.%20Library%20Game%20Right%20Click.png`,
    title: "Game Context Menu",
    description: "Quick access to game-specific actions and settings",
  },
  {
    src: `${SCREENSHOTS_BASE}/4.%20Content%20Viewer.png`,
    title: "Content Viewer",
    description: "Manage DLC, game updates, and save data",
  },
  {
    src: `${SCREENSHOTS_BASE}/5.%20Patch%20Downloader.png`,
    title: "Patch Downloader",
    description: "Download and install game patches easily",
  },
  {
    src: `${SCREENSHOTS_BASE}/6.%20Patch%20Configurator.png`,
    title: "Patch Configurator",
    description: "Configure and customize game patches",
  },
  {
    src: `${SCREENSHOTS_BASE}/7.%20Game%20Details%20Editor.png`,
    title: "Game Details Editor",
    description: "Edit game metadata and information",
  },
  {
    src: `${SCREENSHOTS_BASE}/8.%20Game%20Settings%20Editor.png`,
    title: "Game Settings Editor",
    description: "Fine-tune per-game configuration settings",
  },
  {
    src: `${SCREENSHOTS_BASE}/9.%20Mousehook%20Controls%20Editor.png`,
    title: "Mousehook Controls",
    description: "Configure mouse and keyboard controls",
  },
  {
    src: `${SCREENSHOTS_BASE}/10.%20Xenia%20Settings.png`,
    title: "Xenia Settings",
    description: "Comprehensive emulator configuration options",
  },
  {
    src: `${SCREENSHOTS_BASE}/11.%20Xenia%20Settings%20-%20Optimized%20Settings.png`,
    title: "Optimized Settings",
    description: "Community-driven performance optimizations",
  },
  {
    src: `${SCREENSHOTS_BASE}/12.%20Manage%20Xenia.png`,
    title: "Manage Xenia",
    description: "Switch between Xenia builds and versions",
  },
  {
    src: `${SCREENSHOTS_BASE}/13.%20Install%20Content.png`,
    title: "Install Content",
    description: "Install DLC and game updates seamlessly",
  },
  {
    src: `${SCREENSHOTS_BASE}/14.%20Manage%20Profiles.png`,
    title: "Manage Profiles",
    description: "Import, export, and edit Xenia profiles",
  },
  {
    src: `${SCREENSHOTS_BASE}/15.%20Manager%20Settings.png`,
    title: "Manager Settings",
    description: "Configure Xenia Manager preferences",
  },
  {
    src: `${SCREENSHOTS_BASE}/16.%20About%20Page.png`,
    title: "About Page",
    description: "Learn about Xenia Manager and contributors",
  },
];
