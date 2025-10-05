'use client';
import { MemberFileUpload, MembersFormUpload } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

type ComponentProps = {
  name: string;
  component: React.ReactNode;
};

const LedenCreatePage = () => {
  const [component, setComponent] = useState<ComponentProps>({
    name: 'Leden',
    component: <nav></nav>,
  });
  return (
    <>
      <Tabs defaultValue='csv' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger value='csv' className='w-full'>
            CSV
          </TabsTrigger>
          <TabsTrigger value='form' className='w-full'>
            Form
          </TabsTrigger>
        </TabsList>
        <TabsContent value='csv'>
          <MemberFileUpload />
        </TabsContent>
        <TabsContent value='form'>
          <MembersFormUpload />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default LedenCreatePage;
