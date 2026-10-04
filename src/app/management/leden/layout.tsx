type LedenLayoutProps = {
  children: React.ReactNode;
};

const LedenLayout = async ({ children }: LedenLayoutProps) => {
  const 
  return (
    <section className='container mx-auto my-1 w-full overflow-x-scroll'>
      {children}
    </section>
  );
};

export default LedenLayout;
