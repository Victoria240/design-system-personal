"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Typography } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate async
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-brand">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <Typography variant="h3">Pulse</Typography>
        </div>

        {/* Card */}
        <Card variant="outlined" className="p-8">
          <div className="mb-6">
            <Typography variant="h4">Sign in to your account</Typography>
            <Typography variant="body-sm" muted className="mt-1">
              Enter your credentials to continue
            </Typography>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <FormField
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <FormField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <div className="flex justify-end">
              <Button variant="link" size="sm" type="button" className="h-auto p-0 text-xs">
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <Separator className="my-6" />

          <Typography variant="caption" muted className="text-center">
            Don&apos;t have an account?{" "}
            <Button variant="link" size="sm" type="button" className="h-auto p-0 text-xs">
              Request access
            </Button>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
