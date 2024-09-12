'use client';

import { MemberTable } from '@/types/member';
import { ColumnDef } from '@tanstack/react-table';

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
];

export default MembersOverviewCols;
