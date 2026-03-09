"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Pixel } from "@/components/ui/pixel"
import { type ProjectContent } from "@/lib/content"
import { getProjectMediaUrl } from "@/lib/content-media"
import { defaultTransition } from "@/lib/motion"

type SelectedProjectsProps = {
  projects: ProjectContent[]
}

export function SelectedProjects({ projects }: SelectedProjectsProps) {
  return (
    <section id="work" className="pb-32 lg:pb-40" aria-label="Selected projects">
      <div className="flex flex-col gap-px">
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} reversed={index % 2 !== 0} />
        ))}
      </div>
    </section>
  )
}

function ProjectRow({
  project,
  index,
  reversed,
}: {
  project: ProjectContent
  index: number
  reversed: boolean
}) {
  const cardMedia = project.home_card?.image
  const cardMediaUrl = getProjectMediaUrl(project.slug, cardMedia?.file)
  const cardType = (project.home_card?.type_label ?? project.meta.type ?? "UI/UX Design").trim()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...defaultTransition, delay: Math.min(index * 0.03, 0.1) }}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="project-card"
        className="group relative block border border-transparent transition-[border-color] duration-200 hover:border-border/40"
      >
        <div className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}>
          <div className="relative w-full md:w-[60%]">
            <div className="relative aspect-[16/10] w-full transform-gpu overflow-hidden bg-secondary transition-transform duration-300 ease-out">
              {cardMediaUrl ? (
                <MediaBlock src={cardMediaUrl} alt={cardMedia?.alt ?? project.meta.title} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 bg-secondary/80 transition-colors duration-300 group-hover:bg-accent/20 group-active:bg-accent/15" />
                    <p className="font-display text-[10px] uppercase tracking-[0.25em] text-muted-foreground/25">
                      {project.meta.title}
                    </p>
                  </div>
                </div>
              )}

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.012]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
                aria-hidden="true"
              />

              <div className="absolute inset-0 bg-transparent transition-colors duration-500 group-hover:bg-foreground/[0.03]" />
              <Pixel
                size="sm"
                interactive
                cubeMode
                blink={false}
                className="pointer-events-none absolute right-4 top-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-90"
              />
            </div>
          </div>

          <div className="flex w-full flex-col justify-between bg-card px-6 py-8 md:w-[40%] md:px-10 md:py-12 lg:px-14 lg:py-16">
            <div>
              <span className="mb-6 block font-display text-xs font-semibold tabular-nums text-muted-foreground/40">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground/40">
                <span className="font-display tabular-nums">{project.home_card?.year ?? project.meta.year}</span>
                <span className="h-px w-4 bg-border" aria-hidden="true" />
                <span className="font-display uppercase tracking-wider">{cardType}</span>
              </div>

              <h3 className="mb-4 transform-gpu font-display text-3xl font-bold tracking-tight text-foreground transition-[color,transform] duration-200 ease-out group-hover:translate-x-[2px] group-hover:text-accent-hover group-active:text-accent-pressed md:text-4xl lg:text-5xl">
                {project.home_card?.title ?? project.meta.title}
              </h3>
            </div>

            <div className="mt-8 flex items-center gap-2 md:mt-auto md:pt-8">
              <span className="font-display text-sm font-medium tracking-wide text-muted-foreground/50 transition-colors duration-300 group-hover:text-accent-hover group-active:text-accent-pressed">
                {project.home_card?.cta_label ?? "View Project"}
              </span>
              <span
                className="text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent-hover group-active:text-accent-pressed"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function MediaBlock({ src, alt }: { src: string; alt: string }) {
  const extension = src.split(".").pop()?.toLowerCase()
  const isVideo = extension === "mp4" || extension === "mov" || extension === "webm"

  if (isVideo) {
    return <video className="absolute inset-0 h-full w-full object-cover" src={src} autoPlay loop muted playsInline />
  }

  return <img className="absolute inset-0 h-full w-full object-cover" src={src} alt={alt} loading="lazy" decoding="async" />
}
