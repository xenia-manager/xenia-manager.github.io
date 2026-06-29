"use client";

import { REPO_SITE, REPO_X360DB } from "@/lib/constants";
import { DataFooter } from "./DataFooter";

export function X360dbFooter() {
  return (
    <DataFooter
      links={[
        { href: REPO_SITE, label: "Source Code" },
        { href: REPO_X360DB, label: "Database" },
      ]}
    />
  );
}
