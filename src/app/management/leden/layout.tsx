type LedenLayoutProps = {
  children: React.ReactNode;
};

const LedenLayout = async ({ children }: LedenLayoutProps) => {
  return (
    <main className='container mx-auto my-1 w-full overflow-x-scroll'>
      {children}
    </main>
  );
};

export default LedenLayout;
