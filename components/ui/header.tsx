"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
]

type Theme = "light" | "dark"

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setTheme(current)
  }, [])

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem("flavorscan-theme", nextTheme)
    setTheme(nextTheme)
  }

  return (
    <header className="fs-site-header sticky top-0 z-40 border-b border-[var(--fs-border)] text-[var(--fs-text)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between gap-5">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold tracking-[-0.02em] text-[var(--fs-text)]/90 transition hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-[var(--fs-ring,var(--ring))] focus:ring-offset-2 focus:ring-offset-[var(--fs-bg)]"
          >
            FlavorScan
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-xs font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--fs-bg)] ${
                    active ? "text-[var(--fs-text)]" : "text-[var(--fs-muted)] hover:text-[var(--fs-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-[var(--fs-border)] bg-[var(--fs-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-muted)] transition hover:border-[var(--fs-border-strong)] hover:text-[var(--fs-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--fs-bg)]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link href="/login" className="text-xs font-medium text-[var(--fs-muted)] transition hover:text-[var(--fs-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--fs-bg)]">
              Login
            </Link>
            <Link href="/register" className="fs-button-primary min-h-0 px-4 py-1.5 text-xs">
              Get Started
            </Link>
          </div>

          <button
            className="rounded-full border border-[var(--fs-border)] bg-[var(--fs-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--fs-text)] backdrop-blur-xl transition hover:bg-[var(--fs-surface-strong)] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile navigation"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid gap-2 border-t border-[var(--fs-border)] py-3">
            {[...navLinks, { href: "/login", label: "Login" }].map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active ? "bg-[var(--fs-surface-strong)] text-[var(--fs-text)]" : "text-[var(--fs-muted)] hover:bg-[var(--fs-surface)] hover:text-[var(--fs-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-[var(--fs-muted)] transition hover:bg-[var(--fs-surface)] hover:text-[var(--fs-text)]"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="fs-button-primary text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
