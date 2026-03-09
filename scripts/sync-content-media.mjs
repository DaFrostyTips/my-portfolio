import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const contentRoot = path.join(rootDir, 'content')
const publicContentRoot = path.join(rootDir, 'public', 'content')

async function directoryExists(dirPath) {
  try {
    const directoryStat = await stat(dirPath)
    return directoryStat.isDirectory()
  } catch {
    return false
  }
}

async function syncContentMedia() {
  await rm(publicContentRoot, { recursive: true, force: true })
  await mkdir(publicContentRoot, { recursive: true })

  const entries = await readdir(contentRoot, { withFileTypes: true })
  let syncedFolders = 0

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const sourceMediaDir = path.join(contentRoot, entry.name, 'media')
    if (!(await directoryExists(sourceMediaDir))) continue

    const destinationMediaDir = path.join(publicContentRoot, entry.name, 'media')
    await mkdir(path.dirname(destinationMediaDir), { recursive: true })
    await cp(sourceMediaDir, destinationMediaDir, { recursive: true, force: true })
    syncedFolders += 1
  }

  console.log(`[sync-content-media] synced ${syncedFolders} media folder(s)`)
}

syncContentMedia().catch((error) => {
  console.error('[sync-content-media] failed to sync media', error)
  process.exitCode = 1
})
