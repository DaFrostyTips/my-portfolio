import { HomeHero } from "@/components/sections/home-hero"
import { SelectedProjects } from "@/components/sections/selected-projects"
import { getAllProjectsContent } from "@/lib/content"

export default async function Page() {
  const projects = await getAllProjectsContent()

  return (
    <main>
      <HomeHero />
      <SelectedProjects projects={projects} />
    </main>
  )
}
