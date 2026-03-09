import type { Transition, Variants } from 'framer-motion'

export const motionEasing: Transition['ease'] = [0.4, 0, 0.2, 1]
export const motionEasingExit: Transition['ease'] = [0.3, 0, 0.2, 1]
export const motionDuration = 0.45

export const motionTokens = {
  easing: {
    primary: motionEasing,
    exit: motionEasingExit,
  },
  transition: {
    page: {
      cover: 0.14,
      reveal: 0.22,
      cellStaggerCover: 0.006,
      cellStaggerReveal: 0.005,
    },
    pixel: {
      hover: 0.22,
      press: 0.14,
    },
    heroField: {
      react: 0.14,
    },
    reduced: {
      quickFade: 0.1,
    },
  },
} as const

export const defaultTransition = {
  duration: motionDuration,
  ease: motionTokens.easing.primary,
} satisfies Transition

export const motionTiming = {
  fast: 0.3,
  base: motionDuration,
  slow: 0.7,
  slower: 0.8,
  long: 1,
} as const

export const transitions = {
  fast: { duration: motionTiming.fast, ease: motionTokens.easing.primary } satisfies Transition,
  base: { duration: motionTiming.base, ease: motionTokens.easing.primary } satisfies Transition,
  slow: { duration: motionTiming.slow, ease: motionTokens.easing.primary } satisfies Transition,
  slower: { duration: motionTiming.slower, ease: motionTokens.easing.primary } satisfies Transition,
  long: { duration: motionTiming.long, ease: motionTokens.easing.primary } satisfies Transition,
}

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: defaultTransition },
} satisfies Variants

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: defaultTransition },
} satisfies Variants

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      ...defaultTransition,
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
} satisfies Variants

export const pageTransition = {
  enter: {
    duration: 0.4,
    ease: motionTokens.easing.primary,
  } satisfies Transition,
  exit: {
    duration: 0.3,
    ease: motionTokens.easing.exit,
  } satisfies Transition,
}

export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: pageTransition.enter },
  exit: { opacity: 0, y: -10, transition: pageTransition.exit },
} satisfies Variants

export const revealOnView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' } as const,
  variants: fadeUp,
}
