import { DeleteAllActivitiesButton } from '@/components/layout';
import { DataTable } from '@/components/table';
import ActivitiesOverviewCols from '@/components/table/ActivitiesOverviewCols';
import { deleteAllActivities, getActivities } from '@/data-acces/activities';
import React from 'react';
import { toast } from 'sonner';

const VergaderingenOverviewPage = async () => {
  const activities = await getActivities();

  return (
    <>
      {activities && (
        <DataTable
          data={activities}
          columns={ActivitiesOverviewCols}
          groupFilter
          deleteAll={<DeleteAllActivitiesButton />}
        />
      )}
    </>
  );
};

export default VergaderingenOverviewPage;
