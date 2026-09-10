"use client"

import Link from "next/link"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={rootRef} className="fs-page fs-grid-bg">
      
    </div>
  )
}