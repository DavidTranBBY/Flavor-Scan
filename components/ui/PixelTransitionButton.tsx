"use client"

import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"

const ROWS = 10
const COLS = 16

type PixelTransitionButtonProps = {
  href: string
  children: React.ReactNode
}

export default function PixelTransitionButton({
  href,
  children,
}: PixelTransitionButtonProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const pixels = useMemo(
    () => Array.from({ length: ROWS * COLS }, (_, i) => i),
    []
  )

  async function handleClick() {
    if (isAnimating) return
    setIsAnimating(true)

    const pixelBoxes = overlayRef.current?.querySelectorAll(".pixel-box")
    if (!pixelBoxes) return

    gsap.set(overlayRef.current, { autoAlpha: 1 })
    gsap.set(pixelBoxes, { opacity: 0, scale: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href)
      },
    })

    tl.to(pixelBoxes, {
      opacity: 1,
      scale: 1,
      duration: 0.08,
      stagger: {
        each: 0.002,
        from: "center",
      },
      ease: "steps(1)",
    })
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="fs-button-primary"
      >
        {children}
      </button>

      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[999] grid bg-[var(--fs-bg)] opacity-0"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((pixel) => (
          <div key={pixel} className="pixel-box bg-white" />
        ))}
      </div>
    </>
  )
}
