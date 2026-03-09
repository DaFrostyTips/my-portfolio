export function getProjectMediaUrl(slug: string, file?: string): string | null {
  if (!file) return null
  const encodedFilePath = file
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `/content/${encodeURIComponent(slug)}/media/${encodedFilePath}`
}
