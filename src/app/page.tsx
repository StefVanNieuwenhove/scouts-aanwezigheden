import { OverviewCard } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { getMembersWithActivities } from '@/data-acces/members';
import { hasAcces } from '@/lib/auth';
import { Roles } from '@/types/role';
import { Protect, SignedIn, SignedOut } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { Group } from '@prisma/client';
import Link from 'next/link';

export default async function Home() {
  const members = await getMembersWithActivities();
  const user = await currentUser();
  const role = user?.publicMetadata?.role as Roles;
  return (
    <main className='container mx-auto w-full flex min-h-screen flex-col items-center my-2'>
      <SignedIn>
        <section className='w-full flex flex-col gap-4'>
          <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
            <OverviewCard
              group={Group.KAPOENEN}
              members={members?.filter((member) => member.group === 'KAPOENEN')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'WOUTERS')}>
            <OverviewCard
              group={Group.WOUTERS}
              members={members?.filter((member) => member.group === 'WOUTERS')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
            <OverviewCard
              group={Group.JONGGIVERS}
              members={members?.filter(
                (member) => member.group === 'JONGGIVERS'
              )}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'GIVERS')}>
            <OverviewCard
              group={Group.GIVERS}
              members={members?.filter((member) => member.group === 'GIVERS')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'JINS')}>
            <OverviewCard
              group={Group.JINS}
              members={members?.filter((member) => member.group === 'JINS')}
            />
          </Protect>
        </section>
      </SignedIn>
      <SignedOut>
        <h2 className='text-2xl'>Log in to continue</h2>
        <Button>
          <Link href='/login'>Sign in</Link>
        </Button>
      </SignedOut>
    </main>
  );
}
