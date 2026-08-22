import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { createEmployee } from "@/lib/actions/employees";

async function handleCreate(formData: FormData) {
  "use server";
  const result = await createEmployee(formData);
  if (result.success) {
    redirect("/admin/employees");
  }
}

export default async function NewEmployeePage() {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/employees"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Employees
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Add New Employee</h1>
        <p className="text-sm text-secondary mt-1">Fill in the details to onboard a new employee.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form action={handleCreate} className="flex flex-col gap-5">
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
              <select
                id="departmentId"
                name="departmentId"
                className="flex h-10 w-full rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              >
                <option value="">No Department</option>
                {departments.map((d) => (
                  <option key={d.id.toString()} value={d.id.toString()}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="employmentType">Employment Type <span className="text-error">*</span></Label>
              <select
                id="employmentType"
                name="employmentType"
                required
                className="flex h-10 w-full rounded-[8px] border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
              >
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
              <Button type="submit">Add Employee</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
