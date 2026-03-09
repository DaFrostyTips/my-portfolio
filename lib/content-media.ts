function getPublicBasePath(): string {
  const nextPublicBasePath = process.env.NEXT_PUBLIC_BASE_PATH
  if (typeof nextPublicBasePath === 'string' && nextPublicBasePath.length > 0) {
    return nextPublicBasePath
  }

  const githubRepository = process.env.GITHUB_REPOSITORY
  if (typeof githubRepository === 'string' && githubRepository.includes('/')) {
    const repositoryName = githubRepository.split('/')[1]
    if (repositoryName) return `/${repositoryName}`
  }

  return ''
}

export function getProjectMediaUrl(slug: string, file?: string): string | null {
  if (!file) return null
  const basePath = getPublicBasePath()
  const encodedFilePath = file
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `${basePath}/content/${encodeURIComponent(slug)}/media/${encodedFilePath}`
}
