import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xenia Canary - Compatibility",
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
