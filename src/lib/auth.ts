import { auth } from '@clerk/nextjs/server';

export const isSignedIn = () => {
  const { userId } = auth();
  return !!userId;
};
