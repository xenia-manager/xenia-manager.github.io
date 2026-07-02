"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

function AnimatedOrb({
  className,
  style,
  amplitude = 20,
  period = 25000,
  phase = 0,
}: {
  className?: string;
  style?: React.CSSProperties;
  amplitude?: number;
  period?: number;
  phase?: number;
}) {
  const y = useRef(0);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    const step = (delta / period) * amplitude * 4;
    y.current += step * direction.current;
    if (Math.abs(y.current) > amplitude) {
      y.current = amplitude * Math.sign(y.current);
      direction.current *= -1;
    }
  });

  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration: period / 1000,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
      }}
    />
  );
}

export function BackgroundLayers() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 mica-layer" />

      <AnimatedOrb
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(119, 185, 0, 0.3) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
        }}
        amplitude={20}
        period={25000}
        phase={0}
      />
      <AnimatedOrb
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 124, 16, 0.3) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
        }}
        amplitude={20}
        period={25000}
        phase={2}
      />
      <AnimatedOrb
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(140, 198, 62, 0.3) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        amplitude={15}
        period={25000}
        phase={4}
      />
    </div>
  );
}
