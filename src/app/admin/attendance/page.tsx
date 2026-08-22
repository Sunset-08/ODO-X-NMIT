import * as React from "react";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminAttendancePage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Attendance Management</h1>
      <EmptyState 
        title="No Attendance Data"
        description="Attendance records will appear here once employees check in/out."
      />
    </div>
  );
}
