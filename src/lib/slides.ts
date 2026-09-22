interface Slide {
  src: string;
  title: string;
  description: string;
}

import { SCREENSHOTS_BASE } from "@/lib/constants";

export const slides: Slide[] = [
  {
    src: `${SCREENSHOTS_BASE}/Library_Main.png`,
    title: "Game Library",
    description: "Browse and manage your Xbox 360 game collection",
  },
  {
    src: `${SCREENSHOTS_BASE}/Library_Options.png`,
    title: "Library Options",
    description: "Customize your library view and settings",
  },
  {
    src: `${SCREENSHOTS_BASE}/Library_Right_Click.png`,
    title: "Game Context Menu",
    description: "Quick access to game-specific actions and settings",
  },
  {
    src: `${SCREENSHOTS_BASE}/Content_Viewer_Achievements.png`,
    title: "Content Viewer - Achievements",
    description: "Browse achievements for your games",
  },
  {
    src: `${SCREENSHOTS_BASE}/Content_Viewer_Marketplace.png`,
    title: "Content Viewer - Marketplace",
    description: "Browse and download marketplace content",
  },
  {
    src: `${SCREENSHOTS_BASE}/Content_Viewer_Saved_Games.png`,
    title: "Content Viewer - Saved Games",
    description: "Manage your save data",
  },
  {
    src: `${SCREENSHOTS_BASE}/Content_Viewer_Title_Updates.png`,
    title: "Content Viewer - Title Updates",
    description: "Manage DLC, game updates, and save data",
  },
  {
    src: `${SCREENSHOTS_BASE}/Patch_Downloader.png`,
    title: "Patch Downloader",
    description: "Download and install game patches easily",
  },
  {
    src: `${SCREENSHOTS_BASE}/Patch_Configurator.png`,
    title: "Patch Configurator",
    description: "Configure and customize game patches",
  },
  {
    src: `${SCREENSHOTS_BASE}/Game_Details_Editor.png`,
    title: "Game Details Editor",
    description: "Edit game metadata and information",
  },
  {
    src: `${SCREENSHOTS_BASE}/Game_Settings_Editor.png`,
    title: "Game Settings Editor",
    description: "Fine-tune per-game configuration settings",
  },
  {
    src: `${SCREENSHOTS_BASE}/Mousehook_Editor.png`,
    title: "Mousehook Controls",
    description: "Configure mouse and keyboard controls",
  },
  {
    src: `${SCREENSHOTS_BASE}/Xenia_Settings.png`,
    title: "Xenia Settings",
    description: "Comprehensive emulator configuration options",
  },
  {
    src: `${SCREENSHOTS_BASE}/Xenia_Settings_Optimized.png`,
    title: "Optimized Settings",
    description: "Community-driven performance optimizations",
  },
  {
    src: `${SCREENSHOTS_BASE}/Manage_Xenia.png`,
    title: "Manage Xenia",
    description: "Switch between Xenia builds and versions",
  },
  {
    src: `${SCREENSHOTS_BASE}/Install_Content.png`,
    title: "Install Content",
    description: "Install DLC and game updates seamlessly",
  },
  {
    src: `${SCREENSHOTS_BASE}/Manage_Profiles.png`,
    title: "Manage Profiles",
    description: "Import, export, and edit Xenia profiles",
  },
  {
    src: `${SCREENSHOTS_BASE}/Manager_Settings.png`,
    title: "Manager Settings",
    description: "Configure Xenia Manager preferences",
  },
  {
    src: `${SCREENSHOTS_BASE}/About_Page.png`,
    title: "About Page",
    description: "Learn about Xenia Manager and contributors",
  },
];
