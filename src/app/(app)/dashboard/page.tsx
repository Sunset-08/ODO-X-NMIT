import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EmployeeDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Present Days</span>
                <span className="font-medium text-success">18</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Leaves Taken</span>
                <span className="font-medium text-warning">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Off Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Paid Leave</span>
                <span className="font-medium">12 Days</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Sick Leave</span>
                <span className="font-medium">5 Days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-secondary">
              <p>Checked in at 09:05 AM today</p>
              <p className="mt-2">Leave request approved yesterday</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
