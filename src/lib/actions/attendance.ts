"use server";

import { prisma } from "@/lib/prisma";
import { logActivity } from "./log";
import { revalidatePath } from "next/cache";

export async function checkIn() {
  // TODO: replace with session user once auth lands
  const currentUserId = 1;

  try {
    const employee = await prisma.employee.findUnique({
      where: { userId: BigInt(currentUserId) },
    });

    if (!employee) return { error: "Employee not found." };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId: employee.id,
        workDate: today,
      },
    });

    if (existing) {
      return { error: "Already checked in today." };
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId: employee.id,
        workDate: today,
        checkInAt: new Date(),
        status: "present", 
        source: "web",
      },
    });

    await logActivity({
      userId: currentUserId,
      action: "ATTENDANCE_CHECK_IN",
      description: "Employee checked in",
      entityId: attendance.id.toString(),
      entityType: "Attendance",
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to check in." };
  }
}

export async function checkOut() {
  // TODO: replace with session user once auth lands
  const currentUserId = 1;

  try {
    const employee = await prisma.employee.findUnique({
      where: { userId: BigInt(currentUserId) },
    });

    if (!employee) return { error: "Employee not found." };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId: employee.id,
        workDate: today,
      },
    });

    if (!existing || !existing.checkInAt) {
      return { error: "Cannot check out without checking in." };
    }

    if (existing.checkOutAt) {
      return { error: "Already checked out today." };
    }

    const checkOutTime = new Date();
    // Rough calculation of working hours
    const msDiff = checkOutTime.getTime() - existing.checkInAt.getTime();
    const hours = msDiff / (1000 * 60 * 60);

    const attendance = await prisma.attendance.update({
      where: { id: existing.id },
      data: {
        checkOutAt: checkOutTime,
        workHours: hours,
      },
    });

    await logActivity({
      userId: currentUserId,
      action: "ATTENDANCE_CHECK_OUT",
      description: "Employee checked out",
      entityId: attendance.id.toString(),
      entityType: "Attendance",
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to check out." };
  }
}

export async function getTodayAttendance() {
  // TODO: replace with session user once auth lands
  const currentUserId = 1;

  const employee = await prisma.employee.findUnique({
    where: { userId: BigInt(currentUserId) },
  });

  if (!employee) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findFirst({
    where: {
      employeeId: employee.id,
      workDate: today,
    },
  });

  return attendance ? {
    checkIn: attendance.checkInAt,
    checkOut: attendance.checkOutAt,
    workHours: attendance.workHours ? Number(attendance.workHours) : 0,
  } : null;
}

export async function getAdminTodayAttendance() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const records = await prisma.attendance.findMany({
    where: { workDate: { gte: today, lt: tomorrow } },
    include: { employee: true },
    orderBy: { checkInAt: "desc" },
  });

  return records.map((r) => ({
    id: r.id.toString(),
    employeeName: `${r.employee.firstName} ${r.employee.lastName}`,
    checkIn: r.checkInAt,
    checkOut: r.checkOutAt,
    workHours: r.workHours ? Number(r.workHours) : null,
    status: r.status,
  }));
}
