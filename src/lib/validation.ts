import { Group } from '@prisma/client';
import { date, z } from 'zod';

export const addActivityValidation = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  date: date(),
  members: z.array(z.string()).min(1, 'Selecteer minstens 1 lid'),
});

export const addMemberValidation = z.object({
  firstName: z.string().min(1, 'Voornaam is verplicht'),
  lastName: z.string().min(1, 'Familienaam is verplicht'),
  group: z.nativeEnum(Group).default(Group.UNKNOWN),
});
