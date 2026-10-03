'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ActivityWithMembers } from '@/types/activity';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from '../ui/item';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { ActivityDetailsDialog } from '../layout';

const ActivitiesOverviewCols: ColumnDef<ActivityWithMembers>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Vergadering
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.name,
  },
  {
    accessorKey: 'group',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tak
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.group,
  },
  {
    accessorKey: 'countMembers',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          # leden
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.members.length,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className='hover:bg-primary'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Datum
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    accessorFn: (row) => row.date.toLocaleDateString('nl-BE'),
  },
  {
    accessorKey: 'details',
    header: '',
    cell: ({ row }) => <ActivityDetailsDialog {...row.original} key={row.id} />,
  },
];

export default ActivitiesOverviewCols;
