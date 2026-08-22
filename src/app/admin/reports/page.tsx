import * as React from "react";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminReportsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Reports & Analytics</h1>
      <EmptyState 
        title="No Reports Generated"
        description="Generate HR analytics and summaries."
      />
    </div>
  );
}
