"use server";

import { prisma } from "@/lib/prisma";
import { logActivity } from "./log";
import { revalidatePath } from "next/cache";
export async function getMyPayslips() {
  const currentUserId = 1;

  const employee = await prisma.employee.findUnique({
    where: { userId: BigInt(currentUserId) },
  });

  if (!employee) return [];

  const payslips = await prisma.payslip.findMany({
    where: { employeeId: employee.id },
    include: { items: true },
    orderBy: [
      { periodYear: "desc" },
      { periodMonth: "desc" }
    ],
  });

  return payslips.map(p => ({
    id: p.id.toString(),
    periodMonth: p.periodMonth,
    periodYear: p.periodYear,
    workingDays: Number(p.workingDays),
    paidDays: Number(p.paidDays),
    grossPay: Number(p.grossPay),
    totalDeductions: Number(p.totalDeductions),
    netPay: Number(p.netPay),
    status: p.status,
    paymentStatus: p.paymentStatus,
    currency: p.currency,
    items: p.items.map(i => ({
      name: i.name,
      amount: Number(i.amount),
      type: i.componentType,
    }))
  }));
}

export async function getAdminPayrollRuns() {
  const runs = await prisma.payrollRun.findMany({
    orderBy: [
      { periodYear: "desc" },
      { periodMonth: "desc" }
    ],
    take: 12,
  });

  return runs.map(r => ({
    id: r.id.toString(),
    month: r.periodMonth,
    year: r.periodYear,
    runDate: r.runDate,
    status: r.status,
    employeeCount: r.employeeCount,
    totalGross: Number(r.totalGross),
    totalNet: Number(r.totalNet),
  }));
}
