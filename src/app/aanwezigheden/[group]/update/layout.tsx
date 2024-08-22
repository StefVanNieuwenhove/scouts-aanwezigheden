import { getActivitiesByGroup } from '@/data-acces/activities';
import { Group } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { DeleteActivityButton } from '@/components/layout';

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
        {activities
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((activity) => (
            <li key={activity.id}>
              <Link
                href={`/aanwezigheden/${params.group}/update/${activity.id}`}>
                <Card className='w-full hover:bg-gray-100'>
                  <CardHeader className='w-full flex flex-row items-baseline justify-between gap-2'>
                    <CardTitle className='text-xl font-bold hover:underline w-full truncate'>
                      {activity.name}
                    </CardTitle>
                    <DeleteActivityButton
                      activity={activity}
                      redirect={`/aanwezigheden/${params.group}/update`}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Datum: {activity.date.toLocaleDateString()}
                    </CardDescription>
                    <CardDescription>
                      Aanwezigen: {activity.members.length}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
      </ul>
      <Separator className='my-1' />
      {children}
    </>
  );
};

export default AanwezighedenUpdateLayoutPage;
