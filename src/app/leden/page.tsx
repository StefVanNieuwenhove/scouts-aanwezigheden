import { DataTable, MembersOverviewCols } from '@/components/table';
import { getMembers } from '@/data-acces/members';

const LedenOverzichtPage = async () => {
  const members = await getMembers();

  return (
    <>{members && <DataTable data={members} columns={MembersOverviewCols} />}</>
  );
};

export default LedenOverzichtPage;
