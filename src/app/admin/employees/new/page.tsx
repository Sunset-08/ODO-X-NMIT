import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { NewEmployeeForm } from "./form";

export default async function NewEmployeePage() {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  // Serialise BigInt for client component
  const deptOptions = departments.map((d) => ({
    id: d.id.toString(),
    name: d.name,
  }));

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
          <NewEmployeeForm departments={deptOptions} />
        </CardContent>
      </Card>
    </div>
  );
}

