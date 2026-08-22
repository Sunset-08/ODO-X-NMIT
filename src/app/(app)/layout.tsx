import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AttendanceProvider } from "@/lib/attendance-store";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AttendanceProvider>
      <AppShell>{children}</AppShell>
    </AttendanceProvider>
  );
}
