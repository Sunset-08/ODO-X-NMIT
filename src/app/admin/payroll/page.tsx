import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAdminPayrollRuns } from "@/lib/actions/payroll";

export default async function AdminPayrollPage() {
  const runs = await getAdminPayrollRuns();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Payroll Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Payroll Runs</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface border-b border-border text-secondary">
              <tr>
                <th className="px-6 py-3 font-medium">Period</th>
                <th className="px-6 py-3 font-medium">Run Date</th>
                <th className="px-6 py-3 font-medium">Employees</th>
                <th className="px-6 py-3 font-medium">Total Net</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-secondary">
                    No payroll runs found.
                  </td>
                </tr>
              ) : (
                runs.map(run => (
                  <tr key={run.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{monthNames[run.month - 1]} {run.year}</td>
                    <td className="px-6 py-4">{run.runDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4">{run.employeeCount}</td>
                    <td className="px-6 py-4">₹{run.totalNet.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                        run.status === 'completed' ? 'bg-success/10 text-success' :
                        run.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
