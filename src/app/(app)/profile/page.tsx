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
import { getMyProfile } from "@/lib/actions/employees";

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
  const [employee, setEmployee] = React.useState<ProfileData | null>(null);

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
              <h1 className="text-xl font-semibold text-text">{employee.firstName} {employee.lastName}</h1>
              <p className="text-sm text-secondary mt-0.5">{employee.jobTitle}</p>
              <p className="text-xs text-secondary mt-1">{employee.employeeCode} · {employee.departmentName} · {employee.location}</p>
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

      {/* Personal Information */}
      <Card>
        <CardContent className="p-6">
          <SectionHeading>Personal Information</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <LockedField label="Email" value={employee.email} />

            {isEditing ? (
              <div className="flex flex-col gap-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={draft.phone}
                  onChange={(e) => { setDraft((d) => ({ ...d, phone: e.target.value })); if (errors.phone) setErrors((err) => ({ ...err, phone: undefined })); }}
                  placeholder="+91 XXXXX XXXXX"
                  error={errors.phone}
                />
              </div>
            ) : (
              <InfoRow label="Phone" value={saved.phone} />
            )}

            <div className="sm:col-span-2">
              {isEditing ? (
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={draft.address}
                    onChange={(e) => { setDraft((d) => ({ ...d, address: e.target.value })); if (errors.address) setErrors((err) => ({ ...err, address: undefined })); }}
                    placeholder="Your full address"
                    error={errors.address}
                  />
                </div>
              ) : (
                <InfoRow label="Address" value={saved.address} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Information */}
      <Card>
        <CardContent className="p-6">
          <SectionHeading>Job Information</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow label="Department" value={employee.departmentName} />
            <InfoRow label="Job Title" value={employee.jobTitle} />
            <InfoRow label="Employee ID" value={employee.employeeCode} />
            <InfoRow label="Location" value={employee.location} />
          </div>
        </CardContent>
      </Card>

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
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
