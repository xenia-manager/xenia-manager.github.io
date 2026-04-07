export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          <span className="gradient-text">Xenia Manager</span>
        </h1>
        <p className="text-xl text-[var(--foreground)]/80 mb-8 leading-relaxed">
          A comprehensive management tool for the Xenia Xbox 360 emulator.
          Simplify your gaming experience with automatic updates, patch
          management, and per-game configurations.
        </p>
        <div className="glass-card inline-block px-6 py-3 rounded-xl">
          <p className="text-sm text-[var(--foreground)]/60">
            <span className="text-[var(--color-xbox-green)] font-semibold">
              ⚠️ Disclaimer:
            </span>{" "}
            This project is not affiliated with the Xenia Team.
          </p>
        </div>
      </div>
    </section>
  );
}
