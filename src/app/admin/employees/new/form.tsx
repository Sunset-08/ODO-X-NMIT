"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createEmployeeAction } from "@/lib/actions/employees";

type Dept = { id: string; name: string };

const SELECT_CLS =
  "flex h-10 w-full rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";

// Submit button — reads pending state from the enclosing form context
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add Employee"}
    </Button>
  );
}

type State = { error?: string; success?: boolean } | null;

export function NewEmployeeForm({ departments }: { departments: Dept[] }) {
  const router = useRouter();
  const [state, formAction] = useActionState(createEmployeeAction, null);

  // Redirect client-side after success so we still show the green banner briefly
  React.useEffect(() => {
    if (state?.success) {
      const t = setTimeout(() => router.push("/admin/employees"), 1000);
      return () => clearTimeout(t);
    }
  }, [state, router]);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-text">Employee added successfully!</p>
        <p className="text-xs text-secondary">Redirecting to employee list...</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error && (
        <div className="p-3 rounded-[8px] bg-error/10 border border-error/30 text-error text-sm">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First Name <span className="text-error">*</span></Label>
          <Input id="firstName" name="firstName" type="text" placeholder="e.g. Alice" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last Name <span className="text-error">*</span></Label>
          <Input id="lastName" name="lastName" type="text" placeholder="e.g. Chen" required />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="employeeCode">Employee Code <span className="text-error">*</span></Label>
        <Input id="employeeCode" name="employeeCode" type="text" placeholder="e.g. DF20240006" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="jobTitle">Job Title <span className="text-error">*</span></Label>
        <Input id="jobTitle" name="jobTitle" type="text" placeholder="e.g. Software Engineer" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="departmentId">Department</Label>
        <select id="departmentId" name="departmentId" className={SELECT_CLS}>
          <option value="">No Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="employmentType">Employment Type <span className="text-error">*</span></Label>
        <select id="employmentType" name="employmentType" required className={SELECT_CLS}>
          <option value="full_time">Full-time</option>
          <option value="part_time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="intern">Intern</option>
          <option value="probation">Probation</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="joinDate">Date of Joining <span className="text-error">*</span></Label>
        <Input id="joinDate" name="joinDate" type="date" required />
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-border mt-2">
        <Link href="/admin/employees">
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
