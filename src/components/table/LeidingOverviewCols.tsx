import { User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

const LeidingOverviewCols: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Gebruikersnaam
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.username,
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
    accessorFn: (row) => row.publicMetadata?.valueOf() || 'Geen rol',
  },
];
