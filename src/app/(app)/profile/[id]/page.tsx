import * as React from "react";
import Link from "next/link";
import { ArrowLeft, EyeOff, Building2, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { getEmployeeById } from "@/lib/actions/employees";

function EmployeeStatusBadge({ status }: { status: string }) {
  const isPresent = status === "present" || status === "active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      isPresent ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? "bg-success" : "bg-warning"}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

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

export default async function EmployeeProfilePage({ params }: { params: { id: string } }) {
  // TODO: replace with session user once auth lands
  const currentUserId = "1";
  
  const id = params.id;
  const isSelf = id === currentUserId;
  const employee = await getEmployeeById(id);

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
            <Avatar initials={`${employee.firstName[0]}${employee.lastName[0]}`} className="w-20 h-20 text-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 flex-wrap">
                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-text">{employee.firstName} {employee.lastName}</h1>
                  <p className="text-sm text-secondary ">{employee.jobTitle}</p>
                  <p className="text-xs text-secondary mt-1">
                    {employee.employeeCode} · {employee.departmentName}
                  </p>
                </div>
                <div className="mt-1">
                  <EmployeeStatusBadge status="active" />
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
              <InfoItem icon={Phone} label="Phone" value={employee.phone} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="min-h-[84px] flex items-center p-5">
              <InfoItem icon={MapPin} label="Location" value={employee.location} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="min-h-[84px] flex items-center p-5">
              <InfoItem icon={Building2} label="Department" value={employee.departmentName} />
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
            <LabeledValue label="Employee ID" value={employee.employeeCode} />
            <LabeledValue label="Job Title" value={employee.jobTitle} />
            <LabeledValue label="Department" value={employee.departmentName} />
            <LabeledValue label="Location" value={employee.location} />
            <LabeledValue label="Employment Type" value="Full-time" />
            <LabeledValue label="Status" value="Active" />
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
