"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"

const ROWS = 14
const COLS = 24

export default function IntroPixel() {
  const [showIntro, setShowIntro] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  const pixels = useMemo(
    () => Array.from({ length: ROWS * COLS }, (_, i) => i),
    []
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pixelBoxes = gsap.utils.toArray<HTMLDivElement>(".pixel-box")

      gsap.set(textRef.current, { opacity: 0, scale: 0.96 })
      gsap.set(pixelBoxes, { opacity: 0, scale: 0 })

      const tl = gsap.timeline({
        onComplete: () => setShowIntro(false),
      })

      tl.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      })

      tl.to(textRef.current, {
        duration: 0.5,
      })

      tl.to(
        pixelBoxes,
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
          stagger: {
            each: 0.001,
            from: "random",
          },
          ease: "steps(1)",
        },
        "-=0.12"
      )

      tl.to(textRef.current, {  
        opacity: 0,
        duration: 0.12,
      })

      tl.to(pixelBoxes, {
        opacity: 0,
        duration: 0.008,
        stagger: {
          each: 0.001,
          from: "random",
        },
        ease: "steps(1)",
      })

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.15,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!showIntro) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
    >
      <h1
        ref={textRef}
        className="absolute z-10 text-4xl font-bold uppercase tracking-[0.3em] text-white md:text-6xl"
      >
        Flavor Scan
      </h1>

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((pixel) => (
          <div
            key={pixel}
            className="pixel-box bg-white"
          />
        ))}
      </div>
    </div>
  )
}