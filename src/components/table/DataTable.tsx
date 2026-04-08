'use client';

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
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { ReactNode, useState } from 'react';
import GroupFilter from './GroupFilter';
import { convertToGroup } from '@/lib/utils';
import { toast } from 'sonner';
import { deleteAllMembers } from '@/data-acces/members';
import TablePagination from './TablePagination';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';

type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  groupFilter: boolean;
  deleteAll?: ReactNode;
  craeteButton?: ReactNode;
};

const DataTable = <TData, TValue>({
  data,
  columns,
  groupFilter = false,
  deleteAll,
  craeteButton,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    autoResetPageIndex: false,
  });

  return (
    <>
      <div className='my-1 w-full flex justify-between items-center'>
        <section className='flex items-center gap-2'>
          {deleteAll}
          {craeteButton}
        </section>
        <section className='w-1/3'>
          {groupFilter && (
            <GroupFilter
              onChange={(value: string) => {
                if (value === 'all') table.resetColumnFilters(true);
                else
                  table
                    .getColumn('group')
                    ?.setFilterValue(convertToGroup(value));
              }}
            />
          )}
        </section>
      </div>
      <Table className='border dark:border-none'>
        <TableHeader className='bg-primary'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='hover:bg-primary'>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className='text-center text-white dark:text-white'>
                    {header.isPlaceholder
                      ? null
                      : (flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        ) as any)}
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
                data-state={row.getIsSelected() && 'selected'}
                className='text-center'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>Geen resultaten</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className='bg-none'>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className='w-full flex items-center justify-between'>
                <p>{table.getFilteredRowModel().rows.length} resultaten</p>
                <div className='flex items-center gap-2'>
                  <Select
                    defaultValue={table
                      .getState()
                      .pagination.pageSize.toString()}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder='Leden per pagina ' />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <TablePagination
                    nextPage={table.nextPage}
                    previousPage={table.previousPage}
                    firstPage={table.firstPage}
                    lastPage={table.lastPage}
                    canNextPage={table.getCanNextPage()}
                    canPreviousPage={table.getCanPreviousPage()}
                    pageIndex={table.getState().pagination.pageIndex}
                    pageCount={table.getPageCount()}
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default DataTable;
