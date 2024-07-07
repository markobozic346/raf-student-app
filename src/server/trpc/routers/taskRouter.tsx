import * as z from "zod";
import { and, eq } from "drizzle-orm";
import { subjectTask } from "@/server/db/schema";
import * as uuid from "uuid";
import { protectedProcedure, router } from "../trpc";

export const taskRouter = router({
  getAllUserTask: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .select()
      .from(subjectTask)
      .where(eq(subjectTask.userId, ctx.auth.userId));
  }),
  createTask: protectedProcedure
    .input(
      z.object({
        subject: z.string(),
        deadline: z.string(),
        task: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Unauthorized");
      }

      return await ctx.db.insert(subjectTask).values({
        id: uuid.v4(),
        userId: ctx.auth.userId,
        subject: input.subject,
        deadline: new Date(input.deadline),
        task: input.task,
      });
    }),
  getTaskBySubject: protectedProcedure
    .input(
      z.object({
        subject: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Unauthorized");
      }

      return await ctx.db
        .select()
        .from(subjectTask)
        .where(eq(subjectTask.userId, ctx.auth.userId))
        .where(eq(subjectTask.subject, input.subject));
    }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
        task: z.string().optional(),
        subject: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Unauthorized");
      }

      return await ctx.db
        .update(subjectTask)
        .set({
          done: input.done,
          task: input.task,
          subject: input.subject,
          updatedAt: new Date(),
        })
        .where(eq(subjectTask.id, input.id));
    }),
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Unauthorized");
      }

      return await ctx.db
        .delete(subjectTask)
        .where(
          and(
            eq(subjectTask.id, input.id),
            eq(subjectTask.userId, ctx.auth.userId)
          )
        );
    }),
  getSingleTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Unauthorized");
      }

      const response = await ctx.db
        .select()
        .from(subjectTask)
        .where(eq(subjectTask.userId, ctx.auth.userId))
        .where(eq(subjectTask.id, input.id));

      const task = response.find((task) => task.id);

      return task;
    }),
});
