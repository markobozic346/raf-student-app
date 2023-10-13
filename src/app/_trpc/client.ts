import { AppRouter } from "@/server/trpc/routers/root";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
