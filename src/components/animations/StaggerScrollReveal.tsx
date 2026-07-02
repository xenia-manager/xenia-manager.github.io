"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { ReactNode } from "react";

interface StaggerScrollRevealProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  margin?: string;
  staggerDelay?: number;
  delay?: number;
}

export function StaggerScrollReveal({ children, className, once = true, margin = "-80px", staggerDelay = 0.08, delay = 0.1 }: StaggerScrollRevealProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ once, margin });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerScrollItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
