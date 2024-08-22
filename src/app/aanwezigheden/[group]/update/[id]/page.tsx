import { UpdateActivity } from '@/components/forms';
import { DeleteActivityButton } from '@/components/layout';
import { getActivityById } from '@/data-acces/activities';
import { getMembersByGroup } from '@/data-acces/members';
import { Group } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';

type AanwezighedenUpdateIdPageProps = {
  params: { group: Group; id: string };
};

const AanwezighedenUpdateIdPage = async ({
  params,
}: AanwezighedenUpdateIdPageProps) => {
  const activity = await getActivityById(params.id, true);
  const members = await getMembersByGroup(
    params.group.toUpperCase() as Group,
    false
  );

  if (!activity || !members) redirect(`/aanwezigheden/${params.group}/update`);
  return (
    <>
      <h3 className='text-xl font-bold text-center underline'>
        {activity.name}
      </h3>
      <UpdateActivity
        activity={activity.id}
        membersPresent={activity.members}
        membersAbsent={members.filter((member) => {
          return !activity.members.find(
            (activityMember) => activityMember.id === member.id
          );
        })}
      />
    </>
  );
};

export default AanwezighedenUpdateIdPage;
