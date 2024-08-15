import { Roles } from '@/types/role';
import { auth, currentUser } from '@clerk/nextjs/server';

export const isSignedIn = () => {
  const { userId } = auth();
  return !!userId;
};

export const getUserRole = async (): Promise<Roles> => {
  const user = await currentUser();
  return user?.publicMetadata?.role as Roles;
};
