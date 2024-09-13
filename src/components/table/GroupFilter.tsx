import React from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type GroupFilterProps = {
  onChange: (value: string) => void;
};

const GroupFilter = ({ onChange }: GroupFilterProps) => {
  return (
    <>
      <Label>Tak</Label>
      <Select onValueChange={onChange} defaultValue='all'>
        <SelectTrigger>
          <SelectValue placeholder='Kies een tak' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Alle takken</SelectItem>
          <SelectItem value='kapoenen'>Kapoenen</SelectItem>
          <SelectItem value='wouters'>Wouters</SelectItem>
          <SelectItem value='jonggivers'>Jonggivers</SelectItem>
          <SelectItem value='givers'>Givers</SelectItem>
          <SelectItem value='jins'>Jins</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default GroupFilter;
