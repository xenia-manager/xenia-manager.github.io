"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { fadeInUp } from "@/lib/animation";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  margin?: string;
  as?: "div" | "section" | "article";
}

export function ScrollReveal({ children, className, once = true, margin = "-80px", as = "div" }: ScrollRevealProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ once, margin });
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </Component>
  );
}
