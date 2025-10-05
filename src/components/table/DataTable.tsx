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

type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  groupFilter: boolean;
  deleteAll?: ReactNode;
};

const DataTable = <TData, TValue>({
  data,
  columns,
  groupFilter = false,
  deleteAll,
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
  });

  const handleDeleteAllMembers = async () => {
    try {
      const result = await deleteAllMembers();
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <div className='my-1 w-full flex justify-between items-center'>
        <section>{deleteAll}</section>
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
      {/* {groupFilter && (
        <div className='my-1 w-full flex justify-between items-center'>
          <section>
            <Button variant={'destructive'} onClick={handleDeleteAllMembers}>
              Verwijder alle leden
            </Button>
          </section>
          <section className='w-1/3'>
            <GroupFilter
              onChange={(value: string) => {
                if (value === 'all') table.resetColumnFilters(true);
                else
                  table
                    .getColumn('group')
                    ?.setFilterValue(convertToGroup(value));
              }}
            />
          </section>
        </div>
      )} */}
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
                          header.getContext()
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
            <TableCell colSpan={columns.length} className='text-right'>
              <div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}>
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}>
                  Next
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default DataTable;
