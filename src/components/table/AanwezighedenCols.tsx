'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MemberWithActivities } from '@/types/member';

const aanwezighedenCols: ColumnDef<MemberWithActivities>[] = [
  {
    accessorKey: 'firstName',
    header: 'Naam',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: 'activities',
    header: '# vergaderingen',
    accessorFn: (row) => row.activities.length,
  },
];

export default aanwezighedenCols;
