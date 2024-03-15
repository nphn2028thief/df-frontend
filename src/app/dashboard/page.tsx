"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  FilterFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Search } from "lucide-react";

import axiosClient from "@/configs/axiosClient";
import { IProjectResponse, IResult } from "@/types/project";
import useDebounced from "@/hooks/useDebounced";

const DashboardPage = () => {
  const [data, setData] = useState<IResult[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const debouncedValue = useDebounced(globalFilter, 500);

  const columns = useMemo<ColumnDef<IResult>[]>(
    () => [
      {
        header: "Project",
        cell: ({ row }) => (
          <p className="font-medium text-base xl:text-lg">
            {row.original.project_name}
          </p>
        ),
      },
      {
        header: "Domain",
        cell: ({ row }) => (
          <p className="font-medium text-base xl:text-lg">
            {row.original.project_domain}
          </p>
        ),
      },
      {
        header: "Last accessed",
        cell: ({ row }) => (
          <p className="text-center font-medium text-base xl:text-lg">
            {row.original.last_accessed
              ? format(row.original.last_accessed, "dd/MM/yyyy")
              : ""}
          </p>
        ),
      },
      {
        header: "License",
        columns: [
          {
            header: "Type",
            cell: ({ row }) => (
              <p className="font-medium text-base xl:text-lg">
                {row.original.license_use
                  .map((item) => item.license_type)
                  .join(", ")}
              </p>
            ),
          },
          {
            header: "Libraries",
            cell: ({ row }) => (
              <p className="font-medium text-base xl:text-lg">
                {row.original.license_use
                  .map((item) => item.libraries)
                  .join(", ")}
              </p>
            ),
          },
        ],
      },
    ],
    []
  );

  const { data: projects } = useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const res = await axiosClient.get<IProjectResponse>("/projects");
      return res.data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (projects) {
      setData(projects.results);
    }
  }, [projects]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      globalFilter,
    },
  });

  return (
    <div className="h-full flex flex-col gap-10 p-6">
      <div className="w-[320px] flex items-center border rounded-[999px]">
        <input
          type="text"
          placeholder="Enter keyword here..."
          value={globalFilter}
          className="flex-1 bg-white dark:bg-gray-800 dark:text-white text-sm px-4 pr-1 py-2 rounded-[999px]"
          onChange={(e) => {
            const value = e.target.value;

            if (value.startsWith(" ")) return;

            setGlobalFilter(value);
          }}
        />
        <div className="px-3 py-2">
          <Search className="w-4 h-4" />
        </div>
      </div>
      <div className="h-full flex flex-col overflow-auto">
        <table className="flex-1 border-separate">
          <thead className="sticky top-0 z-[999] bg-white dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 py-3 border"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-secondary-10">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="max-w-full w-[240px] px-4 py-2 border"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-2 mt-7 relative">
          <button
            className="border rounded p-2"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-2"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>

          <span className="absolute right-0 flex justify-end items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
