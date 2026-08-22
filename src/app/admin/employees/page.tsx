import * as React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminEmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: {
      lastName: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Manage Employees</h1>
        
        <div className="flex w-full sm:w-auto items-center gap-3">
          <Input 
            type="search" 
            placeholder="Search employees..." 
            className="w-full sm:w-64"
          />
          <Link href="/admin/employees/new">
            <Button>Add New Employee</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employees.length === 0 ? (

          <div className="col-span-full py-12 text-center text-secondary">
            No employees found. Seed the database or add a new employee.
          </div>
        ) : (
          employees.map((employee) => (
            <Link href={`/admin/employees/${employee.id}`} key={employee.id.toString()} className="block">
              <Card className="hover:border-accent transition-colors cursor-pointer group relative">
                <div className="p-5 flex flex-col items-center gap-3 text-center">
                  
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div 
                      className={`w-2.5 h-2.5 rounded-full ${
                        employee.employmentStatus === "active" ? "bg-success" : "bg-warning"
                      }`}
                      title={`Status: ${employee.employmentStatus}`}
                    />
                  </div>

                  <Avatar initials={`${employee.firstName[0]}${employee.lastName[0]}`} size="lg" />
                  
                  <div>
                    <p className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-secondary mt-0.5">{employee.designation}</p>
                    {employee.department && (
                      <p className="text-xs text-secondary/70">{employee.department.name}</p>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
