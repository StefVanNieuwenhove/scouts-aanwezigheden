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

export const editActivityValidation = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  date: date(),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: 'Name is too short' }).trim(),
    email: z.string().email({ message: 'Invalid email' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    checkPassword: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Passwords do not match',
    path: ['checkPassword'],
  });

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ForgotPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    checkPassword: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Passwords do not match',
    path: ['checkPassword'],
  });
