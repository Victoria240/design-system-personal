"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"

/* ─── Root ──────────────────────────────────────────────── */

function Select<Value = string>(props: SelectPrimitive.Root.Props<Value>) {
  return <SelectPrimitive.Root {...props} />
}

/* ─── Trigger ───────────────────────────────────────────── */

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-8 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {children}
      {/* Chevron icon */}
      <SelectPrimitive.Icon className="ml-auto shrink-0 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/* ─── Value ─────────────────────────────────────────────── */

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex-1 truncate text-left data-[placeholder]:text-muted-foreground", className)}
      {...props}
    />
  )
}

/* ─── Content (portal + positioner + popup) ─────────────── */

function SelectContent({
  className,
  children,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Positioner> & {
  sideOffset?: number
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Backdrop className="fixed inset-0" />
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        className="z-50"
        {...props}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-background shadow-md",
            "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95",
            "data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:zoom-in-95",
            className
          )}
        >
          <SelectPrimitive.List className="max-h-60 overflow-y-auto p-1">
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

/* ─── Item ───────────────────────────────────────────────── */

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-lg py-1.5 pr-2 pl-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {/* Check indicator */}
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex size-4 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/* ─── Group + Group Label ────────────────────────────────── */

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("py-1", className)}
      {...props}
    />
  )
}

function SelectGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn("px-2 py-1 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

/* ─── Separator ─────────────────────────────────────────── */

function SelectSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="select-separator"
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
}
