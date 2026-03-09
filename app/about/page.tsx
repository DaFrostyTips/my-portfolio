import type { Metadata } from "next"
import { AboutContent } from "@/components/sections/about-content"

export const metadata: Metadata = {
  title: "About",
  description: "About Aden Joseph, Interaction Designer.",
}

export default function AboutPage() {
  return (
    <main className="pt-32 lg:pt-40">
      <AboutContent />
    </main>
  )
}
