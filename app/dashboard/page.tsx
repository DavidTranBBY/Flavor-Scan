"use client"

import CameraScanner from "@/components/ui/CameraScanner"
import { editorial } from "@/lib/fonts"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login")
      } else {
        setChecking(false)
      }
    })
  }, [router])

  if (checking) {
    return (
      <main className="fs-page fs-grid-bg">
        <section className="fs-container grid min-h-[calc(100vh-4rem)] place-items-center py-16">
          <p className="text-sm text-[var(--fs-muted)]">Checking authentication...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="fs-page fs-grid-bg">
      <section className="fs-container fs-section">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[var(--fs-border)] pb-8 md:flex-row md:items-end">
          <div>
            <p className="fs-eyebrow mb-4">Nutrition workspace</p>
            <h1 className={`${editorial.className} text-6xl font-semibold leading-none tracking-[-0.06em] text-[var(--fs-text)] md:text-7xl`}>
              Dashboard
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--fs-muted)]">
              Scan your meals, review nutritional estimates, and keep your tracking workflow focused.
            </p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push("/")
            }}
            className="fs-button-secondary w-full md:w-auto"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="fs-card p-6">
            <p className="fs-eyebrow mb-8">Current task</p>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--fs-text)]">Scan a meal</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--fs-muted)]">
              Open the camera, capture your meal, and let FlavorScan estimate calories and macros.
            </p>
          </aside>
          <CameraScanner />
        </div>
      </section>
    </main>
  )
}
