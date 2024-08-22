import { MemberWithActivities } from '@/types/member';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Group } from '@prisma/client';
import { getCountActivitiesByGroup } from '@/data-acces/activities';

type OverviewMembersProps = {
  members: MemberWithActivities[] | null;
  group: Group;
};

const OverviewMembers = async ({ members, group }: OverviewMembersProps) => {
  const countActivities = await getCountActivitiesByGroup(group);
  return (
    <>
      <div className='w-full text-right text-sm text-gray-400'>
        Aantal vergaderingen: {countActivities}
      </div>
      <Table className='border'>
        <TableHeader className='bg-primary'>
          <TableRow>
            <TableHead className='text-center text-primary-foreground'>
              Naam
            </TableHead>
            <TableHead className='text-center text-primary-foreground'>
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

export default OverviewMembers;
