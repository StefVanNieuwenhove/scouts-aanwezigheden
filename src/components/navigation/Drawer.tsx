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
import NavLink from './NavLink';

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
            <div className='flex flex-col gap-2 items-start w-full'>
              <SignedIn>
                <NavLink
                  name='Overzicht'
                  href={'/'}
                  onClose={() => setOpen(false)}
                  fullWidth
                />
                <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
                  <NavLink
                    name='Kapoenen'
                    href={'/aanwezigheden/kapoenen'}
                    onClose={() => setOpen(false)}
                    fullWidth
                  />
                </Protect>
                <Protect condition={() => hasAcces(role, 'WOUTERS')}>
                  <NavLink
                    name='Wouters'
                    href={'/aanwezigheden/wouters'}
                    onClose={() => setOpen(false)}
                    fullWidth
                  />
                </Protect>
                <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
                  <NavLink
                    name='Jonnggivers'
                    href={'/aanwezigheden/jonnggivers'}
                    onClose={() => setOpen(false)}
                    fullWidth
                  />
                </Protect>
                <Protect condition={() => hasAcces(role, 'GIVERS')}>
                  <NavLink
                    name='Givers'
                    href={'/aanwezigheden/givers'}
                    onClose={() => setOpen(false)}
                    fullWidth
                  />
                </Protect>
                <Protect condition={() => hasAcces(role, 'JINS')}>
                  <NavLink
                    name='Jins'
                    href={'/aanwezigheden/jins'}
                    onClose={() => setOpen(false)}
                    fullWidth
                  />
                </Protect>
                <Protect condition={() => hasAcces(role, 'ADMIN')}>
                  <NavLink
                    name='Leden'
                    href={'/leden'}
                    onClose={() => setOpen(false)}
                    fullWidth
                  />
                </Protect>
                <Separator />
              </SignedIn>
            </div>
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
