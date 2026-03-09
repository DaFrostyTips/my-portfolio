"use client"

import type { CSSProperties } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/cn"
import { motionTokens } from "@/lib/motion"

type PixelSize = "sm" | "md" | "lg"

const sizeMap: Record<PixelSize, string> = {
  sm: "h-[6px] w-[6px]",
  md: "h-[8px] w-[8px]",
  lg: "h-[10px] w-[10px]",
}

const cubeSizePx: Record<PixelSize, number> = {
  sm: 8,
  md: 9,
  lg: 10,
}

const cubeDepthPx: Record<PixelSize, number> = {
  sm: 1.25,
  md: 1.5,
  lg: 1.8,
}

export function Pixel({
  size = "sm",
  interactive = false,
  cubeMode = false,
  idlePulse = false,
  blink = true,
  className,
}: {
  size?: PixelSize
  interactive?: boolean
  cubeMode?: boolean
  idlePulse?: boolean
  blink?: boolean
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const shouldBlink = blink && !reduceMotion
  const shouldIdlePulse = idlePulse && !reduceMotion
  const allowCubeMotion = cubeMode && !reduceMotion
  const baseInteractiveClasses = reduceMotion
    ? "hover:opacity-100 active:opacity-75 group-hover:opacity-100 group-active:opacity-75"
    : "hover:scale-110 hover:brightness-110 hover:opacity-100 active:scale-90 group-hover:scale-110 group-hover:brightness-110 group-hover:opacity-100 group-active:scale-90"

  const animation =
    shouldIdlePulse && shouldBlink
      ? "pixel-idle 4.8s ease-in-out infinite, pixel-blink-soft 3.2s ease-in-out infinite"
      : shouldIdlePulse
        ? "pixel-idle 4.8s ease-in-out infinite"
        : shouldBlink
          ? "pixel-blink-soft 3.2s ease-in-out infinite"
          : undefined

  const durationStyle = {
    "--pixel-hover-duration": `${motionTokens.transition.pixel.hover}s`,
    "--pixel-press-duration": `${motionTokens.transition.pixel.press}s`,
    animation,
  } as CSSProperties

  const cubeVisualStyle = {
    ...durationStyle,
    width: `${cubeSizePx[size]}px`,
    height: `${cubeSizePx[size]}px`,
    "--cube-depth": `${cubeDepthPx[size]}px`,
  } as CSSProperties

  if (!allowCubeMotion) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-block shrink-0 bg-accent opacity-55 transition-[transform,opacity,filter] duration-[var(--pixel-hover-duration)] ease-out active:duration-[var(--pixel-press-duration)] group-active:duration-[var(--pixel-press-duration)]",
          sizeMap[size],
          interactive && baseInteractiveClasses,
          className
        )}
        style={durationStyle}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block shrink-0 overflow-visible [perspective:320px]",
        className
      )}
      style={cubeVisualStyle}
    >
      <span
        className={cn(
          "relative block h-full w-full will-change-transform [transform-style:preserve-3d] transition-[transform] duration-[var(--pixel-hover-duration)] ease-[cubic-bezier(0.4,0,0.2,1)] active:duration-[var(--pixel-press-duration)] group-active:duration-[var(--pixel-press-duration)]",
          interactive &&
            "hover:[transform:rotateX(12deg)_rotateY(-12deg)_scale3d(1.05,1.05,1)] active:[transform:rotateX(8deg)_rotateY(-8deg)_scale3d(0.96,0.9,1)] group-hover:[transform:rotateX(12deg)_rotateY(-12deg)_scale3d(1.05,1.05,1)] group-active:[transform:rotateX(8deg)_rotateY(-8deg)_scale3d(0.96,0.9,1)]"
        )}
      >
        <span
          className={cn(
            "absolute inset-0 bg-accent opacity-55 transition-[opacity,filter] duration-[var(--pixel-hover-duration)] ease-[cubic-bezier(0.4,0,0.2,1)]",
            interactive &&
              "hover:opacity-95 hover:brightness-105 active:opacity-85 group-hover:opacity-95 group-hover:brightness-105 group-active:opacity-85"
          )}
        />
        <span
          className={cn(
            "pointer-events-none absolute left-0 top-0 w-full bg-foreground/22 opacity-0 transition-opacity duration-[var(--pixel-hover-duration)] ease-[cubic-bezier(0.4,0,0.2,1)]",
            interactive && "hover:opacity-100 active:opacity-80 group-hover:opacity-100 group-active:opacity-80"
          )}
          style={{
            height: "var(--cube-depth)",
            transform: "translateY(calc(var(--cube-depth) * -1)) skewX(-45deg)",
            transformOrigin: "left bottom",
          }}
        />
        <span
          className={cn(
            "pointer-events-none absolute right-0 top-0 h-full bg-black/26 opacity-0 transition-opacity duration-[var(--pixel-hover-duration)] ease-[cubic-bezier(0.4,0,0.2,1)]",
            interactive && "hover:opacity-100 active:opacity-80 group-hover:opacity-100 group-active:opacity-80"
          )}
          style={{
            width: "var(--cube-depth)",
            transform: "translateX(var(--cube-depth)) skewY(-45deg)",
            transformOrigin: "left top",
          }}
        />
      </span>
    </span>
  )
}
