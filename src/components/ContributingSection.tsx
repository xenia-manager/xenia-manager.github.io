export function ContributingSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Contributing</h2>
        <p className="text-[var(--foreground)]/70 mb-8 max-w-2xl mx-auto">
          We welcome contributions from the community! Whether you want to
          report bugs, suggest features, or help with development, there are
          many ways to get involved.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://github.com/xenia-manager/xenia-manager/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-[var(--border-color)] card-hover text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Report Issues
              </h3>
            </div>
            <p className="text-[var(--foreground)]/70 text-sm">
              Found a bug or have a suggestion? Let us know!
            </p>
          </a>
          <a
            href="https://github.com/orgs/xenia-manager/projects/2/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-[var(--border-color)] card-hover text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                TODO List
              </h3>
            </div>
            <p className="text-[var(--foreground)]/70 text-sm">
              Check out our project board for upcoming features.
            </p>
          </a>
        </div>
        <a
          href="https://github.com/xenia-manager/xenia-manager/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-xbox btn-xbox-secondary inline-flex items-center gap-2"
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Contributing Guide
        </a>
      </div>
    </section>
  );
}
