export function Footer() {
  return (
    <footer className="glass-card border-t border-[var(--border-color)] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Research & References */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center gap-2">
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
              Research & References
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://xenia.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    Xenia Team
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – for creating Xenia
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Team-Resurgent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    Team Resurgent
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – for Xbox360Toolkit
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://free60.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    Free60
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – for Xbox 360 documentation
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/BartoszCichecki/LenovoLegionToolkit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    LenovoLegionToolkit
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – for settings inspiration
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Libraries Used */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center gap-2">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Libraries Used
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.avaloniaui.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    Avalonia UI
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – cross-platform UI framework
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amwx/FluentAvalonia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    FluentAvalonia
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – Fluent Design controls
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/davidxuang/FluentIcons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    FluentIcons
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – Fluent Design icons
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://nlog-project.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    NLog
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – logging and diagnostics
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/xoofx/Tomlyn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    Tomlyn
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – TOML parser/writer
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/adamhathcock/sharpcompress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/70 hover:text-[var(--color-xbox-green)] transition-colors block"
                >
                  <span className="text-[var(--color-xbox-green)] font-medium">
                    SharpCompress
                  </span>
                  <span className="hidden sm:inline">
                    {" "}
                    – archive compression
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Translators & Contributors */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center gap-2">
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
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              Translators
            </h3>
            <p className="text-[var(--foreground)]/70 mb-4">
              Thanks to all the translators who made Xenia Manager available in
              multiple languages.
            </p>
            <a
              href="https://github.com/xenia-manager/xenia-manager#translators"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-xbox inline-flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-color)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Xenia Manager"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-[var(--foreground)]/60 text-sm">
              © 2025 Xenia Manager. Not affiliated with the Xenia Team.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/xenia-manager/xenia-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)]/60 hover:text-[var(--color-xbox-green)] transition-colors p-2 rounded-lg hover:bg-[var(--bg-accent)]"
              aria-label="GitHub Repository"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
