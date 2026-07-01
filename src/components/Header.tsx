"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { ImageWithFallback } from "./ImageWithFallback";
import { MoonIcon, SunIcon, CoffeeIcon, CloseIcon, MenuIcon } from "./Icons";
import { FAQ_URL, KOFI_URL } from "@/lib/constants";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCompatibilityPage = pathname === "/compatibility";
  const isXeniaCanaryReleasesPage = pathname === "/xenia-canary-releases";
  const isGamesDatabasePage = pathname === "/gamesdatabase";
  const shouldHideFAQ =
    isCompatibilityPage || isXeniaCanaryReleasesPage || isGamesDatabasePage;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <ImageWithFallback
              src="/favicon.png"
              alt="Xenia Manager"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl shadow-lg"
              fetchPriority="high"
            />
            <span className="text-base sm:text-xl font-bold gradient-text truncate">
              Xenia Manager
            </span>
          </Link>

          {/* Navigation Links - Desktop (Centered) */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/compatibility"
              className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium whitespace-nowrap"
            >
              Compatibility
            </Link>
            <Link
              href="/gamesdatabase"
              title="Games Database"
              className={`transition-colors font-medium whitespace-nowrap ${
                isGamesDatabasePage
                  ? "text-[var(--color-xbox-green)]"
                  : "text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)]"
              }`}
            >
              x360db
            </Link>
            <Link
              href="/xenia-canary-releases"
              className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium whitespace-nowrap"
            >
              Xenia Canary Releases
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Navigation Links - Mobile (shown before theme toggle) */}
            {!shouldHideFAQ && (
              <nav className="hidden lg:flex items-center gap-2 mr-2">
                <a
                  href={FAQ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium text-sm whitespace-nowrap"
                >
                  FAQ
                </a>
              </nav>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-lg cursor-pointer text-lg
                         transition-all duration-300
                         focus-indicator
                         bg-[var(--bg-accent)] hover:bg-[var(--bg-accent)]/80
                         min-w-[40px] min-h-[40px] flex items-center justify-center
                         flex-shrink-0"
            >
              <span className="block w-5 h-5 flex items-center justify-center">
                {theme === "dark" ? (
                  <MoonIcon className="w-5 h-5" />
                ) : (
                  <SunIcon className="w-5 h-5" />
                )}
              </span>
            </button>

            {/* Ko-fi Link */}
            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Support on Ko-fi"
              className="p-2.5 rounded-lg cursor-pointer
                         transition-all duration-300
                         focus-indicator
                         bg-[var(--bg-accent)] hover:bg-[var(--bg-accent)]/80
                         min-w-[40px] min-h-[40px] flex items-center justify-center
                         flex-shrink-0 text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
            >
              <CoffeeIcon className="w-5 h-5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 rounded-lg cursor-pointer
                         transition-all duration-300
                         focus-indicator
                         bg-[var(--bg-accent)] hover:bg-[var(--bg-accent)]/80
                         min-w-[40px] min-h-[40px] flex items-center justify-center
                         flex-shrink-0 ml-2"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-5 h-5 text-[var(--foreground)]" />
              ) : (
                <MenuIcon className="w-5 h-5 text-[var(--foreground)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 pb-4">
            <Link
              href="/compatibility"
              className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-[var(--bg-accent)]"
            >
              Compatibility
            </Link>
            <Link
              href="/gamesdatabase"
              title="Games Database"
              className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-[var(--bg-accent)]"
            >
              x360db
            </Link>
            <Link
              href="/xenia-canary-releases"
              className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-[var(--bg-accent)]"
            >
              Xenia Canary Releases
            </Link>
            {!shouldHideFAQ && (
              <a
                href={FAQ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-[var(--bg-accent)]"
              >
                FAQ
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
