'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  name: string;
  onClose?: () => void;
  fullWidth?: boolean;
};

const NavLink = ({ href, name, onClose, fullWidth }: NavLinkProps) => {
  const pathname = usePathname();

  const style = {
    width: fullWidth ? '100%' : 'auto',
  };
  return (
    <Button
      variant={pathname === href ? 'default' : 'outline'}
      className={` ${pathname === href ? 'underline' : ''}`}
      style={style}
      onClick={onClose}>
      <Link href={href}>{name}</Link>
    </Button>
  );
};

export default NavLink;
