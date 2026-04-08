'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { SignInSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { H2, P } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/Users/stefvannieuwenhove/Documents/projects/scouts-aanwezigheden/public/images/scouts.jpg';
import { useSignIn } from '@clerk/nextjs';

const SignInPage = () => {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof SignInSchema>) => {
    try {
      if (!isLoaded) return;

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Succesvol ingelogd');
        router.push('/');
      } else {
        toast.error('Fout bij inloggen, probeer opnieuw');
        form.reset();
      }
    } catch (error) {
      toast.error('Fout bij inloggen, probeer opnieuw');
      form.reset();
    }
  };
  return (
    <section className='container mx-auto w-full py-10 flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full md:max-w-prose border border-primary rounded-md px-10 py-5 space-y-5 h-fit'>
          <div className='w-full pb-2 flex flex-col items-center justify-center space-y-2 border-b border-primary'>
            <div className='w-full flex flex-col md:flex-row items-center justify-between space-y-2'>
              <Image src={logo} alt='logo' width={100} height={100} />
              <H2>Scouts Ter Alwina - Login</H2>
            </div>

            <P>Login om de vergaderingen te beheren</P>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='john.doe@gmail.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='**************'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='flex justify-end'>
                  <span className='text-primary hover:underline hover:cursor-pointer'>
                    <Link href={'/forgot-password'}>Forgot password?</Link>
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex space-x-4 pb-3'>
            <Button
              className='w-full border-primary hover:underline'
              variant={'outline'}
              type='reset'
              disabled={form.formState.isSubmitting}
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button
              className='w-full hover:underline'
              type='submit'
              disabled={form.formState.isSubmitting}>
              login
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default SignInPage;
