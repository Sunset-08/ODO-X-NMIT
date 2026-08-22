import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminTodayAttendance } from "@/lib/actions/attendance";

function fmt(d: Date | null) {
  if (!d) return "\u2014";
  return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

const STATUS_STYLES: Record<string, string> = {
  present: "bg-success/10 text-success border-success/20",
  absent: "bg-error/10 text-error border-error/20",
  late: "bg-warning/10 text-warning border-warning/20",
  half_day: "bg-accent/10 text-accent border-accent/20",
  on_leave: "bg-secondary/10 text-secondary border-secondary/20",
};

export default async function AdminAttendancePage() {
  const records = await getAdminTodayAttendance();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Attendance Management</h1>
        <p className="text-sm text-secondary mt-1">{today}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Check-ins ({records.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-sm text-secondary py-8 text-center">
              No employees have checked in yet today.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium text-secondary pr-6">Employee</th>
                    <th className="pb-3 font-medium text-secondary pr-6">Check In</th>
                    <th className="pb-3 font-medium text-secondary pr-6">Check Out</th>
                    <th className="pb-3 font-medium text-secondary pr-6">Hours</th>
                    <th className="pb-3 font-medium text-secondary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0">
                      <td className="py-3 pr-6 font-medium text-text">{r.employeeName}</td>
                      <td className="py-3 pr-6 text-secondary">{fmt(r.checkIn)}</td>
                      <td className="py-3 pr-6 text-secondary">{fmt(r.checkOut)}</td>
                      <td className="py-3 pr-6 text-secondary">
                        {r.workHours != null ? `${r.workHours.toFixed(1)}h` : "\u2014"}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                            STATUS_STYLES[r.status] ?? "bg-secondary/10 text-secondary border-secondary/20"
                          }`}
                        >
                          {r.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
