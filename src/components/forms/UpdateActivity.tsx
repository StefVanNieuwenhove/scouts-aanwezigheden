import { MemberWithActivities } from '@/types/member';

type UpdateActivityProps = {
  members: MemberWithActivities[] | null;
};

const UpdateActivity = ({ members }: UpdateActivityProps) => {
  return <div>updateActivity</div>;
};

export default UpdateActivity;
