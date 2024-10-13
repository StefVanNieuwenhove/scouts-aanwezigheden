'use client';

import { editActivity } from '@/data-acces/activities';
import { editActivityValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { CalendarIcon, Edit } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { nlBE } from 'date-fns/locale';
import { format, set } from 'date-fns';

type EditActivityProps = {
  activity: Activity;
  redirect: string;
};

const EditActivity = ({ activity, redirect }: EditActivityProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof editActivityValidation>>({
    resolver: zodResolver(editActivityValidation),
    defaultValues: {
      name: activity.name,
      date: activity.date,
    },
  });

  const onSubmit = async (data: z.infer<typeof editActivityValidation>) => {
    try {
      setLoading(true);
      const { name, date } = data;
      const result = await editActivity(activity.id, name, date, redirect);
      if (result.status === 'error') {
        toast.error(result.message, {
          duration: 5000,
          richColors: true,
        });
      } else {
        toast.success(result.message, { duration: 5000, richColors: true });
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden', {
        duration: 5000,
        richColors: true,
      });
    } finally {
      form.reset();
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant='outline' size={'icon'}>
            <Edit className='w-4 h-4' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bewerk activiteit: {activity.name}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bewerk de naam en datum van de activiteit
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Naam</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Naam van de activiteit' />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
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
                              format(field.value, 'dd/MM/yyyy', {
                                locale: nlBE,
                              })
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
                  </FormItem>
                )}
              />
              <div className='w-full flex items-center justify-between gap-2'>
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
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditActivity;
