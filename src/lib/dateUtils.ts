export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}

export function parseDate(dateStr: string): { year: string; month: string; day: string } {
  if (!dateStr) return { year: "", month: "", day: "" };
  const [year, month, day] = dateStr.split("-");
  return { year, month, day };
}
