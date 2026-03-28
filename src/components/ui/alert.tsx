import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/* ─── Icons ─────────────────────────────────────────────── */

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
);

const iconMap = {
  default: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  destructive: ErrorIcon,
};

/* ─── Variants ──────────────────────────────────────────── */

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        default:
          "border-border bg-background text-foreground [&_[data-slot=alert-icon]]:text-foreground",
        success:
          "border-success/20 bg-success/10 text-foreground [&_[data-slot=alert-icon]]:text-success dark:border-success/30 dark:bg-success/15",
        warning:
          "border-warning/30 bg-warning/10 text-foreground [&_[data-slot=alert-icon]]:text-warning dark:bg-warning/15",
        destructive:
          "border-destructive/20 bg-destructive/10 text-foreground [&_[data-slot=alert-icon]]:text-destructive dark:border-destructive/30 dark:bg-destructive/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ─── Component ─────────────────────────────────────────── */

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: string;
    /** Override the default icon; pass null to hide it */
    icon?: React.ReactNode | null;
    onDismiss?: () => void;
  };

function Alert({
  variant = "default",
  title,
  icon,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const DefaultIcon = iconMap[variant ?? "default"];
  const resolvedIcon = icon === null ? null : (icon ?? <DefaultIcon />);

  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {resolvedIcon && (
        <span data-slot="alert-icon" className="mt-0.5">
          {resolvedIcon}
        </span>
      )}

      <div className="flex flex-1 flex-col gap-1">
        {title && (
          <p className="font-medium leading-none">{title}</p>
        )}
        {children && (
          <div className="text-muted-foreground leading-relaxed">{children}</div>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="ml-auto -mt-0.5 -mr-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
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
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Alert, alertVariants };
