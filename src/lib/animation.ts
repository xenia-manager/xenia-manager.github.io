import type { Variants } from "framer-motion";

export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.6,
  pageTransition: 0.35,
  float: 25,
} as const;

export const easings = {
  default: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easings.default },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.normal, ease: easings.default },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easings.default },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easings.default },
  },
};

export const popupOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.fast, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast, ease: easings.smooth },
  },
};

export const popupContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easings.default },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: durations.fast, ease: easings.smooth },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.pageTransition, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.pageTransition, ease: easings.smooth },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: { duration: durations.fast, ease: easings.smooth },
  },
  whileTap: { scale: 0.98 },
};

export const hoverLift = {
  whileHover: {
    y: -4,
    transition: { duration: durations.fast, ease: easings.smooth },
  },
  whileTap: { y: 0 },
};

export const floatAnimation = (delay: number = 0): Variants => ({
  hidden: { y: 0 },
  visible: {
    y: [-20, 0, -20],
    transition: {
      duration: durations.float,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});
