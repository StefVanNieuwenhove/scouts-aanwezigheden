import prisma from '@/lib/prisma';
import { MemberWithActivities } from '@/types/member';
import { Group } from '@prisma/client';

export const getMembersByGroup = async (
  group: Group
): Promise<MemberWithActivities[] | null> => {
  try {
    if (!group) return null;
    const members = await prisma.member.findMany({
      where: {
        group: group,
      },
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
