# Project Context — Design System (Personal)

A personal design system built in parallel across Figma and Next.js. The goal is full parity between Figma components and React code — same variants, same tokens, same prop API — so the Figma library is a source of truth designers can hand off directly.

**Stack**: Next.js (App Router) · Base UI primitives · Tailwind v4 · cva · Figma MCP

**Figma file**: `CSH3fjzXtcJobTVGXlQqqJ` — Design System — Personal

---

## Current Progress

### Figma library
- **Atoms**: Button, Badge, Input, Avatar, Textarea, Icon, Select, Tooltip — all built as component sets with variants
- **Molecules**: FormField, Card, Alert — built as component sets
- **Component properties**: All 9 components have TEXT overrides (label, placeholder, title, etc.) and BOOLEAN icon slots — no detaching required
- **Icon slots**: iconStart / iconEnd BOOLEAN properties on Button (25 text variants), Badge, Input, Select — icons are properly scaled 16×16 SVG frames, color-bound to semantic variables
- **Tokens**: Full semantic variable system (Primitives + Semantic/Light + Semantic/Dark + Radius & Shadow)

### Code DS
- **Atoms** (`src/components/ui/`): button, badge, input, avatar, textarea, icon, select, tooltip, label, separator, typography
- **Molecules** (`src/components/ui/`): form-field, card, alert, search-bar
- **Toggle**: implemented
- **Layout** (`src/components/layout/`): sidebar (Loop workspace sidebar — expand/collapse, accordion sections, tooltips, dark mode)
- All use Base UI primitives, cva variants, Tailwind v4, semantic token classes

### Screens (`src/app/`)
- `/dashboard` — full dashboard screen, dark mode, using Loop sidebar component + DS atoms
- `/login` — auth screen
- `/settings` — settings page with Profile, Account, Notifications, Security sections

### Figma library — Layout components
- **Sidebar** COMPONENT_SET (`88:10102`): Expanded (220×543px) + Collapsed (52×371px) variants — full Loop workspace sidebar with sidebar token bindings
- **TopBar** COMPONENT (`88:10103`): 840×48px — title, unread badge, action buttons, notification icon, avatar
- **InboxThread** COMPONENT_SET (`88:10163`): 3 variants (Unread+Mention, Active, Read) — full message row with avatar, sender, context, preview, timestamp, mention badge

### Screens — Figma
- **Inbox — Dark** (`88:10164`) on Screens page: 1060×768px — assembled from Sidebar + TopBar + 7 InboxThread instances with real text overrides

### Parity
- 15 Figma ↔ Code matched components (see AGENTS.md mapping table)
- 3 Figma-only: Checkbox, Radio, Spinner (to build when needed)
- 4 Code-only atoms: label, separator, search-bar, typography (to add to Figma when ready)

---

## Session Log

### 2026-03-30 — Session 6 (Figma layout components + Inbox screen)

Built Sidebar (Expanded + Collapsed), TopBar, and InboxThread as Figma COMPONENT_SETs on the Layout page — all variable-bound using sidebar/semantic tokens with no loose hex values. Assembled the full `Inbox — Dark` screen on the Screens page using component instances with real text overrides. Updated AGENTS.md mapping table (sidebar, TopBar, InboxThread now matched). Discovered and documented critical Figma Plugin API ordering rules: `resize()` resets `primaryAxisSizingMode` to FIXED (must re-set AUTO after resize), `combineAsVariants()` does not auto-arrange variants (manual y-stacking required for vertical layouts).

### 2026-03-30 — Session 5 (Loop sidebar — code)

Built `src/components/layout/sidebar.tsx` — the first layout component in the DS. Full Loop workspace sidebar: dark mode using sidebar tokens, collapsible (220px ↔ 52px icon rail) with smooth CSS width transition, ⌘K search bar, accordion sections (Channels + Direct Messages), status dots on DM avatars, tooltips on all nav items in collapsed state, user footer with online indicator, collapse toggle. Replaced static `/dashboard` aside with the new `Sidebar` component and applied dark mode via `class="dark"` wrapper. Fixed Base UI tooltip API (uses `render` prop, not `asChild`). TypeScript clean, server confirmed rendering.

### 2026-03-30 — Session 4 (icon slots + component property polish)

Fixed mis-scaled icon slots across all Figma components. The Icon component's 32×32 outer wrapper with 16×16 inner frame at (8,8) caused clipping when resized — replaced all instances with `createNodeFromSvg` frames at the correct pixel size. Added TEXT override properties to all 9 components (Atoms + Molecules pages). Graduated 4 lessons to AGENTS.md (Figma Plugin API Rules), moved Emil Kowalski animation skill to global scope.

### 2026-03-30 — Session 3 (Molecules + property system)

Built FormField, Card, and Alert on the Molecules page. Added component properties (TEXT + BOOLEAN) to Button, Badge, Input, Avatar, Select, Tooltip, Card, Alert, FormField — all linked to real layers. First attempt at icon slots used mis-scaled Icon instances (fixed in Session 4).

### 2026-03-30 — Session 2 (Atoms page rebuild)

Rebuilt the Atoms page with the correct DS library layout standard (section label + showcase frame, 80px gaps, hug sizing). Built Button, Badge, Input, Avatar, Textarea, Icon, Select, Tooltip as proper component sets with variants and semantic variable bindings.

### 2026-03-30 — Session 1 (foundations)

Set up Next.js project, Tailwind v4, Base UI primitives, semantic token system, and initial atom components in code. Established Figma file structure and variable collections.
