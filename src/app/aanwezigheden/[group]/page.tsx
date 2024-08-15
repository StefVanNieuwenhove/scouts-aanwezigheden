import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

type AanwezighedenGroupPageProps = {
  params: {
    group: string;
  };
};

const AanwezighedenGroupPage = async ({
  params,
}: AanwezighedenGroupPageProps) => {
  const user = await currentUser();
  const role: string = user?.publicMetadata?.role as string;

  console.log(params.group, role);

  if (
    role !== params.group.toUpperCase() &&
    role !== 'ADMIN' &&
    role !== 'GROEPSLEIDING'
  )
    redirect('/');
  return <div>page for group {params.group}</div>;
};

export default AanwezighedenGroupPage;
