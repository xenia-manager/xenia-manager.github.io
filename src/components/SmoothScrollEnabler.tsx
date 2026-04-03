"use client";

import { useEffect } from "react";

export function SmoothScrollEnabler() {
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    // This allows native hash navigation (like #optimized-settings) to work
    if (!window.location.hash) {
      window.scrollTo(0, 0);

      // Disable browser scroll restoration only when there's no hash
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }

    // Enable smooth scroll after initial render for user interactions
    document.documentElement.classList.add("smooth-scroll");
  }, []);

  return null;
}
