import prisma from '@/lib/prisma';
import { MemberWithActivities } from '@/types/member';
import { Group } from '@prisma/client';

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
