import { Skeleton } from '../ui/skeleton';

const TableLoader = () => {
  return (
    <div className='flex flex-col gap-4 w-full mt-10'>
      <div className='grid grid-cols-3 gap-4'>
        <Skeleton className='h-4' />
        <Skeleton className='h-4' />
        <Skeleton className='h-4' />
      </div>
      <Skeleton className='h-4' />
      <Skeleton className='h-4' />
      <Skeleton className='h-4' />
      <Skeleton className='h-4' />
      <Skeleton className='h-4' />
    </div>
  );
};

export default TableLoader;
