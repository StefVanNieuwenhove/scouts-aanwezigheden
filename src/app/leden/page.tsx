//'use client';

import { Table } from '@/components/ui/table';
import { getMembers } from '@/data-acces/members';

const LedenOverzichtPage = async () => {
  const members = await getMembers();

  return (
    <>
      <Table></Table>
    </>
  );
};

export default LedenOverzichtPage;
