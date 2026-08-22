import { defineConfig } from "prisma/config";

// Dayflow HRMS -- Prisma 7 configuration
// For local development, create a .env file at the project root:
//   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/dayflow"

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});