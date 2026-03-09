"use client"

import { motion } from "framer-motion"
import { SiteContainer } from "@/components/layout/site-shell"
import { defaultTransition } from "@/lib/motion"
import { playgroundItems } from "@/lib/projects"

export function PlaygroundGrid() {
  return (
    <SiteContainer>
      <style>{`
        .playground-masonry { column-count: 1; column-gap: 12px; }
        @media (min-width: 640px) {
          .playground-masonry { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .playground-masonry { column-count: 3; }
        }
      `}</style>

      <div className="playground-masonry">
        {playgroundItems.map((item, index) => (
          <PlaygroundCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </SiteContainer>
  )
}

function PlaygroundCard({
  item,
  index,
}: {
  item: (typeof playgroundItems)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...defaultTransition, delay: (index % 3) * 0.05 }}
      className="mb-4 break-inside-avoid"
    >
      <div
        className="group overflow-hidden bg-secondary"
        role="img"
        aria-label={item.title}
      >
        <div className={`relative w-full ${item.aspect}`} aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 bg-secondary/80 transition-colors duration-300 group-hover:bg-accent/20 group-active:bg-accent/15" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-transparent transition-colors duration-500 group-hover:bg-foreground/[0.02]" />
        </div>
      </div>
    </motion.div>
  )
}
