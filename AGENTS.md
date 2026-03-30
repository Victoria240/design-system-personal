<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

<!-- BEGIN:quality-gate -->
# Quality Gate — Mandatory Before Any UI Delivery

## Session start — mandatory before any code is written

Before writing or editing any file in this project:
1. Run `sync-figma-token` skill and `figma_check_design_parity` automatically — do not ask, do not wait for confirmation. Always run both.
2. If the mapping table has changed (new components added or removed in Figma): update the Figma ↔ Code component mapping section before proceeding.

Do not skip this because the request feels urgent or simple. Drift compounds silently.

## Figma ↔ Code parity — non-negotiable

Every element in Figma must trace to a published component or variable. No loose hex values, no detached instances, no external assets. Every element in code must use the corresponding DS component and CSS custom property token — no hardcoded values, no one-off styles. Figma and code are the same source of truth expressed in two media. If they diverge, the design system has failed its purpose.

## UI Delivery
Run the full UI Delivery Process from `~/.claude/design-standards.md` before calling anything done. One non-negotiable that requires repeating: take a Playwright screenshot **immediately after every edit** — not at the end.

## Definition of done
"The code works" is not done. "It renders without errors" is not done.

Done means: if Victoria looked at this right now, she would not find a visual or layout issue that should have been caught before delivery.

## Self-review is mandatory
Before marking any UI task complete:
1. Review the output as a critic, not the author
2. Ask: "what would Victoria push back on here?" — find it first, fix it first
3. Check every visible element: spacing, alignment, visual weight, hierarchy, badge/icon/avatar sizing, reading path
4. Run the visual judgment gate from `~/.claude/design-standards.md`

## The bar
Every UI must look like it was considered by a lead/principal product designer. References: Linear, Notion, Stripe. If it looks like it came from an AI — it's not done.

## Hard rules
- Never call a screen done after one pass — always do a second look as a critic
- Every visual choice must have a reason — "it was the default" is a failure
- Run the full element-by-element visual audit from `~/.claude/design-standards.md` before marking any UI done

## Layout component rules
- **Sidebar collapse/expand**: the toggle must always be in the sidebar header (top-right), never at the bottom or in the footer. The footer row is for user identity + settings only. Rationale: users look at the top for navigation controls — bottom placement is not a familiar pattern and breaks discoverability.
- **Sidebar footer row**: single row containing avatar + status dot + name/status text + settings action (theme toggle or settings icon). Never a separate collapse row in the footer.
- **Compose/new action**: any workspace sidebar that represents a messaging or content tool must include a compose/new button — in the header for expanded state, as the first icon in the collapsed rail.

## Project-specific implementation notes
These apply the universal principles to this codebase's component system. For the principles themselves, see `~/.claude/design-standards.md`.

- **Typography stacking**: `Typography variant="label"` and `variant="caption"` both render as `<span>` (inline). Any label+description pair MUST have a `flex flex-col gap-0.5` wrapper or they run inline regardless of `mt-*`.
- **Card variants**: `elevated` = shadow (shadow-sm). `outlined` = border only. `filled` = muted background. Default to `outlined` — only use `elevated` when a surface genuinely needs to float above its surroundings.
- **Avatar sizes**: `size="sm"` = 24px (headers, sidebars). `size="default"` = 32px (2-line list rows). `size="lg"` = 40px (profile display). Adjacent icon controls should visually match the avatar's size tier.
- **Badge variants**: `success` for positive outcomes and premium states. `destructive` for failures and risks. `default` for quiet neutral status (completed, info). Never use `default` where the meaning is positive — it reads as gray/neutral.
- **Brand token**: always `bg-brand` / `text-brand` — never hardcoded color values.
- **Font**: Inter via `next/font/google`. No Geist anywhere in this project.
- **Avatar DS component in sidebar context**: The `Avatar` component uses `after:mix-blend-darken` overlay and Base UI Fallback has a render delay — both conflict with the sidebar's token surface. Never use the DS `<Avatar>` inside the sidebar. Use a custom div with `ring-1 ring-sidebar-border` to match the DS Avatar's border ring: `<div className="flex size-6 items-center justify-center rounded-full bg-sidebar-foreground/20 ring-1 ring-sidebar-border text-[10px] font-semibold text-sidebar-foreground select-none">VT</div>`. DM row avatars use the same pattern at `size-5` with `bg-sidebar-foreground/10`. Omitting the ring makes sidebar avatars look flat compared to DS Avatar instances elsewhere on the same screen.
- **Single source of truth for counts**: Any count that appears in multiple places (sidebar badge, TopBar badge) must be derived from one parent data source and passed as a prop. Never hardcode counts in child components.
<!-- END:quality-gate -->

---

<!-- BEGIN:design-system-rules -->
# Design System Rules

## Component Organisation

- IMPORTANT: All UI components live in `src/components/ui/` — check here before creating anything new
- Atoms (single-concern): `button.tsx`, `input.tsx`, `label.tsx`, `badge.tsx`, `avatar.tsx`, `separator.tsx`, `typography.tsx`
- Molecules (composed atoms): `form-field.tsx`, `search-bar.tsx`, `card.tsx`, `alert.tsx`
- Design tokens (JS reference): `src/lib/tokens.ts` — mirrors the CSS custom properties
- Utility: `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge)

## Primitive Layer — Base UI, NOT Radix

- IMPORTANT: This project uses `@base-ui/react/*` primitives, NOT Radix UI
- `Button` wraps `@base-ui/react/button` → `ButtonPrimitive.Props`
- `Input` wraps `@base-ui/react/input` → renders as `<InputPrimitive>`
- Do NOT install `@radix-ui/*` packages

## Styling

- Tailwind v4 — use `@import "tailwindcss"` syntax (NOT `@tailwind base/components/utilities`)
- All variants built with `cva` from `class-variance-authority`
- Merge classes with `cn()` from `@/lib/utils` — never use `clsx` or `twMerge` directly
- Import alias: `@/` → `src/`
- When a component manually manages directional padding (`pl-*`, `pr-*`), never include shorthand `px-*` in the variant/size map — tailwind-merge will let `px-*` win and override the directional values

## Design Tokens — Never Hardcode Values

- IMPORTANT: Never hardcode colors, radii, shadows, or font sizes — always use tokens
- Colors are CSS custom properties defined in `src/app/globals.css`

### Color tokens (Tailwind class → CSS var)
| Token name | CSS var | Usage |
|---|---|---|
| `bg-brand` | `--brand` | Primary brand (emerald-600) |
| `text-brand-foreground` | `--brand-foreground` | Text on brand bg |
| `bg-brand-muted` | `--brand-muted` | Brand tinted bg |
| `bg-brand-subtle` | `--brand-subtle` | Lightest brand tint |
| `text-success` / `bg-success` | `--success` | Success states (green) |
| `text-warning` / `bg-warning` | `--warning` | Warning states (amber) |
| `text-destructive` / `bg-destructive` | `--destructive` | Error/danger states |
| `bg-background` | `--background` | Page background |
| `text-foreground` | `--foreground` | Primary text |
| `bg-muted` | `--muted` | Subtle bg (hover, chips) |
| `text-muted-foreground` | `--muted-foreground` | Secondary/placeholder text |
| `border-border` | `--border` | Default border |
| `border-input` | `--input` | Input border |
| `ring-ring` | `--ring` | Focus ring |

### Radius scale
- `rounded-sm` → `calc(var(--radius) * 0.6)` — tight, like tags
- `rounded-md` → `calc(var(--radius) * 0.8)` — inputs, buttons inner
- `rounded-lg` → `var(--radius)` — standard (0.625rem / ~10px)
- `rounded-xl` → `calc(var(--radius) * 1.4)` — cards, panels
- `rounded-2xl` → `calc(var(--radius) * 1.8)` — modals
- `rounded-full` → pill shapes

### Shadow scale
- `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Component Patterns

### Variant system (cva)
Every component with variants must:
1. Define variants via `cva(baseClasses, { variants: { ... }, defaultVariants: { ... } })`
2. Accept `VariantProps<typeof componentVariants>` in the props type
3. Call `cn(componentVariants({ variant, size, className }))` in the className

### Props interface convention
```tsx
type ComponentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof componentVariants> & {
    // component-specific props
  }
```

### data-slot attributes
Every component must set `data-slot="component-name"` on the root element.
Sub-elements that need external CSS targeting use `data-slot="component-name-part"`.
Examples: `data-slot="button"`, `data-slot="input"`, `data-slot="alert"`, `data-slot="alert-icon"`

### Accessibility requirements
- Error state: `aria-invalid="true"` (triggers red ring via Tailwind `aria-invalid:` variants)
- Required fields: `aria-required="true"` on the input
- Descriptions / errors: `aria-describedby` linking input to hint/error element
- Interactive icon-only buttons: `aria-label` required
- Alert containers: `role="alert"`
- Search inputs: `role="searchbox"`

### Focus ring pattern
```
focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
```

### Error ring pattern (applied via aria-invalid)
```
aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20
dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40
```

### Dark mode
- Use `dark:` Tailwind prefix — dark mode is toggled via `.dark` class on `<html>`
- Every surface/border color should have a `dark:` counterpart

## Figma MCP Integration

### Required flow for every Figma-driven change
1. Call `figma_get_component` or `figma_get_selection` to get node ID and structured data
2. Call `figma_take_screenshot` for visual reference
3. Map Figma variable names → CSS custom properties in `globals.css` / Tailwind tokens
4. Translate output into this project's Base UI + cva + Tailwind v4 conventions
5. Validate visually against the screenshot before marking complete

### Figma file
- **File**: Design System — Personal
- **File ID**: `CSH3fjzXtcJobTVGXlQqqJ`
- Use this file by default for all Figma work unless specified otherwise

### Token mapping (Figma variable → CSS)
- Figma `color/brand` → `var(--brand)` → Tailwind `brand`
- Figma `color/semantic/background` → `var(--background)` → Tailwind `background`
- Figma `color/status/success` → `var(--success)` → Tailwind `success`
- Figma `color/status/warning` → `var(--warning)` → Tailwind `warning`
- Figma `color/semantic/destructive` → `var(--destructive)` → Tailwind `destructive`

### Asset rules
- IMPORTANT: Use localhost sources from Figma MCP server directly — do not create placeholders
- IMPORTANT: Do NOT install new icon packages — use inline SVG via `figma.createNodeFromSvg()` in plugins; use inline `<svg>` elements in React components
- For spinner/loading: use the Loader2 SVG arc path, never ellipse arcData with innerRadius=0

## Figma ↔ Code component mapping

Node IDs are session-stable for this file (`CSH3fjzXtcJobTVGXlQqqJ`). Use these for direct MCP queries instead of searching by name.

### Matched — Figma + code both exist

| Figma component | Node ID | Code file |
|---|---|---|
| Button | `4:149` | `src/components/ui/button.tsx` |
| Badge | `4:173` | `src/components/ui/badge.tsx` |
| Input | `4:160` | `src/components/ui/input.tsx` |
| Avatar | `4:182` | `src/components/ui/avatar.tsx` |
| Textarea | `10:16` | `src/components/ui/textarea.tsx` |
| Icon | `10:37` | `src/components/ui/icon.tsx` |
| Select | `11:68` | `src/components/ui/select.tsx` |
| Tooltip | `12:97` | `src/components/ui/tooltip.tsx` |
| Form Field | `50:434` | `src/components/ui/form-field.tsx` |
| Card | `50:389` | `src/components/ui/card.tsx` |
| Alert | `50:414` | `src/components/ui/alert.tsx` |
| Toggle | `4:207` | `src/components/ui/toggle.tsx` |
| Sidebar | `88:10102` | `src/components/layout/sidebar.tsx` |
| TopBar | `88:10103` | `src/components/layout/top-bar.tsx` |
| InboxThread | `88:10163` | `src/app/dashboard/page.tsx` (InboxThread fn) |

### Figma only — code not yet built

| Figma component | Node ID | Note |
|---|---|---|
| Checkbox | `4:197` | No `checkbox.tsx` — build when needed |
| Radio | `4:218` | No `radio.tsx` — build when needed |
| Spinner | `4:225` | No `spinner.tsx` — build when needed |

### Code only — no Figma component set

| Code file | Note |
|---|---|
| `src/components/ui/label.tsx` | Atom used inside Form Field — add to Figma library when ready |
| `src/components/ui/separator.tsx` | Utility — add to Figma library when ready |
| `src/components/ui/search-bar.tsx` | No Figma equivalent — add to Figma library when ready |
| `src/components/ui/typography.tsx` | No Figma equivalent — add to Figma library when ready |

### Avatar sizing — resolved

Figma and code now use matching size names:

| Size | Figma | Code | px |
|---|---|---|---|
| `sm` | Size=sm | `size="sm"` | 24px |
| `default` | Size=default | `size="default"` | 32px |
| `lg` | Size=lg | `size="lg"` | 40px |
| `xl` | Size=xl | `size="xl"` | 48px |

---

## Behavioral Intent

| Component | Use when | Do NOT use when |
|---|---|---|
| `SearchBar` | Global or scoped search with text input | Filtering, tag inputs, comboboxes, or any selection pattern |
| `Alert` | Page-level status messages (save success, auth errors, system warnings) | Inline field validation — use `FormField` error prop instead. Not for toasts. |
| `FormField` | Any input that needs a label, hint text, or error state | Standalone inputs in complex custom layouts where you manage layout manually |
| `Card` | Grouping related content into a visual surface with a clear boundary | Generic wrapper divs — only reach for Card when the content genuinely needs containment |
| `Badge` | Communicating the status or state of something (plan tier, error state, neutral info) | Navigation, filters, interactive controls, or counts |
| `Button destructive` | Reversible or low-stakes removals (remove a tag, clear a field) | Irreversible high-consequence actions — use `destructive-solid` instead |
| `Button destructive-solid` | Irreversible, high-consequence actions only (delete account, permanently remove data) | Anything reversible — the solid red signals no going back |
| `Typography label` + `caption` | Stacked label/description pairs | Inline without a `flex flex-col gap-0.5` wrapper — both variants render as `<span>` and will run inline |
| `Toggle` | Binary on/off settings (email notifications, feature flags) | Multi-step selections, radio-style choices, or anything needing a confirm step |

## Button variants reference
| variant | When to use |
|---|---|
| `default` | Primary CTA |
| `outline` | Secondary action |
| `secondary` | Tertiary / neutral |
| `ghost` | Low-priority / icon row |
| `destructive` | Soft removal — low-stakes, reversible (renders as muted pink) |
| `destructive-solid` | Irreversible, high-consequence actions only (renders as solid red) |
| `link` | Inline navigation |

Sizes: `xs` / `sm` / `default` / `lg` / `icon` / `icon-xs` / `icon-sm` / `icon-lg`

## Badge variants reference
| variant | When to use |
|---|---|
| `default` | Quiet neutral status — completed, general info. Reads as gray. |
| `brand` | Brand-highlighted items — featured, active plan, key label. Solid emerald bg. |
| `secondary` | Soft neutral — secondary category, low-priority status |
| `success` | Positive outcomes — upgrade completed, payment successful, active state |
| `warning` | Caution states — pending review, approaching limit, expiring soon |
| `destructive` | Failures and risks — payment failed, error state, access denied |
| `outline` | Subtle category label — no fill, bordered |

## Alert variants reference
`default` / `success` / `warning` / `destructive`
- All four use inline SVG icons (InfoIcon, SuccessIcon, WarningIcon, ErrorIcon)
- Icon can be overridden via `icon` prop; pass `null` to hide
- Dismissible via `onDismiss` prop

## Figma Plugin API Rules
These prevent recurring bugs when executing Figma plugin code via `figma_execute`.

- **Spinner/loading arcs**: never use ellipse `arcData` — renders as pac-man. Use `figma.createNodeFromSvg()` with the Loader2 path: `M21 12a9 9 0 1 1-6.219-8.56`
- **Icons**: never fake with text characters (`i`, `✓`, `!`, `×`). Always use `figma.createNodeFromSvg()` with proper Lucide SVG paths
- **After `combineAsVariants()`**: variants in a COMPONENT_SET are NOT auto-arranged. After combining, manually set each child's `c.y` to stack them (`yPos += c.height + gap`), then resize the set to fit. Do NOT blindly reset all y to 0 — this stacks variants on top of each other.
- **`resize()` resets sizing modes to FIXED** — always call `resize()` BEFORE setting `primaryAxisSizingMode = 'AUTO'` or `counterAxisSizingMode = 'AUTO'`. If you set AUTO then call resize(), you must re-set AUTO afterward.
- **`primaryAxisSizingMode` / `counterAxisSizingMode` axis orientation**: In a HORIZONTAL layout, primary = width, counter = height. To hug content height: `counterAxisSizingMode = 'AUTO'`. In a VERTICAL layout, primary = height, counter = width. Setting these backwards keeps the frame at the initial resize() dimensions.
- **`primaryAxisSizingMode` valid values**: `'FIXED'` or `'AUTO'` only — NOT `'HUG'`. `'HUG'` is only valid on `layoutSizingHorizontal` / `layoutSizingVertical` (child sizing properties, set after appendChild).
- **Layout sizing**: always append a node to its parent BEFORE setting `layoutSizingHorizontal` / `layoutSizingVertical` — setting `FILL` before append throws an error
- **Variable binding on fills**: `getVariableByIdAsync` returns an object WITHOUT `setBoundVariableForPaint`. Bind inline: `node.fills = [{ type: 'SOLID', color: {r,g,b}, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: 'VariableID:X:Y' } } }]`. Color is `{r,g,b}` only — no `a` field.
- **Fill opacity ignored with bound variables**: When `boundVariables.color` is set, Figma ignores `opacity` on the fill. For tinted/semi-transparent surfaces, pre-blend the color manually and use a raw fill (no variable binding for that fill).
- **`createNodeFromSvg()` wrapper frame fill**: The wrapper Frame has a default solid fill — always clear immediately: `iconFrame.findAll(n => n.type === 'FRAME').forEach(f => { f.fills = [] })`
- **`SPACE_BETWEEN` with a single child centres it** — Figma's SPACE_BETWEEN distributes space *between* children. With only one child, it has nothing to push against so it centres the child instead. To get true L/R layout in a section header (label left, chevron right), there must be ≥2 children. Fix: ensure both the text node and the chevron frame exist before relying on SPACE_BETWEEN.
- **Prototype reactions API** — use `await node.setReactionsAsync([...])`, NOT `set_reactions` (MCP tool) which throws `"documentAccess: dynamic-page"`. The reaction object must use the `actions` array (not the deprecated singular `action` field — it throws "Please update the `actions` field to prevent data loss"). For switching between component variants use `navigation: 'CHANGE_TO'`, NOT `'NAVIGATE'` (which is for page/frame navigation and throws "Reaction at index 0 was invalid" on a COMPONENT_SET). Full pattern: `{ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', navigation: 'CHANGE_TO', destinationId: 'TARGET_NODE_ID', transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_IN_AND_OUT' }, duration: 0.3 } }] }`
<!-- END:design-system-rules -->

---

## Figma Skills — invoke automatically when context matches

These skills are installed globally. Invoke via `Skill(name)` — do not wait to be asked.

| Skill | Invoke when |
|---|---|
| `figma-use` | Any `figma_execute` call — always load first |
| `figma-implement-design` | Translating a Figma node into React/code |
| `figma-generate-design` | Creating new screens or layouts in Figma from a brief |
| `figma-generate-library` | Building a component set or design system library in Figma |
| `figma-create-design-system-rules` | Setting up or updating design system rules / AGENTS.md |
| `figma-code-connect-components` | Linking React components to Figma via Code Connect |
| `audit-design-system` | Checking a Figma screen for design-system drift before implementation |
| `apply-design-system` | Reconnecting a Figma screen to published design system components |
| `sync-figma-token` | Comparing code tokens vs Figma variables for drift |
