"use client";

import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useFiltersData = () => {
  const [filters, setFilters] = useState<ColumnFiltersState>();

  useEffect(() => {
    const lsFilters = JSON.parse(localStorage.getItem("filters") || "null");

    if (!lsFilters) return;

    setFilters(lsFilters);

    localStorage.setItem("filters", JSON.stringify(lsFilters));
  }, []);

  const onFiltersChange = useCallback((filters?: ColumnFiltersState) => {
    if (!filters?.length) return;

    setFilters(filters);
    localStorage.setItem("filters", JSON.stringify(filters || []));
  }, []);

  const values = useMemo(
    () => ({
      filters,
      onFiltersChange,
    }),
    [filters, onFiltersChange]
  );

  return values;
};
