import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

const screens = [
  { label: "Login", href: "/login", description: "Auth screen — FormField, Button, Alert, Separator" },
  { label: "Dashboard", href: "/dashboard", description: "App shell — Card, Badge, SearchBar, Avatar, Tooltip" },
  { label: "Settings", href: "/settings", description: "Settings — FormField, Textarea, Select, Toggle, Alert" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <Typography variant="h2">Design System</Typography>
          <Typography variant="body" muted className="mt-2">
            SaaS screen showcase — all components in context
          </Typography>
        </div>
        <div className="flex flex-col gap-3">
          {screens.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card variant="outlined" className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{s.label}</CardTitle>
                  <CardDescription>{s.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
