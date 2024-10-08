import { Group } from '@prisma/client';

export type FormResponse = {
  status: 'success' | 'error';
  message: string;
};
export type AddActivityProps = {
  name: string;
  date: Date;
  members: string[];
  group: Group;
};

export type AddMemberProps = {
  firstName: string;
  lastName: string;
  group: Group;
};
