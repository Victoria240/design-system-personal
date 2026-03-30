"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";

type SaveState = "idle" | "saving" | "saved";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users" },
  { label: "Revenue" },
  { label: "Analytics" },
  { label: "Settings", active: true },
];

const settingsSections = ["Profile", "Account", "Notifications", "Security"];

export default function SettingsPage() {
  const [section, setSection] = React.useState("Profile");
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const [name, setName] = React.useState("Victoria Taiwo");
  const [email, setEmail] = React.useState("victoria@company.com");
  const [bio, setBio] = React.useState("Senior product designer building AI-assisted workflows.");
  const [emailNotifs, setEmailNotifs] = React.useState(true);
  const [productUpdates, setProductUpdates] = React.useState(false);

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    }, 800);
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <Typography variant="label" className="font-semibold">Pulse</Typography>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm"><AvatarFallback>VT</AvatarFallback></Avatar>
            <div className="flex min-w-0 flex-col gap-0.5">
              <Typography variant="label" className="truncate">Victoria T.</Typography>
              <Typography variant="caption" muted className="truncate">Admin</Typography>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-border bg-background px-6">
          <Typography variant="h4">Settings</Typography>
        </header>

        <main className="flex flex-1 gap-8 p-6">
          {/* Settings nav */}
          <nav className="hidden w-40 shrink-0 flex-col gap-0.5 lg:flex">
            {settingsSections.map((s) => (
              <Button
                key={s}
                variant={section === s ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSection(s)}
              >
                {s}
              </Button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-6 max-w-2xl">
            {saveState === "saved" && (
              <Alert variant="success" title="Changes saved" onDismiss={() => setSaveState("idle")}>
                Your settings have been updated successfully.
              </Alert>
            )}

            {section === "Profile" && (
              <>
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Update your public profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-5">
                      {/* Avatar */}
                      <div className="flex items-center gap-5">
                        <Avatar size="lg" className="shrink-0">
                          <AvatarFallback>VT</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Upload photo</Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-transparent">Remove</Button>
                          </div>
                          <Typography variant="caption" muted>JPG, PNG or GIF · Max 2MB</Typography>
                        </div>
                      </div>

                      <Separator />

                      <FormField
                        label="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                      <FormField
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        hint="Used for login and notifications"
                      />
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell your team a bit about yourself"
                          resize="vertical"
                        />
                        <Typography variant="caption" muted>{bio.length}/160 characters</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {section === "Notifications" && (
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what you want to be notified about</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {[
                      { id: "email-notifs", label: "Email notifications", description: "Receive updates and alerts via email", value: emailNotifs, onChange: setEmailNotifs },
                      { id: "product-updates", label: "Product updates", description: "New features, improvements, and changelogs", value: productUpdates, onChange: setProductUpdates },
                    ].map((item, i, arr) => (
                      <div key={item.id}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Label htmlFor={item.id}>{item.label}</Label>
                            <Typography variant="caption" muted className="mt-0.5">{item.description}</Typography>
                          </div>
                          <Toggle
                            id={item.id}
                            checked={item.value}
                            onChange={item.onChange}
                          />
                        </div>
                        {i < arr.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {section === "Account" && (
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your plan and billing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <Typography variant="label">Current plan</Typography>
                        <Typography variant="caption" muted>Pro · Billed monthly</Typography>
                      </div>
                      <Badge variant="success">Pro</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <Typography variant="label">Next billing date</Typography>
                        <Typography variant="caption" muted>1 July 2026</Typography>
                      </div>
                      <Button variant="outline" size="sm">Manage billing</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {section === "Security" && (
              <>
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Change password</CardTitle>
                    <CardDescription>Use a strong password you don&apos;t use elsewhere</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <FormField label="Current password" type="password" placeholder="••••••••" />
                      <FormField label="New password" type="password" placeholder="••••••••" />
                      <FormField label="Confirm new password" type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                </Card>

                <Card variant="outlined" className="border-destructive/25 bg-destructive/[0.03]">
                  <CardHeader>
                    <CardTitle className="text-xs font-semibold uppercase tracking-widest text-destructive">Danger zone</CardTitle>
                    <CardDescription>These actions cannot be undone.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <Typography variant="label">Delete account</Typography>
                        <Typography variant="caption" muted>
                          Permanently remove your account and all data
                        </Typography>
                      </div>
                      <Button variant="destructive-solid" size="sm">Delete account</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Save footer */}
            {(section === "Profile" || section === "Notifications") && (
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button">Cancel</Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saveState === "saving"}
                >
                  {saveState === "saving" ? "Saving…" : "Save changes"}
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
