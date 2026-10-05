import { Member } from '@prisma/client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { ActivityWithMembers } from '@/types/activity';

const ActivityDetailsDialog = ({
  members,
  date,
  name,
}: ActivityWithMembers) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <Search />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <p className='mb-4 font-large font-bold border-b text-center'>
          {name ?? ''} - {new Date(date).toLocaleDateString('nl-BE')}
        </p>
        <div>
          <div className='flex justify-between mb-2 font-bold border-b'>
            <p>Leden</p>
            <p className='text-right'># {members.length}</p>
          </div>
          <ul className='flex flex-col gap-2 max-h-96 overflow-y-auto mb-4'>
            {members.map((member) => (
              <li key={member.id}>
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        </div>
        <AlertDialogCancel>Sluit</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActivityDetailsDialog;
