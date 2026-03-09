import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const configDir = dirname(fileURLToPath(import.meta.url))
const githubRepository = process.env.GITHUB_REPOSITORY ?? ''
const repositoryName = githubRepository.split('/')[1] ?? ''
const useProjectPagesBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName.length > 0

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: useProjectPagesBasePath ? `/${repositoryName}` : undefined,
  assetPrefix: useProjectPagesBasePath ? `/${repositoryName}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: useProjectPagesBasePath ? `/${repositoryName}` : '',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: configDir,
  },
}

export default nextConfig
