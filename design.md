# Design Guide — Sandra Martins Ribeiro Advocacia

## Visual Direction
Editorial minimalism inspired by high-end legal/luxury brands. Bold serif headlines, generous white space, full-bleed imagery, gold accents. Feels authoritative yet approachable.

## Color Palette
- `--navy`: #0D1B2A (primary background sections, nav)
- `--navy-mid`: #162032 (card backgrounds, hover states)
- `--gold`: #C9A84C (accents, dividers, CTA highlights)
- `--gold-light`: #E8C97A (hover gold, subtle glows)
- `--cream`: #F7F4EE (off-white backgrounds, section fills)
- `--white`: #FFFFFF (text on dark, card surfaces)
- `--charcoal`: #2C2C2C (body text on light)
- `--muted`: #6B6B6B (captions, secondary text)

## Typography
- **Display/Headlines:** `Playfair Display` — serif, weight 400–700, elegant legal authority
- **Body:** `Inter` — wait, no Inter per rules → use `Source Serif 4` for subheadings, `DM Sans` for body/UI
- **Import:** Google Fonts: Playfair Display (400, 500, 700), Source Serif 4 (300, 400), DM Sans (300, 400, 500)

## Spacing & Layout
- Full-bleed sections, max-width 1280px content container
- Large section padding: 100px–140px vertical
- Editorial: text-heavy left column with visual right column
- Generous line-height: 1.6–1.8 body, 1.1–1.2 headlines
- Headlines can be very large: 72–96px on desktop

## Components
- **Nav:** Fixed, transparent → becomes navy on scroll. Logo left, links center, gold CTA button right
- **Hero:** Full-screen (100vh), dark overlay on image, massive serif headline, gold underline accent
- **Section dividers:** Thin gold horizontal rule (1px, 40% width, centered)
- **Cards:** White on cream bg, subtle shadow, gold left border on hover
- **Buttons Primary:** Navy fill, gold border, white text → hover: gold fill, navy text
- **Buttons Secondary:** Transparent, gold border, gold text
- **Gold accent elements:** thin rules, number counters, icon decorations

## Motion
- Page load: staggered fade-up on hero elements (0.3s delays)
- Scroll: sections fade-in with slight translateY via IntersectionObserver
- Hover: smooth 0.3s transitions on cards and buttons
- Nav: smooth background transition on scroll

## Anti-patterns to avoid
- No purple/teal gradients
- No rounded pill buttons (use subtle 2px radius max)
- No stock-photo cliché layouts
- No cramped text — always breathe
