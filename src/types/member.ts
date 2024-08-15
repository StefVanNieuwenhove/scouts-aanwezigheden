import { Activity, Member } from '@prisma/client';

export type MemberWithActivities = Member & {
  activities: Activity[];
};
