'use client';

import React from 'react';
import { Button } from '../ui/button';
import { deleteAllActivities } from '@/data-acces/activities';
import { toast } from 'sonner';

const DeleteAllActivitiesButton = () => {
  const handleDeleteAllActivities = async () => {
    try {
      const result = await deleteAllActivities();
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
    <Button variant={'destructive'} onClick={handleDeleteAllActivities}>
      Verwijder alle vergaderingen
    </Button>
  );
};

export default DeleteAllActivitiesButton;
