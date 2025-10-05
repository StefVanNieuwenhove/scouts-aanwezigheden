import prisma from '@/lib/prisma';

export const getUsers = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const CreateUser = async (user: any) => {
  try {
    const result = await prisma.user.create({
      data: user,
    });
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};
