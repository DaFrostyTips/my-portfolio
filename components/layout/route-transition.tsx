"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { motionTokens } from "@/lib/motion"

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState(children)
  const [gridPhase, setGridPhase] = useState<"hidden" | "cover" | "reveal">("hidden")
  const [transitionSeed, setTransitionSeed] = useState(0)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (pathname === previousPath.current) return

    if (reduceMotion) {
      setDisplayed(children)
      previousPath.current = pathname
      setGridPhase("hidden")
      return
    }

    setGridPhase("cover")
    setTransitionSeed((current) => current + 1)

    const coverDuration = motionTokens.transition.page.cover * 1000
    const revealDuration = motionTokens.transition.page.reveal * 1000

    const swapTimer = window.setTimeout(() => {
      setDisplayed(children)
      previousPath.current = pathname
      setGridPhase("reveal")
    }, coverDuration)

    const hideGridTimer = window.setTimeout(() => {
      setGridPhase("hidden")
    }, coverDuration + revealDuration)

    return () => {
      window.clearTimeout(swapTimer)
      window.clearTimeout(hideGridTimer)
    }
  }, [children, pathname, reduceMotion])

  return (
    <>
      <motion.div className="min-h-screen" initial={false}>
        {displayed}
      </motion.div>

      <AnimatePresence>
        {gridPhase === "cover" || gridPhase === "reveal" ? (
          <PixelGridTransition key={`${transitionSeed}-${gridPhase}`} phase={gridPhase} />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function PixelGridTransition({ phase }: { phase: "cover" | "reveal" }) {
  const [viewport, setViewport] = useState({ width: 1440, height: 900 })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const cols = Math.max(14, Math.ceil(viewport.width / 72))
  const rows = Math.max(9, Math.ceil(viewport.height / 72))
  const coverDuration = motionTokens.transition.page.cover
  const revealDuration = motionTokens.transition.page.reveal
  const maxDiagonal = Math.max(rows + cols - 2, 1)
  const maxCoverDelay = Math.max(coverDuration - 0.09, 0)
  const maxRevealDelay = Math.max(revealDuration - 0.12, 0)
  const cells = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        const normalizedForward = (row + col) / maxDiagonal
        const normalizedReverse = (rows - 1 - row + cols - 1 - col) / maxDiagonal
        const staggerForward = (row + col) * motionTokens.transition.page.cellStaggerCover
        const staggerReverse = (rows - 1 - row + cols - 1 - col) * motionTokens.transition.page.cellStaggerReveal
        return {
          index,
          delayForward: Math.min(staggerForward, normalizedForward * maxCoverDelay),
          delayReverse: Math.min(staggerReverse, normalizedReverse * maxRevealDelay),
        }
      }),
    [cols, rows, maxDiagonal, maxCoverDelay, maxRevealDelay]
  )

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
      aria-hidden="true"
    >
      <div
        className="grid h-full w-full gap-px bg-border/30"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell) => (
          <motion.span
            key={cell.index}
            className="block h-full w-full bg-background"
            initial={phase === "cover" ? { opacity: 0 } : { opacity: 1 }}
            animate={phase === "cover" ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: phase === "cover" ? 0.09 : 0.12,
              ease: motionTokens.easing.primary,
              delay: phase === "cover" ? cell.delayForward : cell.delayReverse,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
