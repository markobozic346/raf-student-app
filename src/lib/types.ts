import { ColumnDef } from "@tanstack/react-table";

export type Lecture = {
  subject: string;
  year: string;
  group: string;
  zoomUrl: string;
  eLearningUrl: string;
  note: string;
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
