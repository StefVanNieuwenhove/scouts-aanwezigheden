import { Group } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToGroup = (group: string): Group => {
  switch (group.toLowerCase()) {
    case 'kapoenen':
      return Group.KAPOENEN;
    case 'wouters':
      return Group.WOUTERS;
    case 'jonggivers':
      return Group.JONGGIVERS;
    case 'givers':
      return Group.GIVERS;
    case 'jins':
      return Group.JINS;
    default:
      return Group.UNKNOWN;
  }
};
