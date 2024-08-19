import { date, z } from 'zod';

export const addActivityValidation = z.object({
  name: z.string().min(1),
  date: date(),
  members: z.array(z.string()).min(1),
});
