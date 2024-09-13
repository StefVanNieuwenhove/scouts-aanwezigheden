'use server';

import prisma from '@/lib/prisma';
import { FormResponse } from '@/types/form';
import {
  MemberTable,
  MemberWithActivities,
  UploadMember,
} from '@/types/member';
import { Group, Member } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getMembersTable = async (): Promise<MemberTable[] | null> => {
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

export const getMembersWithActivities = async (): Promise<
  MemberWithActivities[] | null
> => {
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

export const getMemberByName = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): Promise<Member | null> => {
  try {
    const member = await prisma.member.findFirst({
      where: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    return member;
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

export const deleteMember = async (id: string): Promise<FormResponse> => {
  try {
    await prisma.member.delete({
      where: {
        id: id,
      },
    });
    revalidatePath('/leden');
    return { status: 'success', message: 'Succesvol verwijderd' };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Fout bij het verwijderen van de leden',
    };
  }
};
