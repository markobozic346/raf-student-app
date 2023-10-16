"use client";

import { DataTable } from "@/components/ui/DataTable";

import { dataService } from "@/services/dataService";

const HomePage = ({ data }: any) => {
  const tableData = dataService.getTableData(data);

  return <DataTable columns={tableData.columns} data={tableData.sheetData} />;
};

export default HomePage;
