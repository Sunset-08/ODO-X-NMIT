import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for initial development
const MOCK_EMPLOYEES = [
  { id: "1", name: "Alice Johnson", role: "Software Engineer", initials: "AJ", status: "present" },
  { id: "2", name: "Bob Smith", role: "Product Manager", initials: "BS", status: "absent" },
  { id: "3", name: "Charlie Davis", role: "UX Designer", initials: "CD", status: "leave" },
  { id: "4", name: "Diana Prince", role: "HR Manager", initials: "DP", status: "present" },
  { id: "5", name: "Evan Wright", role: "DevOps Engineer", initials: "EW", status: "present" },
  { id: "6", name: "Fiona Gallagher", role: "Marketing Lead", initials: "FG", status: "leave" },
];

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Employees</h1>
        
        <div className="flex w-full sm:w-auto items-center gap-3">
          <Input 
            type="search" 
            placeholder="Search employees..." 
            className="w-full sm:w-64"
          />
          <Link href="/employees/new">
            <Button>Add New</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_EMPLOYEES.map((employee) => (
          <Link href={`/profile/${employee.id}`} key={employee.id} className="block">
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

                {/* Settings Icon (mock) */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-secondary hover:text-primary text-xs">⚙️</span>
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
