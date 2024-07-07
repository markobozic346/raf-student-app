import { ExternalLink } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import ActionButton from "@/components/action-button";
import { Lecture, Sheet, TableData } from "@/lib/types";

const columnHelper = createColumnHelper<Lecture>();

class DataService {
  getTableData(data: Sheet[]): TableData {
    const sheet = data[0];
    const tableData = {
      sheetName: sheet.sheetName,
      columns: [
        columnHelper.accessor("subject", {
          id: "subject",
          header: "Predmeti",
          enableColumnFilter: true,
        }),

        columnHelper.accessor("year", {
          id: "year",
          header: sheet.values[0][1],
          enableColumnFilter: true,
        }),

        columnHelper.accessor("group", {
          id: "group",
          header: sheet.values[0][2],
          enableColumnFilter: true,
        }),

        columnHelper.accessor("zoomUrl", {
          id: "zoomUrl",
          header: sheet.values[0][3],
          cell: (props) =>
            props.getValue() === "" ? null : (
              <a href={props.getValue()} target="_blank">
                <Button className="w-40 bg-blue-600/80 flex justify-center items-center gap-1">
                  Zoom
                  <ExternalLink className="w-4" />
                </Button>
              </a>
            ),
          enableColumnFilter: false,
        }),

        columnHelper.accessor("eLearningUrl", {
          id: "eLearningUrl",
          cell: (props) =>
            props.getValue() === "" ? null : (
              <a href={props.getValue()} target="_blank">
                <Button className="w-40 flex justify-center items-center gap-1 bg-orange-600/80">
                  eLearning
                  <ExternalLink className="w-4" />
                </Button>
              </a>
            ),
          enableColumnFilter: false,
        }),

        columnHelper.accessor("note", {
          id: "note",
          header: sheet.values[0][5],
          enableColumnFilter: true,
        }),
        columnHelper.accessor("action", {
          id: "action",
          header: "",
          enableColumnFilter: false,
          cell: (props) => {
            return <ActionButton subject={props.row.original.subject} />;
          },
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
