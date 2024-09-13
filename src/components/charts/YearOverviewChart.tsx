'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { YearOverviewChartData } from '@/types/member';

type YearOverviewChartProps = {
  data: YearOverviewChartData[];
  config: ChartConfig;
};

const YearOverviewChart = ({ data, config }: YearOverviewChartProps) => {
  return (
    <ChartContainer
      config={config}
      className='w-full aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground'>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ top: 25, left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickMargin={10}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey='count'
          tickMargin={10}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator='line' />} />
        <Line
          dataKey='count'
          stroke='hsl(var(--primary))'
          type='natural'
          name='Aantal leden'
          dot={{
            fill: 'hsl(var(--primary))',
          }}
          activeDot={{
            r: 4,
          }}>
          <LabelList
            position='top'
            offset={12}
            className='fill-foreground text-xs'
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};

export default YearOverviewChart;
