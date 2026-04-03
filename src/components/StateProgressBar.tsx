"use client";

interface StateInfo {
  value: string;
  label: string;
  color: string;
  description: string;
}

const states: StateInfo[] = [
  {
    value: "Playable",
    label: "Playable",
    color: "#166534",
    description: "Game working from start to finish with minor issues",
  },
  {
    value: "Gameplay",
    label: "Gameplay",
    color: "#65A30D",
    description:
      "You can get into the game, but expect major issues/not be able to finish without workaround",
  },
  {
    value: "Loads",
    label: "Loads",
    color: "#CA8A04",
    description: "Games that boot but don't reach gameplay",
  },
  {
    value: "Unplayable",
    label: "Unplayable",
    color: "#DC2626",
    description: "Games that crash or have major issues",
  },
  {
    value: "Unknown",
    label: "Unknown",
    color: "#737373",
    description: "Games that haven't been tested yet",
  },
];

interface StateProgressBarProps {
  stateCounts: Record<string, number>;
  totalCount: number;
}

export default function StateProgressBar({
  stateCounts,
  totalCount,
}: StateProgressBarProps) {
  if (totalCount === 0) return null;

  return (
    <section className="rounded-2xl p-3 sm:p-4 mica-card mt-4">
      <div className="flex flex-col gap-2.5">
        {states.map((state) => {
          const count = stateCounts[state.value] ?? 0;
          const percentage = ((count / totalCount) * 100).toFixed(1);

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
                    ({percentage}%)
                  </span>
                </div>
                <span className="text-xs text-fluent-secondary whitespace-nowrap">
                  {count.toLocaleString()} / {totalCount.toLocaleString()}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: `${state.color}20` }}
                title={state.description}
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
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
