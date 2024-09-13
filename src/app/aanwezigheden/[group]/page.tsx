import { getCountActivitiesByGroup } from '@/data-acces/activities';
import { getMembersByGroup } from '@/data-acces/members';
import { Group } from '@prisma/client';
import { AanwezighedenCols, DataTable } from '@/components/table';

type AanwezighedenOverviewPageProps = {
  params: { group: Group };
};

const AanwezighedenOverviewPage = async ({
  params,
}: AanwezighedenOverviewPageProps) => {
  const members = await getMembersByGroup(params.group.toUpperCase() as Group);
  const countActivities = await getCountActivitiesByGroup(
    params.group.toUpperCase() as Group
  );
  return (
    <>
      <div className='w-full flex justify-between items-center text-sm text-gray-400'>
        <p>Aantal leden: {members?.length}</p>
        <p>Aantal vergaderingen: {countActivities}</p>
      </div>
      {members ? (
        <DataTable
          data={members}
          columns={AanwezighedenCols}
          groupFilter={false}
        />
      ) : (
        <p>Geen leden gevonden</p>
      )}
    </>
  );
};

export default AanwezighedenOverviewPage;
