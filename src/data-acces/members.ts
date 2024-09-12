'use server';

import prisma from '@/lib/prisma';
import { FormResponse } from '@/types/form';
import {
  MemberTable,
  MemberWithActivities,
  UploadMember,
} from '@/types/member';
import { Group } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getMembers = async (): Promise<MemberTable[] | null> => {
  try {
    const members = await prisma.member.findMany({
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }, { group: 'asc' }],
    });
    return members;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMembersByGroup = async (
  group: Group,
  includeActivities: boolean = true
): Promise<MemberWithActivities[] | null> => {
  try {
    if (!group) return null;
    const members = await prisma.member.findMany({
      where: {
        group: group,
      },
      include: {
        activities: includeActivities,
      },
    });
    return members;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMemebers = async (): Promise<MemberWithActivities[] | null> => {
  try {
    const members = await prisma.member.findMany({
      include: {
        activities: true,
      },
    });
    return members;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadMembersByFile = async (
  members: UploadMember[]
): Promise<FormResponse> => {
  try {
    await prisma.member.createMany({
      data: members,
      skipDuplicates: true,
    });

    revalidatePath('/leden');
    return { status: 'success', message: 'Succesvol geüpload' };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Fout bij het uploaden van het bestand',
    };
  }
};
