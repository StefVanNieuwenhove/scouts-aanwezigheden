'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

type NavLinkProps = {
  href: string;
  name: string;
  fullWidth?: boolean;
  isActive: boolean;
};

const NavLink = ({ href, name, fullWidth, isActive = false }: NavLinkProps) => {
  const { toggleSidebar } = useSidebar();
  const style = {
    width: fullWidth ? '100%' : 'auto',
  };
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      className={isActive ? 'underline' : ''}
      style={style}
      onClick={() => toggleSidebar()}>
      <Link href={href}>{name}</Link>
    </Button>
  );
};

export default NavLink;
