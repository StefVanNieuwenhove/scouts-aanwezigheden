import {
  Protect,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import { getUserRole, hasAcces } from '@/lib/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import { ChevronDown } from 'lucide-react';
import { BeheerLinks, GroupLinks } from '@/lib/links';
import { Link as LinkType } from '@/types/links';
import { RxDashboard } from 'react-icons/rx';

const Navbar = async () => {
  const role = await getUserRole();
  const takLinks = await GroupLinks();
  const beheerLinks: LinkType[] = BeheerLinks();

  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl border-b border-primary/20'>
        <SignedIn>
          <SidebarTrigger />
          <h1>Scouts Ter Alwina - Aanwezigheden</h1>
        </SignedIn>
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
                      ),
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
              <UserButton />
            </Button>
          </SidebarFooter>
        </Sidebar>
      </SignedIn>
    </>
  );
};

export default Navbar;
