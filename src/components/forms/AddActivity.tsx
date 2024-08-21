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
import { toast } from 'sonner';

type AddActivityProps = {
  members: MemberWithActivities[] | null;
};
const AddActivity = ({ members }: AddActivityProps) => {
  const form = useForm<z.infer<typeof addActivityValidation>>({
    resolver: zodResolver(addActivityValidation),
    defaultValues: {
      name: '',
      date: new Date(),
      members: [''],
    },
  });

  const onSubmit = async (data: z.infer<typeof addActivityValidation>) => {
    try {
      console.log(data);
      const result = await addActivity(data);
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
      form.reset({
        name: '',
        date: new Date(),
        members: [''],
      });
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    }
  };

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='max-w-prose mx-auto pb-7'>
              <FormLabel htmlFor={field.name}>Naam</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Naam van de activiteit'
                  autoFocus
                />
              </FormControl>
              <div className='w-full flex items-center justify-center gap-2'>
                <FormDescription>De naam van de activiteit</FormDescription>
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
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={'outline'}>
                      {field.value ? (
                        format(field.value, 'P', { locale: nlBE })
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
              <div className='w-full flex items-center justify-center gap-2'>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='members'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Naam</FormLabel>
              <FormControl>
                <Table className='max-w-prose mx-auto text-center border'>
                  <TableHeader className='bg-primary'>
                    <TableRow>
                      <TableHead className='flex items-center justify-center text-primary-foreground'>
                        <CheckCheck />
                      </TableHead>
                      <TableHead className='text-center text-primary-foreground'>
                        Naam
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members
                      ?.sort((a, b) => a.firstName.localeCompare(b.firstName))
                      .map((member) => (
                        <TableRow key={member.id} className='cursor-pointer'>
                          <TableCell
                            onClick={() => {
                              console.log(field.value);
                              field.onChange([...field.value, member.id]);
                            }}>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            {member.firstName + ' ' + member.lastName}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </FormControl>
            </FormItem>
          )}
        />
        <span className='max-w-prose mx-auto flex justify-center gap-2 mt-5'>
          <Button
            type='reset'
            variant={'outline'}
            className='w-full'
            onClick={() =>
              form.reset({
                name: '',
                date: new Date(),
                members: [''],
              })
            }>
            Reset
          </Button>
          <Button type='submit' className='w-full'>
            Maak activiteit
          </Button>
        </span>
      </form>
    </Form>
  );
};

export default AddActivity;