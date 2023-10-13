import { integer, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable("comment", {
  int: integer("int"),
});
