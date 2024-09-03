'use client';

import { EvaluationChartData } from '@/types/member';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { Pie, PieChart } from 'recharts';

type EvaluationChartProps = {
  data: EvaluationChartData[];
  config: ChartConfig;
};

const EvaluationChart = ({ data, config }: EvaluationChartProps) => {
  return (
    <>
      <ChartContainer
        config={config}
        className='mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground h-full w-full'>
        <PieChart accessibilityLayer>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Pie
            data={data}
            dataKey='count'
            nameKey='data'
            label
            innerRadius={40}
          />
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default EvaluationChart;
