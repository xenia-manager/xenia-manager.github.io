export function SkeletonCard() {
  return (
    <div className="mica-card rounded-xl overflow-hidden animate-pulse">
      <div className="bg-[var(--bg-tertiary)]" style={{ paddingBottom: "133.33%" }} />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-[var(--bg-tertiary)] rounded w-3/4" />
        <div className="h-2.5 bg-[var(--bg-tertiary)] rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr className="border-b border-[var(--table-border)]">
      <td className="py-3 px-4"><div className="h-3 bg-[var(--bg-tertiary)] rounded w-12" /></td>
      <td className="py-3 px-4"><div className="h-3 bg-[var(--bg-tertiary)] rounded w-3/4" /></td>
      <td className="py-3 px-4"><div className="h-5 bg-[var(--bg-tertiary)] rounded-full w-16" /></td>
      <td className="py-3 px-4 hidden sm:table-cell"><div className="h-3 bg-[var(--bg-tertiary)] rounded w-20" /></td>
      <td className="py-3 px-4"><div className="h-3 bg-[var(--bg-tertiary)] rounded w-10" /></td>
    </tr>
  );
}

export function SkeletonGameList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[350px]">
        <thead>
          <tr className="border-b border-[var(--table-border)]">
            {[60, "45%", 70, 100, 45].map((width, i) => (
              <th key={i} style={{ width: typeof width === 'number' ? `${width}px` : width }}>
                <div className="h-3 bg-[var(--bg-tertiary)] rounded w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonSettingsPanel() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-4 bg-[var(--bg-tertiary)] rounded w-8" />
        <div className="h-4 bg-[var(--bg-tertiary)] rounded w-32" />
      </div>
      <div className="space-y-2 pl-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-3 bg-[var(--bg-tertiary)] rounded w-1/4" />
            <div className="h-6 bg-[var(--bg-tertiary)] rounded flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
