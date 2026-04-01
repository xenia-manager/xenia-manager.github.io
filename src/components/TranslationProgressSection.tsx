export function TranslationProgressSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          Translation Progress
        </h2>
        <p className="text-[var(--foreground)]/70 mb-8">
          Xenia Manager is available in multiple languages. Help us translate
          the app to your language!
        </p>

        {/* Translation Progress Image from GitHub */}
        <div className="glass-card rounded-2xl p-6 border border-[var(--border-color)] mb-8">
          <img
            src="https://raw.githubusercontent.com/xenia-manager/xenia-manager/refs/heads/main/assets/translation-progress.png"
            alt="Translation progress chart showing completion percentage for each supported language"
            className="w-full h-auto rounded-xl"
          />
        </div>

        <a
          href="https://github.com/xenia-manager/xenia-manager/blob/main/TRANSLATIONS.md"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-xbox inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          Learn How to Contribute
        </a>
      </div>
    </section>
  );
}
