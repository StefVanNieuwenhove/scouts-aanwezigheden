import { DataTable } from '@/components/table';
import LeidingOverviewCols from '@/components/table/LeidingOverviewCols';
import { Button } from '@/components/ui/button';
import { getUsers } from '@/data-acces/users';
import React from 'react';

const LeidingOverviewPage = async () => {
  const users = await getUsers();
  //console.log(users);

  return (
    <>
      {users && (
        <DataTable
          data={users}
          columns={LeidingOverviewCols}
          groupFilter={false}
          craeteButton={
            <Button variant={'link'} className='border border-primary'>
              <a href='/management/leiding/create'>Nieuw lid toevoegen</a>
            </Button>
          }
        />
      )}
    </>
  );
};

export default LeidingOverviewPage;
