'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

type NavLinkProps = {
  href: string;
  name: string;
};

const NavLink = ({ href, name }: NavLinkProps) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button onClick={() => toggleSidebar()}>
      <Link href={href}>{name}</Link>
    </Button>
  );
};

export default NavLink;
