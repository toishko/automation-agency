# Implementation Plan: Visual & Conversion Updates

> **For AI agents:** This file is the source of truth for all pending UI/feature work on the Automation Agency Landing page (`src/App.tsx`). Check the master checklist first, then jump to the relevant feature section for full specs and a detailed sub-checklist. Mark items with `[x]` as you complete them.

---

## ✅ Master Progress Checklist

| # | Feature | Status |
|---|---|--------|
| 1 | Hero background — blobs + drift animation + dot-grid | ⬜ Not started |
| 2 | Testimonials / Social Proof section | ⬜ Not started |
| 3 | FAQ Accordion section | ⬜ Not started |
| 4 | Supabase form submission (loading + error states) | ⬜ Not started |
| 5 | Nav compact/scrolled state on scroll | ⬜ Not started |
| 6 | Hero word-swap typewriter effect | ⬜ Not started |
| 7 | Final CTA radial spotlight + grid overlay | ⬜ Not started |

> Update the **Status** column as you go: `⬜ Not started` → `🔄 In progress` → `✅ Done`

---

## Feature 1: Hero Background — Depth and Motion

## Objective
Enhance the Hero section background by adding depth, texture, and subtle motion to create a more dynamic and "alive" feel without distracting from the main content.

## Specifications
1. **Layered Blob System:** Replace the existing two static blur blobs with a denser layered system consisting of three blobs:
   - 1 large centered radial glow
   - 2 smaller off-axis blobs
2. **Texture Overlay:** Add a subtle dot-grid SVG pattern overlay at 3-4% opacity to provide a flat dark background texture without noise.
3. **Motion (Animation):** Implement a slow, infinite CSS keyframe animation applied to each blob.
   - Animation settings: `animate-[drift_20s_ease-in-out_infinite_alternate]`
   - Effect: Gently drifts the position of the blobs over 20 seconds.

## Progress Checklist

- [ ] **Step 1: Define CSS Animations**
  - Update `tailwind.config.js` or `index.css` to include the `drift` keyframes.
  - Create the `animate-drift` utility class for the 20s drift effect.

- [ ] **Step 2: Update Hero Background Structure**
  - Locate the Hero section (likely in `src/App.tsx` or a dedicated Hero component).
  - Remove the existing two static blur blobs.
  - Insert the new three-blob layout (one large center, two smaller off-axis) with appropriate colors/opacity.
  - Apply the `animate-[drift_20s_ease-in-out_infinite_alternate]` class to all three blobs.

- [ ] **Step 3: Add Dot-Grid Pattern**
  - Insert an SVG background pattern for the dot-grid.
  - Apply the pattern as an absolute overlay spanning the Hero background.
  - Ensure the pattern opacity is strictly set to 3-4%.

- [ ] **Step 4: Review and Test**
  - Verify that the blobs are positioned correctly and animating smoothly without causing layout shifts.
  - Ensure the dot-grid texture is subtle and adds depth properly.
  - Confirm responsiveness across mobile and desktop breakpoints.

---

## Feature 2: Testimonials / Social Proof Section

### Objective
Add a testimonial section between "Numbers that matter" and "What happens next" to build trust and social proof.

### Specifications
- 2–3 testimonial cards with: quote, avatar initials circle, name, role, and company
- Glassmorphism card style matching existing cards
- Horizontal snap-scroll on mobile so cards don't stack awkwardly
- Static data stored directly in the component (no backend)

### Progress Checklist
- [ ] Write static testimonial data array (quote, name, role, company, initials)
- [ ] Build `TestimonialCard` component with glassmorphism styling and avatar initials circle
- [ ] Build `Testimonials` section wrapper with horizontal snap-scroll on mobile
- [ ] Insert section between "Numbers that matter" and "What happens next" in `App.tsx`
- [ ] Test responsiveness on mobile (snap scrolling) and desktop (row layout)

---

## Feature 3: FAQ Accordion Section

### Objective
Add a collapsible FAQ section before the audit form to pre-handle common objections and improve conversion.

### Specifications
- 5–7 FAQ items covering: cost, time investment, technical skill required, ROI, etc.
- `useState` tracks which item is currently open (single open at a time)
- Content reveal animated with `max-height` CSS transition
- `+` icon rotates 45° to `×` on open using CSS `rotate` transition

### Progress Checklist
- [ ] Write FAQ data array (question + answer for 5–7 items)
- [ ] Build `FAQItem` component with open/close toggle and animated `max-height` reveal
- [ ] Add rotating `+` / `×` icon using CSS `transition` on `rotate`
- [ ] Build `FAQ` section wrapper and insert it directly above the audit form
- [ ] Test keyboard accessibility and smooth animation on all screen sizes

---

## Feature 4: Supabase Form Submission (Bolt Database)

### Objective
Wire the existing audit request form to a real Supabase backend so submissions are persisted.

### Specifications
- Create `audit_requests` table in Supabase with fields: name, email, business, website, created_at
- Add `@supabase/supabase-js` client initialized with env vars
- On submit: insert row, show spinner during in-flight request
- On error: show inline error message below the form
- On success: existing success UI remains, now backed by real data

### Progress Checklist
- [ ] Create `audit_requests` table in Supabase (SQL migration)
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`
- [ ] Install and configure `@supabase/supabase-js` client (`src/lib/supabase.ts`)
- [ ] Add `isLoading` and `error` state to form component
- [ ] Wire `handleSubmit` to call `supabase.from('audit_requests').insert({...})`
- [ ] Add spinner icon to submit button during loading state
- [ ] Add error message display below form on failure
- [ ] Test happy path, error path, and loading state

---

## Feature 5: Nav Scroll Behavior — Active / Compact State

### Objective
Make the nav feel polished and professional by adding a compact "scrolled" state once the user passes 60px.

### Specifications
- `useEffect` listens to `window.scroll` event
- At `scrollY > 60`: add stronger background (e.g. `bg-[#0f0f0f]/95 backdrop-blur-lg`) and slightly reduce padding/height
- At `scrollY <= 60`: return to original transparent/minimal style
- All transitions via CSS `transition` for smoothness

### Progress Checklist
- [ ] Add `scrolled` boolean state to the Nav component
- [ ] Add `useEffect` with `window.addEventListener('scroll', ...)` to track `scrollY > 60`
- [ ] Apply conditional Tailwind classes for compact scrolled state (background, padding)
- [ ] Add `transition-all duration-300` to nav wrapper for smooth change
- [ ] Test scroll behavior on both mobile and desktop
- [ ] Remove event listener on cleanup to avoid memory leaks

---

## Feature 6: Hero — Typewriter / Word-Swap Effect

### Objective
Keep the hero fresh and reinforce pain-point messaging by cycling through synonym phrases every 3 seconds.

### Specifications
- Target phrases: `"manual work"` → `"spreadsheet hell"` → `"copy-paste loops"` (and similar for "wasted time")
- `setInterval` cycles through the array every 3000ms
- Fade-in / fade-out via CSS `opacity` transition (e.g. 300ms crossfade)
- Clean up interval on component unmount

### Progress Checklist
- [ ] Define rotating word arrays in the Hero component
- [ ] Add `activeIndex` state and `setInterval` in `useEffect` (3000ms cadence)
- [ ] Wrap swapping words in a `<span>` with `opacity` + `transition` classes
- [ ] Implement fade-out → update word → fade-in sequence using a brief `setTimeout`
- [ ] Test that interval clears properly on unmount (no memory leaks)
- [ ] Verify the cycling looks natural and doesn't cause layout shift

---

## Feature 7: Final CTA Section — Background Upgrade

### Objective
Upgrade the final CTA section background from a single static blob to a radial spotlight effect with a subtle grid overlay, drawing stronger visual attention to the CTA button.

### Specifications
- Replace static blob with `background: radial-gradient(ellipse at center, rgba(74,144,226,0.12) 0%, transparent 70%)`
- Layer a faint CSS `linear-gradient` grid pattern on top at very low opacity (~3-5%) for depth
- No animation needed — purely visual upgrade

### Progress Checklist
- [ ] Locate the final CTA section in `App.tsx`
- [ ] Replace static blob `div` with inline `style` radial gradient background on the section wrapper
- [ ] Add a second absolute-positioned `div` with CSS `background-image` grid lines at low opacity
- [ ] Ensure the grid overlay is `pointer-events-none` so it doesn't block clicks
- [ ] Review contrast — CTA button and headline must remain clearly readable over the new background
- [ ] Test on mobile and desktop for visual quality
