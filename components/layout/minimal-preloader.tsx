"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export function MinimalPreloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="minimal-preloader"
          className="fixed inset-0 z-[11000] flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <motion.span
            className="h-2 w-2 bg-accent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
