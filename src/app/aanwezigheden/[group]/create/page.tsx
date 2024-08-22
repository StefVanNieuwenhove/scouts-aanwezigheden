import { Group } from '@prisma/client';
import { AddActivity } from '@/components/forms';
import { getMembersByGroup } from '@/data-acces/members';

type AanwezighedenCreatePageProps = {
  params: { group: Group };
};

const AanwezighedenCreatePage = async ({
  params,
}: AanwezighedenCreatePageProps) => {
  const members = await getMembersByGroup(
    params.group.toUpperCase() as Group,
    false
  );

  return (
    <AddActivity
      members={members}
      group={params.group.toUpperCase() as Group}
    />
  );
};

export default AanwezighedenCreatePage;
