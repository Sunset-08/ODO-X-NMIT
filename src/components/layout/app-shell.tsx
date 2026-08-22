"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarOff,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Navigation config
───────────────────────────────────────────── */

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavGroup = {
  heading: string;
  items: NavItem[];
};

const employeeNav: NavGroup[] = [
  {
    heading: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Workforce",
    items: [
      { label: "Attendance", href: "/attendance", icon: CalendarCheck },
      { label: "Time Off", href: "/time-off", icon: CalendarOff },
    ],
  },
];

const adminNav: NavGroup[] = [
  {
    heading: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Workforce",
    items: [
      { label: "Employees", href: "/admin/employees", icon: Users },
      { label: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
      { label: "Time Off", href: "/admin/time-off", icon: CalendarOff },
    ],
  },
  {
    heading: "Finance",
    items: [{ label: "Payroll", href: "/admin/payroll", icon: DollarSign }],
  },
  {
    heading: "Reports",
    items: [{ label: "Analytics", href: "/admin/reports", icon: BarChart3 }],
  },
];

/* ─────────────────────────────────────────────
   Demo user data (replace with real auth later)
───────────────────────────────────────────── */

const demoEmployee = {
  name: "Alice Johnson",
  role: "Software Engineer",
  email: "alice@dayflow.com",
  initials: "AJ",
};

const demoAdmin = {
  name: "Priya Menon",
  role: "HR Administrator",
  email: "priya@dayflow.com",
  initials: "PM",
};

/* ─────────────────────────────────────────────
   NavItem component
───────────────────────────────────────────── */

function SidebarNavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
        isActive
          ? "bg-accent-light text-primary"
          : "text-secondary hover:bg-accent-light/50 hover:text-text"
      }`}
    >
      <Icon
        size={16}
        className={`shrink-0 ${isActive ? "text-primary" : "text-secondary"}`}
        strokeWidth={isActive ? 2.5 : 2}
      />
      {item.label}
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Sidebar content (shared between desktop + mobile)
───────────────────────────────────────────── */

function SidebarContent({
  navGroups,
  user,
  pathname,
  onClose,
}: {
  navGroups: NavGroup[];
  user: typeof demoEmployee;
  pathname: string;
  onClose?: () => void;
}) {
  const profileHref = pathname.startsWith("/admin") ? "/admin/profile" : "/profile";

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          onClick={onClose}
        >
          <img src="/DF_Logo.png" alt="DayFlow" className="h-7 w-auto object-contain" />
          <span className="font-semibold text-[15px] tracking-tight text-text">DayFlow</span>
        </Link>
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded text-secondary hover:text-text focus-visible:outline-none"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 pt-5 pb-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.heading}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-secondary/60 select-none">
              {group.heading}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarNavItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: Settings + User profile */}
      <div className="shrink-0 border-t border-border">
        {/* Settings */}
        <div className="px-3 pt-3 pb-2 space-y-0.5">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-sm font-medium text-secondary hover:bg-accent-light/50 hover:text-text transition-colors"
            onClick={onClose}
          >
            <Settings size={16} className="shrink-0" strokeWidth={2} />
            Settings
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-sm font-medium text-secondary hover:bg-error/8 hover:text-error transition-colors"
            onClick={onClose}
          >
            <LogOut size={16} className="shrink-0" strokeWidth={2} />
            Log Out
          </Link>
        </div>

        {/* User profile strip */}
        <Link
          href={profileHref}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 border-t border-border hover:bg-background transition-colors group"
        >
          <Avatar initials={user.initials} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate leading-tight">{user.name}</p>
            <p className="text-xs text-secondary truncate">{user.role}</p>
          </div>
          <User size={14} className="shrink-0 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Topbar
───────────────────────────────────────────── */

function Topbar({
  onMenuClick,
  isAdmin,
}: {
  onMenuClick: () => void;
  isAdmin: boolean;
}) {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const user = isAdmin ? demoAdmin : demoEmployee;
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-14 bg-surface border-b border-border flex items-center px-4 gap-4 shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-[6px] text-secondary hover:text-text hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* Mobile logo (hidden on desktop, sidebar shows it) */}
      <div className="flex-1 flex items-center lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <img src="/DF_Logo.png" alt="DayFlow" className="h-6 w-auto object-contain" />
          <span className="font-semibold text-sm text-text">DayFlow</span>
        </Link>
      </div>

      {/* Desktop spacer */}
      <div className="hidden lg:flex flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Notifications */}
        <button
          className="relative p-1.5 rounded-[6px] text-secondary hover:text-text hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {/* Unread dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-[6px] hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <Avatar initials={user.initials} size="sm" />
            <span className="hidden sm:block text-sm font-medium text-text">{user.name.split(" ")[0]}</span>
            <ChevronDown
              size={14}
              className={`text-secondary transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              className="absolute right-0 mt-1.5 w-56 bg-surface border border-border rounded-[10px] shadow-[var(--shadow-dropdown)] py-1 z-30"
              role="menu"
            >
              <div className="px-3 py-2.5 border-b border-border">
                <p className="text-sm font-semibold text-text">{user.name}</p>
                <p className="text-xs text-secondary mt-0.5">{user.email}</p>
              </div>

              <div className="py-1">
                <Link
                  href={isAdmin ? "/admin/profile" : "/profile"}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-text hover:bg-background transition-colors"
                  onClick={() => setProfileOpen(false)}
                  role="menuitem"
                >
                  <User size={14} className="text-secondary" />
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-text hover:bg-background transition-colors"
                  onClick={() => setProfileOpen(false)}
                  role="menuitem"
                >
                  <Settings size={14} className="text-secondary" />
                  Settings
                </Link>
              </div>

              <div className="border-t border-border py-1">
                <Link
                  href="/login"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-error hover:bg-error/5 transition-colors"
                  onClick={() => setProfileOpen(false)}
                  role="menuitem"
                >
                  <LogOut size={14} />
                  Log Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Mobile Overlay Drawer
───────────────────────────────────────────── */

function MobileDrawer({
  open,
  onClose,
  navGroups,
  user,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  navGroups: NavGroup[];
  user: typeof demoEmployee;
  pathname: string;
}) {
  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 bg-text/30 backdrop-blur-[1px] lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <SidebarContent
          navGroups={navGroups}
          user={user}
          pathname={pathname}
          onClose={onClose}
        />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   AppShell — Main export
───────────────────────────────────────────── */

export function AppShell({
  children,
  isAdmin = false,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navGroups = isAdmin ? adminNav : employeeNav;
  const user = isAdmin ? demoAdmin : demoEmployee;

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-surface border-r border-border">
        <SidebarContent navGroups={navGroups} user={user} pathname={pathname} />
      </aside>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navGroups={navGroups}
        user={user}
        pathname={pathname}
      />

      {/* ── Main column (topbar + page content) ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} isAdmin={isAdmin} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-screen-xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
