import {
  YearOverviewChartData,
  MemberWithActivities,
  EvaluationChartData,
} from '@/types/member';
import { Group } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { getActivitiesByGroup } from '@/data-acces/activities';
import { Separator } from '../ui/separator';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { YearOverviewChart, EvaluationChart } from '../charts';
import { ChartConfig } from '../ui/chart';
import { nlBE, th } from 'date-fns/locale';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { FileText } from 'lucide-react';
import Link from 'next/link';

type OverviewCardProps = {
  group: Group;
  members: MemberWithActivities[] | undefined;
};

const OverviewMembers = async ({ members, group }: OverviewCardProps) => {
  const activities = await getActivitiesByGroup(group);

  const membersAbove50 = members?.filter(
    (member) => member.activities.length >= activities.length / 2
  );
  const membersBelow50 = members?.filter(
    (member) => member.activities.length < activities.length / 2
  );

  const evaluationChartData: EvaluationChartData[] = [
    {
      data: 'Aanwezig',
      count: membersAbove50?.length ?? 0,
      fill: 'hsl(var(--primary))',
    },
    {
      data: 'Afwezig',
      count: membersBelow50?.length ?? 0,
      fill: 'hsl(var(--destructive))',
    },
  ];

  const evaluationChartConfig: ChartConfig = {
    count: {
      label: 'Aantal leden',
    },
    Aanwezig: {
      label: 'Mee op kamp',
    },
    Afwezig: {
      label: 'Niet mee op kamp',
    },
  } satisfies ChartConfig;

  const yearOverviewChartData: YearOverviewChartData[] = activities.map(
    (activity) => {
      return {
        date: activity.name,
        count: activity.members.length,
        fill: 'hsl(var(--primary))',
      };
    }
  );

  const yearOverviewChartConfig: ChartConfig = {
    count: {
      label: 'Aantal leden per vergadering',
    },
    date: {
      label: 'Datum',
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className='w-full h-full'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-xl underline'>{group}</CardTitle>
            <Button variant={'ghost'} size={'icon'}>
              <Link href={`/pdf/${group.toLowerCase()}`}>
                <FileText />
              </Link>
            </Button>
          </div>
          <CardDescription>
            <>{members ? members.length : '-'} leden</>
            <br />
            <>{activities.length ? activities.length : '0'} vergaderingen</>
          </CardDescription>

          <Separator />
        </CardHeader>
        <CardContent className='min-h-[300px]'>
          <h4 className='text-xl text-center underline pb-2'>
            overzicht aanwezigheden
          </h4>
          <Tabs defaultValue='evaluation' className='w-full'>
            <TabsList className='w-full'>
              <TabsTrigger value='evaluation' className='w-full'>
                50%
              </TabsTrigger>
              <TabsTrigger value='year' className='w-full'>
                Jaar overzicht
              </TabsTrigger>
            </TabsList>
            <TabsContent value='evaluation' className='pt-2'>
              {activities.length ? (
                <EvaluationChart
                  data={evaluationChartData}
                  config={evaluationChartConfig}
                />
              ) : (
                <p>
                  Geen data te tonen, maak vergaderingen aan om resultaat te
                  bekijken
                </p>
              )}
            </TabsContent>
            <TabsContent value='year' className='pt-2'>
              {activities.length ? (
                <YearOverviewChart
                  data={yearOverviewChartData}
                  config={yearOverviewChartConfig}
                />
              ) : (
                <p>
                  Geen data te tonen, maak vergaderingen aan om resultaat te
                  bekijken
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewMembers;
