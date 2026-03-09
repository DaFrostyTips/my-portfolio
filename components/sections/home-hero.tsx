"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SiteContainer } from "@/components/layout/site-shell"
import { Pixel } from "@/components/ui/pixel"
import { fadeUp, staggerContainer } from "@/lib/motion"
import { HeroPixelRunnerBackground } from "@/components/sections/hero-pixel-runner-bg"

export function HomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative min-h-svh overflow-hidden"
      aria-label="Introduction"
    >
      <HeroPixelRunnerBackground reducedMotion={Boolean(reduceMotion)} />

      <SiteContainer className="relative z-10 flex min-h-svh items-center justify-center">
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="mb-4 text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]"
          >
            Aden Joseph
            <Pixel size="lg" idlePulse className="relative -top-1 ml-1 opacity-70" />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-12 font-display text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground sm:text-sm"
          >
            Interaction Designer
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 font-display text-sm font-medium tracking-wide text-foreground transition-colors hover:text-accent-hover active:text-accent-pressed"
            >
              <Pixel size="sm" interactive cubeMode blink={false} />
              View Work
              <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
                &darr;
              </span>
            </a>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  )
}
