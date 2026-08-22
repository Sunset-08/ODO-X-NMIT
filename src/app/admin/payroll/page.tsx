import * as React from "react";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminPayrollPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Payroll Management</h1>
      <EmptyState 
        title="Payroll Module Empty"
        description="Process salaries and generate payslips here."
      />
    </div>
  );
}
