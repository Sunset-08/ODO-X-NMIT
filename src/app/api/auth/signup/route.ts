import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

const signupSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
    phone: z.string().trim().min(10).max(20),
    password: z.string().min(8).max(128),
    profilePictureUrl: z.string().url().optional(),
});

function generateEmployeeCode() {
    return `EMP-${Date.now()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = signupSchema.safeParse(body);

        if (!result.success) {
            return Response.json(
                {
                    error: "Invalid input",
                    details: result.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const { name, email, phone, password, profilePictureUrl } = result.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (existingUser) {
            return Response.json(
                { error: "An account with this email already exists" },
                { status: 409 },
            );
        }

        const passwordHash = await hashPassword(password);

        const [firstName, ...lastNameParts] = name.split(/\s+/);
        const lastName = lastNameParts.join(" ") || firstName;

        const employee = await prisma.$transaction(async (tx) => {
            let employeeCode = generateEmployeeCode();

            while (
                await tx.user.findUnique({
                    where: { employeeCode },
                    select: { id: true },
                })
            ) {
                employeeCode = generateEmployeeCode();
            }

            const user = await tx.user.create({
                data: {
                    employeeCode,
                    email,
                    passwordHash,
                    role: "employee",
                    status: "active",
                    isEmailVerified: false,
                },
            });

            return tx.employee.create({
                data: {
                    userId: user.id,
                    firstName,
                    lastName,
                    phone,
                    profilePictureUrl,
                    employmentType: "intern",
                    dateOfJoining: new Date(),
                    employmentStatus: "active",
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    profilePictureUrl: true,
                    user: {
                        select: {
                            employeeCode: true,
                            email: true,
                            role: true,
                            status: true,
                            isEmailVerified: true,
                        },
                    },
                },
            });
        });

        return Response.json(
            {
                message: "Account created successfully",
                employee,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Signup error:", error);

        return Response.json(
            { error: "Unable to create account" },
            { status: 500 },
        );
    }
}