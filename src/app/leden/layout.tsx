import { NavLink } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type LedenLayoutProps = {
  children: React.ReactNode;
};

const LedenLayout = async ({ children }: LedenLayoutProps) => {
  return (
    <main className='container mx-auto my-1 w-full overflow-x-scroll'>
      <nav className='w-full flex justify-center gap-1 md:gap-4 items-center border-gray-200 py-4'>
        <Button variant={'link'}>
          <Link href='/leden'>Overzicht</Link>
        </Button>
        <Button variant={'link'}>
          <Link href='/leden/csv'>CSV file</Link>
        </Button>
        <Button variant={'link'}>
          <Link href='/leden/form'>Form</Link>
        </Button>
      </nav>
      <Separator className='mb-5' />
      <section>{children}</section>
    </main>
  );
};

export default LedenLayout;
