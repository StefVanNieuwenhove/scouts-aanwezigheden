'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { deleteActivityById } from '@/data-acces/activities';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Activity } from '@prisma/client';
import { deleteMember, getMemberByName } from '@/data-acces/members';
import { MemberTable } from '@/types/member';

type DeleteMemberButtonProps = {
  member: MemberTable;
  redirect: string;
};

const DeleteMemberButton = ({ member, redirect }: DeleteMemberButtonProps) => {
  const handleClick = async () => {
    try {
      const memberExists = await getMemberByName({
        firstName: member.firstName,
        lastName: member.lastName,
      });
      if (!memberExists) {
        toast.error('Geen leden met deze naam gevonden');
        return;
      }
      const result = await deleteMember(memberExists.id);
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size={'icon'}>
          <Trash2 className='w-4 h-4 text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Wil je {member.firstName} {member.lastName} verwijderen?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deze actie kan niet ongedaan worden gemaakt.
            <br /> Weet je zeker dat je dit lid wilt verwijderen?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick} autoFocus>
            Verwijder
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMemberButton;
