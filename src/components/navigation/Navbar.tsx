import React from 'react';
import { ThemeToggle } from '../ui/theme-toggle';
import {
  Protect,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Roles } from '@/types/role';
import Drawer from './Drawer';
import { Separator } from '../ui/separator';
import { getUserRole, hasAcces } from '@/lib/auth';

const Navbar = async () => {
  const role = await getUserRole();

  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl'>
        <span className='flex md:hidden'>
          <Drawer role={role} />
        </span>
        <h1 className='text-2xl font-bold text-center hidden md:flex'>
          <Link href={'/'}>Scouts aanwezigheden</Link>
        </h1>
        <nav className='hidden md:flex items-center justify-center gap-4'>
          <SignedIn>
            <Button>
              <Link href={'/'}>Overzicht</Link>
            </Button>
          </SignedIn>
          <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
            <Button>
              <Link href={'/aanwezigheden/kapoenen'}>Kapoenen</Link>
            </Button>
          </Protect>
          <Protect condition={() => hasAcces(role, 'WOUTERS')}>
            <Button>
              <Link href={'/aanwezigheden/wouters'}>Wouters</Link>
            </Button>
          </Protect>
          <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
            <Button>
              <Link href={'/aanwezigheden/jonnggivers'}>Jonnggivers</Link>
            </Button>
          </Protect>
          <Protect condition={() => hasAcces(role, 'GIVERS')}>
            <Button>
              <Link href={'/aanwezigheden/givers'}>Givers</Link>
            </Button>
          </Protect>
          <Protect condition={() => hasAcces(role, 'JINS')}>
            <Button>
              <Link href={'/aanwezigheden/jins'}>Jins</Link>
            </Button>
          </Protect>
        </nav>

        <div className='flex items-center gap-4 '>
          <SignedOut>
            <Button>
              <Link href='/sign-in'>Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button>Sign out</Button>
            </SignOutButton>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </header>
      <Separator />
    </>
  );
};

export default Navbar;
