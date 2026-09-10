import Link from "next/link"
import { editorial } from "@/lib/fonts"

export default function MainPage() {
  return (
    <main className="fs-page fs-grid-bg">
      <section className="fs-container grid min-h-[calc(100vh-4rem)] place-items-center py-16">
        <div className="max-w-2xl text-center">
          <p className="fs-eyebrow mb-5">FlavorScan</p>
          <h1 className={`${editorial.className} text-6xl font-semibold leading-none tracking-[-0.06em] text-[var(--fs-text)] md:text-7xl`}>
            Welcome to FlavorScan
          </h1>
          <p className="fs-subtitle mx-auto mt-6 max-w-xl">
            Your go-to app for discovering and sharing your favorite flavors.
          </p>
          <Link href="/register" className="fs-button-primary mt-8">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  )
}
