export function CommunitySection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          Community & Support
        </h2>
        <p className="text-[var(--foreground)]/70 mb-8">
          Get help, share feedback, and connect with the Xenia Manager
          community.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://github.com/xenia-manager/xenia-manager/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-[var(--border-color)] card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Issues & Suggestions
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm">
              Report bugs or suggest new features
            </p>
          </a>
          <a
            href="https://github.com/orgs/xenia-manager/projects/2/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-[var(--border-color)] card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Project Board
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm">
              Track our progress and roadmap
            </p>
          </a>
          <a
            href="https://github.com/xenia-manager/xenia-manager/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-[var(--border-color)] card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Wiki
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm">
              Documentation and guides
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
