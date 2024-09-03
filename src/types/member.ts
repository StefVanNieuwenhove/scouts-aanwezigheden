import { Activity, Member } from '@prisma/client';

export type MemberWithActivities = Member & {
  activities: Activity[];
};

export type YearOverviewChartData = {
  date: string;
  count: number;
  fill: string;
};

export type EvaluationChartData = {
  count: number;
  data: string;
  fill: string;
};
