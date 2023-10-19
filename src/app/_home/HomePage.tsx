"use client";
import { useCallback, useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/DataTable";
import { useFiltersData } from "@/hooks/useFiltersData";

import { dataService } from "@/services/dataService";

const HomePage = ({ data }: any) => {
  const { filters, onFiltersChange } = useFiltersData();
  const tableData = useMemo(() => dataService.getTableData(data), [data]);

  const handleFiltersChange = useCallback(
    (tableFilters?: ColumnFiltersState) => {
      onFiltersChange(tableFilters);
    },
    [onFiltersChange]
  );

  return (
    <DataTable
      columns={tableData.columns}
      data={tableData.sheetData}
      initialState={{
        columnFilters: filters,
      }}
      onFiltersChange={handleFiltersChange}
    />
  );
};

export default HomePage;
