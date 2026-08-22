"use server";

import { prisma } from "@/lib/prisma";
import { logActivity } from "./log";
import { revalidatePath } from "next/cache";

export async function requestLeave(formData: FormData) {
  // TODO: replace with session user once auth lands
  const currentUserId = 1;

  try {
    const employee = await prisma.employee.findUnique({
      where: { userId: BigInt(currentUserId) },
    });

    if (!employee) return { error: "Employee not found." };

    const typeId = formData.get("leaveTypeId") as string;
    const startDateStr = formData.get("startDate") as string;
    const endDateStr = formData.get("endDate") as string;
    const reason = formData.get("reason") as string;

    if (!typeId || !startDateStr || !endDateStr) {
      return { error: "Missing required fields." };
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const msDiff = endDate.getTime() - startDate.getTime();
    const totalDays = Math.ceil(msDiff / (1000 * 60 * 60 * 24)) + 1; // Inclusive

    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: employee.id,
        leaveTypeId: BigInt(typeId),
        startDate,
        endDate,
        totalDays,
        reason,
        status: "pending",
        appliedAt: new Date(),
      },
    });

    // Create LeaveRequestDay entries for each day
    const days = [];
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      days.push({
        leaveRequestId: leaveRequest.id,
        leaveDate: d,
        portion: "full" as const,
        dayCount: 1,
      });
    }

    await prisma.leaveRequestDay.createMany({
      data: days,
    });

    await logActivity({
      userId: currentUserId,
      action: "CREATE_LEAVE_REQUEST",
      description: `Requested ${totalDays} days of leave`,
      entityId: leaveRequest.id.toString(),
      entityType: "LeaveRequest",
    });

    revalidatePath("/time-off");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to submit leave request." };
  }
}

export async function getLeaveBalances() {
  const currentUserId = 1;

  const employee = await prisma.employee.findUnique({
    where: { userId: BigInt(currentUserId) },
  });

  if (!employee) return [];

  const year = new Date().getFullYear();

  const balances = await prisma.leaveBalance.findMany({
    where: {
      employeeId: employee.id,
      year: year,
    },
    include: {
      leaveType: true,
    }
  });

  return balances.map(b => ({
    id: b.id.toString(),
    typeId: b.leaveTypeId.toString(),
    typeName: b.leaveType.name,
    entitled: Number(b.entitledDays),
    used: Number(b.usedDays),
    pending: Number(b.pendingDays),
    balance: Number(b.entitledDays) + Number(b.carriedForwardDays) - Number(b.usedDays),
  }));
}

export async function getLeaveHistory() {
  const currentUserId = 1;

  const employee = await prisma.employee.findUnique({
    where: { userId: BigInt(currentUserId) },
  });

  if (!employee) return [];

  const requests = await prisma.leaveRequest.findMany({
    where: { employeeId: employee.id },
    include: { leaveType: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return requests.map(r => ({
    id: r.id.toString(),
    typeName: r.leaveType.name,
    startDate: r.startDate,
    endDate: r.endDate,
    totalDays: Number(r.totalDays),
    status: r.status,
    reason: r.reason,
  }));
}

export async function getLeaveTypes() {
  const types = await prisma.leaveType.findMany({
    where: { isActive: true },
  });

  return types.map(t => ({
    id: t.id.toString(),
    name: t.name,
  }));
}
