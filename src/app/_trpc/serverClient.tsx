import { auth as getAuth } from "@clerk/nextjs/app-beta";

import { appRouter } from "@/server/trpc/routers/root";
import { createContextInner } from "@/server/trpc/trpc";

export const serverClient = async () =>
  appRouter.createCaller(await createContextInner({ auth: getAuth() }));
