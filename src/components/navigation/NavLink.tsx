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

  const isActive = (): boolean => {
    const paths = pathname.split('/').splice(1);
    const hrefs = href.split('/').splice(1);

    if (paths.length === 1) {
      return paths[0] === hrefs[0];
    } else if (paths.length === 2) {
      return paths[0] === hrefs[0] && paths[1] === hrefs[1];
    }

    return false;
  };
  return (
    <Button
      variant={isActive() ? 'default' : 'outline'}
      className={isActive() ? 'underline' : ''}
      style={style}
      onClick={onClose}>
      <Link href={href}>{name}</Link>
    </Button>
  );
};

export default NavLink;
