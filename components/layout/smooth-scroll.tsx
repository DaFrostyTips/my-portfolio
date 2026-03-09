"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    // Keep native scrolling for accessibility, touch devices, and reduced motion users.
    if (prefersReducedMotion || !finePointer) return

    let targetY = window.scrollY
    let currentY = window.scrollY
    let rafId = 0

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const step = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetY = clamp(targetY, 0, maxScroll)

      const delta = targetY - currentY
      currentY += delta * 0.18

      if (Math.abs(delta) < 0.4) {
        currentY = targetY
      }

      window.scrollTo(0, currentY)
      rafId = window.requestAnimationFrame(step)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetY = clamp(targetY + event.deltaY, 0, maxScroll)
      event.preventDefault()
    }

    const syncTarget = () => {
      targetY = window.scrollY
      currentY = window.scrollY
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const keys = ["PageDown", "PageUp", "Home", "End", " ", "ArrowDown", "ArrowUp"]
      if (keys.includes(event.key)) {
        window.requestAnimationFrame(syncTarget)
      }
    }

    rafId = window.requestAnimationFrame(step)
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("resize", syncTarget)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("resize", syncTarget)
    }
  }, [])

  return null
}
