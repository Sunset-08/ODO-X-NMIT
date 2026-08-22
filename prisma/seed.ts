/**
 * Dayflow HRMS -- Prisma Seed
 * Run: npx prisma db seed
 * Or:  ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding Dayflow HRMS...");

  // ------------------------------------------------------------------
  // 1. DEPARTMENTS (created first, head updated after employees exist)
  // ------------------------------------------------------------------
  const deptEngineering = await prisma.department.upsert({
    where: { name: "Engineering" },
    update: {},
    create: { name: "Engineering", code: "ENG", description: "Product engineering and software development" },
  });
  const deptHR = await prisma.department.upsert({
    where: { name: "Human Resources" },
    update: {},
    create: { name: "Human Resources", code: "HR", description: "People operations and talent management" },
  });
  const deptFinance = await prisma.department.upsert({
    where: { name: "Finance" },
    update: {},
    create: { name: "Finance", code: "FIN", description: "Financial planning and accounting" },
  });

  // ------------------------------------------------------------------
  // 2. USERS
  // ------------------------------------------------------------------
  const hash = await bcrypt.hash("Password@123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@dayflow.io" },
    update: {},
    create: { employeeCode: "EMP-001", email: "admin@dayflow.io", passwordHash: hash, role: "admin", isEmailVerified: true, status: "active" },
  });
  const hrUser = await prisma.user.upsert({
    where: { email: "hr.manager@dayflow.io" },
    update: {},
    create: { employeeCode: "EMP-002", email: "hr.manager@dayflow.io", passwordHash: hash, role: "hr", isEmailVerified: true, status: "active" },
  });
  const emp1User = await prisma.user.upsert({
    where: { email: "alice.chen@dayflow.io" },
    update: {},
    create: { employeeCode: "EMP-003", email: "alice.chen@dayflow.io", passwordHash: hash, role: "employee", isEmailVerified: true, status: "active" },
  });
  const emp2User = await prisma.user.upsert({
    where: { email: "bob.sharma@dayflow.io" },
    update: {},
    create: { employeeCode: "EMP-004", email: "bob.sharma@dayflow.io", passwordHash: hash, role: "employee", isEmailVerified: true, status: "active" },
  });
  const emp3User = await prisma.user.upsert({
    where: { email: "carol.patel@dayflow.io" },
    update: {},
    create: { employeeCode: "EMP-005", email: "carol.patel@dayflow.io", passwordHash: hash, role: "employee", isEmailVerified: true, status: "active" },
  });

  // ------------------------------------------------------------------
  // 3. EMPLOYEES
  // ------------------------------------------------------------------
  const adminEmp = await prisma.employee.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id, firstName: "Super", lastName: "Admin",
      phone: "+91-9000000001", dateOfBirth: new Date("1985-04-10"), gender: "male",
      addressLine1: "1 Admin Lane", city: "Bengaluru", state: "Karnataka", country: "India", postalCode: "560001",
      departmentId: deptEngineering.id, designation: "CTO",
      employmentType: "full_time", dateOfJoining: new Date("2020-01-01"),
      workLocation: "Bengaluru HQ", employmentStatus: "active",
    },
  });
  const hrEmp = await prisma.employee.upsert({
    where: { userId: hrUser.id },
    update: {},
    create: {
      userId: hrUser.id, firstName: "Priya", lastName: "Kapoor",
      phone: "+91-9000000002", dateOfBirth: new Date("1990-07-22"), gender: "female",
      addressLine1: "12 HR Colony", city: "Bengaluru", state: "Karnataka", country: "India", postalCode: "560002",
      departmentId: deptHR.id, designation: "HR Manager",
      employmentType: "full_time", dateOfJoining: new Date("2021-03-15"),
      reportingManagerId: adminEmp.id, workLocation: "Bengaluru HQ", employmentStatus: "active",
    },
  });
  const alice = await prisma.employee.upsert({
    where: { userId: emp1User.id },
    update: {},
    create: {
      userId: emp1User.id, firstName: "Alice", lastName: "Chen",
      phone: "+91-9000000003", dateOfBirth: new Date("1995-11-05"), gender: "female",
      addressLine1: "34 Tech Park", city: "Bengaluru", state: "Karnataka", country: "India", postalCode: "560003",
      departmentId: deptEngineering.id, designation: "Software Engineer",
      employmentType: "full_time", dateOfJoining: new Date("2022-06-01"),
      reportingManagerId: adminEmp.id, workLocation: "Remote", employmentStatus: "active",
    },
  });
  const bob = await prisma.employee.upsert({
    where: { userId: emp2User.id },
    update: {},
    create: {
      userId: emp2User.id, firstName: "Bob", lastName: "Sharma",
      phone: "+91-9000000004", dateOfBirth: new Date("1993-02-18"), gender: "male",
      addressLine1: "56 Startup Ave", city: "Pune", state: "Maharashtra", country: "India", postalCode: "411001",
      departmentId: deptEngineering.id, designation: "Senior Software Engineer",
      employmentType: "full_time", dateOfJoining: new Date("2021-09-01"),
      reportingManagerId: adminEmp.id, workLocation: "Bengaluru HQ", employmentStatus: "active",
    },
  });
  const carol = await prisma.employee.upsert({
    where: { userId: emp3User.id },
    update: {},
    create: {
      userId: emp3User.id, firstName: "Carol", lastName: "Patel",
      phone: "+91-9000000005", dateOfBirth: new Date("1997-08-30"), gender: "female",
      addressLine1: "78 Finance Rd", city: "Mumbai", state: "Maharashtra", country: "India", postalCode: "400001",
      departmentId: deptFinance.id, designation: "Financial Analyst",
      employmentType: "full_time", dateOfJoining: new Date("2023-01-16"),
      reportingManagerId: adminEmp.id, workLocation: "Mumbai Office", employmentStatus: "active",
    },
  });

  // Assign department heads
  await prisma.department.update({ where: { id: deptEngineering.id }, data: { headEmployeeId: adminEmp.id } });
  await prisma.department.update({ where: { id: deptHR.id }, data: { headEmployeeId: hrEmp.id } });

  // ------------------------------------------------------------------
  // 4. LEAVE TYPES
  // ------------------------------------------------------------------
  const paidLeave = await prisma.leaveType.upsert({
    where: { code: "PL" },
    update: {},
    create: { name: "Paid Leave", code: "PL", isPaid: true, allowHalfDay: true, requiresApproval: true, defaultAnnualQuota: 12, maxConsecutiveDays: 15, color: "#22c55e", isActive: true },
  });
  const sickLeave = await prisma.leaveType.upsert({
    where: { code: "SL" },
    update: {},
    create: { name: "Sick Leave", code: "SL", isPaid: true, allowHalfDay: true, requiresApproval: false, defaultAnnualQuota: 6, maxConsecutiveDays: 5, color: "#f97316", isActive: true },
  });
  const unpaidLeave = await prisma.leaveType.upsert({
    where: { code: "UL" },
    update: {},
    create: { name: "Unpaid Leave", code: "UL", isPaid: false, allowHalfDay: true, requiresApproval: true, color: "#6b7280", isActive: true },
  });

  // ------------------------------------------------------------------
  // 5. LEAVE BALANCES
  // ------------------------------------------------------------------
  const YEAR = 2026;
  for (const [emp, ltId, entitled] of [
    [alice.id, paidLeave.id, 12], [alice.id, sickLeave.id, 6], [alice.id, unpaidLeave.id, 30],
    [bob.id, paidLeave.id, 12], [bob.id, sickLeave.id, 6], [bob.id, unpaidLeave.id, 30],
    [carol.id, paidLeave.id, 12], [carol.id, sickLeave.id, 6], [carol.id, unpaidLeave.id, 30],
    [hrEmp.id, paidLeave.id, 12], [hrEmp.id, sickLeave.id, 6], [hrEmp.id, unpaidLeave.id, 30],
  ] as [bigint, bigint, number][]) {
    await prisma.leaveBalance.upsert({
      where: { employeeId_leaveTypeId_year: { employeeId: emp, leaveTypeId: ltId, year: YEAR } },
      update: {},
      create: { employeeId: emp, leaveTypeId: ltId, year: YEAR, entitledDays: entitled },
    });
  }

  // ------------------------------------------------------------------
  // 6. LEAVE REQUESTS
  // ------------------------------------------------------------------
  // Alice -- approved PL
  const lr1 = await prisma.leaveRequest.create({
    data: {
      employeeId: alice.id, leaveTypeId: paidLeave.id,
      startDate: new Date("2026-07-14"), endDate: new Date("2026-07-16"),
      totalDays: 3, reason: "Family vacation", status: "approved",
      appliedAt: new Date("2026-07-10T09:00:00Z"),
      reviewedBy: hrUser.id, reviewedAt: new Date("2026-07-11T10:00:00Z"), reviewComment: "Approved. Enjoy!",
      leaveRequestDays: {
        create: [
          { leaveDate: new Date("2026-07-14"), portion: "full", dayCount: 1 },
          { leaveDate: new Date("2026-07-15"), portion: "full", dayCount: 1 },
          { leaveDate: new Date("2026-07-16"), portion: "full", dayCount: 1 },
        ],
      },
    },
  });
  await prisma.leaveBalance.update({
    where: { employeeId_leaveTypeId_year: { employeeId: alice.id, leaveTypeId: paidLeave.id, year: YEAR } },
    data: { usedDays: 3 },
  });

  // Bob -- pending SL
  await prisma.leaveRequest.create({
    data: {
      employeeId: bob.id, leaveTypeId: sickLeave.id,
      startDate: new Date("2026-08-20"), endDate: new Date("2026-08-21"),
      totalDays: 2, reason: "Fever and cold", status: "pending",
      appliedAt: new Date("2026-08-19T08:30:00Z"),
      leaveRequestDays: {
        create: [
          { leaveDate: new Date("2026-08-20"), portion: "full", dayCount: 1 },
          { leaveDate: new Date("2026-08-21"), portion: "full", dayCount: 1 },
        ],
      },
    },
  });

  // Carol -- rejected UL
  const lr3 = await prisma.leaveRequest.create({
    data: {
      employeeId: carol.id, leaveTypeId: unpaidLeave.id,
      startDate: new Date("2026-08-25"), endDate: new Date("2026-08-25"),
      totalDays: 1, reason: "Personal errand", status: "rejected",
      appliedAt: new Date("2026-08-22T10:00:00Z"),
      reviewedBy: hrUser.id, reviewedAt: new Date("2026-08-22T14:00:00Z"),
      reviewComment: "Quarter-end; cannot approve for this date.",
      leaveRequestDays: { create: [{ leaveDate: new Date("2026-08-25"), portion: "full", dayCount: 1 }] },
    },
  });

  // ------------------------------------------------------------------
  // 7. ATTENDANCE (3 employees x 5 days)
  // ------------------------------------------------------------------
  const workDates = ["2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22"].map(d => new Date(d));
  for (const emp of [alice, bob, carol]) {
    for (const wd of workDates) {
      const isLeave = emp.id === bob.id && wd.toISOString().startsWith("2026-08-20");
      await prisma.attendance.upsert({
        where: { employeeId_workDate: { employeeId: emp.id, workDate: wd } },
        update: {},
        create: {
          employeeId: emp.id, workDate: wd,
          checkInAt: isLeave ? null : new Date(`${wd.toISOString().split("T")[0]}T03:30:00Z`),
          checkOutAt: isLeave ? null : new Date(`${wd.toISOString().split("T")[0]}T12:30:00Z`),
          workHours: isLeave ? null : 9.0,
          status: isLeave ? "leave" : "present",
          source: "web", isRegularized: false,
        },
      });
    }
  }

  // ------------------------------------------------------------------
  // 8. SALARY STRUCTURES
  // ------------------------------------------------------------------
  const ssAdmin = await prisma.salaryStructure.create({
    data: {
      employeeId: adminEmp.id, currency: "INR",
      effectiveFrom: new Date("2020-01-01"), isCurrent: true, grossMonthly: 400000,
      notes: "CTO compensation package", createdBy: adminUser.id,
      components: {
        create: [
          { componentType: "earning", name: "Basic", calculationType: "percentage", basedOn: "gross", value: 40, isTaxable: true, displayOrder: 1 },
          { componentType: "earning", name: "HRA", calculationType: "percentage", basedOn: "basic", value: 50, isTaxable: false, displayOrder: 2 },
          { componentType: "earning", name: "Special Allowance", calculationType: "fixed", value: 80000, isTaxable: true, displayOrder: 3 },
          { componentType: "deduction", name: "Provident Fund", calculationType: "percentage", basedOn: "basic", value: 12, isTaxable: false, displayOrder: 4 },
          { componentType: "deduction", name: "Professional Tax", calculationType: "fixed", value: 200, isTaxable: false, displayOrder: 5 },
        ],
      },
    },
  });

  const ssAlice = await prisma.salaryStructure.create({
    data: {
      employeeId: alice.id, currency: "INR",
      effectiveFrom: new Date("2022-06-01"), isCurrent: true, grossMonthly: 90000,
      notes: "Standard SDE package", createdBy: adminUser.id,
      components: {
        create: [
          { componentType: "earning", name: "Basic", calculationType: "percentage", basedOn: "gross", value: 40, isTaxable: true, displayOrder: 1 },
          { componentType: "earning", name: "HRA", calculationType: "percentage", basedOn: "basic", value: 50, isTaxable: false, displayOrder: 2 },
          { componentType: "deduction", name: "Provident Fund", calculationType: "percentage", basedOn: "basic", value: 12, isTaxable: false, displayOrder: 3 },
        ],
      },
    },
  });

  // ------------------------------------------------------------------
  // 9. PAYROLL RUN + PAYSLIP
  // ------------------------------------------------------------------
  const run = await prisma.payrollRun.create({
    data: {
      periodMonth: 7, periodYear: 2026, runDate: new Date("2026-07-31"),
      status: "completed", employeeCount: 3,
      totalGross: 270000, totalDeductions: 50400, totalNet: 219600,
      processedBy: adminUser.id, completedAt: new Date("2026-07-31T20:00:00Z"),
    },
  });

  await prisma.payslip.create({
    data: {
      payrollRunId: run.id, employeeId: alice.id, salaryStructureId: ssAlice.id,
      periodMonth: 7, periodYear: 2026,
      workingDays: 23, paidDays: 20, lopDays: 3,
      grossPay: 78261, totalDeductions: 3750, netPay: 74511,
      currency: "INR", status: "published", paymentStatus: "paid",
      paidAt: new Date("2026-07-31T18:00:00Z"), paymentReference: "NEFT-20260731-001",
      generatedAt: new Date("2026-07-31T15:00:00Z"),
      items: {
        create: [
          { componentType: "earning", name: "Basic", amount: 36000, displayOrder: 1 },
          { componentType: "earning", name: "HRA", amount: 18000, displayOrder: 2 },
          { componentType: "earning", name: "Special Allowance", amount: 24261, displayOrder: 3 },
          { componentType: "deduction", name: "Provident Fund", amount: 3750, displayOrder: 4 },
        ],
      },
    },
  });

  // ------------------------------------------------------------------
  // 10. HOLIDAYS
  // ------------------------------------------------------------------
  await prisma.holiday.createMany({
    skipDuplicates: true,
    data: [
      { name: "Republic Day", holidayDate: new Date("2026-01-26"), type: "public_holiday", appliesTo: "all", year: 2026, createdBy: adminUser.id },
      { name: "Holi", holidayDate: new Date("2026-03-20"), type: "public_holiday", appliesTo: "all", year: 2026, createdBy: adminUser.id },
      { name: "Independence Day", holidayDate: new Date("2026-08-15"), type: "public_holiday", appliesTo: "all", year: 2026, createdBy: adminUser.id },
      { name: "Company Foundation Day", holidayDate: new Date("2026-09-01"), type: "company", appliesTo: "all", year: 2026, createdBy: adminUser.id },
      { name: "Diwali", holidayDate: new Date("2026-10-28"), type: "public_holiday", appliesTo: "all", year: 2026, createdBy: adminUser.id },
    ],
  });

  // ------------------------------------------------------------------
  // 11. ANNOUNCEMENTS
  // ------------------------------------------------------------------
  await prisma.announcement.createMany({
    data: [
      {
        title: "Welcome to Dayflow HRMS!",
        body: "We are excited to launch our new HR Management System. Please explore all features and provide feedback.",
        audience: "all", publishedBy: adminUser.id, isPinned: true, publishedAt: new Date("2026-08-01T09:00:00Z"),
      },
      {
        title: "Q3 Performance Reviews",
        body: "Q3 reviews start September 1st. Complete your self-assessments by August 28th.",
        audience: "all", publishedBy: hrUser.id, isPinned: false,
        publishedAt: new Date("2026-08-15T10:00:00Z"), expiresAt: new Date("2026-09-01T00:00:00Z"),
      },
    ],
  });

  // ------------------------------------------------------------------
  // 12. EMPLOYMENT HISTORY
  // ------------------------------------------------------------------
  await prisma.employmentHistory.createMany({
    data: [
      { employeeId: adminEmp.id, changeType: "hire", departmentId: deptEngineering.id, designation: "CTO", employmentType: "full_time", reportingManagerId: null, effectiveFrom: new Date("2020-01-01"), changedBy: adminUser.id, note: "Initial hire" },
      { employeeId: hrEmp.id, changeType: "hire", departmentId: deptHR.id, designation: "HR Manager", employmentType: "full_time", reportingManagerId: adminEmp.id, effectiveFrom: new Date("2021-03-15"), changedBy: adminUser.id, note: "Initial hire" },
      { employeeId: alice.id, changeType: "hire", departmentId: deptEngineering.id, designation: "Software Engineer", employmentType: "full_time", reportingManagerId: adminEmp.id, effectiveFrom: new Date("2022-06-01"), changedBy: adminUser.id, note: "Initial hire" },
      { employeeId: bob.id, changeType: "hire", departmentId: deptEngineering.id, designation: "Senior Software Engineer", employmentType: "full_time", reportingManagerId: adminEmp.id, effectiveFrom: new Date("2021-09-01"), changedBy: adminUser.id, note: "Initial hire" },
      { employeeId: carol.id, changeType: "hire", departmentId: deptFinance.id, designation: "Financial Analyst", employmentType: "full_time", reportingManagerId: adminEmp.id, effectiveFrom: new Date("2023-01-16"), changedBy: adminUser.id, note: "Initial hire" },
    ],
  });

  // ------------------------------------------------------------------
  // 13. NOTIFICATIONS
  // ------------------------------------------------------------------
  await prisma.notification.createMany({
    data: [
      {
        userId: emp2User.id, type: "leave_pending", title: "Leave Request Pending",
        message: "Your sick leave request for Aug 20-21 is awaiting approval.",
        channel: "in_app", relatedEntityType: "leave_request", isRead: false, sentAt: new Date("2026-08-19T09:00:00Z"),
      },
      {
        userId: emp3User.id, type: "leave_rejected", title: "Leave Request Rejected",
        message: "Your unpaid leave request for Aug 25 has been rejected.",
        channel: "in_app", relatedEntityType: "leave_request", isRead: false, sentAt: new Date("2026-08-22T14:05:00Z"),
      },
      {
        userId: emp1User.id, type: "payslip_published", title: "Payslip Ready",
        message: "Your payslip for July 2026 is available.",
        channel: "in_app", relatedEntityType: "payslip", isRead: true,
        readAt: new Date("2026-08-01T10:00:00Z"), sentAt: new Date("2026-08-01T09:00:00Z"),
      },
    ],
  });

  console.log("Seed complete.");
  console.log("  5 users | 3 departments | 3 leave types | 3 leave requests");
  console.log("  15 attendance records | 2 salary structures | 1 payroll run | 5 holidays");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });