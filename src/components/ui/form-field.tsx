import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
} & Omit<React.ComponentProps<"input">, "id">;

function FormField({
  label,
  hint,
  error,
  required,
  id,
  className,
  ...inputProps
}: FormFieldProps) {
  const inputId = id ?? React.useId();
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && (
            <span className="text-destructive ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}
      <Input
        id={inputId}
        aria-describedby={cn(hintId, errorId) || undefined}
        aria-invalid={!!error || undefined}
        aria-required={required || undefined}
        {...inputProps}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { FormField };
