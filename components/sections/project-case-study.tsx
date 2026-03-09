"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { SectionSpacing, SiteContainer } from "@/components/layout/site-shell"
import { Pixel } from "@/components/ui/pixel"
import { type ProjectContent, type ProjectMedia, type VisualStoryType } from "@/lib/content"
import { getProjectMediaUrl } from "@/lib/content-media"
import { revealOnView, transitions } from "@/lib/motion"

const fadeInUp = revealOnView
const canonicalVisualStory: Array<{ id: string; type: VisualStoryType; label: string; aspectRatio?: string }> = [
  { id: "01", type: "full_bleed", label: "Context Frame", aspectRatio: "aspect-[16/9]" },
  { id: "02", type: "full_bleed", label: "Primary Interaction", aspectRatio: "aspect-[16/9]" },
  { id: "03", type: "two_up_images", label: "Supporting States" },
  { id: "04", type: "detail_zoom", label: "Interaction Detail" },
  { id: "05", type: "parallax_full_width", label: "Result Frame", aspectRatio: "aspect-[16/9]" },
]
const mediaFrameClass =
  "overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"

export function ProjectCaseStudy({
  project,
  nextProject,
}: {
  project: ProjectContent
  nextProject: ProjectContent
}) {
  return (
    <main>
      <ProjectScrollProgress />
      <CaseHero project={project} />
      <QuickBreakdown project={project} />
      <VisualStory project={project} />
      <OutcomeBlock project={project} nextProject={nextProject} />
    </main>
  )
}

function ProjectScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [navOffset, setNavOffset] = useState(72)

  useEffect(() => {
    let rafId = 0
    let lastProgress = -1

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const next = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0
      if (Math.abs(next - lastProgress) > 0.002) {
        lastProgress = next
        setProgress(next)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  useEffect(() => {
    const updateNavOffset = () => {
      const nav = document.querySelector<HTMLElement>('[data-site-nav="true"]')
      const nextOffset = nav ? Math.round(nav.getBoundingClientRect().height) : 72
      setNavOffset(nextOffset)
    }

    updateNavOffset()
    const nav = document.querySelector<HTMLElement>('[data-site-nav="true"]')
    const observer = nav ? new ResizeObserver(updateNavOffset) : null
    if (observer && nav) observer.observe(nav)

    window.addEventListener("resize", updateNavOffset)

    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", updateNavOffset)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-0 z-[69] h-px w-full bg-transparent"
      style={{ top: navOffset }}
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-accent"
        initial={false}
        style={{ transformOrigin: "0% 50%" }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

function CaseHero({ project }: { project: ProjectContent }) {
  const heroImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroImageRef.current) return
      heroImageRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const heroImage = project.hero?.image

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 lg:pt-32" aria-label="Project hero">
      <SiteContainer className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col justify-center lg:py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={transitions.slower}>
            <p className="mb-6 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {project.hero?.eyebrow_label ?? "Case Study"}
            </p>

            <h1 className="relative mb-8 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              <span className="text-balance">{project.hero?.title ?? project.meta.title}</span>
              <span className="absolute -right-2 bottom-2 inline-block h-2.5 w-2.5 bg-accent/70" aria-hidden="true" />
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {project.hero?.description ?? project.meta.subtitle ?? ""}
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <MetaItem label={project.hero?.metadata_labels?.role ?? "Role"} value={project.meta.role} />
              <span className="hidden h-3 w-px bg-border lg:block" aria-hidden="true" />
              <MetaItem label={project.hero?.metadata_labels?.year ?? "Year"} value={project.meta.year} />
              <span className="hidden h-3 w-px bg-border lg:block" aria-hidden="true" />
              <MetaItem label={project.hero?.metadata_labels?.type ?? "Type"} value={project.meta.type} />
            </div>

            <div className="mb-10 flex flex-wrap gap-2">
              {project.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-secondary px-4 py-2 font-display text-xs font-medium tracking-wide text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={`#${project.quick_breakdown?.section_id ?? "breakdown"}`}
              className="group inline-flex items-center gap-2 font-display text-sm font-medium tracking-wide text-foreground transition-colors hover:text-accent-hover active:text-accent-pressed"
            >
              <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              {project.hero?.quick_breakdown_cta_label ?? "Quick breakdown"}
              <span className="inline-block transition-transform group-hover:translate-y-0.5" aria-hidden="true">
                &#9660;
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transitions.long, delay: 0.2 }}
          className="relative flex items-center justify-center lg:py-10"
        >
          <div ref={heroImageRef} className="relative w-full will-change-transform">
            <div className={`relative aspect-[4/5] w-full bg-secondary lg:aspect-[3/4] ${mediaFrameClass}`}>
              {heroImage?.file ? (
                <MediaAsset
                  slug={project.slug}
                  media={heroImage}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <ImagePlaceholder label="Hero Image" />
              )}
            </div>
          </div>
        </motion.div>
      </SiteContainer>

      <GridOverlay size={80} opacity={0.02} />
    </section>
  )
}

function QuickBreakdown({ project }: { project: ProjectContent }) {
  const breakdown = project.quick_breakdown

  return (
    <section
      id={breakdown?.section_id ?? "breakdown"}
      className="relative border-y border-border/40 py-16 lg:py-20"
      aria-label="Quick breakdown"
    >
      <SiteContainer>
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl">
          <p className="mb-8 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
            <span className="mr-3 inline-block h-px w-8 bg-border align-middle" aria-hidden="true" />
            {breakdown?.eyebrow_label ?? "TL;DR"}
          </p>

          <div className="flex flex-col gap-4">
            {(breakdown?.lines ?? []).map((line) => (
              <BreakdownLine key={line.label} label={line.label} text={line.text} />
            ))}
          </div>

          {breakdown?.metric ? (
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
              <p className="font-display text-sm font-medium tracking-wide text-foreground">{breakdown.metric}</p>
            </div>
          ) : null}
        </motion.div>
      </SiteContainer>
    </section>
  )
}

function VisualStory({ project }: { project: ProjectContent }) {
  const sourceSections = project.visual_story ?? []
  const hasProcessNotes = Boolean(
    project.process_notes?.note_1?.body?.trim() || project.process_notes?.note_2?.body?.trim()
  )
  const blocks: React.ReactNode[] = []

  for (const spec of canonicalVisualStory) {
    if (spec.id === "02" && hasProcessNotes) {
      blocks.push(<ProcessNotes key="process-notes-inline" project={project} />)
    }

    const exactSection = sourceSections.find((section) => section.id === spec.id && section.type === spec.type)
    const byIdFallback = sourceSections.find((section) => section.id === spec.id)
    const section = (
      exactSection ??
      (byIdFallback ? { ...byIdFallback, type: spec.type } : { id: spec.id, label: spec.label, type: spec.type, images: [] })
    ) as NonNullable<ProjectContent["visual_story"]>[number]

    if (spec.type === "full_bleed") {
      blocks.push(
        <FullBleedMedia
          key={spec.id}
          project={project}
          section={section}
          aspectRatio={spec.aspectRatio ?? "aspect-[16/9]"}
        />
      )
      continue
    }

    if (spec.type === "two_up_images") {
      blocks.push(<TwoUpImages key={spec.id} project={project} section={section} />)
      continue
    }

    if (spec.type === "detail_zoom") {
      blocks.push(<DetailZoom key={spec.id} project={project} section={section} />)
      continue
    }

    if (spec.type === "parallax_full_width") {
      blocks.push(
        <ParallaxMedia
          key={spec.id}
          project={project}
          section={section}
          aspectRatio={spec.aspectRatio ?? "aspect-[16/9]"}
        />
      )
    }
  }

  return <SectionSpacing aria-label="Visual story">{blocks}</SectionSpacing>
}

function ProcessNotes({ project }: { project: ProjectContent }) {
  const notes = project.process_notes
  const hasContent = Boolean(notes?.note_1?.body?.trim() || notes?.note_2?.body?.trim())

  if (!hasContent) return null

  return (
    <section className="border-y border-border/40 py-16 lg:py-20" aria-label="Process notes">
      <SiteContainer>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <Pixel size="sm" blink={false} className="opacity-75" />
            <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
              {notes?.toggle_label?.replace(/^Show\s+/i, "") ?? "Process Notes"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                {notes?.note_1?.title ?? "Research & Constraints"}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{notes?.note_1?.body ?? ""}</p>
            </div>
            <div>
              <p className="mb-4 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                {notes?.note_2?.title ?? "Key Decision"}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{notes?.note_2?.body ?? ""}</p>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}

function OutcomeBlock({ project, nextProject }: { project: ProjectContent; nextProject: ProjectContent }) {
  const outcome = project.outcome

  return (
    <SectionSpacing aria-label="Outcome">
      <motion.div {...fadeInUp} className="mb-16">
        <div className={`relative aspect-[21/9] w-full bg-secondary ${mediaFrameClass}`}>
          {outcome?.final_visual?.file ? (
            <MediaAsset slug={project.slug} media={outcome.final_visual} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ImagePlaceholder label="Final Visual" />
          )}
        </div>
      </motion.div>

      <SiteContainer>
        <motion.div {...fadeInUp}>
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            <Link
              href={outcome?.ctas?.back_url ?? "/"}
              className="font-display text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; {outcome?.ctas?.back_label ?? "Back to Home"}
            </Link>
            <a
              href={outcome?.ctas?.prototype_url ?? "#"}
              className="group inline-flex items-center gap-3 rounded-sm border border-border bg-transparent px-6 py-4 font-display text-sm font-medium tracking-wide text-foreground transition-all hover:border-accent-hover hover:text-accent-hover active:border-accent-pressed active:text-accent-pressed"
            >
              <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              {outcome?.ctas?.prototype_label ?? "View Prototype"}
            </a>
          </div>
        </motion.div>
      </SiteContainer>

      <div className="mt-24 border-t border-border/40 lg:mt-32">
        <SiteContainer>
          <Link
            href={`/projects/${outcome?.next_project?.slug ?? nextProject.slug}`}
            className="group flex items-center justify-between py-12 lg:py-16"
            aria-label={`View next project: ${nextProject.meta.title}`}
          >
            <div>
              <p className="mb-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {outcome?.next_project?.label ?? "Next Project"}
              </p>
              <p className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-hover group-active:text-accent-pressed md:text-4xl lg:text-5xl">
                {nextProject.meta.title}
              </p>
            </div>
            <span
              className="font-display text-3xl text-muted-foreground transition-all group-hover:translate-x-2 group-hover:text-accent-hover group-active:text-accent-pressed lg:text-5xl"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        </SiteContainer>
      </div>
    </SectionSpacing>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="font-display text-xs uppercase tracking-wider text-muted-foreground/60">{label}</span>
      <span className="font-sans text-sm text-foreground">{value}</span>
    </span>
  )
}

function BreakdownLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 w-16 shrink-0 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
        {label}
      </span>
      <p className="text-base leading-relaxed text-muted-foreground">{text}</p>
    </div>
  )
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, [0, 2000], [0, 210])

  return (
    <SiteContainer className="mb-8 flex items-center gap-2">
      <span className="font-display text-xs font-medium tabular-nums text-muted-foreground/45">{number}</span>
      <span className="font-display text-xs text-muted-foreground/45" aria-hidden="true">
        —
      </span>
      <span className="font-display text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">{label}</span>
      <motion.span style={shouldReduceMotion ? undefined : { rotate }} className="inline-flex origin-center">
        <Pixel size="sm" blink={false} className="opacity-85" />
      </motion.span>
    </SiteContainer>
  )
}

function ImagePlaceholder({ label }: { label?: string }) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 bg-secondary/80" />
          <p className="font-display text-xs uppercase tracking-widest text-muted-foreground/40">{label || "Image"}</p>
        </div>
      </div>
      <GridOverlay size={40} opacity={0.02} />
    </>
  )
}

function GridOverlay({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  )
}

function FullBleedMedia({
  project,
  section,
  aspectRatio,
}: {
  project: ProjectContent
  section: NonNullable<ProjectContent["visual_story"]>[number]
  aspectRatio: string
}) {
  const isContextFrame = section.id === "01"
  const containerClass = isContextFrame
    ? `relative w-full ${aspectRatio}`
    : `relative w-full bg-secondary ${mediaFrameClass} ${aspectRatio}`
  const mediaClass = isContextFrame
    ? "absolute inset-0 h-full w-full object-contain"
    : "absolute inset-0 h-full w-full object-cover"

  return (
    <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
      <SectionLabel number={section.id} label={section.label} />
      <div className={containerClass}>
        {section.images?.[0]?.file ? (
          <MediaAsset slug={project.slug} media={section.images[0]} className={mediaClass} />
        ) : (
          <ImagePlaceholder label="Full-width visual" />
        )}
      </div>
      <SiteContainer>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground lg:max-w-xl">{section.caption ?? ""}</p>
      </SiteContainer>
    </motion.div>
  )
}

function ParallaxMedia({
  project,
  section,
  aspectRatio,
}: {
  project: ProjectContent
  section: NonNullable<ProjectContent["visual_story"]>[number]
  aspectRatio: string
}) {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0

    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        if (!imageRef.current) return
        const rect = imageRef.current.getBoundingClientRect()
        const offset = (rect.top - window.innerHeight / 2) * 0.08
        imageRef.current.style.transform = `translateY(${offset}px)`
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
      <SectionLabel number={section.id} label={section.label} />
      <div className="overflow-hidden">
        <div ref={imageRef} className="will-change-transform">
          <div className={`relative w-full bg-secondary ${mediaFrameClass} ${aspectRatio}`}>
            {section.images?.[0]?.file ? (
              <MediaAsset slug={project.slug} media={section.images[0]} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label="Full-width visual" />
            )}
          </div>
        </div>
      </div>
      <SiteContainer>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground lg:max-w-xl">{section.caption ?? ""}</p>
      </SiteContainer>
    </motion.div>
  )
}

function DetailZoom({
  project,
  section,
}: {
  project: ProjectContent
  section: NonNullable<ProjectContent["visual_story"]>[number]
}) {
  return (
    <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
      <SectionLabel number={section.id} label={section.label} />
      <SiteContainer>
        <div className="mx-auto max-w-4xl">
          <div className={`relative aspect-[16/10] bg-secondary ${mediaFrameClass}`}>
            {section.images?.[0]?.file ? (
              <MediaAsset slug={project.slug} media={section.images[0]} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label="UI Detail Close-up" />
            )}
          </div>
        </div>
      </SiteContainer>
      <SiteContainer>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground lg:max-w-xl">{section.caption ?? ""}</p>
      </SiteContainer>
    </motion.div>
  )
}

function TwoUpImages({
  project,
  section,
}: {
  project: ProjectContent
  section: NonNullable<ProjectContent["visual_story"]>[number]
}) {
  return (
    <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
      <SectionLabel number={section.id} label={section.label} />
      <SiteContainer className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className={`relative aspect-[4/3] bg-secondary ${mediaFrameClass}`}>
            {section.images?.[0]?.file ? (
              <MediaAsset slug={project.slug} media={section.images[0]} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label="Screen Left" />
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{section.left_caption ?? ""}</p>
        </div>
        <div>
          <div className={`relative aspect-[4/3] bg-secondary ${mediaFrameClass}`}>
            {section.images?.[1]?.file ? (
              <MediaAsset slug={project.slug} media={section.images[1]} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label="Screen Right" />
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{section.right_caption ?? ""}</p>
        </div>
      </SiteContainer>
    </motion.div>
  )
}

function MediaAsset({ slug, media, className }: { slug: string; media: ProjectMedia; className: string }) {
  const src = getProjectMediaUrl(slug, media.file)
  const poster = getProjectMediaUrl(slug, media.poster)
  const extension = media.file.split('.').pop()?.toLowerCase()
  const isVideo = extension === 'mp4' || extension === 'mov' || extension === 'webm'
  const position = media.position ?? '50% 50%'
  const scale = Math.min(1.35, Math.max(1, media.scale ?? 1))
  const mediaStyle = {
    objectPosition: position,
    transform: `scale(${scale})`,
    transformOrigin: '50% 50%',
  } as const

  if (!src) return null

  if (isVideo) {
    return <video className={className} style={mediaStyle} src={src} poster={poster ?? undefined} autoPlay loop muted playsInline preload="metadata" />
  }

  return <img className={className} style={mediaStyle} src={src} alt={media.alt ?? ''} loading="lazy" decoding="async" />
}
