import { Activity, Member } from '@prisma/client';

export type ActivityWithMembers = Activity & {
  members: Member[];
};
