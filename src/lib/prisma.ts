<<<<<<< HEAD
import { Pool } from "pg";
=======
import "server-only";
>>>>>>> origin/main
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
<<<<<<< HEAD
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5433/dayflow";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
=======
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL is not configured");
    }

    const adapter = new PrismaPg({ connectionString });

    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
>>>>>>> origin/main
