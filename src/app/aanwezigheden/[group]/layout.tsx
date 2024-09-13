import { NavLink } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Group } from '@prisma/client';
import Link from 'next/link';

type AanwezigheidLayoutProps = {
  children: React.ReactNode;
  params: { group: Group };
};

const AanwezighedenLayout = ({ children, params }: AanwezigheidLayoutProps) => {
  return (
    <>
      <main className='container mx-auto w-full overflow-x-scroll mt-1'>
        <nav className='w-full flex flex-col md:flex-row justify-center gap-1 md:gap-4 items-center border-gray-200 py-4'>
          <Button variant={'link'}>
            <Link href={`/aanwezigheden/${params.group}`}>Overzicht</Link>
          </Button>
          <Button variant={'link'}>
            <Link href={`/aanwezigheden/${params.group}/create`}>
              Nieuwe vergadering
            </Link>
          </Button>
          <Button variant={'link'}>
            <Link href={`/aanwezigheden/${params.group}/update`}>
              Bewerk vergaderingen
            </Link>
          </Button>
        </nav>
        <Separator className='mb-5' />
        {children}
      </main>
    </>
  );
};

export default AanwezighedenLayout;
