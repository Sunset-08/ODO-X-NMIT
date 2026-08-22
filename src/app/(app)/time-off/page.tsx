import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLeaveBalances, getLeaveHistory } from "@/lib/actions/leave";

export default async function TimeOffPage() {
  const balances = await getLeaveBalances();
  const history = await getLeaveHistory();

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Time Off</h1>
        <Button className="w-full sm:w-auto">Request Time Off</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {balances.length === 0 ? (
          <div className="col-span-full text-secondary text-sm">No leave balances found.</div>
        ) : (
          balances.map(balance => (
            <Card key={balance.id} className="bg-surface">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-secondary mb-1 py-5">{balance.typeName}</h3>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-semibold text-primary">{balance.balance}</p>
                  <p className="text-sm text-secondary mb-1">Days Available</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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
              {history.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-secondary">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                history.map(req => (
                  <tr key={req.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{req.typeName}</td>
                    <td className="px-6 py-4">{req.startDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4">{req.endDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                        req.status === 'approved' ? 'bg-success/10 text-success' :
                        req.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
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
