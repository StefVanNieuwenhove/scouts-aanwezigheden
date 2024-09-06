import { NavLink } from '@/components/navigation';
import { Separator } from '@/components/ui/separator';

type LedenLayoutProps = {
  children: React.ReactNode;
};

const LedenLayout = async ({ children }: LedenLayoutProps) => {
  return (
    <main className='container mx-auto my-1 w-full overflow-x-scroll'>
      <nav className='w-full flex justify-center gap-1 md:gap-4 items-center border-gray-200 py-4'>
        <NavLink name='Overzicht' href='/leden' />
        <NavLink name='CSV file' href='/leden/csv' />
        <NavLink name='Form' href='/leden/form' />
      </nav>
      <Separator className='mb-5' />
      <section>{children}</section>
    </main>
  );
};

export default LedenLayout;
