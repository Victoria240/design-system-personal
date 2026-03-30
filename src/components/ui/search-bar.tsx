"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  size?: "sm" | "default" | "lg";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

const sizeMap = {
  sm: "h-7 text-xs",
  default: "h-8 text-sm",
  lg: "h-9 text-sm",
};

const iconSizeMap = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-4",
};

function SearchBar({
  placeholder = "Search…",
  value,
  defaultValue,
  onChange,
  onClear,
  size = "default",
  className,
  disabled,
  "aria-label": ariaLabel = "Search",
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const displayValue = isControlled ? value : internalValue;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  }

  function handleClear() {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onClear?.();
  }

  return (
    <div
      data-slot="search-bar"
      className={cn(
        "relative flex w-full items-center rounded-lg border border-input bg-transparent transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {/* Search icon */}
      <span className="pointer-events-none absolute left-2.5 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconSizeMap[size]}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>

      <input
        type="search"
        role="searchbox"
        aria-label={ariaLabel}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full bg-transparent pl-8 outline-none placeholder:text-muted-foreground",
          displayValue ? "pr-8" : "pr-2.5",
          sizeMap[size]
        )}
      />

      {/* Clear button */}
      {displayValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconSizeMap[size]}
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { SearchBar };
