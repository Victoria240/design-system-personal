import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const iconVariants = cva("shrink-0 [&>svg]:size-full", {
  variants: {
    size: {
      xs: "size-3",       // 12px — inline with xs text
      sm: "size-3.5",     // 14px — inline with sm text
      md: "size-4",       // 16px — default, most UI contexts
      lg: "size-5",       // 20px — section headers, nav
      xl: "size-6",       // 24px — feature icons, empty states
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type IconProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof iconVariants> & {
    /**
     * Accessible label for non-decorative icons.
     * If omitted, icon is hidden from assistive technology (aria-hidden).
     */
    label?: string
  }

function Icon({ size, label, className, children, ...props }: IconProps) {
  return (
    <span
      data-slot="icon"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(iconVariants({ size }), "inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </span>
  )
}

export { Icon, iconVariants }
