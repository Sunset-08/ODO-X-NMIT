"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Check, X, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
import { getMyProfile } from "@/lib/actions/employees";
=======
import { MOCK_EMPLOYEES, CURRENT_USER_ID } from "@/lib/mock-data";
import { SalaryInfoTab } from "@/components/profile/SalaryInfoTab";
>>>>>>> origin/main

type EditableFields = { phone: string; address: string };
type ProfileData = Awaited<ReturnType<typeof getMyProfile>>;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-secondary uppercase tracking-wide">{label}</span>
      <span className="text-sm text-text">{value || "—"}</span>
    </div>
  );
}

function LockedField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-secondary">{label}</span>
        <Lock size={10} className="text-secondary/60" />
      </div>
      <div className="h-9 px-3 flex items-center bg-background border border-border rounded-[8px] text-sm text-secondary select-none">
        {value || "—"}
      </div>
    </div>
  );
}

function AvatarEdit({
  initials,
  preview,
  onFileChange,
}: {
  initials: string;
  preview: string | null;
  onFileChange: (file: File) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5 MB"); return; }
    if (!file.type.startsWith("image/")) { alert("Please select an image file"); return; }
    onFileChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
        aria-label="Change profile picture"
      >
        {preview ? (
          <img src={preview} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-border" />
        ) : (
          <Avatar initials={initials} className="w-20 h-20 text-xl" />
        )}
        <span className="absolute inset-0 rounded-full bg-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={16} className="text-white" />
        </span>
      </button>
      <button type="button" onClick={() => inputRef.current?.click()} className="text-xs text-accent hover:text-primary font-medium transition-colors">
        Change photo
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-text uppercase tracking-wide border-b border-border pb-2 mb-4">
      {children}
    </h2>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6 items-start">
            <Skeleton className="w-20 h-20 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function MyProfilePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [pendingAvatarFile, setPendingAvatarFile] = React.useState<File | null>(null);
  const [saved, setSaved] = React.useState<EditableFields>({ phone: "", address: "" });
  const [draft, setDraft] = React.useState<EditableFields>({ phone: "", address: "" });
  const [errors, setErrors] = React.useState<Partial<EditableFields>>({});
<<<<<<< HEAD
  const [employee, setEmployee] = React.useState<ProfileData | null>(null);
=======
  const [activeTab, setActiveTab] = React.useState<"resume" | "private" | "salary" | "security">("resume");

  const employee = MOCK_EMPLOYEES.find((e) => e.id === CURRENT_USER_ID);
>>>>>>> origin/main

  React.useEffect(() => {
    async function load() {
      const data = await getMyProfile();
      if (data) {
        setEmployee(data);
        setSaved({ phone: data.phone, address: data.address });
        setDraft({ phone: data.phone, address: data.address });
      }
      setIsLoading(false);
    }
    load();
  }, []);

  function startEditing() { setDraft(saved); setErrors({}); setSaveSuccess(false); setIsEditing(true); }

  function cancelEditing() {
    setDraft(saved); setAvatarPreview(null); setPendingAvatarFile(null); setErrors({}); setIsEditing(false);
  }

  function validate(): boolean {
    const e: Partial<EditableFields> = {};
    if (!draft.phone.trim()) e.phone = "Phone number is required";
    if (!draft.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    setIsSaving(true);
    setTimeout(() => {
      setSaved(draft);
      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);
      setAvatarPreview(null);
      setPendingAvatarFile(null);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 900);
  }

  if (isLoading) return <ProfileSkeleton />;

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2">
        <p className="text-sm font-medium text-text">Profile not found.</p>
        <Link href="/dashboard" className="text-xs text-accent hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {isEditing ? (
              <AvatarEdit initials={`${employee.firstName[0]}${employee.lastName[0]}`} preview={avatarPreview} onFileChange={(f) => { setPendingAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)); }} />
            ) : (
              <div className="shrink-0">
                {avatarPreview
                  ? <img src={avatarPreview} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-border" />
                  : <Avatar initials={`${employee.firstName[0]}${employee.lastName[0]}`} className="w-20 h-20 text-xl" />
                }
              </div>
            )}

            <div className="flex-1 min-w-0">
<<<<<<< HEAD
              <h1 className="text-xl font-semibold text-text">{employee.firstName} {employee.lastName}</h1>
              <p className="text-sm text-secondary mt-0.5">{employee.jobTitle}</p>
              <p className="text-xs text-secondary mt-1">{employee.employeeCode} · {employee.departmentName} · {employee.location}</p>
=======
              <h1 className="text-xl font-semibold text-text">{employee.name}</h1>
              <p className="text-sm text-primary font-medium mt-0.5">{employee.role}</p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-xs">
                <div className="flex flex-col gap-0.5"><span className="text-secondary font-medium uppercase tracking-wider text-[10px]">Email</span><span className="text-text">{employee.email}</span></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-secondary font-medium uppercase tracking-wider text-[10px]">Mobile</span>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={draft.phone}
                      onChange={(e) => { setDraft((d) => ({ ...d, phone: e.target.value })); if (errors.phone) setErrors((err) => ({ ...err, phone: undefined })); }}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-7 text-xs px-2 w-full max-w-[150px] mt-0.5"
                    />
                  ) : (
                    <span className="text-text">{saved.phone}</span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5"><span className="text-secondary font-medium uppercase tracking-wider text-[10px]">Company</span><span className="text-text">—</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-secondary font-medium uppercase tracking-wider text-[10px]">Department</span><span className="text-text">{employee.department}</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-secondary font-medium uppercase tracking-wider text-[10px]">Manager</span><span className="text-text">—</span></div>
                <div className="flex flex-col gap-0.5"><span className="text-secondary font-medium uppercase tracking-wider text-[10px]">Location</span><span className="text-text">{employee.location}</span></div>
              </div>
>>>>>>> origin/main
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              {saveSuccess && (
                <span className="flex items-center gap-1 text-xs text-success font-medium">
                  <Check size={13} /> Saved
                </span>
              )}
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={cancelEditing} disabled={isSaving} className="flex items-center gap-1.5">
                    <X size={13} /> Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} isLoading={isSaving} className="flex items-center gap-1.5">
                    <Check size={13} /> Save changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={startEditing}>Edit Profile</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        <button
          onClick={() => setActiveTab("resume")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "resume" ? "text-primary" : "text-secondary hover:text-text"
          }`}
        >
          Resume
          {activeTab === "resume" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("private")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "private" ? "text-primary" : "text-secondary hover:text-text"
          }`}
        >
          Private Info
          {activeTab === "private" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("salary")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "salary" ? "text-primary" : "text-secondary hover:text-text"
          }`}
        >
          Salary Info
          {activeTab === "salary" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "security" ? "text-primary" : "text-secondary hover:text-text"
          }`}
        >
          Security
          {activeTab === "security" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      </div>

      <div className="mt-2 mb-10">
        {activeTab === "resume" && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Job Information */}
            <Card>
              <CardContent className="p-6">
                <SectionHeading>Job Information</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InfoRow label="Department" value={employee.department} />
                  <InfoRow label="Job Title" value={employee.role} />
                  <InfoRow label="Employee ID" value={employee.id} />
                  <InfoRow label="Location" value={employee.location} />
                </div>
              </CardContent>
            </Card>

<<<<<<< HEAD
      {/* Job Information */}
      <Card>
        <CardContent className="p-6">
          <SectionHeading>Job Information</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow label="Department" value={employee.departmentName} />
            <InfoRow label="Job Title" value={employee.jobTitle} />
            <InfoRow label="Employee ID" value={employee.employeeCode} />
            <InfoRow label="Location" value={employee.location} />
=======
            {/* Resume Placeholder */}
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center py-10 gap-2 text-center bg-surface">
                <p className="text-sm font-medium text-text">Resume Data Not Available</p>
                <p className="text-xs text-secondary max-w-xs">
                  Resume functionality is currently under development.
                </p>
              </CardContent>
            </Card>
>>>>>>> origin/main
          </div>
        )}

<<<<<<< HEAD
      {/* Salary */}
      <Card>
        <CardContent className="p-6">
          <SectionHeading>Salary Structure</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-secondary uppercase tracking-wide">Monthly</span>
              <span className="text-lg font-semibold text-text">₹{employee.salary ? employee.salary.monthly.toLocaleString() : "0"}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-secondary uppercase tracking-wide">Annual</span>
              <span className="text-lg font-semibold text-text">₹{employee.salary ? employee.salary.annual.toLocaleString() : "0"}</span>
            </div>
          </div>
          <div className="border-t border-border pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-secondary mb-3">Earnings</p>
              <div className="flex flex-col gap-2">
                {employee.salary?.components.filter(c => c.type === "earning").map((c) => (
                  <div key={c.name} className="flex justify-between text-sm">
                    <span className="text-secondary">{c.name}</span>
                    <span className="font-medium text-text">₹{c.amount.toLocaleString()}</span>
                  </div>
                )) || <span className="text-sm text-secondary">No earnings defined</span>}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary mb-3">Deductions</p>
              <div className="flex flex-col gap-2">
                {employee.salary?.components.filter(c => c.type === "deduction").map((c) => (
                  <div key={c.name} className="flex justify-between text-sm">
                    <span className="text-secondary">{c.name}</span>
                    <span className="font-medium text-text">₹{c.amount.toLocaleString()}</span>
                  </div>
                )) || <span className="text-sm text-secondary">No deductions defined</span>}
              </div>
            </div>
=======
        {activeTab === "private" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card>
              <CardContent className="p-6">
                <SectionHeading>Private Information</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="flex flex-col gap-5">
                    <InfoRow label="Date of Birth" value="—" />
                    {isEditing ? (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="address">Residing Address</Label>
                        <Input
                          id="address"
                          value={draft.address}
                          onChange={(e) => { setDraft((d) => ({ ...d, address: e.target.value })); if (errors.address) setErrors((err) => ({ ...err, address: undefined })); }}
                          placeholder="Your full address"
                          error={errors.address}
                        />
                      </div>
                    ) : (
                      <InfoRow label="Residing Address" value={saved.address} />
                    )}
                    <InfoRow label="Nationality" value="—" />
                    <InfoRow label="Personal Email" value={employee.email} />
                    <InfoRow label="Gender" value="—" />
                    <InfoRow label="Marital Status" value="—" />
                    <InfoRow label="Date of Joining" value="—" />
                  </div>
                  
                  {/* Right Column (Bank Details) */}
                  <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-semibold text-text uppercase tracking-wide border-b border-border pb-2 mb-2">Bank Details</h3>
                    <InfoRow label="Account Number" value="—" />
                    <InfoRow label="Bank Name" value="—" />
                    <InfoRow label="IFSC Code" value="—" />
                    <InfoRow label="PAN No" value="—" />
                    <InfoRow label="UAN No" value="—" />
                    <InfoRow label="Employee Code" value={employee.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
>>>>>>> origin/main
          </div>
        )}

        {activeTab === "salary" && (
          <SalaryInfoTab employee={employee} readonly={true} />
        )}

        {activeTab === "security" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center py-10 gap-3 text-center">
                <Lock size={32} className="text-secondary/50" />
                <div>
                  <p className="text-sm font-semibold text-text">Security Settings Not Available</p>
                  <p className="text-xs text-secondary max-w-md mt-1">
                    The backend authentication and security flow is not yet implemented. Once integrated, you will be able to change your password and manage two-factor authentication here.
                  </p>
                </div>
                <Button variant="outline" disabled className="mt-2">Change Password</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
