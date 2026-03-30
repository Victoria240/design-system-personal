"use client"

import * as React from "react"
import { useState } from "react"
// Avatar DS component intentionally not used in sidebar — see footer comment for why
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/* ─── SVG icon helper ─────────────────────────────────────────── */

function SvgIcon({
  children,
  size = 16,
  strokeWidth = 2,
  className,
  ...rest
}: {
  children: React.ReactNode
  size?: number
  strokeWidth?: number
  className?: string
} & Omit<React.SVGProps<SVGSVGElement>, "width" | "height" | "strokeWidth">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
      {...rest}
    >
      {children}
    </svg>
  )
}

/* ─── Loop brand mark ─────────────────────────────────────────── */

function LoopMark({ size = 13 }: { size?: number }) {
  // Bidirectional loop glyph — reconstructed from Figma node 88:9952 (12×12 coordinate space).
  // Two opposing arcs with chevron arrowheads: top arc points right (→), bottom arc points left (←).
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Right-pointing chevron — arrowhead for top arc */}
      <path d="M8.5 0.5L10.5 2.5L8.5 4.5" />
      {/* Top arc — rises from lower-left, rounds corner, runs right */}
      <path d="M1.5 5.5L1.5 4.5C1.5 3.97 1.71 3.46 2.09 3.09C2.46 2.71 2.97 2.5 3.5 2.5L10.5 2.5" />
      {/* Left-pointing chevron — arrowhead for bottom arc */}
      <path d="M3.5 11.5L1.5 9.5L3.5 7.5" />
      {/* Bottom arc — drops from upper-right, rounds corner, runs left */}
      <path d="M10.5 6.5L10.5 7.5C10.5 8.03 10.29 8.54 9.91 8.91C9.54 9.29 9.03 9.5 8.5 9.5L1.5 9.5" />
    </svg>
  )
}

/* ─── Tooltip wrapper (only when collapsed) ───────────────────── */

function WithTooltip({
  label,
  collapsed,
  children,
  side = "right",
}: {
  label: string
  collapsed: boolean
  children: React.ReactNode
  side?: "right" | "top" | "bottom"
}) {
  if (!collapsed) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="block w-full" />}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  )
}

/* ─── Status dot ──────────────────────────────────────────────── */

type Status = "online" | "away" | "offline"

function StatusDot({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "block rounded-full border border-sidebar",
        status === "online" && "bg-success",
        status === "away" && "bg-warning",
        status === "offline" && "bg-sidebar-foreground/20",
        className
      )}
    />
  )
}

/* ─── Header icon button ──────────────────────────────────────── */

function HeaderIconBtn({
  label,
  onClick,
  children,
  className,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            onClick={onClick}
            aria-label={label}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/40",
              "transition-colors hover:bg-sidebar-foreground/8 hover:text-sidebar-foreground/80",
              className
            )}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  )
}

/* ─── Section divider ─────────────────────────────────────────── */

function SectionDivider() {
  return <div className="my-1 mx-2 border-t border-sidebar-border/40" />
}

/* ─── Accordion section ───────────────────────────────────────── */

function AccordionSection({
  label,
  isOpen,
  collapsed,
  onToggle,
  children,
}: {
  label: string
  isOpen: boolean
  collapsed: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Section header — text + chevron only, hidden when collapsed (items still render) */}
      {!collapsed && (
        <button
          onClick={onToggle}
          className="flex w-full items-center rounded-md px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-sidebar-foreground/30 transition-colors hover:text-sidebar-foreground/60"
        >
          <span className="flex-1 text-left">{label}</span>
          <SvgIcon
            size={12}
            className={cn(
              "text-sidebar-foreground/25 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          >
            <path d="M6 9l6 6 6-6" />
          </SvgIcon>
        </button>
      )}

      {(isOpen || collapsed) && (
        <div className="mt-0.5 flex flex-col gap-0.5">{children}</div>
      )}
    </div>
  )
}

/* ─── Nav item ────────────────────────────────────────────────── */

function NavItem({
  label,
  icon,
  badge,
  active = false,
  collapsed,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  badge?: number
  active?: boolean
  collapsed: boolean
  onClick?: () => void
}) {
  return (
    <WithTooltip label={badge ? `${label} · ${badge} unread` : label} collapsed={collapsed}>
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-md text-[13.5px] transition-colors",
          "text-sidebar-foreground/60 hover:bg-sidebar-foreground/6 hover:text-sidebar-foreground",
          active && "bg-sidebar-foreground/10 text-sidebar-foreground",
          collapsed ? "justify-center px-0 py-2" : "px-2.5 py-[7px]"
        )}
      >
        {/* Icon — relative wrapper for collapsed badge overlay */}
        <span className="relative shrink-0">
          {icon}
          {collapsed && badge != null && badge > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-brand px-0.5 text-[8px] font-bold leading-none text-white">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{label}</span>
            {badge != null && badge > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                {badge}
              </span>
            )}
          </>
        )}
      </button>
    </WithTooltip>
  )
}

/* ─── Channel item ────────────────────────────────────────────── */

function ChannelItem({
  label,
  active = false,
  collapsed,
  onClick,
}: {
  label: string
  active?: boolean
  collapsed: boolean
  onClick?: () => void
}) {
  return (
    <WithTooltip label={`# ${label}`} collapsed={collapsed}>
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2 rounded-md py-[5px] text-[13px] transition-colors",
          "text-sidebar-foreground/50 hover:bg-sidebar-foreground/6 hover:text-sidebar-foreground",
          active && "bg-sidebar-foreground/10 text-sidebar-foreground",
          collapsed ? "justify-center px-0" : "pl-2.5 pr-2"
        )}
      >
        <SvgIcon size={14} strokeWidth={2} className="shrink-0">
          <path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />
        </SvgIcon>
        {!collapsed && <span className="flex-1 truncate text-left">{label}</span>}
      </button>
    </WithTooltip>
  )
}

/* ─── DM item ─────────────────────────────────────────────────── */

function DMItem({
  label,
  initials,
  status,
  collapsed,
  onClick,
}: {
  label: string
  initials: string
  status: Status
  collapsed: boolean
  onClick?: () => void
}) {
  return (
    <WithTooltip label={label} collapsed={collapsed}>
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-md py-[5px] text-[13px] transition-colors",
          "text-sidebar-foreground/60 hover:bg-sidebar-foreground/6 hover:text-sidebar-foreground",
          collapsed ? "justify-center px-0" : "pl-2.5 pr-2"
        )}
      >
        <div className="relative shrink-0">
          <div className="relative flex size-5 items-center justify-center rounded-full bg-sidebar-foreground/10 text-[9px] font-semibold text-sidebar-foreground/60 select-none after:absolute after:inset-0 after:rounded-full after:border after:border-sidebar-border after:mix-blend-darken dark:after:mix-blend-lighten">
            {initials}
          </div>
          <StatusDot
            status={status}
            className="absolute -bottom-0.5 -right-0.5 size-[7px] border-[1.5px]"
          />
        </div>
        {!collapsed && (
          <span className="flex-1 truncate text-left">{label}</span>
        )}
      </button>
    </WithTooltip>
  )
}

/* ─── Add row ─────────────────────────────────────────────────── */

function AddRow({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-md py-1 pl-2.5 pr-2 text-[12.5px] text-sidebar-foreground/25 transition-colors hover:text-sidebar-foreground/55">
      <SvgIcon size={12} strokeWidth={2.5}>
        <path d="M12 5v14M5 12h14" />
      </SvgIcon>
      {label}
    </button>
  )
}

/* ─── Data ────────────────────────────────────────────────────── */

const CHANNELS = ["design-system", "general", "engineering"] as const

const DMS: Array<{ id: string; label: string; initials: string; status: Status }> = [
  { id: "aisha", label: "Aisha M.", initials: "AM", status: "online" },
  { id: "james", label: "James K.", initials: "JK", status: "offline" },
]

/* ─── Sidebar ─────────────────────────────────────────────────── */

export interface SidebarProps {
  isDark?: boolean
  onThemeToggle?: () => void
  /** Unread inbox count — drives the Inbox nav badge. Pass from parent so sidebar + topbar stay in sync. */
  inboxCount?: number
}

export function Sidebar({ isDark = true, onThemeToggle, inboxCount = 0 }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [channelsOpen, setChannelsOpen] = useState(true)
  const [dmsOpen, setDmsOpen] = useState(true)
  const [active, setActive] = useState("inbox")

  return (
    <TooltipProvider delay={collapsed ? 0 : 500} closeDelay={100}>
      <aside
        data-slot="sidebar"
        className={cn(
          "flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar",
          "transition-[width] duration-200 ease-in-out",
          collapsed ? "w-[52px]" : "w-[220px]"
        )}
      >
        {/* ── Header ─────────────────────────────────────── */}
        {/* Collapsed: logo as a 30×30 circle — click to expand (matches Figma) */}
        {/* Expanded: logo badge (26×26 rounded rect) + Loop name + compose + collapse actions */}
        {collapsed ? (
          /* Collapsed header: logo as a circle — click to expand. Matches Figma node 88:10064 (ELLIPSE, 30×30). */
          <div className="flex h-12 shrink-0 items-center justify-center border-b border-sidebar-border">
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar  ⌘\"
              className="flex size-[30px] items-center justify-center rounded-full bg-brand text-white transition-opacity hover:opacity-85"
            >
              <LoopMark size={13} />
            </button>
          </div>
        ) : (
          <div className="flex h-12 shrink-0 items-center gap-1.5 border-b border-sidebar-border px-3">
            {/* Logo */}
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex size-[26px] shrink-0 items-center justify-center rounded-md bg-brand text-white">
                <LoopMark size={13} />
              </div>
              <span className="truncate text-[15px] font-semibold tracking-tight text-sidebar-foreground">
                Loop
              </span>
            </div>
            {/* Actions */}
            <div className="ml-auto flex shrink-0 items-center gap-0.5">
              <HeaderIconBtn label="New message  ⌘N">
                <SvgIcon size={15}>
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </SvgIcon>
              </HeaderIconBtn>
              <HeaderIconBtn
                label="Collapse sidebar  ⌘\\"
                onClick={() => setCollapsed(true)}
              >
                <SvgIcon size={15}>
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18" />
                  <path d="M15 15l-3-3 3-3" />
                </SvgIcon>
              </HeaderIconBtn>
            </div>
          </div>
        )}

        {/* ── Search ─────────────────────────────────────── */}
        <div className={cn("px-2 pt-2.5 pb-1", collapsed && "flex justify-center")}>
          {collapsed ? (
            <WithTooltip label="Search  ⌘K" collapsed>
              <button className="flex size-8 items-center justify-center rounded-md text-sidebar-foreground/40 transition-colors hover:bg-sidebar-foreground/8 hover:text-sidebar-foreground/70">
                <SvgIcon size={15}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </SvgIcon>
              </button>
            </WithTooltip>
          ) : (
            <button className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-foreground/[0.04] px-2.5 py-1.5 text-sidebar-foreground/40 transition-colors hover:bg-sidebar-foreground/8 hover:text-sidebar-foreground/60">
              <SvgIcon size={13}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </SvgIcon>
              <span className="flex-1 text-left text-[13px]">Search…</span>
              <kbd className="flex h-[18px] items-center rounded border border-sidebar-border px-1.5 text-[10px] font-medium text-sidebar-foreground/25">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* ── Nav ────────────────────────────────────────── */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden px-2 py-1.5">
          {/* Compose in collapsed mode */}
          {collapsed && (
            <WithTooltip label="New message  ⌘N" collapsed>
              <button className="flex w-full items-center justify-center rounded-md py-2 text-sidebar-foreground/40 transition-colors hover:bg-sidebar-foreground/8 hover:text-sidebar-foreground/70">
                <SvgIcon size={15}>
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </SvgIcon>
              </button>
            </WithTooltip>
          )}

          {/* Primary nav — Inbox, Threads, Saved */}
          <NavItem
            label="Inbox"
            icon={
              <SvgIcon size={15}>
                <path d="M22 12H16L14 15H10L8 12H2" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </SvgIcon>
            }
            badge={inboxCount > 0 ? inboxCount : undefined}
            active={active === "inbox"}
            collapsed={collapsed}
            onClick={() => setActive("inbox")}
          />
          <NavItem
            label="Threads"
            icon={
              <SvgIcon size={15}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </SvgIcon>
            }
            active={active === "threads"}
            collapsed={collapsed}
            onClick={() => setActive("threads")}
          />
          <NavItem
            label="Saved"
            icon={
              <SvgIcon size={15}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </SvgIcon>
            }
            active={active === "saved"}
            collapsed={collapsed}
            onClick={() => setActive("saved")}
          />

          <SectionDivider />

          {/* Channels */}
          <AccordionSection
            label="Channels"
            isOpen={channelsOpen}
            collapsed={collapsed}
            onToggle={() => !collapsed && setChannelsOpen((v) => !v)}
          >
            {CHANNELS.map((ch) => (
              <ChannelItem
                key={ch}
                label={ch}
                active={active === `ch-${ch}`}
                collapsed={collapsed}
                onClick={() => setActive(`ch-${ch}`)}
              />
            ))}
            {!collapsed && <AddRow label="Add channels" />}
          </AccordionSection>

          <div className="mt-1" />

          {/* Direct Messages */}
          <AccordionSection
            label="Direct Messages"
            isOpen={dmsOpen}
            collapsed={collapsed}
            onToggle={() => !collapsed && setDmsOpen((v) => !v)}
          >
            {DMS.map((dm) => (
              <DMItem
                key={dm.id}
                label={dm.label}
                initials={dm.initials}
                status={dm.status}
                collapsed={collapsed}
                onClick={() => setActive(`dm-${dm.id}`)}
              />
            ))}
            {!collapsed && <AddRow label="Add people" />}
          </AccordionSection>
        </nav>

        {/* ── Footer ─────────────────────────────────────── */}
        {/* One row: avatar + name/status + theme toggle. Tight and intentional. */}
        <div className="border-t border-sidebar-border p-2">
          <div
            className={cn(
              "flex items-center rounded-md transition-colors hover:bg-sidebar-foreground/6",
              collapsed ? "flex-col gap-2 py-2" : "gap-2.5 px-2.5 py-2"
            )}
          >
            {/* Avatar with status dot — custom div, not Avatar DS component.
                The Avatar component's mix-blend-darken overlay and Base UI Fallback delay
                both break inside sidebar token context. Custom div matches DM avatar pattern. */}
            <WithTooltip label="Victoria T. — Active" collapsed={collapsed} side="right">
              <button
                className={cn(
                  "relative flex shrink-0 cursor-pointer",
                  collapsed && "mx-auto"
                )}
              >
                <div className="relative flex size-6 items-center justify-center rounded-full bg-sidebar-foreground/20 text-[10px] font-semibold text-sidebar-foreground select-none after:absolute after:inset-0 after:rounded-full after:border after:border-sidebar-border after:mix-blend-darken dark:after:mix-blend-lighten">
                  VT
                </div>
                <StatusDot
                  status="online"
                  className="absolute -bottom-0.5 -right-0.5 size-[7px] border-[1.5px] border-sidebar"
                />
              </button>
            </WithTooltip>

            {/* Name + status — only expanded */}
            {!collapsed && (
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[13px] font-medium leading-snug text-sidebar-foreground">
                  Victoria T.
                </span>
                <span className="text-[11px] leading-snug text-sidebar-foreground/35">
                  Active
                </span>
              </div>
            )}

            {/* Theme toggle */}
            <WithTooltip
              label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              collapsed={collapsed}
              side={collapsed ? "right" : "top"}
            >
              <button
                onClick={onThemeToggle}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-md text-sidebar-foreground/35 transition-colors hover:bg-sidebar-foreground/8 hover:text-sidebar-foreground/70",
                  collapsed ? "size-8" : "size-7"
                )}
              >
                {isDark ? (
                  <SvgIcon size={14}>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </SvgIcon>
                ) : (
                  <SvgIcon size={14}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </SvgIcon>
                )}
              </button>
            </WithTooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
