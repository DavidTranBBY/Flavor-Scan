"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function IntroDoors() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setShowIntro(false),
    })

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    )

    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 0.4,
    })

    tl.to(
      leftRef.current,
      {
        x: "-100%",
        duration: 1.2,
        ease: "power4.inOut",
      },
      "-=0.1"
    )

    tl.to(
      rightRef.current,
      {
        x: "100%",
        duration: 1.2,
        ease: "power4.inOut",
      },
      "<"
    )

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      "-=0.2"
    )
  }, [])

  if (!showIntro) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        ref={leftRef}
        className="absolute left-0 top-0 h-full w-1/2 bg-black"
      />

      <div
        ref={rightRef}
        className="absolute right-0 top-0 h-full w-1/2 bg-black"
      />

      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center text-white"
      >
        <h1 className="text-3xl font-bold md:text-5xl">Flavor Scan</h1>
      </div>
    </div>
  )
}