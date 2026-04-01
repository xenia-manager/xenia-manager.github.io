export function QuickstartSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Quickstart</h2>
        <p className="text-[var(--foreground)]/70 mb-8">
          Get started with Xenia Manager in just a few simple steps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 border border-[var(--border-color)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Download
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm">
              Get the latest release from GitHub
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-[var(--border-color)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Install
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm">
              Unzip and run XeniaManager.exe
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-[var(--border-color)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-xbox-green)] to-[var(--color-xbox-button)] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
              Play
            </h3>
            <p className="text-[var(--foreground)]/70 text-sm">
              Follow the quickstart guide for setup
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/xenia-manager/xenia-manager/releases/latest/download/xenia_manager.zip"
            target="_blank"
            rel="noopener noreferrer"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Latest
          </a>
          <a
            href="https://github.com/xenia-manager/xenia-manager/wiki/Quickstart"
            target="_blank"
            rel="noopener noreferrer"
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Quickstart Guide
          </a>
        </div>
      </div>
    </section>
  );
}
