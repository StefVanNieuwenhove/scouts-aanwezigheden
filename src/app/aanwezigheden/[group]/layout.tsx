'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Group } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import React from 'react';

type AanwezigheidLayoutProps = {
  children: React.ReactNode;
  params: { group: Group };
};

const AanwezighedenLayout = ({ children, params }: AanwezigheidLayoutProps) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <main className='container mx-auto w-full overflow-x-scroll mt-1'>
        <div className='w-full flex justify-center gap-4 items-center  border-gray-200 py-4'>
          <Button
            variant={
              pathname === `/aanwezigheden/${params.group}`
                ? 'default'
                : 'outline'
            }
            className={
              pathname === `/aanwezigheden/${params.group}` ? 'underline' : ''
            }>
            <Link href={`/aanwezigheden/${params.group}`}>Overzicht</Link>
          </Button>
          <Button
            variant={
              pathname.startsWith(`/aanwezigheden/${params.group}/create`)
                ? 'default'
                : 'outline'
            }
            className={
              pathname.startsWith(`/aanwezigheden/${params.group}/create`)
                ? 'underline'
                : ''
            }>
            <Link href={`/aanwezigheden/${params.group}/create`}>
              Nieuwe vergadering
            </Link>
          </Button>
          <Button
            variant={
              pathname.startsWith(`/aanwezigheden/${params.group}/update`)
                ? 'default'
                : 'outline'
            }
            className={
              pathname.startsWith(`/aanwezigheden/${params.group}/update`)
                ? 'underline'
                : ''
            }>
            <Link href={`/aanwezigheden/${params.group}/update`}>
              Bewerk vergaderingen
            </Link>
          </Button>
        </div>
        <Separator className='mb-5' />
        {children}
      </main>
    </>
  );
};

export default AanwezighedenLayout;
