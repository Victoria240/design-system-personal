import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ElementType } from "react";

type TypographyVariant =
  | "h1" | "h2" | "h3" | "h4"
  | "body-lg" | "body" | "body-sm"
  | "caption" | "label" | "code" | "mono";

type TypographyProps = HTMLAttributes<HTMLElement> & {
  variant?: TypographyVariant;
  as?: ElementType;
  muted?: boolean;
};

const styles: Record<TypographyVariant, string> = {
  "h1":      "scroll-m-20 text-4xl font-bold tracking-tight",
  "h2":      "scroll-m-20 text-3xl font-semibold tracking-tight",
  "h3":      "scroll-m-20 text-2xl font-semibold tracking-tight",
  "h4":      "scroll-m-20 text-xl font-semibold tracking-tight",
  "body-lg": "text-md leading-7",
  "body":    "text-base leading-7",
  "body-sm": "text-sm leading-6",
  "caption": "text-xs leading-5",
  "label":   "text-sm font-medium leading-none",
  "code":    "font-mono text-sm bg-muted px-1.5 py-0.5 rounded-sm",
  "mono":    "font-mono text-sm",
};

const defaultTags: Record<TypographyVariant, ElementType> = {
  "h1": "h1", "h2": "h2", "h3": "h3", "h4": "h4",
  "body-lg": "p", "body": "p", "body-sm": "p",
  "caption": "span", "label": "span",
  "code": "code", "mono": "span",
};

export function Typography({
  variant = "body",
  as,
  muted = false,
  className,
  children,
  ...props
}: TypographyProps) {
  const Tag = as ?? defaultTags[variant];

  return (
    <Tag
      className={cn(
        styles[variant],
        muted && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
