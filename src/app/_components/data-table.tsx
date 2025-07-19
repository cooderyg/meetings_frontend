"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { Newspaper } from "lucide-react";

const getRandomDate = () => {
  const today = dayjs();
  const randomDays = Math.floor(Math.random() * 90);
  const randomDate = today.subtract(randomDays, "day");
  return randomDate.format("YYYY년 MM월 DD일");
};

const data: Payment[] = Array.from({ length: 100 }, (_, i) => {
  return {
    id: String(i + 1),
    title: "타이틀",
    createAt: getRandomDate(),
    participant: "이정민",
    author: "이정민",
    recordingTime: "20분 10초",
    space: "genral",
  };
});

export type Payment = {
  id: string;
  title: string;
  createAt: string;
  participant: string;
  author: string;
  recordingTime: string;
  space: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "제목",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          생성일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("createAt")}</div>
    ),
  },
  {
    accessorKey: "participant",
    header: "참석자",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("participant")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "작성자",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "recordingTime",
    header: "녹음 시간",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("recordingTime")}</div>
    ),
  },
  {
    accessorKey: "space",
    header: "녹음 시간",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("space")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:bg-slate-100">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Trash2 size={16} color="#020618" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const columnLabels: Record<string, string> = {
  title: "제목",
  createAt: "생성일",
  participant: "참석자",
  author: "작성자",
  recordingTime: "녹음 시간",
  space: "공간",
  actions: "더보기",
};

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="제목, 참석자 검색"
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              칼럼 보기 <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnLabels[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "actions"
                          ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[300px] text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-6 w-full py-8">
                    <Newspaper size={24} className="text-slate-400" />
                    <p className="text-slate-950 text-sm">
                      표시할 내용이 없습니다.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length >= 20 && (
              <TableRow>
                <TableCell className="px-4 h-14 text-center items-center justify-start flex">
                  <Button variant={"outline"}>더보기</Button>
                </TableCell>
                <TableCell colSpan={columns.length - 1}></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
