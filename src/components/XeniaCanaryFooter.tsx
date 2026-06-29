"use client";

import { REPO_SITE, XENIA_CANARY_RELEASES_URL, XENIA_RELEASES_RELEASES_URL } from "@/lib/constants";
import { DataFooter } from "./DataFooter";

export function XeniaCanaryFooter() {
  return (
    <DataFooter
      links={[
        { href: REPO_SITE, label: "Source Code" },
        { href: XENIA_CANARY_RELEASES_URL, label: "Xenia Canary Main Repository" },
        { href: XENIA_RELEASES_RELEASES_URL, label: "Xenia Canary Releases Repository" },
      ]}
    />
  );
}
