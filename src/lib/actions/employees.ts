"use server";

import { prisma } from "@/lib/prisma";
import { logActivity } from "./log";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const employeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  employeeCode: z.string().min(1),
  departmentId: z.coerce.number().optional().nullable(),
  managerId: z.coerce.number().optional().nullable(),
  employmentType: z.enum(["full_time", "part_time", "contract", "intern", "probation"]),
  jobTitle: z.string().min(1),
  joinDate: z.string().transform(str => new Date(str)),
});

export async function createEmployee(formData: FormData) {
  // TODO: replace with session user once auth lands
  const currentUserId = 1;

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    employeeCode: formData.get("employeeCode") as string,
    departmentId: formData.get("departmentId") || null,
    managerId: formData.get("managerId") || null,
    employmentType: formData.get("employmentType") as any,
    jobTitle: formData.get("jobTitle") as string,
    joinDate: formData.get("joinDate") as string,
  };

  const parsed = employeeSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid data provided." };
  }

  try {
    const employee = await prisma.employee.create({
      data: {
        departmentId: parsed.data.departmentId ? BigInt(parsed.data.departmentId) : null,
        reportingManagerId: parsed.data.managerId ? BigInt(parsed.data.managerId) : null,
        employmentType: parsed.data.employmentType as any,
        designation: parsed.data.jobTitle,
        dateOfJoining: parsed.data.joinDate,
        employmentStatus: "active",
        userId: BigInt(currentUserId), // Hack: In reality this would create a User first or link one
        firstName: "New",
        lastName: "Employee",
      },
    });

    await prisma.employmentHistory.create({
      data: {
        employeeId: employee.id,
        changeType: "hire",
        effectiveFrom: parsed.data.joinDate,
        designation: parsed.data.jobTitle,
        employmentType: parsed.data.employmentType as any,
        departmentId: employee.departmentId,
        reportingManagerId: employee.reportingManagerId,
        changedBy: BigInt(currentUserId),
      }
    });

    await logActivity({
      userId: currentUserId,
      action: "CREATE_EMPLOYEE",
      description: `Hired employee ${employee.id}`,
      entityId: employee.id.toString(),
      entityType: "Employee",
    });

    revalidatePath("/admin/employees");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create employee." };
  }
}

export async function getMyProfile() {
  // TODO: replace with session user once auth lands
  const currentUserId = 1;
  
  const employee = await prisma.employee.findUnique({
    where: { userId: BigInt(currentUserId) },
    include: {
      department: true,
      salaryStructures: {
        where: { isCurrent: true },
        include: { components: true },
      }
    }
  });

  if (!employee) return null;

  // Convert BigInt to Number for Client Components (JSON serialization)
  const salaryStructure = employee.salaryStructures[0];
  
  const user = await prisma.user.findUnique({ where: { id: BigInt(currentUserId) }});

  return {
    id: employee.id.toString(),
    firstName: employee.firstName,
    lastName: employee.lastName,
    employeeCode: user?.employeeCode || employee.id.toString(),
    email: user?.email || "user@dayflow.com", 
    phone: employee.phone || "",
    address: employee.addressLine1 || "",
    jobTitle: employee.designation || "",
    departmentName: employee.department?.name || "Unassigned",
    location: employee.workLocation || "HQ",
    salary: salaryStructure ? {
      annual: Number(salaryStructure.grossMonthly) * 12,
      monthly: Number(salaryStructure.grossMonthly),
      components: salaryStructure.components.map(c => ({
        name: c.name,
        type: c.componentType,
        amount: Number(c.value),
      }))
    } : null,
  };
}

export async function getEmployeeById(employeeId: string) {
  const employee = await prisma.employee.findUnique({
    where: { id: BigInt(employeeId) },
    include: {
      department: true,
      salaryStructures: {
        where: { isCurrent: true },
        include: { components: true },
      }
    }
  });

  if (!employee) return null;

  const salaryStructure = employee.salaryStructures[0];
  
  const user = await prisma.user.findUnique({ where: { id: employee.userId }});

  return {
    id: employee.id.toString(),
    firstName: employee.firstName,
    lastName: employee.lastName,
    employeeCode: user?.employeeCode || employee.id.toString(),
    email: user?.email || "user@dayflow.com", 
    phone: employee.phone || "",
    address: employee.addressLine1 || "",
    jobTitle: employee.designation || "",
    departmentName: employee.department?.name || "Unassigned",
    location: employee.workLocation || "HQ",
    salary: salaryStructure ? {
      annual: Number(salaryStructure.grossMonthly) * 12,
      monthly: Number(salaryStructure.grossMonthly),
      components: salaryStructure.components.map(c => ({
        name: c.name,
        type: c.componentType,
        amount: Number(c.value),
      }))
    } : null,
  };
}
