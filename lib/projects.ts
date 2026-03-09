export interface PlaygroundItem {
  id: string
  title: string
  category: string
  year: string
  description: string
  aspect: string
}

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "motion-study-01",
    title: "Motion Study 01",
    category: "Animation",
    year: "2025",
    description: "Exploring easing curves through abstract shapes.",
    aspect: "aspect-square",
  },
  {
    id: "grid-system",
    title: "Grid System",
    category: "Layout",
    year: "2025",
    description: "A responsive grid that breathes with content.",
    aspect: "aspect-[4/5]",
  },
  {
    id: "color-field",
    title: "Color Field",
    category: "Generative",
    year: "2024",
    description: "Generative color compositions that shift over time.",
    aspect: "aspect-[3/4]",
  },
  {
    id: "micro-interactions",
    title: "Micro Interactions",
    category: "UI Detail",
    year: "2024",
    description: "A collection of small, purposeful interface moments.",
    aspect: "aspect-square",
  },
  {
    id: "type-play",
    title: "Type Play",
    category: "Typography",
    year: "2024",
    description: "Kinetic typography experiments with variable fonts.",
    aspect: "aspect-[4/5]",
  },
  {
    id: "sound-shapes",
    title: "Sound Shapes",
    category: "Audio Visual",
    year: "2024",
    description: "Visual representations of sound through geometry.",
    aspect: "aspect-[3/4]",
  },
]
