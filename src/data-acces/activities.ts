'use server';

import prisma from '@/lib/prisma';
import { AddActivityProps, FormResponse } from '@/types/form';
import { Group } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getCountActivitiesByGroup = async (
  group: Group
): Promise<number> => {
  const activities = await prisma.activity.count({
    where: { group },
  });
  return activities;
};

export const addActivity = async ({
  name,
  date,
  members,
  group,
}: AddActivityProps): Promise<FormResponse> => {
  try {
    await prisma.activity.create({
      data: {
        name,
        date,
        group,
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
