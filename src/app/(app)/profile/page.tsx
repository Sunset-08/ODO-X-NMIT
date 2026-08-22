"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("info");
  const [isEditing, setIsEditing] = React.useState(false);

  // Mock employee data
  const [formData, setFormData] = React.useState({
    phone: "+91 9876543210",
    address: "123 Tech Park, Bengaluru, Karnataka",
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            {isEditing ? (
              <ImageUpload />
            ) : (
              <Avatar initials="JD" className="w-24 h-24 text-2xl" />
            )}
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-primary">John Doe</h2>
              
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Login ID</span>
                  <span className="text-primary border-b border-border pb-1">EMP2024001</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Email</span>
                  <span className="text-primary border-b border-border pb-1">johndoe@odo.com</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Mobile</span>
                  {isEditing ? (
                    <Input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      className="h-7 text-sm"
                    />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">{formData.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-8 hidden md:block"></div>
              <div className="flex flex-col gap-3 mt-2">
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Department</span>
                  <span className="text-primary border-b border-border pb-1">Engineering</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                  <span className="text-secondary font-medium">Manager</span>
                  <span className="text-primary border-b border-border pb-1">Diana Prince</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] items-start gap-2 text-sm">
                  <span className="text-secondary font-medium pt-1">Address</span>
                  {isEditing ? (
                    <Input 
                      value={formData.address} 
                      onChange={(e) => setFormData({...formData, address: e.target.value})} 
                      className="h-7 text-sm"
                    />
                  ) : (
                    <span className="text-primary border-b border-border pb-1">{formData.address}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="w-full flex justify-end gap-2 mt-4 md:mt-0 md:absolute md:top-8 md:right-8">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setIsEditing(false)}>Save</Button>
            </div>
          )}
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
            <div className="bg-surface border border-border p-4 rounded-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <Label className="text-xs text-secondary block mb-1">Month Wage</Label>
                  <p className="font-medium text-lg">₹50,000</p>
                </div>
                <div>
                  <Label className="text-xs text-secondary block mb-1">Yearly Wage</Label>
                  <p className="font-medium text-lg">₹600,000</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">Earnings</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Basic Salary</span>
                      <span className="font-medium">₹25,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">House Rent Allowance</span>
                      <span className="font-medium">₹12,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Special Allowance</span>
                      <span className="font-medium">₹12,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-4 border-b border-border pb-2">Deductions</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Provident Fund (PF)</span>
                      <span className="font-medium">₹1,800</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Professional Tax</span>
                      <span className="font-medium">₹200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
