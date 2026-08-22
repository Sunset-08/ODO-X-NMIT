"use client";

import * as React from "react";
import { AttendanceWidget } from "@/components/attendance/AttendanceWidget";
import { EmployeeGrid } from "@/components/employees/EmployeeGrid";
import { MOCK_EMPLOYEES, CURRENT_USER_ID } from "@/lib/mock-data";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Find the current user's name for the greeting
const currentUser = MOCK_EMPLOYEES.find((e) => e.id === CURRENT_USER_ID);

export default function EmployeeHomePage() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate a brief loading phase (remove when real API is wired)
  React.useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header: greeting + date */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">
            {getGreeting()},{" "}
            <span className="text-primary">{currentUser?.name.split(" ")[0] ?? "there"}</span>
          </h1>
          <p className="text-sm text-secondary mt-0.5">{formatDate(new Date())}</p>
        </div>
      </div>

      {/* Attendance widget */}
      <AttendanceWidget />

      {/* Employee directory */}
      <section aria-labelledby="directory-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id="directory-heading" className="text-base font-semibold text-text">
              People
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              {MOCK_EMPLOYEES.length} employees · click a card to view their profile
            </p>
          </div>
        </div>

        <EmployeeGrid
          employees={MOCK_EMPLOYEES}
          currentUserId={CURRENT_USER_ID}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}
