# Portfolio Project – File & Structure Documentation

**Project:** Personal portfolio for **Manekanda Prabhu**  
**Role:** AI Engineer | Banking Automation Architect | Technology Manager  
**Stack:** HTML5, CSS3, vanilla JavaScript (no frameworks)  
**Theme:** Light, professional, responsive, with cyan/violet accent and AI/automation focus.

---

## 1. Project file structure

```
portfolio/
├── index.html          # Main single-page portfolio (production)
├── index copy.html     # Backup copy of index (earlier version)
├── index copy 2.html   # Second backup copy (earlier version)
├── style.css           # All styles (layout, components, animations, responsive)
├── script.js           # All client-side behavior (canvas, nav, scroll, reveal)
├── PROJECT.md          # This documentation file
│
# Referenced assets (must exist in same directory for full experience)
├── profile pic.jpg    # Hero profile photo
├── RESUME.pdf         # Downloadable resume
├── TASWIYA%20v3.0.mp4 # Solution video – Taswiya Overview
├── AI-TRADE%20DOCUMENT%20PROCESSING.mp4  # Solution video – Trade automation demos
└── EDMS%20VAULT%20v5.MP4                 # Solution video – EDMS Vault
```

**Note:** `index copy.html` and `index copy 2.html` are older/backup versions of the main page and are not required for the live site. The **canonical** entry point is `index.html`.

---

## 2. File-by-file description (end to end)

### 2.1 `index.html`

**Purpose:** Single-page portfolio. Contains the full document structure, semantic sections, and all visible content.

**Head:**
- `charset` UTF-8, viewport meta for responsive.
- **Title:** `Manekanda Prabhu | AI Engineer & Technology Manager`
- **Meta description:** SEO summary (AI Engineer, Banking Automation Architect, 9+ years, trade finance, etc.).
- **Stylesheets:**
  - `style.css` – project styles.
  - Font Awesome 6.5.1 (CDN) – icons (nav, buttons, sections, cards, status, footer).

**Body structure (top to bottom):**

| Block | Purpose |
|-------|--------|
| **Decorative background** | `.code-bg` (full-page): two drifting line layers + pulse overlay. `.page-gradient`: radial gradients (cyan/violet/light) for ambient feel. Both `aria-hidden="true"`, non-interactive. |
| **Header** | `.site-header`: logo “MP” + “Manekanda Prabhu”, hamburger `.nav-toggle`, `.nav` with links to `#hero`, `#about`, `#projects`, `#videos`, `#stack`, `#experience`, `#contact`. Icons from Font Awesome. |
| **Main** | All content sections live here. |
| **Hero (`#hero`)** | Eyebrow line (“AI Engineering · AI Agents · Vibe Coding”), name, title, short intro, CTAs (View Projects, Solution Videos, Download Resume), hero-meta (Focus, Domain), and **hero-visual**: `.profile-section-wrap` containing **canvas** `#live-bg-profile` (IDE-style code lines) and `.profile-card` (profile photo, status pill “Available for AI-led automation leadership”, role/domain). |
| **About (`#about`)** | Section heading + four `.about-card` items: AI-Driven Automation, Microservices Architecture, AI-Assisted Prototyping, Banking Automation Platforms. Each has icon + title + paragraph. |
| **Core AI Projects (`#projects`)** | Section heading + three `.project-card` articles: **Taswiya** (trade settlement automation, metrics ~1 min/txn, 10k+ hours saved), **Atlas** (AI work allocation, OpenAI agents), **AI Trade Document Processing** (OCR, classification, NER). Each has project-tag, title, subtitle, highlights list, metrics row. |
| **Solution Videos (`#videos`)** | Section heading + `.video-grid` (2×2): (1) **Taswiya Overview** – `<video>` `TASWIYA%20v3.0.mp4`, (2) **EDMS Vault** – `<video>` `EDMS%20VAULT%20v5.MP4`, (3) **Trade automation platform demos** – `<video>` `AI-TRADE%20DOCUMENT%20PROCESSING.mp4`, (4) **Atlas AI allocation engine** – OTT-style “Coming Soon” placeholder with `.coming-soon-agent` (robot avatar + speech “Under production — releasing soon!”). Each video has title, controls, fallback download link. |
| **Technology Stack (`#stack`)** | Section heading + `.stack-grid` (4 columns): Backend (Java, Spring Boot, Microservices), Frontend (React JS, JavaScript), DevOps (Azure DevOps, CI/CD, Azure Boards), AI (OpenAI, OCR, AI agents, Document intelligence). |
| **Experience (`#experience`)** | Section heading + `.timeline` with vertical line and five `.timeline-item` entries: Technology Manager – Mashreq (2024–Present), Assistant Manager – Mashreq (2021–2024), Team Leader – Newgen (2020–2021), Senior Software Developer – Newgen (2018–2020), Software Developer – Newgen (2016–2018). Each has date, role, short description. |
| **Contact (`#contact`)** | Section heading + `.contact-grid`: Email (prabhurs121194@gmail.com), Mobile (+91-9629440955), each with note. |
| **Footer** | `.site-footer`: “© &lt;year&gt; Manekanda Prabhu” (year from JS), tagline. |
| **Script** | Single `<script src="script.js">` at end of body. |

**Referenced assets in HTML:**
- `profile pic.jpg` – hero profile image.
- `RESUME.pdf` – resume download.
- `TASWIYA%20v3.0.mp4`, `AI-TRADE%20DOCUMENT%20PROCESSING.mp4`, `EDMS%20VAULT%20v5.MP4` – video sources and download links.

**Accessibility:** Icons use `aria-hidden="true"` where decorative; nav toggle has `aria-label="Toggle navigation"`; video fallbacks include download links.

---

### 2.2 `style.css`

**Purpose:** All visual styling: CSS variables, reset, layout, components, animations, and responsive behavior. No preprocessor; single file.

**High-level sections (in order):**

1. **`:root` variables**  
   - Backgrounds (`--bg`, `--bg-elevated`, `--card`, `--card-soft`), borders, **--accent** (cyan), **--accent-strong** (violet), text colors, radius, shadows, transitions. Used consistently for theme and spacing.

2. **Reset / base**  
   - `box-sizing: border-box` for all; base typography and link styles.

3. **Icon styling**  
   - Shared rules for `.icon-inline`, `.nav-icon`, `.btn-icon`, `.section-icon`, `.card-icon`, `.project-tag-icon`, `.stack-icon`, `.contact-icon`, `.footer-icon`, `.status-icon` (accent color, sizes, spacing). Hover states for nav icons.

4. **Profile / live coding canvas**  
   - `.profile-section-wrap`: relative, inline-block, fixed width/min-height.  
   - `.live-bg-profile`: canvas absolutely positioned, full size, border-radius.  
   - `.profile-section-wrap .profile-card`: relative, z-index so card sits above canvas.  
   - Profile card uses semi-transparent background and backdrop blur so canvas code lines show through.

5. **Full-page code background**  
   - `.code-bg`: fixed, full viewport, z-index behind content.  
   - `.code-bg-layer`, `.code-bg-layer-1`, `.code-bg-layer-2`: gradient “line” backgrounds with `code-drift` animation.  
   - `.code-bg-pulse`: radial gradient with `code-pulse` opacity animation.  
   - `.page-gradient`: fixed radial gradients (cyan/violet/light) for ambient glow.

6. **Layout**  
   - `main`: relative, z-index.  
   - `.container`: max-width ~1120px, centered.  
   - `.section`: vertical padding.  
   - `.section-header`: title + description styling.

7. **Header**  
   - `.site-header`, `.header-inner`, `.logo`, `.logo-mark`, `.logo-text`.  
   - `.nav`: links, underline effect (`::after`), hover.  
   - `.nav-toggle`: hamburger (three spans), `.active` state for open menu; mobile-focused.

8. **Hero**  
   - `.hero`, `.hero-grid`, `.eyebrow`, `.hero-name`, `.hero-title`, `.hero-intro`.  
   - `.hero-buttons`, `.btn` (primary, ghost, subtle), hover and icon styles.  
   - `.hero-meta`, `.hero-visual`.  
   - `.profile-card`: width, border-radius, padding, semi-transparent background, hover border/shadow.  
   - `.profile-photo-wrap`, `.profile-photo`, `.profile-status-pill`, `.status-dot`, `.profile-meta` and meta label/value.

9. **About**  
   - `.about-grid` (grid), `.about-card`, hover, heading and paragraph styles.

10. **Projects**  
    - `.project-grid`, `.project-card` (with `::before` gradient on hover), `.project-tag`, `.project-card h3`, `.project-subtitle`, `.project-highlights`, `.project-metrics`, `.metric-label`, `.metric-value`.

11. **Videos**  
    - `.video-grid`: 2×2 grid, gap, `align-items: stretch`.  
    - `.video-card`: flex column, padding, hover.  
    - `.video-player-wrap`: padding, flex grow, contains title + video.  
    - `.video-player-title`, `.video-player`: max-height, object-fit.  
    - `.video-placeholder`: dashed border, badge, icon, note (for generic placeholders).  
    - `.video-badge`, `.video-icon` (play triangle), `.video-placeholder p`, `.video-note`.

12. **OTT-style Coming Soon**  
    - `.video-card-coming-soon`: overflow visible.  
    - `.video-placeholder.coming-soon`: dark gradient background, centered content, overflow visible.  
    - `.coming-soon-bg`: radial gradient overlay.  
    - `.coming-soon-content`, `.coming-soon-label` (pill, letter-spacing, gradient, pulse animation), `.coming-soon-title`, `.coming-soon-tagline`.  
    - `@keyframes coming-soon-pulse`.

13. **AI agent character**  
    - `.coming-soon-agent`: positioned bottom-right, “pop out” of card.  
    - `.agent-avatar`: circular, gradient, robot icon, `agent-pop` animation.  
    - `.agent-speech`: speech bubble with tail (`::after`), `speech-float` animation.  
    - `.agent-speech-text`.  
    - Hover on `.video-card-coming-soon`: avatar and speech animate.  
    - `@keyframes agent-pop`, `speech-float`.

14. **Tech Stack**  
    - `.stack-grid`, `.stack-column`, hover, headings, list styles.

15. **Experience timeline**  
    - `.timeline`, `.timeline-line`, `.timeline-item`, `.timeline-dot`, `.timeline-content`, `.timeline-date`, `.timeline-content h3`/`p`, hover.

16. **Contact**  
    - `.contact-grid`, `.contact-card`, hover, `.contact-card h3`/`p`/`a`, `.contact-note`.

17. **Footer**  
    - `.site-footer`, `.footer-inner`, `.footer-note`.

18. **Reveal animations**  
    - `.reveal`: initial opacity/transform; `.reveal.visible`: transition to visible.  
    - `.delay-1`, `.delay-2`, `.delay-3`: staggered transition delays (used with `.reveal`).

19. **Responsive**  
    - `@media (max-width: 900px)`: nav layout, hero grid, about/project/video/stack grids (e.g. 2 columns), timeline, contact, footer.  
    - `@media (max-width: 640px)`: container width, section padding, hero buttons, about/project/video/stack single column, etc.

**Animations:** `code-drift`, `code-pulse`, `coming-soon-pulse`, `agent-pop`, `speech-float`, plus reveal transitions.

---

### 2.3 `script.js`

**Purpose:** All client-side behavior: profile canvas (IDE-style code lines), mobile nav, smooth scroll, scroll-triggered reveal, and dynamic footer year.

**Sections:**

1. **`initLiveBg()` – Profile code lines (canvas)**  
   - Targets `.profile-section-wrap` and `#live-bg-profile`.  
   - Defines photo rect (padding and photo height) to match profile card.  
   - **IDE-style colors:** keyword, string, comment, number, name, fnCall, plain (VS Code–like).  
   - **CODE_LINES:** array of full code lines, each line an array of `{ type, text }` segments.  
   - **Particles:** spawn on the **profile picture border** (top/bottom/left/right edges), move outward with `vx`/`vy`; when off-screen, respawn on border.  
   - **Drawing:** `drawCodeLine()` draws each segment with the right color; `draw()` clears canvas, updates positions, respawns, uses `requestAnimationFrame`.  
   - **Resize:** on init, `load`, `resize` event, and a short `setTimeout` to handle late layout.  
   - Runs on `DOMContentLoaded` or immediately if already loaded.

2. **Mobile navigation**  
   - `.nav-toggle` click: toggles `.active` on toggle and `.open` on `.nav`.  
   - Clicks on nav links close the menu (remove `.active` and `.open`).

3. **Smooth scroll**  
   - For every `a[href^="#"]`: prevent default, get target by ID, scroll with `behavior: "smooth"` and a fixed header offset (72px) so anchors aren’t hidden under the header.

4. **Reveal on scroll**  
   - `IntersectionObserver` on all `.reveal` elements; when intersecting (threshold 0.12), adds class `visible` and unobserves. Fallback for older browsers: add `visible` to all `.reveal` immediately.

5. **Footer year**  
   - Sets `#year` text to `new Date().getFullYear()`.

**No external JS libraries;** all logic is vanilla.

---

### 2.4 `index copy.html` and `index copy 2.html`

**Purpose:** Backup/earlier versions of the main portfolio page. Content and structure are similar to `index.html` but may differ (e.g. different video placeholders, older section order, or missing features like the Coming Soon agent or EDMS Vault). They are **not** used by the live site; only `index.html` is the production file. Kept for reference or rollback.

---

## 3. External dependencies

| Resource | Use |
|----------|-----|
| **Font Awesome 6.5.1** (CDN) | Icons for navigation, buttons, section headers, cards, project tags, stack, contact, footer, profile status, video badge. Loaded via `<link>` in `index.html`. |

No other external CSS or JavaScript. The site works offline for layout and behavior once `style.css` and `script.js` are available; Font Awesome requires network (or a local copy) for icons.

---

## 4. Assets expected in project root

These paths are referenced from `index.html` (and possibly from backup HTML files). For the production `index.html`, the following should be present in the same directory:

| File | Referenced as | Purpose |
|------|----------------|--------|
| `profile pic.jpg` | `src="profile pic.jpg"` | Hero profile photo in profile card. |
| `RESUME.pdf` | `href="RESUME.pdf"` | Resume download button. |
| `TASWIYA v3.0.mp4` | `TASWIYA%20v3.0.mp4` | Taswiya Overview solution video. |
| `AI-TRADE DOCUMENT PROCESSING.mp4` | `AI-TRADE%20DOCUMENT%20PROCESSING.mp4` | Trade automation platform demos video. |
| `EDMS VAULT v5.MP4` | `EDMS%20VAULT%20v5.MP4` | EDMS Vault solution video. |

Spaces in filenames are encoded as `%20` in URLs. If files are missing, the profile image or videos will not load; the resume link will 404; the page layout and text will still work.

---

## 5. End-to-end flow summary

1. **Load:** Browser loads `index.html`, then `style.css` and Font Awesome; then `script.js` runs after DOM is ready.  
2. **Layout:** CSS variables and container/section rules define a single-column main with max-width content; grids (about, projects, videos, stack, contact) and timeline define section layouts.  
3. **Visuals:** Full-page code background and gradient run behind all content; hero profile area shows canvas-driven IDE-style code lines emanating from the profile picture border; profile card is semi-transparent so the effect is visible.  
4. **Videos:** Three cards use `<video>` with local MP4s; one card (Atlas) shows OTT-style “Coming Soon” with an AI agent character and speech “Under production — releasing soon!”.  
5. **Interaction:** Nav links smooth-scroll to sections; hamburger toggles mobile nav; scroll reveals trigger when sections enter view.  
6. **Footer:** Year is filled by script.  

This document describes every file created or used as part of this project and how they work together from end to end.
