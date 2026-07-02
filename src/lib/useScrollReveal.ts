"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  once = true,
  margin = "-80px",
}: {
  once?: boolean;
  margin?: string;
} = {}) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once, margin: margin as any });
  return { ref, isInView };
}
