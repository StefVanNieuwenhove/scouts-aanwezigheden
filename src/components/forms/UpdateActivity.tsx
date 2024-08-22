'use client';

import { Member } from '@prisma/client';
import { Card, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeftRight, ArrowRightLeft } from 'lucide-react';
import {
  updateActivityMemberAbsent,
  updateActivityMemberPresent,
} from '@/data-acces/activities';
import { toast } from 'sonner';

type UpdateActivityProps = {
  membersPresent: Member[];
  membersAbsent: Member[];
  activity: string;
};

const UpdateActivity = ({
  membersPresent,
  membersAbsent,
  activity,
}: UpdateActivityProps) => {
  const setMembersPresent = async (member: string) => {
    try {
      const result = await updateActivityMemberPresent(activity, member);
      if (result.status === 'success') {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    }
  };

  const setMembersAbsent = async (member: string) => {
    try {
      const result = await updateActivityMemberAbsent(activity, member);
      if (result.status === 'success') {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    }
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h3 className='text-xl font-bold text-center underline'>Aanwezig</h3>
          <ul className='flex flex-col gap-1 w-full overflow-x-scroll'>
            {membersPresent.length ? (
              membersPresent
                .sort((a, b) => a.firstName.localeCompare(b.firstName))
                .map((member) => (
                  <li key={member.id} className='w-full'>
                    <Card className='min-w-full cursor-pointer hover:underline bg-primary'>
                      <CardHeader className='flex flex-row items-center justify-between text-white'>
                        <h3>
                          {member.firstName} {member.lastName}
                        </h3>
                        <Button
                          className='hover:border rounded-full'
                          size={'icon'}
                          onClick={() => setMembersAbsent(member.id)}>
                          <ArrowRightLeft className='w-4 h-4' />
                        </Button>
                      </CardHeader>
                    </Card>
                  </li>
                ))
            ) : (
              <li className='w-full'>
                <Card className='min-w-full cursor-pointer hover:underline'>
                  <CardHeader className='flex flex-row items-center justify-between text-center'>
                    <p>Geen lid aanwezig voor deze vergadering</p>
                  </CardHeader>
                </Card>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className='text-xl font-bold text-center underline'>Afwezig</h3>
          <ul className='flex flex-col gap-1 w-full overflow-x-scroll'>
            {membersAbsent.length ? (
              membersAbsent
                .sort((a, b) => b.firstName.localeCompare(a.firstName))
                .map((member) => (
                  <li key={member.id} className='w-full '>
                    <Card className='min-w-full cursor-pointer bg-destructive hover:underline'>
                      <CardHeader className='flex flex-row items-center justify-between text-white'>
                        <p>
                          {member.firstName} {member.lastName}
                        </p>
                        <Button
                          variant={'destructive'}
                          className='hover:border rounded-full'
                          size={'icon'}
                          onClick={() => setMembersPresent(member.id)}>
                          <ArrowLeftRight className='w-4 h-4' />
                        </Button>
                      </CardHeader>
                    </Card>
                  </li>
                ))
            ) : (
              <li className='w-full'>
                <Card className='min-w-full cursor-pointer hover:underline'>
                  <CardHeader className='flex flex-row items-center justify-between text-center'>
                    <p>Alle leden zijn aanwezig voor deze vergadering</p>
                  </CardHeader>
                </Card>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UpdateActivity;
