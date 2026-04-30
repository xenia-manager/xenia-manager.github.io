import Link from "next/link";
import { BackgroundLayers } from "@/components/BackgroundLayers";

export default function NotFound() {
  return (
    <>
      <BackgroundLayers />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto fade-in-up">
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold gradient-text mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-[var(--color-xbox-green)] mx-auto rounded-full mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
              Page Not Found
            </h2>
            <p className="text-[var(--foreground)]/70 text-lg mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-xbox inline-flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
