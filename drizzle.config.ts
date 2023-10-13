import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: ".env",
});

export default {
  schema: "./src/server/db/schema.ts",
  out: "migrations",
  driver: "pg",
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config;
