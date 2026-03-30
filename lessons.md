# Lessons — Design System (Personal)

<!-- Claude: review this before beginning any work. Update immediately after any correction. -->

---

<!-- Entries below, newest first -->

## 2026-03-30

**[19] Sidebar collapse/expand control must always live in the header, not the footer**
Collapsing a sidebar is a navigation-level action — users look at the top of the sidebar to find it, not the bottom. Pattern: collapse toggle sits top-right in the expanded header (paired with the logo), and in the same row in collapsed state (logo left, expand right). The footer is for user identity and settings only. Reference: Linear, Notion, Slack all put collapse at the top.

**[20] Self-review is not a pass/fail check — it's a meticulous second-designer pass**
Before marking any UI done: review every element one by one as a critic, not the author. Ask "what would Victoria push back on?". Check: control placement and discoverability, spacing relationships, IA clarity (are labels unambiguous?), missing affordances (compose button, theme toggle), hierarchy, and reading path. One pass is never enough — always do at least two, the second as a skeptic. If it looks like it came from an AI, it's not done.

**[16] Always reposition Source Components frame after any showcase section rebuild**
The Source Components frame is a separate top-level frame — it does not auto-update when the auto-layout showcase grows. After ANY section rebuild, recalculate: `source.y = showcase.y + showcase.height + 80`. Applies to both Atoms and Molecules pages.

**[1] Figma DS library layout standard — the non-negotiable structure**
Every component section must use: section label (uppercase, muted text) + component showcase frame (auto-layout row, 24px gap, white bg, 24px padding, hug content on both axes). Sections stack vertically with 80px gap. No fixed-size containers — always hug. No overlapping. Components never bleed outside their frame. This is the minimum bar. Anything less = rebuild, not patch.

**[2] Figma component showcase: variants must be labeled**
Don't just lay out a flat row of instances with no context. Each variant in a component showcase frame should be visible, legible, and distinguishable. If a variant looks identical to another (e.g., Ghost + Default both appear grey), something is wrong — fix the fill/color binding before shipping the layout.

**[3] Molecules page belongs on its own Figma page**
Atoms and Molecules are separate pages. Never put a Molecules section frame on the Atoms page. Check page structure at the start of every library build pass.

**[4] All color fills in Figma must be bound to semantic variables — never loose hex**
If Figma's Selection Colors panel shows a raw hex value (#141414, #8E8E8E, #D9DADC, etc.) that is not a named/aliased variable, it's wrong. Icon paths, text nodes, frame fills, strokes — every fill must be bound to a variable. No exceptions. Check via Selection Colors panel after every component build.

**[5] Icon fill color must be bound to text/foreground variable**
Icons created via `figma.createNodeFromSvg()` default to the path's own color (often near-black like #141414). After creation, immediately bind the SVG path fill to the `text/foreground` semantic variable. Never leave it as a hardcoded value.

**[6] Badge clone fills: target node must be verified before binding**
When cloning badge variants and rebinding fills, verify `findOne(n => n.type === 'TEXT')` actually finds the text child. If the text is nested inside a group or auto-layout sub-frame, `findOne` on the COMPONENT root may not reach it. Always verify clone structure matches the original before binding.

**[7] Badge Brand/Secondary variants — set characters explicitly after clone**
After cloning Default and rebinding fills, text may show transparent or same color as bg. Fix: explicitly set `characters`, then bind fill, then verify contrast is visible. Screenshot after each clone.

**[8] Figma auto layout — frames must hug content, not clip it**
Every showcase frame and component set container must have `primaryAxisSizingMode = 'AUTO'` and `counterAxisSizingMode = 'AUTO'`. Never use fixed sizes on display frames. If a component's content changes (more variants added), the frame must expand, not clip.

**[9] Icons in this DS are Lucide icons (SVG paths via `figma.createNodeFromSvg()`)**
Any new icon added to Figma must use Lucide SVG paths. Do not mix icon families. Reference: https://lucide.dev for path data.

**[10] Always calculate explicit y-offset before placing any new section**
Every new component section must be placed below all existing sections, with explicit y-offset calculated from current canvas bounds. Never append without checking position.

**[11] CRITICAL — Never call .remove() on a node before confirming it has been moved**
`.remove()` permanently deletes a node and ALL its children. To move between pages, use `targetPage.appendChild(node)` ONLY. Never call `.remove()` as part of a move operation.

**[17] Icon component resize creates clipping — use createNodeFromSvg at target size instead**
The Icon component (e.g., Size=md) has a 32×32 outer wrapper with the 16×16 icon frame at position (8,8). Resizing any INSTANCE of it to 16×16 clips the content because the inner frame stays at its original offset. Fix: replace with `figma.createNodeFromSvg()` using explicit `width="16" height="16" viewBox="0 0 24 24"` — Figma scales the path to fit the declared dimensions correctly. For stroke-based icons, bind via `vec.strokes = [{ ..., boundVariables: { color: ... } }]`.

**[18] Duplicate BOOLEAN properties appear when re-adding a property that already exists**
If `addComponentProperty('iconStart', 'BOOLEAN', false)` is called when `iconStart#X:Y` already exists on the component set, Figma creates `iconStart2#A:B` instead of replacing it. The old orphaned property stays. Fix: after adding, check `componentPropertyDefinitions` for duplicate icon keys, delete orphans with `deleteComponentProperty(key)`, then rename the new property with `editComponentProperty(key, { name: 'iconStart' })`.

<!-- Entries [12][13][14][15] graduated 2026-03-30 → AGENTS.md (Figma Plugin API Rules) -->
<!-- Universal design principles → ~/.claude/design-standards.md -->
<!-- Project/Figma API rules → AGENTS.md (Styling, Behavioral Intent, Figma Plugin API Rules sections) -->
