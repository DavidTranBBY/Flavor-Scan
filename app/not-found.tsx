import Link from "next/link"
import { editorial } from "@/lib/fonts"

export default function NotFound() {
  return (
    <main className="fs-page fs-grid-bg">
      <section className="fs-container grid min-h-[calc(100vh-4rem)] place-items-center py-16 text-center">
        <div>
          <p className="fs-eyebrow mb-5">404</p>
          <h1 className={`${editorial.className} text-6xl font-semibold leading-none tracking-[-0.06em] text-[var(--fs-text)] md:text-7xl`}>Page not found</h1>
          <p className="fs-subtitle mx-auto mt-6 max-w-md">The page you are looking for does not exist in this workspace.</p>
          <Link href="/" className="fs-button-primary mt-8">Go Home</Link>
        </div>
      </section>
    </main>
  )
}
