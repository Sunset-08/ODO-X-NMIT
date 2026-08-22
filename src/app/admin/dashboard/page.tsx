import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getAdminDashboardStats,
  getPendingLeaveRequests,
} from "@/lib/actions/leave";
import { LeaveRequestList } from "./leave-request-list";


export default async function AdminDashboardPage() {
  const [stats, pendingRequests] = await Promise.all([
    getAdminDashboardStats(),
    getPendingLeaveRequests(),
  ]);

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
            <p className="text-3xl font-semibold text-primary">{stats.totalEmployees}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">Present Today</h3>
            <p className="text-3xl font-semibold text-success">{stats.presentToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">On Leave</h3>
            <p className="text-3xl font-semibold text-warning">{stats.onLeaveToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1">Pending Requests</h3>
            <p className="text-3xl font-semibold text-primary">{stats.pendingRequests}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaveRequestList requests={pendingRequests} />
            <div className="mt-4 pt-2">
              <Link href="/admin/time-off" className="text-sm text-accent hover:underline">View all requests</Link>
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
