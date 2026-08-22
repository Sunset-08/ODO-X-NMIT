import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">My Attendance</h1>
        <Button className="w-full sm:w-auto">Check In Now</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface border-b border-border text-secondary">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Check In</th>
                <th className="px-6 py-3 font-medium">Check Out</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium">Oct 24, 2024</td>
                <td className="px-6 py-4">09:05 AM</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Present
                  </span>
                </td>
                <td className="px-6 py-4">--</td>
              </tr>
              <tr className="hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 font-medium">Oct 23, 2024</td>
                <td className="px-6 py-4">08:55 AM</td>
                <td className="px-6 py-4">05:10 PM</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Present
                  </span>
                </td>
                <td className="px-6 py-4">8h 15m</td>
              </tr>
              <tr className="hover:bg-background/50 transition-colors bg-error/5">
                <td className="px-6 py-4 font-medium">Oct 22, 2024</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-error/10 text-error">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Absent
                  </span>
                </td>
                <td className="px-6 py-4">0h 0m</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
