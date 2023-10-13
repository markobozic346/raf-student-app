import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  demo: publicProcedure.query(() => ({ message: "Hello World" })),
});

export type AppRouter = typeof appRouter;
