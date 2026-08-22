"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = React.useState("resume");

  // In a real app, fetch employee data based on ID
  const isAdmin = true; // Mock admin state to show salary tab

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <Avatar initials="AJ" className="w-24 h-24 text-2xl" />
            <button className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 border border-border px-3 py-1 rounded-sm">
              <span>✏️</span> Edit Picture
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-primary">Alice Johnson</h2>
              
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Login ID</span>
                  <span className="text-primary border-b border-border pb-1">DF20220001</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Email</span>
                  <span className="text-primary border-b border-border pb-1">alice@dayflow.com</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Mobile</span>
                  <span className="text-primary border-b border-border pb-1">+91 9876543210</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-8 hidden md:block"></div> {/* Spacer to align with name */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Company</span>
                  <span className="text-primary border-b border-border pb-1">DayFlow India</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Department</span>
                  <span className="text-primary border-b border-border pb-1">Engineering</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Manager</span>
                  <span className="text-primary border-b border-border pb-1">Diana Prince</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Location</span>
                  <span className="text-primary border-b border-border pb-1">Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border mt-2">
        {["resume", "private", "salary"].map((tab) => {
          if (tab === "salary" && !isAdmin) return null;
          
          const labels: Record<string, string> = {
            resume: "Resume",
            private: "Private Info",
            salary: "Salary Info"
          };
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab 
                  ? "border-primary text-primary" 
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="py-2">
        {activeTab === "resume" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">About</h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Senior Software Engineer with 5+ years of experience building scalable enterprise applications. 
                    Passionate about clean code, architecture, and mentoring junior developers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">What I love about my job</h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Collaborating with cross-functional teams to solve complex problems and seeing the direct impact of our work on the end users.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                    <h3 className="font-semibold text-primary">Skills</h3>
                    <button className="text-xs text-accent hover:text-accent-hover font-medium">+ Add Skills</button>
                  </div>
                  <ul className="text-sm text-secondary flex flex-col gap-2">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>PostgreSQL</li>
                    <li>System Design</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                    <h3 className="font-semibold text-primary">Certification</h3>
                    <button className="text-xs text-accent hover:text-accent-hover font-medium">+ Add Cert</button>
                  </div>
                  <ul className="text-sm text-secondary flex flex-col gap-2">
                    <li>AWS Solutions Architect</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "salary" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-surface border border-border p-4">
              <div className="grid grid-cols-3 gap-8 w-full max-w-2xl">
                <div>
                  <Label className="text-xs text-secondary block mb-1">Month Wage</Label>
                  <p className="font-medium">50,000 <span className="text-xs text-secondary font-normal">/ Month</span></p>
                </div>
                <div>
                  <Label className="text-xs text-secondary block mb-1">Yearly Wage</Label>
                  <p className="font-medium">600,000 <span className="text-xs text-secondary font-normal">/ Yearly</span></p>
                </div>
                <div>
                  <Label className="text-xs text-secondary block mb-1">Working days in week</Label>
                  <Input defaultValue="5" className="h-7 w-16" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">Salary Components</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 text-sm font-medium">Basic Salary</div>
                      <div className="flex items-center gap-2">
                        <Input defaultValue="25000" className="w-24 h-8 text-right" />
                        <span className="text-xs text-secondary">/ month</span>
                        <span className="text-xs text-secondary ml-4 w-12 text-right">50.00 %</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex-1 text-sm font-medium">House Rent Allowance</div>
                      <div className="flex items-center gap-2">
                        <Input defaultValue="12500" className="w-24 h-8 text-right" />
                        <span className="text-xs text-secondary">/ month</span>
                        <span className="text-xs text-secondary ml-4 w-12 text-right">25.00 %</span>
                      </div>
                    </div>
                    {/* Additional components... */}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">Provident Fund (PF) Contribution</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-sm">
                        <span>Employee</span>
                        <span>3,000 / month</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Employer</span>
                        <span>3,000 / month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">Tax Deductions</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span>Professional Tax</span>
                      <span>200 / month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "private" && (
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-secondary">Private information is restricted.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
