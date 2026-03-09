"use client"

import { useEffect, useRef } from "react"

type Cloud = {
  x: number
  y: number
  width: number
  height: number
  speed: number
  alpha: number
}

type Obstacle = {
  x: number
  width: number
  height: number
}

type Runner = {
  x: number
  y: number
  width: number
  height: number
  velocityY: number
  onGround: boolean
  nextJumpIn: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function HeroPixelRunnerBackground({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let rafId = 0
    let width = 0
    let height = 0
    let groundY = 0
    let lastTick = performance.now()
    let elapsed = 0

    const clouds: Cloud[] = []
    const obstacles: Obstacle[] = []
    let obstacleSpawnIn = 1.5

    const runner: Runner = {
      x: 0,
      y: 0,
      width: 10,
      height: 14,
      velocityY: 0,
      onGround: true,
      nextJumpIn: 2,
    }

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min)

    const refreshResolution = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)

      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      groundY = height * (width < 768 ? 0.88 : 0.9)
      runner.x = width * (width < 768 ? 0.2 : 0.23)

      const spriteScale = width < 768 ? 0.92 : 1
      runner.width = Math.round(10 * spriteScale)
      runner.height = Math.round(14 * spriteScale)
      runner.y = groundY - runner.height

      const cloudCount = reducedMotion || width < 768 ? 4 : 7
      clouds.length = 0
      for (let index = 0; index < cloudCount; index += 1) {
        clouds.push(createCloud((index / cloudCount) * width + randomRange(-80, 80)))
      }

      obstacles.length = 0
      obstacleSpawnIn = randomRange(1.1, 2.2)
    }

    const createCloud = (startX = width + randomRange(40, 160)): Cloud => {
      const isCompact = reducedMotion || width < 768
      const size = isCompact ? randomRange(20, 40) : randomRange(24, 56)
      return {
        x: startX,
        y: randomRange(height * 0.2, height * 0.58),
        width: size,
        height: Math.max(6, Math.round(size * randomRange(0.32, 0.48))),
        speed: randomRange(isCompact ? 8 : 10, isCompact ? 17 : 25),
        alpha: randomRange(isCompact ? 0.09 : 0.11, isCompact ? 0.18 : 0.2),
      }
    }

    const createObstacle = (startX = width + randomRange(30, 140)): Obstacle => {
      const isCompact = reducedMotion || width < 768
      const widthUnits = isCompact ? randomRange(6, 10) : randomRange(7, 12)
      const heightUnits = isCompact ? randomRange(10, 18) : randomRange(11, 22)
      return {
        x: startX,
        width: Math.round(widthUnits),
        height: Math.round(heightUnits),
      }
    }

    const beginJump = () => {
      const isCompact = reducedMotion || width < 768
      runner.onGround = false
      runner.velocityY = isCompact ? -158 : -185
      runner.nextJumpIn = randomRange(isCompact ? 2.5 : 2, isCompact ? 4.2 : 3.8)
    }

    const update = (deltaSeconds: number) => {
      const isCompact = reducedMotion || width < 768
      const worldSpeed = isCompact ? 52 : 72
      const gravity = isCompact ? 430 : 480

      for (const cloud of clouds) {
        cloud.x -= cloud.speed * deltaSeconds
        if (cloud.x + cloud.width < -20) {
          const recycled = createCloud()
          cloud.x = recycled.x
          cloud.y = recycled.y
          cloud.width = recycled.width
          cloud.height = recycled.height
          cloud.speed = recycled.speed
          cloud.alpha = recycled.alpha
        }
      }

      obstacleSpawnIn -= deltaSeconds
      if (obstacleSpawnIn <= 0) {
        const maxObstacles = isCompact ? 2 : 3
        if (obstacles.length < maxObstacles) {
          obstacles.push(createObstacle())
        }
        obstacleSpawnIn = randomRange(isCompact ? 2.2 : 1.4, isCompact ? 3.5 : 2.6)
      }

      for (const obstacle of obstacles) {
        obstacle.x -= worldSpeed * deltaSeconds
      }

      while (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < -30) {
        obstacles.shift()
      }

      runner.nextJumpIn -= deltaSeconds
      const upcomingObstacle = obstacles.find((obstacle) => obstacle.x + obstacle.width > runner.x)
      const obstacleDistance = upcomingObstacle ? upcomingObstacle.x - (runner.x + runner.width) : Number.POSITIVE_INFINITY
      const shouldAutoJump = runner.onGround && obstacleDistance < (isCompact ? 52 : 66)

      if (runner.onGround && (shouldAutoJump || runner.nextJumpIn <= 0)) {
        beginJump()
      }

      if (!runner.onGround) {
        runner.velocityY += gravity * deltaSeconds
        runner.y += runner.velocityY * deltaSeconds

        const floor = groundY - runner.height
        if (runner.y >= floor) {
          runner.y = floor
          runner.velocityY = 0
          runner.onGround = true
        }
      }
    }

    const drawCloud = (cloud: Cloud) => {
      const unit = 2
      const block = Math.max(unit * 2, Math.round(cloud.width / 4))

      context.fillStyle = `hsl(var(--muted-foreground) / ${cloud.alpha})`
      context.fillRect(cloud.x, cloud.y + block * 0.5, cloud.width, cloud.height)
      context.fillRect(cloud.x + block * 0.6, cloud.y, cloud.width * 0.55, cloud.height * 0.9)
      context.fillRect(cloud.x + block * 1.35, cloud.y + block * 0.15, cloud.width * 0.5, cloud.height * 0.8)
    }

    const drawRunner = (timeSeconds: number) => {
      const unit = Math.max(2, Math.round((reducedMotion || width < 768 ? 1.8 : 2.1)))
      const x = Math.round(runner.x)
      const y = Math.round(runner.y)
      const runningFrame = Math.floor(timeSeconds * 8) % 2

      context.fillStyle = "hsl(var(--accent) / 0.32)"
      context.fillRect(x + unit, y + unit, unit * 3, unit * 3)

      context.fillStyle = "hsl(var(--foreground) / 0.18)"
      context.fillRect(x + unit * 3, y + unit, unit, unit)

      context.fillStyle = "hsl(var(--accent) / 0.26)"
      context.fillRect(x + unit * 2, y + unit * 4, unit * 2, unit * 2)

      if (!runner.onGround) {
        context.fillRect(x + unit, y + unit * 5, unit, unit * 2)
        context.fillRect(x + unit * 3, y + unit * 5, unit, unit * 2)
      } else if (runningFrame === 0) {
        context.fillRect(x + unit, y + unit * 5, unit, unit * 2)
        context.fillRect(x + unit * 3, y + unit * 5, unit, unit)
      } else {
        context.fillRect(x + unit, y + unit * 5, unit, unit)
        context.fillRect(x + unit * 3, y + unit * 5, unit, unit * 2)
      }
    }

    const drawObstacle = (obstacle: Obstacle) => {
      const x = Math.round(obstacle.x)
      const y = Math.round(groundY - obstacle.height)
      context.fillStyle = "hsl(var(--accent) / 0.2)"
      context.fillRect(x, y, obstacle.width, obstacle.height)

      context.fillStyle = "hsl(var(--foreground) / 0.1)"
      context.fillRect(x + Math.max(1, Math.floor(obstacle.width / 2)), y + 2, 1, obstacle.height - 4)
    }

    const drawGround = (timeSeconds: number) => {
      const isCompact = reducedMotion || width < 768
      const laneSpeed = isCompact ? 30 : 42
      const cell = isCompact ? 10 : 12
      const shift = (timeSeconds * laneSpeed) % cell
      const bandHeight = Math.max(32, Math.round(height - groundY))

      context.fillStyle = "hsl(var(--secondary) / 0.42)"
      context.fillRect(0, groundY, width, bandHeight)

      for (let x = -cell; x <= width + cell; x += cell) {
        const screenX = x - shift
        const alpha = (Math.floor((x + shift) / cell) % 2 === 0 ? 0.14 : 0.09) * (isCompact ? 0.85 : 1)
        context.fillStyle = `hsl(var(--muted-foreground) / ${alpha})`
        context.fillRect(screenX, groundY, cell - 2, bandHeight)
      }

      context.fillStyle = "hsl(var(--accent) / 0.22)"
      context.fillRect(0, groundY - 2, width, 2)
    }

    const render = (now: number) => {
      const delta = clamp((now - lastTick) / 1000, 0, 0.05)
      lastTick = now
      elapsed += delta

      update(delta)

      context.clearRect(0, 0, width, height)

      for (const cloud of clouds) {
        drawCloud(cloud)
      }

      drawGround(elapsed)

      for (const obstacle of obstacles) {
        drawObstacle(obstacle)
      }

      drawRunner(elapsed)

      rafId = window.requestAnimationFrame(render)
    }

    refreshResolution()
    rafId = window.requestAnimationFrame(render)

    const onResize = () => refreshResolution()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      window.cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-85" />
      <div className="pixel-runner-overlay absolute inset-0 opacity-[0.65]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/35 to-background/72" />
    </div>
  )
}
