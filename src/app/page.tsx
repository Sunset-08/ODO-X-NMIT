import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full border-b border-border bg-surface h-16 flex items-center px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="font-semibold text-xl tracking-tight text-primary flex items-center gap-2">
            <img src="/DF_Logo.png" alt="DayFlow Logo" className="h-8 w-auto object-contain" />
            DayFlow
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">
            Enterprise HR Management
          </h1>
          <p className="text-lg text-secondary max-w-xl mx-auto leading-relaxed">
            A professional, secure, and intuitive platform to manage employees, attendance, time off, and payroll across your organization.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="w-40">Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-secondary border-t border-border">
        &copy; {new Date().getFullYear()} DayFlow. All rights reserved.
      </footer>
    </div>
  );
}
