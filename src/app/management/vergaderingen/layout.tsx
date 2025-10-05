import React from 'react';

const ManagementVergaderingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className='container mx-auto w-full h-fit  mt-1'>{children}</main>
  );
};

export default ManagementVergaderingLayout;
