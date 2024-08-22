import { getCountActivitiesByGroup } from '@/data-acces/activities';
import { getMembersByGroup } from '@/data-acces/members';
import { Group } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
      <div className='w-full text-right text-sm text-gray-400'>
        Aantal vergaderingen: {countActivities}
      </div>
      <Table className='border dark:border-none'>
        <TableHeader className='bg-primary'>
          <TableRow>
            <TableHead className='text-center text-white dark:text-white'>
              Naam
            </TableHead>
            <TableHead className='text-center text-white dark:text-white'>
              # vergaderingen
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members
            ?.sort((a, b) => {
              if (a.activities.length === b.activities.length) {
                return a.firstName.localeCompare(b.firstName);
              }
              return b.activities.length - a.activities.length;
            })
            .map((member) => (
              <TableRow key={member.id} className='text-center'>
                <TableCell>
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell>{member.activities.length}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableCaption>Aantal leden: {members?.length}</TableCaption>
      </Table>
    </>
  );
};

export default AanwezighedenOverviewPage;
