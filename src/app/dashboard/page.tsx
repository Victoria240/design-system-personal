"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { cn } from "@/lib/utils"

/* ─── Types ───────────────────────────────────────────────────── */

type InboxItem = {
  id: string
  sender: { name: string; initials: string }
  context: string
  preview: string
  time: string
  unread: boolean
  mention?: boolean
  section: "today" | "yesterday"
}

/* ─── Data ────────────────────────────────────────────────────── */

const INBOX_ITEMS: InboxItem[] = [
  {
    id: "1",
    sender: { name: "Aisha M.", initials: "AM" },
    context: "#design-system",
    preview:
      "The destructive button hover state looks off — can you check the token binding on the ghost variant?",
    time: "2m",
    unread: true,
    mention: true,
    section: "today",
  },
  {
    id: "2",
    sender: { name: "James K.", initials: "JK" },
    context: "#general",
    preview:
      "Quick question about the Figma library — are Molecules on a separate page or the same as Atoms?",
    time: "18m",
    unread: true,
    section: "today",
  },
  {
    id: "3",
    sender: { name: "Aisha M.", initials: "AM" },
    context: "Direct message",
    preview:
      "Are you joining the design sync at 3pm? I'll drop the Figma link in the channel beforehand",
    time: "1h",
    unread: false,
    section: "today",
  },
  {
    id: "4",
    sender: { name: "James K.", initials: "JK" },
    context: "#design-system",
    preview:
      "Updated the icon frames on the Atoms page — all 16×16 now, no more clipping issues",
    time: "3h",
    unread: false,
    section: "today",
  },
  {
    id: "5",
    sender: { name: "Aisha M.", initials: "AM" },
    context: "#engineering",
    preview:
      "The sidebar token system looks clean. Using sidebar-accent for hover states was the right call",
    time: "9h",
    unread: false,
    section: "today",
  },
  {
    id: "6",
    sender: { name: "James K.", initials: "JK" },
    context: "#general",
    preview:
      "Left a comment on the card component — the padding between the header and content row feels a bit tight",
    time: "Yesterday",
    unread: false,
    section: "yesterday",
  },
  {
    id: "7",
    sender: { name: "Aisha M.", initials: "AM" },
    context: "#design-system",
    preview:
      "Should we add a Spinner component to the library? I need it for the button loading state",
    time: "Yesterday",
    unread: false,
    section: "yesterday",
  },
]

const todayItems = INBOX_ITEMS.filter((i) => i.section === "today")
const yesterdayItems = INBOX_ITEMS.filter((i) => i.section === "yesterday")
const unreadCount = INBOX_ITEMS.filter((i) => i.unread).length

/* ─── Section label ───────────────────────────────────────────── */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-5 pb-2 pt-4">
      <span className="text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50">
        {label}
      </span>
    </div>
  )
}

/* ─── Inbox thread row ────────────────────────────────────────── */

function InboxThread({
  item,
  active,
  onClick,
}: {
  item: InboxItem
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 border-b border-border px-5 py-3.5 text-left transition-colors",
        active
          ? "bg-muted/60"
          : item.unread
          ? "bg-muted/20 hover:bg-muted/40"
          : "hover:bg-muted/30"
      )}
    >
      {/* Unread indicator — 8px reserved column, dot visible only when unread */}
      <span className="flex w-2 shrink-0 justify-center">
        {item.unread && (
          <span
            className="block size-1.5 rounded-full bg-brand"
            aria-label="Unread"
          />
        )}
      </span>

      {/* Sender avatar */}
      <Avatar className="shrink-0">
        <AvatarFallback className="text-[11px]">
          {item.sender.initials}
        </AvatarFallback>
      </Avatar>

      {/* Message content */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {/* Line 1: sender name + context · timestamp */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span
              className={cn(
                "shrink-0 text-[13.5px] leading-snug",
                item.unread
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground/75"
              )}
            >
              {item.sender.name}
            </span>
            <span className="truncate text-[12px] leading-snug text-muted-foreground/55">
              {item.context}
            </span>
          </div>
          <span className="shrink-0 text-[11.5px] tabular-nums text-muted-foreground/50">
            {item.time}
          </span>
        </div>

        {/* Line 2: message preview · mention badge */}
        <div className="flex items-center justify-between gap-3">
          <p
            className={cn(
              "truncate text-[13px] leading-snug",
              item.unread
                ? "text-foreground/75"
                : "text-muted-foreground/60"
            )}
          >
            {item.preview}
          </p>
          {item.mention && (
            <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              @
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true)
  const [activeThread, setActiveThread] = useState<string | null>(null)

  const topBarActions = (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 gap-1.5 px-2.5 text-[12.5px] text-muted-foreground hover:text-foreground"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filter
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 gap-1.5 px-2.5 text-[12.5px] text-muted-foreground hover:text-foreground"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Mark all read
      </Button>
    </>
  )

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar — inboxCount keeps sidebar badge in sync with TopBar badge */}
        <Sidebar
          isDark={isDark}
          onThemeToggle={() => setIsDark((v) => !v)}
          inboxCount={unreadCount}
        />

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar title="Inbox" badge={unreadCount} actions={topBarActions} />

          <main className="flex flex-1 flex-col overflow-y-auto">
            <SectionLabel label="Today" />
            {todayItems.map((item) => (
              <InboxThread
                key={item.id}
                item={item}
                active={activeThread === item.id}
                onClick={() => setActiveThread(item.id)}
              />
            ))}

            <SectionLabel label="Yesterday" />
            {yesterdayItems.map((item) => (
              <InboxThread
                key={item.id}
                item={item}
                active={activeThread === item.id}
                onClick={() => setActiveThread(item.id)}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  )
}
