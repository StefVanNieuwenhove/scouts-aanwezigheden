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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { CalendarPlus, CalendarSync, ChevronDown, List } from 'lucide-react';
import {
  GiDutchBike,
  GiJesterHat,
  GiMorgueFeet,
  GiLightBackpack,
  GiKite,
} from 'react-icons/gi';
import { BeheerLinks, GroupLinks } from '@/lib/links';
import { Link as LinkType } from '@/types/links';
import { RxDashboard } from 'react-icons/rx';

const Navbar = async () => {
  const role = await getUserRole();
  const takLinks = await GroupLinks();
  const beheerLinks: LinkType[] = BeheerLinks();

  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl border border-b'>
        <SignedIn>
          <SidebarTrigger />
        </SignedIn>
        <h1>Scouts Ter Alwina - Aanwezigheden</h1>
      </header>
      <SignedIn>
        <Sidebar className='pt-16' variant='sidebar' collapsible='icon'>
          <SidebarContent>
            <SidebarMenu className='w-full'>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/'}>
                    <RxDashboard className='ml-2' />
                    <span> Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <Protect>
              <SidebarGroup>
                <SidebarGroupLabel>Tak</SidebarGroupLabel>
                <SidebarGroupContent className='flex flex-col gap-2'>
                  {takLinks.map(
                    (link) =>
                      link.acces && (
                        <SidebarMenu key={link.group} className='w-full'>
                          <Collapsible className={`group/${link.group}`}>
                            <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                  {link.cover}
                                  {link.group}
                                  <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                                </SidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {link.links.map((sublink) => (
                                    <SidebarMenuSubItem key={sublink.href}>
                                      <SidebarMenuSubButton asChild>
                                        <Link href={sublink.href}>
                                          {sublink.icon}
                                          <span>{sublink.name}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuItem>
                          </Collapsible>
                        </SidebarMenu>
                      )
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            </Protect>
            <Protect condition={() => hasAcces(role, 'GROEPSLEIDING')}>
              <SidebarGroup>
                <SidebarGroupLabel>Beheer</SidebarGroupLabel>
                <SidebarGroupContent className='flex flex-col gap-2'>
                  {beheerLinks.map((link) => (
                    <SidebarMenu key={link.group} className='w-full'>
                      <Collapsible className={`group/${link.group}`}>
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {link.cover}
                              {link.group}
                              <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {link.links.map((sublink) => (
                                <SidebarMenuSubItem key={sublink.href}>
                                  <SidebarMenuSubButton asChild>
                                    <Link href={sublink.href}>
                                      {sublink.icon}
                                      <span>{sublink.name}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    </SidebarMenu>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </Protect>
          </SidebarContent>
          <SidebarFooter className='border-t'>
            <Button variant='link' className='w-full mb-2'>
              <UserButton showName appearance={{}} />
            </Button>
          </SidebarFooter>
        </Sidebar>
      </SignedIn>
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
