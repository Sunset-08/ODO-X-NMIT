"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, EyeOff, Building2, MapPin, Mail, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeStatusBadge } from "@/components/employees/EmployeeStatusBadge";
import { MOCK_EMPLOYEES, CURRENT_USER_ID } from "@/lib/mock-data";

/* ─────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────── */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-[8px] bg-accent-light flex items-center justify-center shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-secondary">{label}</p>
        <p className="text-sm font-medium text-text truncate">{value || "—"}</p>
      </div>
    </div>
  );
}

function LabeledValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-secondary uppercase tracking-wide">{label}</span>
      <span className="text-sm text-text">{value || "—"}</span>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Card>
        <CardContent className="p-6 flex gap-6 items-start">
          <Skeleton className="w-20 h-20 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-5 flex gap-3 items-start">
              <Skeleton className="w-8 h-8 rounded-[8px] shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3.5 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */

export default function EmployeeProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = React.useState(true);

  const employee = MOCK_EMPLOYEES.find((e) => e.id === id);
  const isSelf = id === CURRENT_USER_ID;

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <ProfileSkeleton />;

  if (!employee) {
    return (
      <div className="flex flex-col max-w-3xl gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-sm font-medium text-text">Employee not found.</p>
          <p className="text-xs text-secondary">No employee with ID &quot;{id}&quot; exists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      {/* Back + view-only badge */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        {!isSelf && (
          <span className="inline-flex items-center gap-1.5 text-xs text-secondary border border-border rounded-full px-3 py-1">
            <EyeOff size={11} />
            View only
          </span>
        )}
      </div>

      {/* Profile header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <Avatar initials={employee.initials} className="w-20 h-20 text-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 flex-wrap">
                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-text">{employee.name}</h1>
                  <p className="text-sm text-secondary ">{employee.role}</p>
                  <p className="text-xs text-secondary mt-1">
                    {employee.id} · {employee.department}
                  </p>
                </div>
                <div className="mt-1">
                  <EmployeeStatusBadge status={employee.status} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <div>
        <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
          Contact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card>
            <CardContent className="min-h-[84px] flex items-center p-5">
              <InfoItem icon={Mail} label="Email" value={employee.email} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="min-h-[84px] flex items-center p-5">
              <InfoItem icon={Phone} label="Phone" value="+91 9876543210" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="min-h-[84px] flex items-center p-5">
              <InfoItem icon={MapPin} label="Location" value={employee.location} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="min-h-[84px] flex items-center p-5">
              <InfoItem icon={Building2} label="Department" value={employee.department} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job details */}
      <div>
        <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
          Job Details
        </h2>
        <Card>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <LabeledValue label="Employee ID" value={employee.id} />
            <LabeledValue label="Job Title" value={employee.role} />
            <LabeledValue label="Department" value={employee.department} />
            <LabeledValue label="Location" value={employee.location} />
            <LabeledValue label="Employment Type" value="Full-time" />
            <LabeledValue
              label="Status"
              value={
                employee.status === "leave"
                  ? "On Leave"
                  : "Active"
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Salary — hidden for privacy */}
      <div>
        <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
          Salary Information
        </h2>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center py-10 gap-2 text-center">
            <EyeOff size={28} className="text-border" strokeWidth={1.5} />
            <p className="text-sm font-medium text-text">Salary details are private</p>
            <p className="text-xs text-secondary max-w-xs">
              Salary information is only visible to the employee and authorized HR personnel.
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
