import React from 'react';
import {
  Protect,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import Drawer from './Drawer';
import { getUserRole, hasAcces } from '@/lib/auth';
import NavLink from './NavLink';

const Navbar = async () => {
  const role = await getUserRole();

  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl border border-b'>
        <span className='flex md:hidden'>
          <Drawer role={role} />
        </span>
        <h1 className='text-2xl font-bold text-center hidden md:flex'>
          <Link href={'/'}>Scouts aanwezigheden</Link>
        </h1>
        <nav className='hidden md:flex items-center justify-center gap-4'>
          <SignedIn>
            <NavLink name='Overzicht' href={'/'} />
          </SignedIn>
          <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
            <NavLink name='Kapoenen' href={'/aanwezigheden/kapoenen'} />
          </Protect>
          <Protect condition={() => hasAcces(role, 'WOUTERS')}>
            <NavLink name='Wouters' href={'/aanwezigheden/wouters'} />
          </Protect>
          <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
            <NavLink name='Jonggivers' href={'/aanwezigheden/jonggivers'} />
          </Protect>
          <Protect condition={() => hasAcces(role, 'GIVERS')}>
            <NavLink name='Givers' href={'/aanwezigheden/givers'} />
          </Protect>
          <Protect condition={() => hasAcces(role, 'JINS')}>
            <NavLink name='Jins' href={'/aanwezigheden/jins'} />
          </Protect>
          <Protect condition={() => hasAcces(role, 'GROEPSLEIDING')}>
            <NavLink name='Leden' href={'/leden'} />
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
        </div>
      </header>
    </>
  );
};

export default Navbar;
