import { date, z } from 'zod';

export const addActivityValidation = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  date: date(),
  members: z.array(z.string()).min(1, 'Selecteer minstens 1 lid'),
});
