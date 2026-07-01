const isDev = process.env.NODE_ENV === "development";

export function reportError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : "";
  if (isDev) {
    console.error(`${prefix} Error:`, error);
  }
}
