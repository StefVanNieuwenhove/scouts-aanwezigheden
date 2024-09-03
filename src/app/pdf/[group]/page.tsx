import { EvaluationMembersPdf } from '@/components/pdf';
import { getActivitiesByGroup } from '@/data-acces/activities';
import { getMembersByGroup } from '@/data-acces/members';
import { Group } from '@prisma/client';

type PdfGroupPageProps = {
  params: {
    group: string;
  };
};

const PdfGroupPage = async ({ params }: PdfGroupPageProps) => {
  const activities = await getActivitiesByGroup(
    params.group.toUpperCase() as Group
  );
  const members = await getMembersByGroup(params.group.toUpperCase() as Group);

  const membersAbove50 = members?.filter(
    (member) => member.activities.length >= activities.length / 2
  );
  const membersBelow50 = members?.filter(
    (member) => member.activities.length < activities.length / 2
  );
  return (
    <>
      <main className='container mx-auto w-full h-screen'>
        <EvaluationMembersPdf
          title={`Overzicht 50% regel ${params.group}`}
          membersAbove={membersAbove50}
          membersBelow={membersBelow50}
        />
      </main>
    </>
  );
};

export default PdfGroupPage;
