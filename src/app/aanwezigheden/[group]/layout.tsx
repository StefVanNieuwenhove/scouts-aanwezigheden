import { NavLink } from '@/components/navigation';
import { Separator } from '@/components/ui/separator';
import { Group } from '@prisma/client';

type AanwezigheidLayoutProps = {
  children: React.ReactNode;
  params: { group: Group };
};

const AanwezighedenLayout = ({ children, params }: AanwezigheidLayoutProps) => {
  return (
    <>
      <main className='container mx-auto w-full overflow-x-scroll mt-1'>
        <nav className='w-full flex flex-col md:flex-row justify-center gap-1 md:gap-4 items-center border-gray-200 py-4'>
          <NavLink name='Overzicht' href={`/aanwezigheden/${params.group}`} />
          <NavLink
            name='Nieuwe vergadering'
            href={`/aanwezigheden/${params.group}/create`}
          />
          <NavLink
            name='Bewerk vergaderingen'
            href={`/aanwezigheden/${params.group}/update`}
          />
        </nav>
        <Separator className='mb-5' />
        {children}
      </main>
    </>
  );
};

export default AanwezighedenLayout;
