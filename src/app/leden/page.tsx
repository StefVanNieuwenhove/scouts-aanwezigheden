import { DataTable, MembersOverviewCols } from '@/components/table';
import { getMembersTable } from '@/data-acces/members';

const LedenOverzichtPage = async () => {
  const members = await getMembersTable();

  return (
    <>
      {members && (
        <DataTable data={members} columns={MembersOverviewCols} groupFilter />
      )}
    </>
  );
};

export default LedenOverzichtPage;
