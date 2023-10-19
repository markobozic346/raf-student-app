"use client";

import { Column } from "@tanstack/react-table";

import { Input } from "../input";

function Filter({ column }: { column: Column<any, any> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <Input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Pretraga...`}
      className="w-full border shadow rounded"
    />
  );
}

export default Filter;
