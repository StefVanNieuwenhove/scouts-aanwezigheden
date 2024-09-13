import { LoaderPinwheel } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <main className='container mx-auto w-full flex min-h-screen flex-col items-center my-2'>
      <LoaderPinwheel className='animate-spin' />;
    </main>
  );
};

export default loading;
