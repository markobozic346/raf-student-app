import { sql } from "drizzle-orm";

import { boolean, integer, serial, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const subjectTask = pgTable("subject_task", {
 id: varchar("id").notNull().primaryKey(),
  subject: varchar("subject", { length: 100 }).notNull(),
  userId: varchar("user_id", {length: 256}).notNull(),
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
