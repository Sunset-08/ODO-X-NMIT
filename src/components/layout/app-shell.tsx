"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { name: "Employees", href: "/employees" },
  { name: "Attendance", href: "/attendance" },
  { name: "Time Off", href: "/timeoff" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [status, setStatus] = React.useState<"present" | "absent" | "leave">("absent");

  const getStatusColor = () => {
    switch(status) {
      case "present": return "bg-success";
      case "leave": return "bg-warning";
      case "absent": return "bg-error";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 w-full border-b border-border bg-surface">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            {/* Company Logo */}
            <Link href="/" className="font-semibold text-lg tracking-tight text-primary">
              ODO India
            </Link>
            
            {/* Primary Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname.startsWith(item.href) ? "text-primary border-b-2 border-primary py-4" : "text-secondary py-4"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`} />
              <Avatar initials="JD" size="sm" />
            </button>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border shadow-md py-1 z-20">
                <div className="px-4 py-2 border-b border-border mb-1">
                  <p className="text-sm font-medium text-primary">John Doe</p>
                  <p className="text-xs text-secondary truncate">johndoe@odo.com</p>
                </div>
                
                <Link 
                  href="/profile" 
                  className="block px-4 py-2 text-sm text-primary hover:bg-background"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                
                <div className="px-4 py-2 flex flex-col gap-2 border-t border-border mt-1 pt-3">
                  <button 
                    onClick={() => setStatus("present")}
                    className="w-full text-left text-sm text-primary hover:bg-background py-1 flex items-center justify-between"
                  >
                    <span>Check In</span>
                    <span className="text-xs text-secondary">09:00 AM</span>
                  </button>
                  <button 
                    onClick={() => setStatus("absent")}
                    className="w-full text-left text-sm text-primary hover:bg-background py-1 flex items-center justify-between"
                  >
                    <span>Check Out</span>
                    <span className="text-xs text-secondary">05:00 PM</span>
                  </button>
                </div>

                <div className="border-t border-border mt-1 pt-1">
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 text-sm text-error hover:bg-background"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
