import Link from "next/link"
import { editorial } from "@/lib/fonts"

export default function UserMealPage() {
  return (
    <main className="fs-page fs-grid-bg">
      <section className="fs-container fs-section">
        <p className="fs-eyebrow mb-5">Meal archive</p>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className={`${editorial.className} fs-title`}>Your meals</h1>
            <p className="fs-subtitle mt-6 max-w-xl">
              Your meal history will appear here. Start by scanning a meal on the dashboard.
            </p>
            <Link href="/dashboard" className="fs-button-primary mt-8">
              Open dashboard
            </Link>
          </div>
          <div className="fs-card grid min-h-72 place-items-center p-8 text-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#7f929a]">No records yet</p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#97a5ab]">
                Once scans are saved, this page can become a calm ledger of your nutrition history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
