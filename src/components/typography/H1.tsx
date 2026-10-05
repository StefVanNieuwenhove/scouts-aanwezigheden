import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type H1Props = PropsWithChildren<{
  className?: string;
}>;

const H1 = ({ children, className }: Readonly<H1Props>) => {
  return (
    <h1
      className={cn(
        className,
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
      )}>
      {children}
    </h1>
  );
};

export default H1;
