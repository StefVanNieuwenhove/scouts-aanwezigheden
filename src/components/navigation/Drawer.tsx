'use client';

import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import {
  Protect,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { Roles } from '@/types/role';
import { ThemeToggle } from '../ui/theme-toggle';
import { hasAcces } from '@/lib/auth';

type DrawerProps = {
  role: Roles;
};

const Drawer = ({ role }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button variant={'ghost'}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle className='text-xl text-center uppercase'>
            Scouts aanwezigheden
          </SheetTitle>
          <Separator />
          <SheetDescription className='flex flex-col gap-2 items-start'>
            <SignedIn>
              <Button
                variant={'outline'}
                className='w-full'
                onClick={() => setOpen(false)}>
                <Link href={'/'}>Overzicht</Link>
              </Button>
              <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
                <Button
                  variant={'outline'}
                  className='w-full'
                  onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/kapoenen'}>Kapoenen</Link>
                </Button>
              </Protect>
              <Protect condition={() => hasAcces(role, 'WOUTERS')}>
                <Button
                  variant={'outline'}
                  className='w-full'
                  onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/wouters'}>Wouters</Link>
                </Button>
              </Protect>
              <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
                <Button
                  variant={'outline'}
                  className='w-full'
                  onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/jonnggivers'}>Jonnggivers</Link>
                </Button>
              </Protect>
              <Protect condition={() => hasAcces(role, 'GIVERS')}>
                <Button
                  variant={'outline'}
                  className='w-full'
                  onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/givers'}>Givers</Link>
                </Button>
              </Protect>
              <Protect condition={() => hasAcces(role, 'JINS')}>
                <Button
                  variant={'outline'}
                  className='w-full'
                  onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/jins'}>Jins</Link>
                </Button>
              </Protect>
              <Protect condition={() => hasAcces(role, 'ADMIN')}>
                <Button
                  variant={'outline'}
                  className='w-full'
                  onClick={() => setOpen(false)}>
                  <Link href={'/leden'}>Leden</Link>
                </Button>
              </Protect>
              <Separator />
            </SignedIn>
            <SignedOut>
              <Button variant={'outline'} className='w-full'>
                <Link href='/sign-in'>Sign in</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button className='w-full'>
                <SignOutButton />
              </Button>
            </SignedIn>
            <Separator />
            <div className='w-full flex justify-center items-center gap-2'>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <ThemeToggle />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
