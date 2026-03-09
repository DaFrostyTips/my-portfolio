slug: rewritten
layout_template: visual-v1

meta:
  title: ReWritten
  subtitle: Sample subtitle placeholder
  year: "2025"
  role: Indv Project
  type: UI/UX
  tags:
    - UX Research
    - UI Design
    - Prototyping
    - Figma
    - Game UI

home_card:
  project_number: "03"
  year: "2025"
  type_label: UI/UX Design
  title: ReWritten
  cta_label: View Project
  image:
    file: rewritten-home-card.jpg
    alt: Home image for ReWritten project page.

hero:
  eyebrow_label: Case Study
  title: ReWritten
  description: |
    A meta survival game concept where interface states shift with player choices, turning each interaction into narrative tension.
  metadata_labels:
    role: Role
    year: Year
    type: Type
  quick_breakdown_cta_label: Quick breakdown
  image:
    file: hero-image.jpg
    alt: Hero image for ReWritten project page.

quick_breakdown:
  section_id: breakdown
  eyebrow_label: TL;DR
  lines:
    - label: What
      text: A narrative game UI concept where choices reshape interface behavior in real time.
    - label: My role
      text: Interaction design, visual system direction, prototyping, and playtest feedback synthesis.
    - label: Outcome
      text: Defined a scalable HUD language for branching states and readable high-pressure moments.
  metric: 12 playtesters completed critical tasks without tutorial prompts

visual_story:
  - id: "01"
    label: Context Frame
    type: full_bleed
    caption: The visual system balances cinematic tone with clear survival-critical hierarchy.
    images:
      - file: story-01-full-bleed.jpg
        alt: Context frame showing ReWritten's visual direction.

  - id: "02"
    label: Primary Interaction
    type: full_bleed
    caption: Branching choices update HUD state instantly, preserving tension without hiding core actions.
    images:
      - file: story-02-screen-a.jpg
        alt: Primary interaction sequence for player choice and HUD response.

  - id: "03"
    label: Supporting States
    type: two_up_images
    left_caption: Exploration state with low-noise directional guidance.
    right_caption: Combat state with elevated urgency and signal weight.
    images:
      - file: story-03-system-design.jpg
        alt: Supporting state showing exploration interface treatment.
      - file: story-05-screen-left.jpg
        alt: Supporting state showing combat interface treatment.

  - id: "04"
    label: Interaction Detail
    type: detail_zoom
    caption: Detail framing highlights decision prompts, cooldown timing, and state confirmation feedback.
    images:
      - file: story-04-detail-zoom.jpg
        alt: Detail interaction frame focusing on decision-level feedback.

  - id: "05"
    label: Result Frame
    type: parallax_full_width
    caption: Final frame unifies narrative intent, readability, and reactive interface behavior.
    images:
      - file: story-05-screen-right.jpg
        alt: Final result frame for the ReWritten interface system.

process_notes:
  toggle_label: Show process notes
  note_1:
    title: Research & Constraints
    body: "Early interviews with 8 design leads revealed a consistent pain point: feedback was scattered across Slack threads, Figma comments, and Loom videos. The core constraint was building something that respected the async nature of distributed teams while still feeling immediate and conversational."
  note_2:
    title: Key Decision
    body: "We chose to anchor feedback directly onto the design artifact rather than as a separate thread. This meant building a custom annotation layer that could handle both pixel-precise pins and free-form area selections, which became the defining interaction of the product."

outcome:
  section_label: Outcome
  final_visual:
    file: outcome-final-visual.jpg
    alt: Final outcome visual for ReWritten.
  ctas:
    prototype_label: View Prototype
    prototype_url: https://example.com
    back_label: Back to Home
    back_url: /
  next_project:
    label: Next Project
    slug: levelyst-ai

ui_copy:
  progress_bar_enabled: true
  progress_bar_style: thin_orange_top_line
