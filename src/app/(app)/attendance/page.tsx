"use client";

import * as React from "react";
import { AttendanceWidget } from "@/components/attendance/AttendanceWidget";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { useAttendance } from "@/lib/attendance-store";
import { CURRENT_USER_ID, MOCK_EMPLOYEES } from "@/lib/mock-data";
import { Users } from "lucide-react";

export default function AttendancePage() {
  const { records, getEmployeeRecords } = useAttendance();
  const [activeEmployeeId, setActiveEmployeeId] = React.useState<string>("ALL");

  const currentUser = MOCK_EMPLOYEES.find((e) => e.id === CURRENT_USER_ID);
  if (!currentUser) return null;

  const isAdminOrHR =
    currentUser.role === "HR Manager" || currentUser.department === "Human Resources";

  const employeeRecords = getEmployeeRecords(CURRENT_USER_ID);

  // Admin filtered records
  const filteredRecords =
    activeEmployeeId === "ALL"
      ? [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      : getEmployeeRecords(activeEmployeeId);

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text">Attendance</h1>
        <p className="text-sm text-secondary mt-1">
          {isAdminOrHR ? "Manage employee attendance records." : "View and manage your attendance."}
        </p>
      </div>

      {!isAdminOrHR && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Employee View */}
          <div>
            <h2 className="text-sm font-semibold text-text uppercase tracking-wide border-b border-border pb-2 mb-4">
              Today's Status
            </h2>
            <AttendanceWidget />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text uppercase tracking-wide border-b border-border pb-2 mb-4">
              My Attendance History
            </h2>
            <AttendanceTable records={employeeRecords} />
          </div>
        </div>
      )}

      {isAdminOrHR && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Admin View */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 px-3 bg-surface border border-border rounded-md flex items-center gap-2">
                <Users size={16} className="text-secondary" />
                <select
                  value={activeEmployeeId}
                  onChange={(e) => setActiveEmployeeId(e.target.value)}
                  className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-text"
                >
                  <option value="ALL">All Employees</option>
                  {MOCK_EMPLOYEES.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <AttendanceTable records={filteredRecords} showEmployeeName={activeEmployeeId === "ALL"} />
        </div>
      )}
    </div>
  );
}
