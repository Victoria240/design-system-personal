/**
 * Design Token Reference
 * Single source of truth — mirrors Figma Variables.
 * All values map to CSS custom properties in globals.css.
 */

export const tokens = {
  color: {
    brand: {
      DEFAULT: "var(--brand)",
      foreground: "var(--brand-foreground)",
      muted: "var(--brand-muted)",
      subtle: "var(--brand-subtle)",
    },
    semantic: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: "var(--primary)",
      primaryForeground: "var(--primary-foreground)",
      secondary: "var(--secondary)",
      secondaryForeground: "var(--secondary-foreground)",
      muted: "var(--muted)",
      mutedForeground: "var(--muted-foreground)",
      accent: "var(--accent)",
      accentForeground: "var(--accent-foreground)",
      destructive: "var(--destructive)",
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
    },
    status: {
      success: "var(--success)",
      successForeground: "var(--success-foreground)",
      warning: "var(--warning)",
      warningForeground: "var(--warning-foreground)",
    },
  },

  radius: {
    sm: "calc(var(--radius) * 0.6)",
    md: "calc(var(--radius) * 0.8)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) * 1.4)",
    "2xl": "calc(var(--radius) * 1.8)",
    full: "9999px",
  },

  shadow: {
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
  },

  font: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },

  fontSize: {
    xs:   "0.75rem",    // 12px — captions, labels
    sm:   "0.875rem",   // 14px — body small, table cells
    base: "1rem",       // 16px — body default
    md:   "1.125rem",   // 18px — body large
    lg:   "1.25rem",    // 20px — subheading
    xl:   "1.5rem",     // 24px — heading sm
    "2xl": "1.875rem",  // 30px — heading md
    "3xl": "2.25rem",   // 36px — heading lg
    "4xl": "3rem",      // 48px — display
  },
} as const;

export type TokenColor = typeof tokens.color;
export type TokenRadius = typeof tokens.radius;
