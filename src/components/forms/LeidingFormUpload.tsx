'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group } from '@prisma/client';
import { toast } from 'sonner';
import { z } from 'zod';
import { addLeidingValidation } from '@/lib/validation';
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
import { Switch } from '../ui/switch';
import { capitalize } from '@/lib/utils';
import { createUser } from '@/data-acces/users';

const LeidingFormUpload = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof addLeidingValidation>>({
    resolver: zodResolver(addLeidingValidation),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      group: Group.KAPOENEN,
      sendInvite: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof addLeidingValidation>) => {
    try {
      setLoading(true);
      const result = await createUser({
        firstName: capitalize(data.firstname),
        lastName: capitalize(data.lastname),
        email: data.email,
        role: data.group,
        sendInvite: data.sendInvite,
      });
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='pb-10 border rounded-md p-5 bg-white/50 dark:bg-gray-900/50 shadow-md space-y-4'>
          <FormField
            control={form.control}
            name='firstname'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto'>
                <FormLabel htmlFor={field.name}>Voornaam</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Jan' autoFocus />
                </FormControl>
                <div className='w-full flex items-center justify-between gap-2'>
                  <FormDescription
                    className={`text-xs ${
                      form.formState.errors.firstname ? 'text-red-500' : ''
                    }`}>
                    De voornaam van de leiding
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.firstname?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto'>
                <FormLabel htmlFor={field.name}>Familienaam</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Janssens' autoFocus />
                </FormControl>
                <div className='w-full flex items-center justify-between gap-2'>
                  <FormDescription
                    className={`text-xs ${
                      form.formState.errors.lastname ? 'text-red-500' : ''
                    }`}>
                    De familienaam van de leiding
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.lastname?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto'>
                <FormLabel htmlFor={field.name}>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='jan@gmail.com' autoFocus />
                </FormControl>
                <div className='w-full flex items-center justify-between gap-2'>
                  <FormDescription
                    className={`text-xs ${
                      form.formState.errors.email ? 'text-red-500' : ''
                    }`}>
                    Het e-mail adres van de leiding
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='group'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto'>
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
                    De tak van de leiding
                  </FormDescription>
                  <FormMessage>
                    {form.formState.errors.group?.message}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sendInvite'
            render={({ field }) => (
              <FormItem className='max-w-prose mx-auto'>
                <FormLabel htmlFor={field.name}>
                  Stuur een uitnodigingsmail
                </FormLabel>
                <FormDescription className='text-xs'>
                  Stuur een uitnodigingsmail naar de gebruiker
                </FormDescription>
                <FormControl>
                  <Switch
                    id={field.name}
                    className='mt-2'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className='max-w-prose mx-auto flex justify-center gap-2 mt-5'>
            <Button type='reset' variant={'outline'} className='w-full'>
              Reset
            </Button>
            <Button type='submit' className='w-full' disabled={loading}>
              Maak leiding aan
            </Button>
          </span>
        </form>
      </Form>
    </>
  );
};

export default LeidingFormUpload;
