"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const navItems = [
    { href: "/compatibility", label: "Compatibility" },
    { href: "/gamesdatabase", label: "x360db" },
    { href: "/xenia-canary-releases", label: "Xenia Canary Releases" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium whitespace-nowrap ${
                  pathname === item.href
                    ? "text-[var(--color-xbox-green)]"
                    : "text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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

            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-lg cursor-pointer text-lg
                         transition-all duration-300
                         focus-indicator
                         bg-[var(--bg-accent)] hover:bg-[var(--bg-accent)]/80
                         min-w-[40px] min-h-[40px] flex items-center justify-center
                         flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="block w-5 h-5 flex items-center justify-center">
                {theme === "dark" ? (
                  <MoonIcon className="w-5 h-5" />
                ) : (
                  <SunIcon className="w-5 h-5" />
                )}
              </span>
            </motion.button>

            <motion.a
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CoffeeIcon className="w-5 h-5" />
            </motion.a>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 rounded-lg cursor-pointer
                         transition-all duration-300
                         focus-indicator
                         bg-[var(--bg-accent)] hover:bg-[var(--bg-accent)]/80
                         min-w-[40px] min-h-[40px] flex items-center justify-center
                         flex-shrink-0 ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-5 h-5 text-[var(--foreground)]" />
              ) : (
                <MenuIcon className="w-5 h-5 text-[var(--foreground)]" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-2 pb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[var(--foreground)]/80 hover:text-[var(--color-xbox-green)] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-[var(--bg-accent)]"
                  >
                    {item.label}
                  </Link>
                ))}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

