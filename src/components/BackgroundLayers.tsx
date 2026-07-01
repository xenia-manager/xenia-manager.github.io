"use client";

import { useState, useEffect } from "react";

export function BackgroundLayers() {
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ animationPlayState: pageVisible ? "running" : "paused" }}
    >
      {/* Mica Layer */}
      <div className="absolute inset-0 mica-layer" />

      {/* Animated Gradient Orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(119, 185, 0, 0.3) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 124, 16, 0.3) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(140, 198, 62, 0.3) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
