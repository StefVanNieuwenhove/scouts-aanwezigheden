'use client';

import { MemberTable } from '@/types/member';
import { ColumnDef } from '@tanstack/react-table';
import { DeleteMemberButton } from '../layout';

const MembersOverviewCols: ColumnDef<MemberTable>[] = [
  {
    accessorKey: 'firstName',
    header: 'Voornaam',
  },
  {
    accessorKey: 'lastName',
    header: 'Achternaam',
  },
  {
    accessorKey: 'group',
    header: 'Groep',
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
