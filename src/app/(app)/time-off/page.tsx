"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TimeOffPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Time Off</h1>
        <Button className="w-full sm:w-auto">Request Time Off</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-surface">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1 py-5">Paid Time Off</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-semibold text-primary">12</p>
              <p className="text-sm text-secondary mb-1">Days Available</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-secondary mb-1 py-5">Sick Leave</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-semibold text-primary">5</p>
              <p className="text-sm text-secondary mb-1">Days Available</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface border-b border-border text-secondary">
              <tr>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Start Date</th>
                <th className="px-6 py-3 font-medium">End Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium">Paid Time Off</td>
                <td className="px-6 py-4">Nov 01, 2024</td>
                <td className="px-6 py-4">Nov 05, 2024</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">
                    Pending
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium">Sick Leave</td>
                <td className="px-6 py-4">Oct 20, 2024</td>
                <td className="px-6 py-4">Oct 21, 2024</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                    Approved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
