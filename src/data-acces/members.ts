'use server';

import prisma from '@/lib/prisma';
import { convertToGroup } from '@/lib/utils';
import { FormResponse } from '@/types/form';
import { MemberTable, MemberWithActivities } from '@/types/member';
import { Group, Member } from '@prisma/client';
import fs from 'fs';

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
  file: File
): Promise<FormResponse> => {
  try {
    console.log(file.webkitRelativePath);
    const csv = fs.readFileSync(file.webkitRelativePath, 'utf8');
    const parsed = csv.split('\n');

    const members = parsed.map((line) => {
      const [firstName, lastName, group] = line.split(',');
      return {
        firstName: firstName,
        lastName: lastName,
        group: convertToGroup(group),
      };
    });
    console.log(members);
    return { status: 'success', message: 'Succesvol geüpload' };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Fout bij het uploaden van het bestand',
    };
  }
};
