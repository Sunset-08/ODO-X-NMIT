import * as React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getTodayAttendance, checkIn, checkOut } from "@/lib/actions/attendance";
import { getMyProfile } from "@/lib/actions/employees";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

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

export default async function EmployeeHomePage() {
  const currentUser = await getMyProfile();
  const attendance = await getTodayAttendance();
  const allEmployees = await prisma.employee.findMany({
    include: { department: true },
    orderBy: { firstName: "asc" }
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">
            {getGreeting()},{" "}
            <span className="text-primary">{currentUser?.firstName ?? "there"}</span>
          </h1>
          <p className="text-sm text-secondary mt-0.5">{formatDate(new Date())}</p>
        </div>
      </div>

      {/* Attendance widget */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-text">Today's Attendance</h3>
                <p className="text-sm text-secondary">
                  {attendance?.checkIn 
                    ? `Checked in at ${attendance.checkIn.toLocaleTimeString()}` 
                    : "Not checked in yet"}
                  {attendance?.checkOut && ` · Checked out at ${attendance.checkOut.toLocaleTimeString()}`}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <form action={checkIn as any}>
                <Button disabled={!!attendance?.checkIn} type="submit">
                  Check In
                </Button>
              </form>
              <form action={checkOut as any}>
                <Button disabled={!attendance?.checkIn || !!attendance?.checkOut} type="submit" variant="outline">
                  Check Out
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee directory */}
      <section aria-labelledby="directory-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id="directory-heading" className="text-base font-semibold text-text">
              People
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              {allEmployees.length} employees · click a card to view their profile
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allEmployees.map((employee) => (
            <Link href={`/profile/${employee.id}`} key={employee.id.toString()} className="block">
              <Card className="hover:border-accent transition-colors cursor-pointer group relative">
                <div className="p-5 flex flex-col items-center gap-3 text-center">
                  <Avatar initials={`${employee.firstName[0]}${employee.lastName[0]}`} size="lg" />
                  <div>
                    <h3 className="font-medium text-primary">{employee.firstName} {employee.lastName}</h3>
                    <p className="text-xs text-secondary mt-0.5">{employee.designation}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
