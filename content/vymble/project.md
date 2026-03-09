slug: vymble
layout_template: visual-v1

meta:
  title: Vymble
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
  project_number: "02"
  year: "2025"
  type_label: UI/UX Design
  title: Vymble
  cta_label: View Project
  image:
    file: vymble-home-card.jpg
    alt: Home image for Vymble project page.

hero:
  eyebrow_label: Case Study
  title: Vymble
  description: |
    Helping friend groups break out of routines and align on what to do together, by matching group moods and surfacing lightweight, spontaneous suggestions.
  metadata_labels:
    role: Role
    year: Year
    type: Type
  quick_breakdown_cta_label: Quick breakdown
  image:
    file: vymble-hero-image.png
    alt: Hero image for Vymble project page.

quick_breakdown:
  section_id: breakdown
  eyebrow_label: TL;DR
  lines:
    - label: What
      text: A mobile concept that helps friend groups pick plans from a shared mood.
    - label: My role
      text: Research, IA, interface design, prototyping, and usability testing.
    - label: Outcome
      text: A high-fidelity prototype focused on mood matching and quick group planning.
  metric: 59% of testers said they'd use it daily

visual_story:
  - id: "01"
    label: Context Frame
    type: full_bleed
    caption: A visual system built for fast group decisions, not endless browsing.
    images:
      - file: vymble-design-system.jpg
        alt: Vymble visual direction frame.

  - id: "02"
    label: Primary Interaction
    type: full_bleed
    caption: Mood matching drives the first decision and narrows options in seconds.
    images:
      - file: vymble-mood-match.mp4
        alt: Primary interaction sequence showing mood matching.
        poster: vymble-story-05-screen-left.jpg

  - id: "03"
    label: Supporting States
    type: two_up_images
    left_caption: Group plans view with clear shared options.
    right_caption: Favorites state for quick repeat decisions.
    images:
      - file: vymble-story-05-screen-left.jpg
        alt: Supporting screen showing group plan suggestions.
      - file: vymble-story-05-screen-right.jpg
        alt: Supporting screen showing favorites and saved options.

  - id: "04"
    label: Interaction Detail
    type: detail_zoom
    caption: Detail crop highlights quick save and group-favorite feedback states.
    images:
      - file: vymble-group-favorites.mp4
        alt: Detail interaction showing favorites and micro-feedback.
        poster: vymble-story-05-screen-right.jpg
        position: "62% 50%"
        scale: 1.22

  - id: "05"
    label: Result Frame
    type: parallax_full_width
    caption: The final surface keeps planning lightweight, fast, and social.
    images:
      - file: vymble-result-frame.png
        alt: Final result frame from the Vymble interface.

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
    file: vymble-story-01-full-bleed.jpg
    alt: Final outcome visual for Vymble.
  ctas:
    prototype_label: View Prototype
    prototype_url: https://example.com
    back_label: Back to Home
    back_url: /
  next_project:
    label: Next Project
    slug: rewritten

ui_copy:
  progress_bar_enabled: true
  progress_bar_style: thin_orange_top_line
