"use client";

import { useState, useEffect, useRef } from "react";
import { STATE_METADATA } from "@/lib/types";

interface StateInfo {
  value: string;
  label: string;
  color: string;
  description: string;
}

const states: StateInfo[] = STATE_METADATA.map(
  ({ value, label, color, description }) => ({
    value,
    label,
    color,
    description,
  }),
);

interface StateProgressBarProps {
  stateCounts: Record<string, number>;
  totalCount: number;
}

export default function StateProgressBar({
  stateCounts,
  totalCount,
}: StateProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const duration = 1200;

  useEffect(() => {
    // Wait for the initial paint/transition to complete
    const paintFrame = requestAnimationFrame(() => {
      startTimeRef.current = null;

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const rawProgress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth deceleration
        setProgress(1 - Math.pow(1 - rawProgress, 3));

        if (rawProgress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(paintFrame);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stateCounts, totalCount]);

  if (totalCount === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl p-3 sm:p-4 mica-card mt-4">
      <div className="flex flex-col gap-2.5">
        {states.map((state) => {
          const count = stateCounts[state.value] ?? 0;
          const animatedCount = Math.round(count * progress);
          const animatedPercentage = (count / totalCount) * 100 * progress;

          return (
            <div key={state.value} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="font-medium text-xs sm:text-sm whitespace-nowrap"
                    style={{ color: state.color }}
                  >
                    {state.label}
                  </span>
                  <span className="text-xs text-fluent-secondary whitespace-nowrap">
                    ({animatedPercentage.toFixed(1)}%)
                  </span>
                </div>
                <span className="text-xs text-fluent-secondary whitespace-nowrap">
                  {animatedCount.toLocaleString()} /{" "}
                  {totalCount.toLocaleString()}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: `${state.color}20` }}
                title={state.description}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${animatedPercentage}%`,
                    backgroundColor: state.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
