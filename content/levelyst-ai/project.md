slug: levelyst-ai
layout_template: visual-v1

meta:
  title: Levelyst.AI
  subtitle: Sample subtitle placeholder
  year: "2025"
  role: Indv Project
  type: UI/UX
  tags:
    - UX Research
    - UI Design
    - Prototyping
    - Figma

home_card:
  project_number: "01"
  year: "2025"
  type_label: UI/UX Design
  title: Levelyst.AI
  cta_label: View Project
  image:
    file: levelyst-ai-home-card.jpg
    alt: Home image for Levelyst-ai project page.

hero:
  eyebrow_label: Case Study
  title: Levelyst.AI
  description: |
    AI creation platform that rapidly translates design intent into rough, testable scenes of Game Development
  metadata_labels:
    role: Role
    year: Year
    type: Type
  quick_breakdown_cta_label: Quick breakdown
  image:
    file: levelyst-ai-hero-image.jpg
    alt: Hero image for Levelyst.AI project page.

quick_breakdown:
  section_id: breakdown
  eyebrow_label: TL;DR
  lines:
    - label: What
      text: A concept app that helps game developers create a low-fi prototype of their concept.
    - label: My role
      text: Research, information architecture, interface design, prototyping, and user testing.
    - label: Outcome
      text: Created a working prototype up until the final product of the low-fi prototype.
  metric: 87% of testers said they'd use it daily

visual_story:
  - id: "01"
    label: Context Frame
    type: full_bleed
    caption: Mind map to determine the direction within Video Games.
    images:
      - file: levelyst-ai-story-01-full-bleed.png
        alt: Context frame showing the Levelyst visual language.

  - id: "02"
    label: Primary Interaction
    type: full_bleed
    caption: Prompt-to-scene flow turns rough concepts into playable low-fidelity outputs.
    images:
      - file: levelyst-ai-story-02-screen-a.mp4
        alt: Primary interaction sequence for scene generation.

  - id: "03"
    label: Supporting States
    type: two_up_images
    left_caption: Community creations to allow collaboration and sharing.
    right_caption: Parameter controls for each module to allow custom need.
    images:
      - file: levelyst-ai-story-03-system-design.jpg
        alt: Supporting state showing setup controls.
      - file: levelyst-ai-story-05-screen-left.jpg
        alt: Supporting state showing generated scene overview.

  - id: "04"
    label: Interaction Detail
    type: detail_zoom
    caption: Detail frame focuses on quick refinement controls after generation.
    images:
      - file: levelyst-ai-story-02-screen-b.mp4
        alt: Detail interaction showing refinement and adjustment tools.
        position: "58% 50%"
        scale: 1.14

  - id: "05"
    label: Result Frame
    type: parallax_full_width
    caption: Final frame shows a complete concept-to-scene pipeline in one surface.
    images:
      - file: levelyst-ai-story-05-screen-right.mp4
        alt: Final result frame for the Levelyst experience.

process_notes:
  toggle_label: Show process notes
  note_1:
    title: Research & Constraints
    body: "Early interviews with game developers revealed a consistent pain point: it takes too much time creating a rough protoype of just the concept. The core constraint was building something that sped up the process of creating the initial idea to help developers iterate or pivot in ideas."
  note_2:
    title: Key Decision
    body: "I chose to build a vibecoding tool that blends amatuer and professional software design to suit the needs of both developers and designers. Allowing both to collaborate and work together in cohesive manner."

outcome:
  section_label: Outcome
  final_visual:
    file: levelyst-ai-outcome-final-visual.jpg
    alt: Final outcome visual for Levelyst.AI.
  ctas:
    prototype_label: View Prototype
    prototype_url: https://example.com
    back_label: Back to Home
    back_url: /
  next_project:
    label: Next Project
    slug: vymble

ui_copy:
  progress_bar_enabled: true
  progress_bar_style: thin_orange_top_line
