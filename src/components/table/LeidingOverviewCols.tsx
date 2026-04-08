'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import { UserTable } from '@/types/user';

const LeidingOverviewCols: ColumnDef<UserTable>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Naam
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.firstName + ' ' + row.lastName,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.email,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Rol
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.role || 'Geen rol',
  },
];

export default LeidingOverviewCols;
