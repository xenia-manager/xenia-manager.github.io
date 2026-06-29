"use client";

import { useEffect } from "react";

export function SmoothScrollEnabler() {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    document.documentElement.classList.add("smooth-scroll");
  }, []);

  return null;
}
