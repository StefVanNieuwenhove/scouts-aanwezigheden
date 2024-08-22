import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { getActivitiesByGroup } from '@/data-acces/activities';
import { Group } from '@prisma/client';

type AanwezighedenUpdatePageProps = {
  params: { group: Group };
};

const AanwezighedenUpdatePage = async ({
  params,
}: AanwezighedenUpdatePageProps) => {
  return (
    <>
      <p className='text-xl text-gray-500 mt-5'>
        Geen vergadering geselecteerd. Selecteer een vergadering om te bewerken.
      </p>
    </>
  );
};

export default AanwezighedenUpdatePage;
