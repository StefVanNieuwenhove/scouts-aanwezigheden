import React from 'react';

const ManagementLeidingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className='container mx-auto w-full h-fit  mt-1'>
      {children}
    </section>
  );
};

export default ManagementLeidingLayout;
