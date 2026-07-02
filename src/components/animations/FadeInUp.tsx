"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation";
import type { ReactNode } from "react";

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

export function FadeInUp({ children, delay = 0, className, as = "div" }: FadeInUpProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
