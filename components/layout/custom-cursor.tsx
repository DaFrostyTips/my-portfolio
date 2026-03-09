"use client"

import { useEffect, useRef, useState } from "react"

type CursorMode = "default" | "link" | "card"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(media.matches)

    update()
    media.addEventListener("change", update)

    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let rafId = 0

    const onMouseMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      setVisible(true)

      const element = event.target as Element | null

      if (element?.closest('[data-cursor="project-card"]')) {
        setMode("card")
        return
      }

      if (element?.closest("a, button, [role='button']")) {
        setMode("link")
        return
      }

      setMode("default")
    }

    const onMouseLeaveWindow = () => {
      setVisible(false)
      setMode("default")
    }

    const render = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18
      current.current.y += (target.current.y - current.current.y) * 0.18

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`
      }

      rafId = window.requestAnimationFrame(render)
    }

    rafId = window.requestAnimationFrame(render)
    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeaveWindow)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeaveWindow)
    }
  }, [enabled])

  if (!enabled) return null

  const size = mode === "card" ? 11 : mode === "link" ? 9 : 8
  const opacity = !visible ? 0 : mode === "link" ? 0.78 : 1

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[10010] transform-gpu will-change-transform bg-accent transition-[width,height,opacity,border-color,outline-color] duration-150 ease-out ${
        mode === "card" ? "border border-accent/70 outline outline-1 outline-accent/35" : "border border-transparent"
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity,
      }}
    />
  )
}
