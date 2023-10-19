"use client";

import {
  ColumnDef,
  flexRender,
  OnChangeFn,
  useReactTable,
  getCoreRowModel,
  InitialTableState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import Filter from "./Filter";
import Pagination from "./Pagination";
import { useEffect, useMemo } from "react";

interface DataTableProps<TData, TValue> {
  data: TData[];
  initialState?: InitialTableState;
  columns: ColumnDef<TData, TValue>[];
  onFiltersChange?: (filters?: ColumnFiltersState) => void;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  initialState,
  onFiltersChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    initialState,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filters = useMemo(
    () => table.getState().columnFilters,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getState().columnFilters]
  );

  useEffect(() => {
    if (!onFiltersChange) return;
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  useEffect(() => {
    //manually set column filters only if there are no filters in the state (on initial load)
    if (filters?.length) return;

    if (!initialState?.columnFilters) return;

    table.setColumnFilters(initialState.columnFilters || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  return (
    <>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="p-2 h-12 text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {header.column.getCanFilter() ? (
                        <Filter column={header.column} />
                      ) : (
                        <div className="h-9"></div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell className="text-center w-40" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </>
  );
}
