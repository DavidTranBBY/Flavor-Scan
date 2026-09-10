"use client"

import { editorial } from "@/lib/fonts"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="fs-page fs-grid-bg">
      <section className="fs-container grid min-h-[calc(100vh-4rem)] place-items-center py-16 text-center">
        <div>
          <p className="fs-eyebrow mb-5">System state</p>
          <h1 className={`${editorial.className} text-6xl font-semibold leading-none tracking-[-0.06em] text-[var(--fs-text)] md:text-7xl`}>Something went wrong</h1>
          <p className="fs-subtitle mx-auto mt-6 max-w-md">An unexpected error occurred while loading this page.</p>
          <button onClick={reset} className="fs-button-primary mt-8">Try again</button>
        </div>
      </section>
    </main>
  )
}
