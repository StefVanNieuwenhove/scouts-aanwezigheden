'use server';

import prisma from '@/lib/prisma';
import { AddActivityProps, FormResponse } from '@/types/form';
import { revalidatePath } from 'next/cache';

export const addActivity = async ({
  name,
  date,
  members,
}: AddActivityProps): Promise<FormResponse> => {
  try {
    console.log({ name, date, members });
    await prisma.activity.create({
      data: {
        name,
        date,
        members: {
          connect: members.map((memberId) => ({
            id: memberId,
          })),
        },
      },
    });
    revalidatePath('/aanwezigheden');

    return {
      status: 'success',
      message: 'Activiteit succesvol toegevoegd',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Er is een fout opgetreden',
    };
  }
};
