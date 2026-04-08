'use server';

import { Roles } from '@/types/role';
import { UserTable } from '@/types/user';
import { clerkClient } from '@clerk/nextjs/server';

export const getUsers = async (): Promise<UserTable[] | null> => {
  try {
    const users = await clerkClient.users.getUserList();

    const result = users.data
      .filter((user) => user.publicMetadata?.role !== 'ADMIN')
      .map((user) => ({
        id: user.id,
        firstName: user.firstName ?? 'onbekend',
        lastName: user.lastName ?? 'onbekend',
        email: user.emailAddresses[0]?.emailAddress ?? 'onbekend',
        role: user.publicMetadata?.role as Roles,
      }));
    console.log(result);

    return result
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const CreateUser = async (user: any) => {
  try {
    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};
