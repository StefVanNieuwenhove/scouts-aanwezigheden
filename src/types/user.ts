import { Group } from '@prisma/client';
import { Roles } from './role';

export type UserTable = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Exclude<Roles, 'ADMIN'>;
};
