export function DownloadSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          Download
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Stable Release */}
          <div className="glass-card rounded-2xl p-8 text-center card-hover border border-[var(--border-color)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
              Stable Release
            </h3>
            <p className="text-[var(--foreground)]/70 mb-6">
              The most stable and tested version for everyday use.
            </p>
            <a
              href="https://github.com/xenia-manager/xenia-manager/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-xbox inline-block w-full"
            >
              Download Stable
            </a>
          </div>

          {/* Experimental Builds */}
          <div className="glass-card rounded-2xl p-8 text-center card-hover border border-[var(--border-color)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-xbox-accent)] to-[var(--color-xbox-green)] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
              Experimental Builds
            </h3>
            <p className="text-[var(--foreground)]/70 mb-6">
              Latest features and improvements for early adopters.
            </p>
            <a
              href="https://github.com/xenia-manager/experimental-builds/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-xbox inline-block w-full text-center"
            >
              Download Experimental
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
