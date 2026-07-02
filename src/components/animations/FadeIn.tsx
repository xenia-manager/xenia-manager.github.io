"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span";
}

export function FadeIn({ children, delay = 0, className, as = "div" }: FadeInProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
