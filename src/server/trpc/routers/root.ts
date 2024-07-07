import {  router } from "../trpc";
import { taskRouter } from "./taskRouter";

export const appRouter = router({
  taskRouter,
});

export type AppRouter = typeof appRouter;
