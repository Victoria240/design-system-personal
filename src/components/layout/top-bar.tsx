"use client"

import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────
   TopBar — contextual screen header for sidebar-driven apps.

   Pattern: flat nav (sidebar = primary navigation) does NOT use
   breadcrumbs. The top bar shows the current view's name + view-
   specific actions. The right slot (notifications, avatar) is
   always present and identical across views.

   Props:
   - title      The current view label (e.g. "Inbox", "#general")
   - badge      Optional unread/count indicator beside the title
   - actions    View-specific action buttons (Filter, Mark all read…)
   - className  Optional override for the header element
───────────────────────────────────────────────────────────────── */

export interface TopBarProps {
  title: string
  badge?: number
  actions?: React.ReactNode
  className?: string
}

export function TopBar({ title, badge, actions, className }: TopBarProps) {
  return (
    <TooltipProvider>
      <header
        data-slot="top-bar"
        className={cn(
          "flex h-12 shrink-0 items-center border-b border-border bg-background px-5",
          className
        )}
      >
        {/* View title + optional unread badge */}
        <div className="flex flex-1 items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            {title}
          </span>
          {badge != null && badge > 0 && (
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-semibold text-white">
              {badge}
            </span>
          )}
        </div>

        {/* View-specific actions — passed per screen */}
        {actions && (
          <div className="flex items-center gap-0.5">{actions}</div>
        )}

        {/* Global controls — always present, identical across views */}
        <div className="ml-4 flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  aria-label="Notifications"
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
          <Avatar size="sm">
            <AvatarFallback>VT</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </TooltipProvider>
  )
}
