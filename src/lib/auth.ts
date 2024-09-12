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

export const hasAcces = (role: Roles, access: Roles) => {
  if (role === 'GROEPSLEIDING') return true;
  if (role === access) {
    return true;
  }
  return false;
};
