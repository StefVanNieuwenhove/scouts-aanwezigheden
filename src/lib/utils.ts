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
    case 'kabouters/welpen':
      return Group.WOUTERS;
    case 'wouters':
      return Group.WOUTERS;
    case 'jonggivers':
      return Group.JONGGIVERS;
    case 'jonggidsen/jongverkenners':
      return Group.JONGGIVERS;
    case 'givers':
      return Group.GIVERS;
    case 'gidsen/verkenners':
      return Group.GIVERS;
    case 'jins':
      return Group.JINS;
    case 'jin':
      return Group.JINS;
    default:
      return Group.UNKNOWN;
  }
};

export const capitalize = (string: string): string => {
  console.log(string);
  if (string.includes(' ')) {
    const words = string.split(' ');
    const capitalizedWords = words.map((word) => {
      return capitalize(word);
    });
    return capitalizedWords.join(' ');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
