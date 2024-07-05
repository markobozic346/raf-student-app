import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const subjectTask = pgTable("subject_task", {
  id: integer("id").primaryKey(),
  subject: varchar("subject", { length: 100 }).notNull(),
  userId: integer("user_id").notNull(),
  task: varchar("task", { length: 1000 }).notNull(),
  deadline: timestamp("deadline", { withTimezone: true }).notNull(),
  done: boolean("done").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});
