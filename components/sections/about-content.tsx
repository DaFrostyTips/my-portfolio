"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Linkedin } from "lucide-react"
import { SiteContainer } from "@/components/layout/site-shell"
import { defaultTransition, fadeUp, staggerContainer } from "@/lib/motion"

const portraitPath = "/images/about/portrait.jpg"

export function AboutContent() {
  const [portraitMissing, setPortraitMissing] = useState(false)

  return (
    <div>
      <SiteContainer className="mb-32 lg:mb-40">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="mb-6 font-display text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            About
          </motion.p>
          <motion.h1 variants={fadeUp} className="mb-16 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">Explore, Design, Play</span>
            <span className="relative -top-1 ml-2 inline-block h-2.5 w-2.5 bg-accent/70" aria-hidden="true" />
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...defaultTransition, delay: 0.06 }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary lg:aspect-[4/5]">
            {!portraitMissing ? (
              <img
                src={portraitPath}
                alt="Portrait of Aden Joseph"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                onError={() => setPortraitMissing(true)}
              />
            ) : null}

            {portraitMissing ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 text-center">
                  <div className="mx-auto mb-4 h-10 w-10 bg-secondary/80" />
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground/30">Portrait</p>
                  <p className="mt-2 text-[11px] text-muted-foreground/45">Add image: /public/images/about/portrait.jpg</p>
                </div>
              </div>
            ) : null}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="max-w-md">
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                I'm a passionate UI/UX designer based in LA with a deep love for video games and interactive experiences. My journey into design started through gaming, where I became fascinated by how great interface design can enhance player experience and immersion. With a keen eye for detail and a user-centered approach, I create digital experiences that are both functional and engaging. I believe that good design should feel intuitive and delightful, much like the best game interfaces that disappear into the background while empowering users to achieve their goals.
              </p>
            </div>
          </div>
        </motion.div>
      </SiteContainer>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={defaultTransition}
        className="border-t border-border/30 py-28 lg:py-36"
        aria-label="Contact"
      >
        <SiteContainer>
          <p className="mb-8 font-display text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Get in touch
          </p>
          <h2 className="mb-10 max-w-lg font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"Let's work together"}
          </h2>

          <div className="flex flex-col gap-6">
            <a
              href="mailto:aden.1024.joseph@gmail.com"
              className="group inline-flex items-center gap-3 font-display text-lg font-medium tracking-wide text-foreground transition-colors hover:text-accent-hover active:text-accent-pressed md:text-xl"
            >
              <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              aden.1024.joseph@gmail.com
              <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/aden-joseph-891466352?trk=people-guest_people_search-card"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border/60 bg-secondary/35 text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover active:border-accent-pressed active:text-accent-pressed"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/aden.josep_h/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border/60 bg-secondary/35 text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover active:border-accent-pressed active:text-accent-pressed"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 font-display text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="inline-block h-1 w-1 bg-muted-foreground/40" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </SiteContainer>
      </motion.section>
    </div>
  )
}
