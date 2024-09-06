import prisma from '@/lib/prisma';
import { MemberWithActivities } from '@/types/member';
import { Group, Member } from '@prisma/client';

export const getMembers = async (): Promise<Member[] | null> => {
  try {
    const members = await prisma.member.findMany();
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
