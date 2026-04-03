import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xenia Canary - Releases",
};

export default function XeniaCanaryReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
