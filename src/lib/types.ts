import { AppRouter } from "@/server/trpc/routers/root";
import { ColumnDef } from "@tanstack/react-table";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type Lecture = {
  subject: string;
  year: string;
  group: string;
  zoomUrl: string;
  eLearningUrl: string;
  note: string;
  action?: string;
};

export type Sheet = {
  sheetName: string;
  values: string[][];
};

export type TableData = {
  sheetName: string;
  columns: ColumnDef<Lecture, string>[];
  sheetData: Lecture[];
};

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type Task = RouterOutput["taskRouter"]["getAllUserTask"][number];