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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from '../ui/sidebar';

const Navbar = async () => {
  const role = await getUserRole();
  let nav = 'Overzicht';

  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl border border-b'>
        <SidebarTrigger />
        <h1>Scouts Ter Alwina - Aanwezigheden</h1>
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
      <Sidebar className='mt-12'>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tak</SidebarGroupLabel>
            <SidebarGroupContent className='flex flex-col gap-2'>
              <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
                <NavLink
                  name='Kapoenen'
                  href={'/aanwezigheden/kapoenen'}
                  isActive={nav === 'Kapoenen'}
                />
              </Protect>
              <Protect condition={() => hasAcces(role, 'WOUTERS')}>
                <NavLink
                  name='Wouters'
                  href={'/aanwezigheden/wouters'}
                  isActive={nav === 'Wouters'}
                />
              </Protect>
              <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
                <NavLink
                  name='Jonggivers'
                  href={'/aanwezigheden/jonggivers'}
                  isActive={nav === 'Jonggivers'}
                />
              </Protect>
              <Protect condition={() => hasAcces(role, 'GIVERS')}>
                <NavLink
                  name='Givers'
                  href={'/aanwezigheden/givers'}
                  isActive={nav === 'Givers'}
                />
              </Protect>
              <Protect condition={() => hasAcces(role, 'JINS')}>
                <NavLink
                  name='Jins'
                  href={'/aanwezigheden/jins'}
                  isActive={nav === 'Jins'}
                />
              </Protect>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Beheer</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
    </>
  );
};

export default Navbar;

{
  /* <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl border border-b'>
        <span className='flex md:hidden'>{/*  <Drawer role={role} /> </span>
        <h1 className='text-2xl font-bold text-center hidden md:flex'>
          <Link href={'/'}>Scouts aanwezigheden</Link>
        </h1>
        <nav className='hidden md:flex items-center justify-center gap-4'>
          <SignedIn>
            <NavLink
              name='Overzicht'
              href={'/'}
              isActive={nav === 'Overzicht'}
              onClick={() => (nav = 'Overzicht')}
            />
          </SignedIn>
          <Protect condition={() => hasAcces(role, 'KAPOENEN')}>
            <NavLink
              name='Kapoenen'
              href={'/aanwezigheden/kapoenen'}
              isActive={nav === 'Kapoenen'}
              onClick={() => (nav = 'Kapoenen')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'WOUTERS')}>
            <NavLink
              name='Wouters'
              href={'/aanwezigheden/wouters'}
              isActive={nav === 'Wouters'}
              onClick={() => (nav = 'Wouters')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'JONGGIVERS')}>
            <NavLink
              name='Jonggivers'
              href={'/aanwezigheden/jonggivers'}
              isActive={nav === 'Jonggivers'}
              onClick={() => (nav = 'Jonggivers')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'GIVERS')}>
            <NavLink
              name='Givers'
              href={'/aanwezigheden/givers'}
              isActive={nav === 'Givers'}
              onClick={() => (nav = 'Givers')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'JINS')}>
            <NavLink
              name='Jins'
              href={'/aanwezigheden/jins'}
              isActive={nav === 'Jins'}
              onClick={() => (nav = 'Jins')}
            />
          </Protect>
          <Protect condition={() => hasAcces(role, 'GROEPSLEIDING')}>
            <NavLink
              name='Leden'
              href={'/leden'}
              isActive={nav === 'Leden'}
              onClick={() => (nav = 'Leden')}
            /> 
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
      </header> */
}
