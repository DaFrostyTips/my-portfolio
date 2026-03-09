import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectCaseStudy } from "@/components/sections/project-case-study"
import { getAllProjectsContent } from "@/lib/content"

export async function generateStaticParams() {
  const projects = await getAllProjectsContent()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projects = await getAllProjectsContent()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Not Found" }

  return {
    title: project.meta.title,
    description: project.hero?.description ?? project.meta.subtitle ?? project.meta.title,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projects = await getAllProjectsContent()
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (projectIndex === -1) {
    notFound()
  }

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return <ProjectCaseStudy project={project} nextProject={nextProject} />
}
