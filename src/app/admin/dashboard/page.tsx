import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Admin Dashboard</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/admin/employees/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Add Employee</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">Total Employees</h3>
            <p className="text-3xl font-semibold text-primary">142</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">Present Today</h3>
            <p className="text-3xl font-semibold text-success">128</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">On Leave</h3>
            <p className="text-3xl font-semibold text-warning">14</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">Pending Requests</h3>
            <p className="text-3xl font-semibold text-primary">5</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-primary">Alice Johnson</p>
                    <p className="text-xs text-secondary">Sick Leave • Oct 24 - Oct 25</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">Reject</Button>
                    <Button size="sm" className="h-7 text-xs px-2">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-2">
              <Link href="/admin/time-off" className="text-sm text-accent hover:underline">View all requests →</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-accent"></div>
                <div>
                  <p className="text-sm text-primary">Payroll processed for September</p>
                  <p className="text-xs text-secondary">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-success"></div>
                <div>
                  <p className="text-sm text-primary">New employee Evan Wright onboarded</p>
                  <p className="text-xs text-secondary">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
