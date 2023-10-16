import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Lecture, Sheet, TableData } from "@/lib/types";

const columnHelper = createColumnHelper<Lecture>();

class DataService {
  getTableData(data: Sheet[]): TableData {
    const sheet = data[0];
    const tableData = {
      sheetName: sheet.sheetName,
      columns: [
        columnHelper.accessor("subject", {
          id: sheet.values[0][0],
          header: "Predmeti",
          enableColumnFilter: true,
        }),

        columnHelper.accessor("year", {
          id: sheet.values[0][1],
          header: sheet.values[0][1],
          enableColumnFilter: true,
        }),

        columnHelper.accessor("group", {
          id: sheet.values[0][2],
          header: sheet.values[0][2],
          enableColumnFilter: true,
        }),

        columnHelper.accessor("zoomUrl", {
          id: sheet.values[0][3],
          header: sheet.values[0][3],
          cell: (props) =>
            props.getValue() === "" ? null : (
              <a href={props.getValue()} target="_blank">
                <Button className="w-40">Open zoom</Button>
              </a>
            ),
          enableColumnFilter: false,
        }),

        columnHelper.accessor("eLearningUrl", {
          id: sheet.values[0][4],
          cell: (props) =>
            props.getValue() === "" ? null : (
              <a href={props.getValue()} target="_blank">
                <Button className="w-40">Open eLearning</Button>
              </a>
            ),
          enableColumnFilter: false,
        }),

        columnHelper.accessor("note", {
          id: sheet.values[0][5],
          header: sheet.values[0][5],
          enableColumnFilter: true,
        }),
      ],
      sheetData: sheet.values.slice(1).map((row: string[]) => {
        return {
          subject: row[0],
          year: row[1],
          group: row[2],
          zoomUrl: row[3],
          eLearningUrl: row[4],
          note: row[5],
        };
      }),
    };

    return tableData;
  }
}

export const dataService = new DataService();
