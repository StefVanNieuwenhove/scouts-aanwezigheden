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
import { SignedIn } from '@clerk/nextjs';
import { Roles } from '@/types/role';

type DrawerProps = {
  role: Roles;
};

const Drawer = ({ role }: DrawerProps) => {
  const hasAcces = (access: Roles) => {
    if (role === 'ADMIN' || role === 'GROEPSLEIDING') return true;
    if (role === access) {
      return true;
    }
    return false;
  };
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
          <SheetTitle>Welcome to Daily Planner !</SheetTitle>
          <Separator />
          <SheetDescription className='flex flex-col gap-2 text-left'>
            <SignedIn>
              <Button variant={'link'} onClick={() => setOpen(false)}>
                <Link href={'/'}>Overzicht</Link>
              </Button>
              {hasAcces('KAPOENEN') && (
                <Button variant={'link'} onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/kapoenen'}>Kapoenen</Link>
                </Button>
              )}
              {hasAcces('WOUTERS') && (
                <Button variant={'link'} onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/wouters'}>Wouters</Link>
                </Button>
              )}
              {hasAcces('JONGGIVERS') && (
                <Button variant={'link'} onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/jonnggivers'}>Jonnggivers</Link>
                </Button>
              )}
              {hasAcces('GIVERS') && (
                <Button variant={'link'} onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/givers'}>Givers</Link>
                </Button>
              )}
              {hasAcces('JINS') && (
                <Button variant={'link'} onClick={() => setOpen(false)}>
                  <Link href={'/aanwezigheden/jins'}>Jins</Link>
                </Button>
              )}
              {hasAcces('ADMIN') && (
                <Button variant={'link'} onClick={() => setOpen(false)}>
                  <Link href={'/leden'}>Leden</Link>
                </Button>
              )}
            </SignedIn>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
