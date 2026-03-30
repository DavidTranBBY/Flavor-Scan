"use client"

import PixelTransitionButton from "@/components/ui/PixelTransitionButton"
import Link from "next/link"
import { useState } from "react"
import { pixel } from "@/lib/fonts"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`text-2xl font-bold ${pixel.className}`}>
            FlavorScan
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden items-center gap-6 md:flex ${pixel.className}`}>
            <Link href="/features" className="hover:text-gray-600">
              Features
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
          </nav>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/login">
              <button className={`rounded-md border px-3 py-1 text-base ${pixel.className}`}>
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className={`rounded-md bg-black px-3 py-1 text-base text-white ${pixel.className}`}>
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden rounded-md border px-3 py-1 text-base ${pixel.className}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
            menuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 border-t py-4">
            <Link href="/features" className={`hover:text-gray-600 ${pixel.className}`}>
              Features
            </Link>
            <Link href="/about" className={`hover:text-gray-600 ${pixel.className}`}>
              About
            </Link>
            <Link href="/login">
              <button className={`w-full rounded-md border px-3 py-2 text-left text-base ${pixel.className}`}>
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className={`w-full rounded-md bg-black px-3 py-2 text-left text-base text-white ${pixel.className}`}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}