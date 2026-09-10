"use client"

import Link from "next/link"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const features = [
  {
    title: "Scan with the camera you already use.",
    copy: "Capture a meal and turn it into a structured nutrition estimate in seconds.",
  },
  {
    title: "Understand the meal at a glance.",
    copy: "Calories, macros, portions, and confidence are presented in a calm, readable interface.",
  },
  {
    title: "Keep tracking out of the way.",
    copy: "A lightweight workflow designed for daily use, not manual spreadsheet-style logging.",
  },
]

function ProductVisual() {
  return (
    <div className="product-visual mx-auto w-full max-w-5xl px-4">
      <div className="relative overflow-hidden rounded-[2.75rem] border border-[var(--fs-border)] bg-gradient-to-b from-[var(--fs-surface-strong)] to-[var(--fs-surface)] p-3 shadow-[0_50px_180px_var(--fs-shadow)] backdrop-blur-3xl">
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[var(--fs-text)]/35 to-transparent" />
        <div className="rounded-[2.2rem] bg-[var(--fs-bg-soft)] p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between text-xs text-[var(--fs-muted)]">
            <span>FlavorScan Intelligence</span>
            <span>Live estimate</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-80 overflow-hidden rounded-[1.75rem] bg-[url('https://media.theeverygirl.com/wp-content/uploads/2025/03/grain-bowl-recipes-the-everygirl-feature.jpg')] bg-cover bg-center bg-no-repeat">
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.16),transparent)]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/70">Detected meal</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-white">Balanced lunch bowl</h2>
              </div>
            </div>
            <div className="grid gap-4">
              {[["Calories", "642"], ["Protein", "32g"], ["Confidence", "95%"]].map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-[var(--fs-border)] bg-[var(--fs-surface)] p-5">
                  <p className="text-sm text-[var(--fs-muted)]">{label}</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-[var(--fs-text)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (reduceMotion) {
        gsap.set([".hero-item", ".product-visual", ".reveal-card", ".cinema-section"], { clearProps: "all" })
        return
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-item", {
          y: 34,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
        })
        .from(".product-visual", { y: 70, scale: 0.97, autoAlpha: 0, duration: 1.15 }, "-=0.45")

      gsap.to(".product-visual", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: ".product-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      })

      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
          y: 42,
          autoAlpha: 0,
          duration: 0.75,
          delay: index * 0.08,
          ease: "power3.out",
        })
      })

      gsap.from(".cinema-section", {
        scrollTrigger: { trigger: ".cinema-section", start: "top 78%", toggleActions: "play none none reverse" },
        y: 60,
        scale: 0.98,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      })

      const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => window.cancelAnimationFrame(refresh)
    },
    { scope: rootRef }
  )

  return (
    <main ref={rootRef} className="fs-page overflow-x-hidden">
      <section className="relative px-4 pt-0 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,.17),transparent_30%),radial-gradient(circle_at_80%_32%,rgba(160,180,220,.16),transparent_28%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-20 text-center sm:pt-6 sm:pb-28 lg:pt-8 lg:pb-32">
          <p className="hero-item mx-auto mb-5 w-fit rounded-full border border-[var(--fs-border)] bg-[var(--fs-surface)] px-4 py-2 text-xs font-semibold text-[var(--fs-muted)] backdrop-blur-xl">
            AI nutrition analysis, redesigned for daily life
          </p>
          <h1 className="hero-item mx-auto max-w-6xl text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.86] tracking-[-0.085em] text-[var(--fs-text)]">
            Scan food.
            <br />
            Know more.
          </h1>
          <p className="hero-item mx-auto mt-8 max-w-2xl text-lg leading-8 text-[var(--fs-muted)] sm:text-xl">
            FlavorScan turns meal photos into clear calorie estimates, macro breakdowns, and confidence scores with a cinematic, camera-first workflow.
          </p>
          <div className="hero-item mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="fs-button-primary">Get started</Link>
            <Link href="/features" className="fs-button-secondary">Explore features</Link>
          </div>
        </div>
        <ProductVisual />
      </section>

      <section className="px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="fs-eyebrow mb-4">Designed to disappear</p>
          <h2 className="mx-auto max-w-4xl text-5xl font-semibold tracking-[-0.07em] text-[var(--fs-text)] sm:text-7xl">
            Powerful analysis. Almost no interface.
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="reveal-card fs-card p-7 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-[var(--fs-text)]">{feature.title}</h3>
              <p className="mt-5 text-sm leading-7 text-[var(--fs-muted)]">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-32 sm:px-6 lg:px-8">
        <div className="cinema-section mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-[var(--fs-border)] bg-gradient-to-b from-[var(--fs-surface-strong)] to-[var(--fs-surface)] p-8 text-center shadow-[0_50px_160px_var(--fs-shadow)] backdrop-blur-3xl sm:p-14 lg:p-20">
          <p className="fs-eyebrow mb-5">Private by design</p>
          <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.075em] text-[var(--fs-text)] sm:text-7xl">
            A cleaner way to understand what you eat.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[var(--fs-muted)]">
            Built for calm, focused nutrition tracking with the same routes, auth, dashboard, and scanning functionality you already had.
          </p>
          <Link href="/dashboard" className="fs-button-primary mt-9">Open dashboard</Link>
        </div>
      </section>
    </main>
  )
}
