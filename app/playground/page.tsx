import type { Metadata } from "next"
import { PlaygroundGrid } from "@/components/sections/playground-grid"
import { SiteContainer } from "@/components/layout/site-shell"

export const metadata: Metadata = {
  title: "Playground",
  description: "Experiments, fragments, and small explorations by Aden Joseph.",
}

export default function PlaygroundPage() {
  return (
    <main className="pb-32 pt-32 lg:pb-40 lg:pt-40">
      <SiteContainer className="mb-24 lg:mb-32">
        <p className="mb-6 font-display text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Experiments
        </p>
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Playground
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          Smaller fragments, motion studies, and visual experiments. Things
          that might become something, or are already complete in their
          incompleteness.
        </p>
      </SiteContainer>

      <PlaygroundGrid />
    </main>
  )
}
