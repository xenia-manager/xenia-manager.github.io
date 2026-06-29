"use client";

import { REPO_SITE, GAME_COMPATIBILITY_ISSUES } from "@/lib/constants";
import { DataFooter } from "./DataFooter";

export function GameCompatibilityFooter() {
  return (
    <DataFooter
      links={[
        { href: REPO_SITE, label: "Source Code" },
        { href: GAME_COMPATIBILITY_ISSUES, label: "Source" },
      ]}
    />
  );
}
