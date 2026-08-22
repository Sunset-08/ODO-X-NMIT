import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getAdminDashboardStats } from "@/lib/actions/leave";

export default async function AdminReportsPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  const yearStart = new Date(currentYear, 0, 1);

  const [stats, departments, leaveByType, payrollRuns, recentHires] = await Promise.all([
    getAdminDashboardStats(),
    prisma.department.findMany({
      include: { _count: { select: { employees: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.leaveRequest.groupBy({
      by: ["status"],
      _count: { id: true },
      where: { createdAt: { gte: yearStart } },
    }),
    prisma.payrollRun.findMany({
      orderBy: { runDate: "desc" },
      take: 5,
    }),
    prisma.employee.count({
      where: { dateOfJoining: { gte: yearStart } },
    }),
  ]);

  const attendanceRate =
    stats.totalEmployees > 0
      ? Math.round((stats.presentToday / stats.totalEmployees) * 100)
      : 0;

  const leaveMap = Object.fromEntries(leaveByType.map((l) => [l.status, l._count.id]));

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Reports &amp; Analytics</h1>
        <p className="text-sm text-secondary mt-1">
          Live snapshot &mdash;{" "}
          {today.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-secondary mb-1">Active Headcount</p>
            <p className="text-3xl font-semibold text-primary">{stats.totalEmployees}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-secondary mb-1">Attendance Today</p>
            <p className="text-3xl font-semibold text-success">{attendanceRate}%</p>
            <p className="text-xs text-secondary mt-0.5">{stats.presentToday} present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-secondary mb-1">Pending Leave</p>
            <p className="text-3xl font-semibold text-warning">{stats.pendingRequests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-secondary mb-1">Hired {currentYear}</p>
            <p className="text-3xl font-semibold text-accent">{recentHires}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Headcount by department */}
        <Card>
          <CardHeader>
            <CardTitle>Headcount by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-secondary">Department</th>
                  <th className="pb-2 font-medium text-secondary text-right">Employees</th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-secondary text-xs">No departments.</td>
                  </tr>
                ) : (
                  departments.map((d) => (
                    <tr key={d.id.toString()} className="border-b border-border last:border-0">
                      <td className="py-2.5 text-text">{d.name}</td>
                      <td className="py-2.5 text-right font-semibold text-primary">{d._count.employees}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Leave breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests {currentYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {(["approved", "pending", "rejected"] as const).map((key) => {
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                const colorMap = { approved: "bg-success", pending: "bg-warning", rejected: "bg-error" } as const;
                const count = leaveMap[key] ?? 0;
                const total =
                  (leaveMap["approved"] ?? 0) + (leaveMap["pending"] ?? 0) + (leaveMap["rejected"] ?? 0);
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text">{label}</span>
                      <span className="font-semibold text-primary">{count}</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div className={`h-full ${colorMap[key]} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent payroll runs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payroll Runs</CardTitle>
        </CardHeader>
        <CardContent>
          {payrollRuns.length === 0 ? (
            <p className="text-sm text-secondary py-4 text-center">No payroll runs recorded yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-secondary">Period</th>
                  <th className="pb-2 font-medium text-secondary">Status</th>
                  <th className="pb-2 font-medium text-secondary text-right">Run Date</th>
                </tr>
              </thead>
              <tbody>
                {payrollRuns.map((run) => (
                  <tr key={run.id.toString()} className="border-b border-border last:border-0">
                    <td className="py-2.5 text-text font-medium">
                      {new Date(run.periodYear, run.periodMonth - 1).toLocaleDateString("en-IN", {
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
                          run.status === "completed"
                            ? "bg-success/10 text-success border-success/20"
                            : run.status === "processing"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-secondary/10 text-secondary border-secondary/20"
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-secondary text-right">
                      {new Date(run.runDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
