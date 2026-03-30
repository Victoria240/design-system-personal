# Decisions — Design System (Personal)

Significant architectural and design decisions, with rationale. Newest first.

---

## 2026-03-30 (Session 7)

**Sidebar collapsed state: logo circle is the expand trigger**
Clicking the green Loop logo circle in the collapsed sidebar expands it. This is intentional — the logo replaces the full header as the toggle target, matching the pattern in Linear and Slack. There is no separate expand icon. The Figma prototype wires `logo-badge → CHANGE_TO Expanded` and `btn-collapse → CHANGE_TO Collapsed`.

**Collapsed sidebar icon rail must include a search icon**
The code's collapsed state hides the search bar but does NOT remove it entirely — it renders a magnifying glass icon in the rail (between logo and compose). The Figma collapsed variant must include a `search-wrap` row in the same position so the icon counts and visual rhythm match. Missing this was a parity gap caught during three-way code/Figma review.

**Accordion section headers: chevron direction must match open/closed state**
When the section is open (content visible), the chevron must point UP (^). When closed (content hidden), it points DOWN (v). The Figma expanded variant defaults to showing sections open, so chevrons must be rotated 180° to point up. Building section headers with chevron-down by default and forgetting to flip them for the open state is a recurring mistake.

---

## 2026-03-30 (Session 6)

**`resize()` must be called BEFORE setting `primaryAxisSizingMode = 'AUTO'`**
Calling `resize()` after setting `primaryAxisSizingMode = 'AUTO'` resets it back to `'FIXED'`. Pattern: `(1) resize(w, initialH), (2) set AUTO, (3) append children`. If resize is needed after adding children, re-set AUTO immediately after. Applies to `counterAxisSizingMode = 'AUTO'` as well.

**`primaryAxisSizingMode` / `counterAxisSizingMode` valid values: `'FIXED'` or `'AUTO'` only**
`'HUG'` is NOT a valid value — it throws an error. `'HUG'` is only valid for `layoutSizingHorizontal` / `layoutSizingVertical` (child-sizing properties set after `appendChild`). Axis orientation: in HORIZONTAL layout, primary = width, counter = height. To hug content height in a HORIZONTAL frame: `counterAxisSizingMode = 'AUTO'`.

**`combineAsVariants()` requires manual y-stacking for vertical variant layouts**
After `combineAsVariants()`, all variants default to `y=0` (stacked on top of each other). For vertically-arranged variant previews, iterate children and accumulate `yPos += c.height + gap`. The existing rule in AGENTS.md (`c.y = 0` reset) applies to side-by-side horizontal layouts only — do not apply it when variants should stack vertically.

**Sidebar Figma component mirrors code's 2-state toggle: Expanded + Collapsed variants**
`Sidebar/State=Expanded` (220×543px) and `Sidebar/State=Collapsed` (52×543px) match the code's `collapsed` boolean state. All fills bound to `Sidebar / Light` collection tokens — no semantic tokens on sidebar surfaces (sidebar has its own token collection to stay visually distinct from main content). Both variants must be the same height — the spacer-fill pattern (root FIXED height, internal spacer `layoutSizingVertical = 'FILL'`) only works if the container height is explicit. Collapsed was initially built at 371px and had to be corrected to 543px when channel icon rows were added and the content overflowed.

**Text overrides on InboxThread instances via child traversal, not component TEXT properties**
InboxThread doesn't use Figma component TEXT properties (would require a published library). Instead, text overrides are applied by traversing instance children with `findAll(n => n.type === 'TEXT')` and matching by `n.name`. This is intentional — allows per-instance content without detaching.

---

## 2026-03-30 (Session 5)

**Sidebar lives in `src/components/layout/` not `src/components/ui/`**
Layout components (sidebar, navbar, command palette) are composed from DS atoms — they're not atoms themselves. Separate `layout/` directory keeps the distinction clear.

**Base UI tooltip uses `render` prop, not `asChild`**
Base UI's `Trigger` component uses a `render` prop (accepts `ReactElement`) to customize the rendered element — not Radix-style `asChild`. Pattern: `<TooltipTrigger render={<button ... />}>children</TooltipTrigger>`. For tooltip wrapping in collapsed sidebar: `render={<span className="block w-full" />}` avoids nested interactive elements.

**Sidebar collapse uses CSS width transition, not opacity/mount/unmount**
Width transitions from 220px → 52px with `transition-[width] duration-200 ease-in-out`. Text conditionally rendered with `{!collapsed && ...}` — disappears/appears as the wipe completes. No fade animation needed; the width wipe IS the animation.

**Sidebar uses `--sidebar*` semantic tokens, not general `--background`**
Dark sidebar bg: `oklch(0.205 0 0)`. All items use `bg-sidebar-accent` for hover/active states. This keeps the sidebar visually distinct from the main content area in both light and dark mode.

## 2026-03-30

**Icon slots use `createNodeFromSvg` not Icon component instances**
The Icon component has a 32×32 outer wrapper with the actual 16×16 icon at (8,8). Resizing an instance to 16×16 clips the content from that offset. Direct SVG frames via `createNodeFromSvg(svgStr)` with `width="16" height="16" viewBox="0 0 24 24"` render at the correct size without clipping.

**Icon color tokens by context**
- Solid colored buttons (Default = green, Destructive-Solid = red): `interactive/primary-foreground` (white)
- All other button variants: `text/foreground` (matches button label color)
- Form input adornments (Input, Select, Badge non-brand): `text/muted-foreground` (softer, standard input affordance)
- Brand badge: `interactive/primary-foreground` (white on brand green)

**No INSTANCE_SWAP for icon type — BOOLEAN + manual swap only**
INSTANCE_SWAP component properties require the default value to be a published library component. Local file components fail with `"Property value is incompatible with component property type"`. Pattern: BOOLEAN to toggle visibility, designers swap the icon glyph manually after enabling.

**Emil Kowalski animation skill → global scope**
Moved from project-local (`.agents/skills/`) to `~/.claude/skills/` so the animation decision framework and easing principles apply to all projects, not just this one.

**Figma-only components (Checkbox, Radio, Spinner) deferred**
These exist in Figma but have no code equivalent. Building them when a screen actually needs them keeps scope controlled and avoids building to spec with no real usage context.

---

## Earlier sessions

**Base UI primitives, not Radix UI**
`@base-ui/react` chosen over `@radix-ui` — lighter, headless, aligns with the project's desire to own the component implementation fully.

**Tailwind v4 + cva for variants**
`@import "tailwindcss"` syntax (not `@tailwind base/components/utilities`). All variants via `class-variance-authority`. Merge via `cn()` = clsx + tailwind-merge. No raw Tailwind overrides outside the variant system.

**Semantic variable system in Figma**
Two separate collections (`Semantic / Light` and `Semantic / Dark`) rather than one collection with two modes — matches how the CSS custom properties are structured in `globals.css` (`.dark` class toggle) and makes token inspection cleaner.

**Font: Inter, not Geist**
This project uses Inter via `next/font/google`. Geist is prohibited — it's associated with generic AI output and is not part of this DS. All references to Geist in the Next.js template were removed.
