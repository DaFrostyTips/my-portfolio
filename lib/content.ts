import fs from 'node:fs/promises'
import path from 'node:path'
import YAML from 'yaml'

export type VisualStoryType =
  | 'full_bleed'
  | 'two_up_with_text'
  | 'parallax_full_width'
  | 'detail_zoom'
  | 'two_up_images'

export type ProjectMedia = {
  file: string
  alt?: string
  poster?: string
  position?: string
  scale?: number
}

export type ProjectContent = {
  slug: string
  layout_template?: 'visual-v1'
  meta: {
    title: string
    subtitle?: string
    year: string
    role: string
    type: string
    tags: string[]
  }
  home_card: {
    project_number?: string
    year?: string
    type_label?: string
    title?: string
    cta_label?: string
    image?: ProjectMedia
  }
  hero: {
    eyebrow_label?: string
    title?: string
    description?: string
    metadata_labels?: {
      role?: string
      year?: string
      type?: string
    }
    quick_breakdown_cta_label?: string
    image?: ProjectMedia
  }
  quick_breakdown?: {
    section_id?: string
    eyebrow_label?: string
    lines?: Array<{ label: string; text: string }>
    metric?: string
  }
  visual_story?: Array<{
    id: string
    label: string
    type: VisualStoryType
    caption?: string
    paragraph?: string
    left_caption?: string
    right_caption?: string
    images?: ProjectMedia[]
  }>
  process_notes?: {
    toggle_label?: string
    note_1?: { title?: string; body?: string }
    note_2?: { title?: string; body?: string }
  }
  outcome?: {
    section_label?: string
    final_visual?: ProjectMedia
    ctas?: {
      prototype_label?: string
      prototype_url?: string
      back_label?: string
      back_url?: string
    }
    next_project?: {
      label?: string
      slug?: string
    }
  }
}

const CONTENT_DIR = path.join(process.cwd(), 'content')
const STRICT_CONTENT_VALIDATION = process.env.STRICT_CONTENT_VALIDATION === '1'

const canonicalStorySequence: Array<{ id: string; type: VisualStoryType }> = [
  { id: '01', type: 'full_bleed' },
  { id: '02', type: 'full_bleed' },
  { id: '03', type: 'two_up_images' },
  { id: '04', type: 'detail_zoom' },
  { id: '05', type: 'parallax_full_width' },
]

function normalizeYamlText(raw: string): string {
  return raw
    .split('\n')
    .map((line) => {
      const match = line.match(/^(\s*[A-Za-z0-9_-]+:\s*)(.+)$/)
      if (!match) return line

      const prefix = match[1]
      const value = match[2].trim()

      if (!value.includes(':')) return line
      if (/^["']/.test(value)) return line
      if (/^[|>\[{]/.test(value)) return line

      const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
      return `${prefix}"${escaped}"`
    })
    .join('\n')
}

function projectSorter(a: ProjectContent, b: ProjectContent) {
  const an = Number(a.home_card?.project_number ?? 999)
  const bn = Number(b.home_card?.project_number ?? 999)
  if (an !== bn) return an - bn
  return a.slug.localeCompare(b.slug)
}

function collectProjectMedia(project: ProjectContent): ProjectMedia[] {
  const media: ProjectMedia[] = []

  if (project.home_card?.image) media.push(project.home_card.image)
  if (project.hero?.image) media.push(project.hero.image)
  if (project.outcome?.final_visual) media.push(project.outcome.final_visual)

  for (const section of project.visual_story ?? []) {
    for (const item of section.images ?? []) {
      media.push(item)
    }
  }

  return media
}

async function validateProjectContent(project: ProjectContent, projectDir: string) {
  const issues: string[] = []
  const layoutTemplate = project.layout_template ?? 'visual-v1'
  project.layout_template = layoutTemplate

  if (layoutTemplate !== 'visual-v1') {
    issues.push(`layout_template must be "visual-v1", got "${layoutTemplate}"`)
  }

  const story = project.visual_story ?? []
  if (story.length !== canonicalStorySequence.length) {
    issues.push(
      `visual_story must contain exactly ${canonicalStorySequence.length} sections, found ${story.length}`
    )
  }

  for (let index = 0; index < canonicalStorySequence.length; index += 1) {
    const expected = canonicalStorySequence[index]
    const section = story[index]

    if (!section) continue

    if (section.id !== expected.id || section.type !== expected.type) {
      issues.push(
        `visual_story[${index}] must be { id: "${expected.id}", type: "${expected.type}" }, got { id: "${section.id}", type: "${section.type}" }`
      )
    }

    if (!section.images?.length) {
      issues.push(`visual_story[${index}] (${section.id}) must include at least one media file`)
    }
  }

  const mediaDir = path.join(projectDir, 'media')
  const allMedia = collectProjectMedia(project)
  for (const media of allMedia) {
    const pathsToCheck = [media.file, media.poster].filter((value): value is string => Boolean(value))
    for (const fileName of pathsToCheck) {
      try {
        await fs.access(path.join(mediaDir, fileName))
      } catch {
        issues.push(`missing media file: ${fileName}`)
      }
    }
  }

  if (issues.length === 0) return

  const message = `[content validation] ${project.slug}\n- ${issues.join('\n- ')}`
  if (STRICT_CONTENT_VALIDATION) {
    throw new Error(message)
  }

  console.warn(message)
}

export async function getAllProjectsContent(): Promise<ProjectContent[]> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true })
  const projectDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  const projects = await Promise.all(
    projectDirs.map(async (dirName) => {
      const projectFile = path.join(CONTENT_DIR, dirName, 'project.md')
      const raw = await fs.readFile(projectFile, 'utf8')
      const parsed = YAML.parse(normalizeYamlText(raw)) as ProjectContent
      const projectDir = path.join(CONTENT_DIR, dirName)

      await validateProjectContent(parsed, projectDir)

      return parsed
    })
  )

  return projects.sort(projectSorter)
}

export async function getProjectContentBySlug(slug: string): Promise<ProjectContent | null> {
  const projects = await getAllProjectsContent()
  return projects.find((project) => project.slug === slug) ?? null
}

export function getProjectMediaUrl(slug: string, file?: string): string | null {
  if (!file) return null
  const encodedFilePath = file
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `/content/${encodeURIComponent(slug)}/media/${encodedFilePath}`
}
