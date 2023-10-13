class DataService {
  organizeData(data: any) {
    const organizedData = data.map((sheet: any) => {
      return {
        sheetName: sheet.sheetName,
        columns: [
          {
            id: sheet.values[0][0],
            accessorKey: "subject",
            header: sheet.values[0][0],
          },
          {
            id: sheet.values[0][1],
            accessorKey: "year",
            header: sheet.values[0][1],
          },
          {
            id: sheet.values[0][2],
            accessorKey: "group",
            header: sheet.values[0][2],
          },
          {
            id: sheet.values[0][3],
            accessorKey: "zoomUrl",
            header: sheet.values[0][3],
          },
          {
            id: sheet.values[0][4],
            accessorKey: "eLearningUrl",
            header: sheet.values[0][4],
          },
          {
            id: sheet.values[0][5],
            accessorKey: "note",
            header: sheet.values[0][5],
          },
        ],
        sheetData: sheet.values.slice(1).map((row: string) => {
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
    });

    return organizedData;
  }
}

export const dataService = new DataService();
