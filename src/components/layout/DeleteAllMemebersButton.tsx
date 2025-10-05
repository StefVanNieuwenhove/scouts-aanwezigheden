'use client';
import { Button } from '../ui/button';
import { deleteAllMembers } from '@/data-acces/members';
import { toast } from 'sonner';

const DeleteAllMemebersButton = () => {
  const handleDeleteAllMemebers = async () => {
    try {
      const result = await deleteAllMembers();
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <Button variant={'destructive'} onClick={handleDeleteAllMemebers}>
      Verwijder alle leden
    </Button>
  );
};

export default DeleteAllMemebersButton;
