import { MemberWithActivities } from '@/types/member';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type OverviewMembersProps = {
  members: MemberWithActivities[] | null;
};

const OverviewMembers = ({ members }: OverviewMembersProps) => {
  return (
    <Table>
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
            <TableRow key={member.id}>
              <TableCell>
                {member.firstName} {member.lastName}
              </TableCell>
              <TableCell>{member.activities.length}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableCaption>Aantal leden: {members?.length}</TableCaption>
    </Table>
  );
};

export default OverviewMembers;
