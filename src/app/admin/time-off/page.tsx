import * as React from "react";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminTimeOffPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Time Off Approvals</h1>
      <EmptyState 
        title="No Pending Requests"
        description="Employee time-off requests will appear here for your approval."
      />
    </div>
  );
}
