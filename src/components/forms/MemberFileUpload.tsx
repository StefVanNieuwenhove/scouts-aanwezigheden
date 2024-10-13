'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChangeEvent, useState } from 'react';
import { uploadMembersByFile } from '@/data-acces/members';
import { capitalize, capitalizeFirstLetter, convertToGroup } from '@/lib/utils';
import { toast } from 'sonner';

const MemberFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileUpload = async () => {
    try {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsText(file, 'UTF-8');
        fileReader.onload = async (e) => {
          const content = e.target?.result as string;
          const rows = content?.toLowerCase().split('\n');
          // console.log(rows);

          // delete first row
          rows.shift();

          if (rows) {
            const members = rows.map(async (row) => {
              const [firstName, lastName, group] = row.split(';');
              return {
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                group: convertToGroup(group.trim().toString()),
              };
            });

            const result = await Promise.all(members);
            const response = await uploadMembersByFile(result);
            if (response.status === 'success') {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
          }
        };
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Label htmlFor='file-upload'>Upload bestand</Label>
        <div className='flex gap-2'>
          <Input
            type='file'
            id='file-upload'
            accept='.csv'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                setFile(file);
              }
            }}
          />
          <Button variant='default' onClick={onFileUpload} disabled={loading}>
            Upload
          </Button>
        </div>
        <p className='text-sm text-gray-500 ml-5'>
          Upload bestand met gebruikers en groepen
        </p>
      </div>
    </>
  );
};

export default MemberFileUpload;
