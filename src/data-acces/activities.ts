'use server';

import prisma from '@/lib/prisma';
import { ActivityWithMembers } from '@/types/activity';
import { AddActivityProps, FormResponse } from '@/types/form';
import { Activity, Group } from '@prisma/client';
import { ca } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

export const getActivityById = async (
  id: string,
  incudeMembers: boolean = true
): Promise<ActivityWithMembers | null> => {
  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
    include: {
      members: incudeMembers,
    },
  });
  return activity;
};

export const getActivitiesByGroup = async (
  group: Group,
  incudeMembers: boolean = true
): Promise<ActivityWithMembers[]> => {
  const activities = await prisma.activity.findMany({
    where: { group },
    include: {
      members: incudeMembers,
    },
  });
  return activities;
};

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

export const updateActivityMemberPresent = async (
  activity: string,
  member: string
): Promise<FormResponse> => {
  try {
    if (!activity || !member)
      return {
        status: 'error',
        message: 'vergadering en/of lid is niet gedefinieerd',
      };
    await prisma.activity.update({
      where: {
        id: activity,
      },
      data: {
        members: {
          connect: {
            id: member,
          },
        },
      },
      include: {
        members: true,
      },
    });
    revalidatePath('/aanwezigheden');

    return {
      status: 'success',
      message: 'Lid toegevoegd aan vergadering',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Er is een fout opgetreden',
    };
  }
};

export const updateActivityMemberAbsent = async (
  activity: string,
  member: string
): Promise<FormResponse> => {
  try {
    if (!activity || !member)
      return {
        status: 'error',
        message: 'vergadering en/of lid is niet gedefinieerd',
      };
    await prisma.activity.update({
      where: {
        id: activity,
      },
      data: {
        members: {
          disconnect: {
            id: member,
          },
        },
      },
      include: {
        members: true,
      },
    });
    revalidatePath('/aanwezigheden');

    return {
      status: 'success',
      message: 'Lid verwijderd van vergadering',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Er is een fout opgetreden',
    };
  }
};

export const deleteActivityById = async (id: string): Promise<FormResponse> => {
  try {
    await prisma.activity.delete({
      where: {
        id,
      },
    });
    revalidatePath('/aanwezigheden');

    return {
      status: 'success',
      message: 'Activiteit succesvol verwijderd',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Er is een fout opgetreden',
    };
  }
};
