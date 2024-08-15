import React from 'react';
import { ThemeToggle } from '../ui/theme-toggle';
import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { Roles } from '@/types/role';
import Drawer from './Drawer';

const Navbar = async () => {
  const user = await currentUser();
  const role: Roles = user?.publicMetadata?.role as Roles;

  const hasAcces = (access: Roles) => {
    if (role === 'ADMIN' || role === 'GROEPSLEIDING') return true;
    if (role === access) {
      return true;
    }
    return false;
  };
  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl'>
        <span className='flex md:hidden'>
          <Drawer role={role} />
        </span>
        <h1 className='text-2xl font-bold'>Scouts aanwezigheden</h1>
        <nav className='hidden md:flex items-center justify-center gap-4'>
          <SignedIn>
            <Button>
              <Link href={'/'}>Overzicht</Link>
            </Button>
            {hasAcces('KAPOENEN') && (
              <Button>
                <Link href={'/aanwezigheden/kapoenen'}>Kapoenen</Link>
              </Button>
            )}
            {hasAcces('WOUTERS') && (
              <Button>
                <Link href={'/aanwezigheden/wouters'}>Wouters</Link>
              </Button>
            )}
            {hasAcces('JONNGGIVERS') && (
              <Button>
                <Link href={'/aanwezigheden/jonnggivers'}>Jonnggivers</Link>
              </Button>
            )}
            {hasAcces('GIVERS') && (
              <Button>
                <Link href={'/aanwezigheden/givers'}>Givers</Link>
              </Button>
            )}
            {hasAcces('JINS') && (
              <Button>
                <Link href={'/aanwezigheden/jins'}>Jins</Link>
              </Button>
            )}
          </SignedIn>
        </nav>
        <div className='flex items-center gap-4'>
          <SignedOut>
            <Button>
              <Link href='/sign-in'>Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button>
              <SignOutButton />
            </Button>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};

export default Navbar;
