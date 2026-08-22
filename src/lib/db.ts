import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// The Prisma 7 driver-adapter setup mirrors prisma/seed.ts: the connection URL
// lives in the environment (see prisma.config.ts), not in schema.prisma.
function createPrismaClient() {
  const adapter = new PrismaPg({
    // Deliberately not throwing when DATABASE_URL is absent. `next build`
    // imports server modules without a database available, so failing here
    // would break the build. The connection error surfaces on first query
    // instead, where assertDatabaseConfigured() can give a better message.
    connectionString: process.env.DATABASE_URL ?? "",
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });
}

// Next.js hot-reloads server modules on every edit in development, which would
// open a new connection pool each time and exhaust Postgres. Caching the client
// on globalThis keeps a single pool across reloads.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

/**
 * Throws a readable error when DATABASE_URL is missing. Call this at the top of
 * a request path where a clear message beats a raw driver error.
 */
export function assertDatabaseConfigured(): void {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your Postgres instance.",
    );
  }
}
