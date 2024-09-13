'use client';

import { MemberTable } from '@/types/member';
import { ColumnDef } from '@tanstack/react-table';
import { DeleteMemberButton } from '../layout';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

const MembersOverviewCols: ColumnDef<MemberTable>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Voornaam
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Familienaam
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'group',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Groep
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },
  {
    accessorKey: '',
    header: 'Delete',
    cell: ({ row }) => {
      return <DeleteMemberButton member={row.original} redirect={'/leden'} />;
    },
  },
];

export default MembersOverviewCols;
