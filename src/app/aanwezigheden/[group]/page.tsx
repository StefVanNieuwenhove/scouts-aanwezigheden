import { getUserRole } from '@/lib/auth';
import { Roles } from '@/types/role';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Group } from '@prisma/client';
import { getMembersByGroup } from '@/data-acces/members';
import { OverviewMembers } from '@/components/layout';
import { AddActivity, UpdateActivity } from '@/components/forms';

type AanwezighedenGroupPageProps = {
  params: {
    group: Roles;
  };
};

const AanwezighedenGroupPage = async ({
  params,
}: AanwezighedenGroupPageProps) => {
  const role = await getUserRole();

  if (
    role !== params.group.toUpperCase() &&
    role !== 'ADMIN' &&
    role !== 'GROEPSLEIDING'
  )
    redirect('/');

  const members = await getMembersByGroup(params.group.toUpperCase() as Group);
  return (
    <main className='container mx-auto w-full overflow-x-scroll'>
      <Tabs defaultValue='update' className='text-center mt-5'>
        <TabsList>
          <TabsTrigger value='overview' className='w-full'>
            Overzicht
          </TabsTrigger>
          <TabsTrigger value='create' className='w-full'>
            Maak nieuwe vergadering
          </TabsTrigger>
          <TabsTrigger value='update' className='w-full'>
            Bewerk vergadering
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <article className='prose prose-invert max-w-none'>
            <OverviewMembers members={members} />
          </article>
        </TabsContent>
        <TabsContent value='create'>
          <article className='prose prose-invert max-w-none'>
            <AddActivity members={members} />
          </article>
        </TabsContent>
        <TabsContent value='update'>
          <article className='prose prose-invert max-w-none'>
            <UpdateActivity members={members} />
          </article>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AanwezighedenGroupPage;
