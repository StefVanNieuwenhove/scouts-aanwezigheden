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

type DeleteActivityButtonProps = {
  activity: Activity;
  redirect: string;
};

const DeleteActivityButton = ({
  activity,
  redirect,
}: DeleteActivityButtonProps) => {
  const handleClick = async () => {
    const result = await deleteActivityById(activity.id);
    if (result.status === 'success') {
      toast.success(result.message);
      window.location.href = redirect;
    } else {
      toast.error(result.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size={'icon'}>
          <Trash2 className='w-4 h-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Wil je {activity.name} verwijderen?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deze actie kan niet ongedaan worden gemaakt. Weet je zeker dat je
            deze activiteit wilt verwijderen?
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

export default DeleteActivityButton;
