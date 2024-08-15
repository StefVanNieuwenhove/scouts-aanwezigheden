import { getUserRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const LedenPage = async () => {
  const role = await getUserRole();
  if (role !== 'ADMIN') redirect('/');
  return <main className='container mx-auto'>LedenPage</main>;
};

export default LedenPage;
