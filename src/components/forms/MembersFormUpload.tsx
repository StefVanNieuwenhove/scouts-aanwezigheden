'use client';

import { createMember } from '@/data-acces/members';
import { addMemberValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { capitalize } from '@/lib/utils';

const MembersFormUpload = () => {
  const form = useForm<z.infer<typeof addMemberValidation>>({
    resolver: zodResolver(addMemberValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      group: Group.KAPOENEN,
    },
  });

  const onSubmit = async (data: z.infer<typeof addMemberValidation>) => {
    try {
      const result = await createMember({
        firstName: capitalize(data.firstName),
        lastName: capitalize(data.lastName),
        group: data.group,
      });
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
      form.reset();
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='pb-10'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto pb-7'>
                <FormLabel htmlFor={field.name}>Voornaam</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Jan' autoFocus />
                </FormControl>
                <div className='w-full flex items-center justify-between gap-2'>
                  <FormDescription
                    className={`text-xs ${
                      form.formState.errors.firstName ? 'text-red-500' : ''
                    }`}>
                    De voornaam van het lid
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.firstName?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto pb-7'>
                <FormLabel htmlFor={field.name}>Familienaam</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Janssens' autoFocus />
                </FormControl>
                <div className='w-full flex items-center justify-between gap-2'>
                  <FormDescription
                    className={`text-xs ${
                      form.formState.errors.lastName ? 'text-red-500' : ''
                    }`}>
                    De familienaam van het lid
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.lastName?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='group'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto pb-7'>
                <FormLabel htmlFor={field.name}>Tak</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={Group.KAPOENEN}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Kies een tak' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Group.KAPOENEN}>Kapoenen</SelectItem>
                    <SelectItem value={Group.WOUTERS}>Wouters</SelectItem>
                    <SelectItem value={Group.JONGGIVERS}>Jonggivers</SelectItem>
                    <SelectItem value={Group.GIVERS}>Givers</SelectItem>
                    <SelectItem value={Group.JINS}>Jins</SelectItem>
                  </SelectContent>
                </Select>
                <div className='w-full flex items-center justify-between gap-2'>
                  <FormDescription
                    className={`text-xs ${
                      form.formState.errors.group ? 'text-red-500' : ''
                    }`}>
                    De tak van de leden
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.group?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <span className='max-w-prose mx-auto flex justify-center gap-2 mt-5'>
            <Button type='reset' variant={'outline'} className='w-full'>
              Reset
            </Button>
            <Button type='submit' className='w-full'>
              Upload
            </Button>
          </span>
        </form>
      </Form>
    </>
  );
};

export default MembersFormUpload;
