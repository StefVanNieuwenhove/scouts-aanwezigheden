import { getActivitiesByGroup } from '@/data-acces/activities';
import { Group } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { DeleteActivityButton } from '@/components/layout';
import { EditActivity } from '@/components/forms';

type AanwezighedenUpdateLayoutPageProps = {
  children: React.ReactNode;
  params: { group: Group };
};

const AanwezighedenUpdateLayoutPage = async ({
  children,
  params,
}: AanwezighedenUpdateLayoutPageProps) => {
  const activities = await getActivitiesByGroup(
    params.group.toUpperCase() as Group
  );
  return (
    <>
      <span className='text-sx text-gray-500'>
        Scroll om andere activiteiten te zien
      </span>
      <ul className='w-full flex gap-1 overflow-scroll'>
        {activities.length ? (
          activities
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((activity) => (
              <li key={activity.id}>
                <Card className='w-full hover:bg-gray-100'>
                  <CardHeader className='w-full'>
                    <CardTitle className='text-xl font-bold hover:underline w-full truncate'>
                      <Link
                        className='capitalize'
                        href={`/aanwezigheden/${params.group}/update/${activity.id}`}>
                        {activity.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Datum: {activity.date.toLocaleDateString('nl-BE')}
                    </CardDescription>
                    <CardDescription>
                      Aanwezigen: {activity.members.length}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className='flex justify-end space-x-1 pb-2'>
                    <EditActivity
                      activity={activity}
                      redirect={`/aanwezigheden/${params.group}/update`}
                    />
                    <DeleteActivityButton
                      activity={activity}
                      redirect={`/aanwezigheden/${params.group}/update`}
                    />
                  </CardFooter>
                </Card>
              </li>
            ))
        ) : (
          <li>Geen activiteiten gevonden</li>
        )}
      </ul>
      <Separator className='my-1' />
      {children}
    </>
  );
};

export default AanwezighedenUpdateLayoutPage;
