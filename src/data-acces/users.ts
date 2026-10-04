'use server';

import { FormResponse } from '@/types/form';
import { Roles } from '@/types/role';
import { UserTable, CreateUser } from '@/types/user';
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

export const createUser = async (user: CreateUser): Promise<FormResponse> => {
  try {
    const response = await clerkClient.users.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      username: `${user.firstName}${user.lastName}`.replaceAll(' ', ''),
      emailAddress: [user.email],
      password: user.password,
      publicMetadata: {
        role: user.role,
      },
    });
    return {
      status: 'success',
      message: 'Succesvol aangemaakt',
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user.');
  }
};
