'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChangeEvent, useState } from 'react';

const MemberFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

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
          <Button variant='default'>Upload</Button>
        </div>
        <p className='text-sm text-gray-500 ml-5'>
          Upload bestand met gebruikers en groepen
        </p>
      </div>
    </>
  );
};

export default MemberFileUpload;
