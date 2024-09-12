//'use client';

import { DataTable } from '@/components/table';
import { getMembers } from '@/data-acces/members';
import { MemberTable } from '@/types/member';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const columns: ColumnDef<MemberTable>[] = [
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

const LedenOverzichtPage = async () => {
  // cols: firstname, lastname, group, activities?
  // sort: firstname, lastname, group
  // filter: group

  const members = await getMembers();

  return <>{members && <DataTable data={members} columns={columns} />}</>;
};

export default LedenOverzichtPage;
