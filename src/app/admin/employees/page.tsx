import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_EMPLOYEES } from "@/lib/mock-data";

export default function AdminEmployeesPage() {
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
        {MOCK_EMPLOYEES.map((employee) => (
          <Link href={`/admin/employees/${employee.id}`} key={employee.id} className="block">
            <Card className="hover:border-accent transition-colors cursor-pointer group relative">
              <div className="p-5 flex flex-col items-center gap-3 text-center">
                
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div 
                    className={`w-2.5 h-2.5 rounded-full ${
                      employee.status === "present" ? "bg-success" : 
                      employee.status === "leave" ? "bg-warning" : "bg-error"
                    }`}
                    title={`Status: ${employee.status}`}
                  />
                </div>

                <Avatar initials={employee.initials} size="lg" />
                
                <div>
                  <h3 className="font-medium text-primary">{employee.name}</h3>
                  <p className="text-xs text-secondary mt-0.5">{employee.role}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
