import DeleteAllMemebersButton from '@/components/layout/DeleteAllMemebersButton';
import { DataTable, MembersOverviewCols } from '@/components/table';
import { Button } from '@/components/ui/button';
import { getMembersTable } from '@/data-acces/members';

const LedenOverzichtPage = async () => {
  const members = await getMembersTable();

  return (
    <>
      {members && (
        <DataTable
          data={members}
          columns={MembersOverviewCols}
          groupFilter
          deleteAll={<DeleteAllMemebersButton />}
          craeteButton={
            <Button variant={'link'} className='border border-primary'>
              <a href='/management/leden/create'>Nieuw lid toevoegen</a>
            </Button>
          }
        />
      )}
    </>
  );
};

export default LedenOverzichtPage;
