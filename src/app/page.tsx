import { SignedIn, SignedOut, useSession } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  const role: string = user?.publicMetadata?.role as string;
  return (
    <main className='flex min-h-screen flex-col  items-center  p-24'>
      <SignedIn>
        <p>component with overview</p>
        <p>for admin/groepsleiding = tab with overview for all groups</p>
        <p>other role = overview group</p>
      </SignedIn>
      <SignedOut>
        <p>component with login</p>
      </SignedOut>
    </main>
  );
}
