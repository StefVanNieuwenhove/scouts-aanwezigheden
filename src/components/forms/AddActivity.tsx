'use client';

import { addActivity } from '@/data-acces/activities';
import { MemberWithActivities } from '@/types/member';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addActivityValidation } from '@/lib/validation';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { nlBE } from 'date-fns/locale';
import { CalendarIcon, CheckCheck } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Group } from '@prisma/client';
import { toast } from 'sonner';
import { useState } from 'react';

type AddActivityProps = {
  members: MemberWithActivities[] | null;
  group: Group;
};
const AddActivity = ({ members, group }: AddActivityProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof addActivityValidation>>({
    resolver: zodResolver(addActivityValidation),
    defaultValues: {
      name: '',
      date: new Date(),
      members: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof addActivityValidation>) => {
    try {
      setLoading(true);
      const result = await addActivity({ ...data, group });
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    } finally {
      form.reset({
        name: '',
        date: new Date(),
        members: [],
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='pb-10'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='max-w-prose mx-auto pb-7'>
              <FormLabel htmlFor={field.name}>Naam vergadering</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Naam van de activiteit'
                  autoFocus
                />
              </FormControl>
              <div className='w-full flex items-center justify-between gap-2'>
                <FormDescription
                  className={`text-xs ${
                    form.formState.errors.name ? 'text-red-500' : ''
                  }`}>
                  De naam van de activiteit
                </FormDescription>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col max-w-prose mx-auto pb-7'>
              <FormLabel>Datum vergadering</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={'outline'}>
                      {field.value ? (
                        format(field.value, 'dd/MM/yyyy', { locale: nlBE })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className='w-full flex items-center justify-between gap-2'>
                <FormDescription
                  className={`text-xs ${
                    form.formState.errors.name ? 'text-red-500' : ''
                  }`}>
                  De datum van de activiteit
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='members'
          render={({ field }) => (
            <FormItem className='max-w-prose mx-auto h-[300px] overflow-y-scroll'>
              <div className='flex justify-between items-center'>
                <FormLabel htmlFor={field.name}>Leden</FormLabel>
                <p className='text-xs text-gray-400'>
                  Selecteerd de leden die aanwezig zijn
                </p>
              </div>
              <FormControl>
                <Table className='mx-auto border dark:border-none'>
                  <TableHeader className='bg-primary'>
                    <TableRow>
                      <TableHead className='flex items-center justify-center text-white dark:text-white'>
                        <CheckCheck />
                      </TableHead>
                      <TableHead className='text-center text-white dark:text-white'>
                        Naam
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members
                      ?.sort((a, b) => a.firstName.localeCompare(b.firstName))
                      .map((member) => (
                        <TableRow
                          key={member.id}
                          className='cursor-pointer text-center'>
                          <TableCell>
                            <Checkbox
                              checked={field.value.includes(member.id)}
                              onCheckedChange={(isChecked) => {
                                if (isChecked) {
                                  field.onChange([...field.value, member.id]);
                                } else {
                                  field.onChange(
                                    field.value.filter((id) => id !== member.id)
                                  );
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {member.firstName + ' ' + member.lastName}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </FormControl>
              <div className='w-full flex items-center justify-between gap-2'>
                <FormDescription
                  className={`text-xs ${
                    form.formState.errors.name ? 'text-red-500' : ''
                  }`}>
                  Selecteerd de leden die aanwezig zijn
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <span className='max-w-prose mx-auto flex justify-center gap-2 mt-5'>
          <Button
            type='reset'
            variant={'outline'}
            className='w-full'
            disabled={loading}
            onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' className='w-full' disabled={loading}>
            Maak activiteit
          </Button>
        </span>
      </form>
    </Form>
  );
};

export default AddActivity;
