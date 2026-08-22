"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminEmployeeProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = React.useState("info");
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative">
          
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <Avatar initials="EMP" className="w-24 h-24 text-2xl" />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-primary">Employee {slug}</h2>
              
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Login ID</span>
                  {isEditing ? (
                    <Input defaultValue="EMP2024001" className="h-7 text-sm" />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">EMP2024001</span>
                  )}
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Email</span>
                  {isEditing ? (
                    <Input defaultValue="employee@odo.com" className="h-7 text-sm" />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">employee@odo.com</span>
                  )}
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Mobile</span>
                  {isEditing ? (
                    <Input defaultValue="+91 9876543210" className="h-7 text-sm" />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">+91 9876543210</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-8 hidden md:block"></div>
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Department</span>
                  {isEditing ? (
                    <Input defaultValue="Engineering" className="h-7 text-sm" />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">Engineering</span>
                  )}
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Manager</span>
                  {isEditing ? (
                    <Input defaultValue="Diana Prince" className="h-7 text-sm" />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">Diana Prince</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-end gap-2 mt-4 md:mt-0 md:absolute md:top-8 md:right-8">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setIsEditing(false)}>Save</Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Employee</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border mt-2">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "info" ? "border-primary text-primary" : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          General Info
        </button>
        <button
          onClick={() => setActiveTab("salary")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "salary" ? "border-primary text-primary" : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          Salary Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-2">
        {activeTab === "info" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">Skills</h3>
                <ul className="text-sm text-secondary flex flex-col gap-2">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>PostgreSQL</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "salary" && (
          <div className="flex flex-col gap-6">
            <div className="bg-surface border border-border p-4 rounded-sm flex justify-between items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full max-w-2xl">
                <div>
                  <Label className="text-xs text-secondary block mb-1">Month Wage</Label>
                  <p className="font-medium text-lg">₹50,000</p>
                </div>
                <div>
                  <Label className="text-xs text-secondary block mb-1">Yearly Wage</Label>
                  <p className="font-medium text-lg">₹600,000</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit Payroll Config</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
