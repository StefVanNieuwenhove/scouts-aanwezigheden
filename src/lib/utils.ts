import { Roles } from '@/types/role';
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
    case 'welpen':
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

export const convertToRole = (role: string): Roles => {
  switch (role.toLowerCase()) {
    case 'kapoen':
      return 'KAPOENEN';
    case 'kabouter':
      return 'KAPOENEN';
    case 'wouters':
      return 'WOUTERS';
    case 'jonggivers':
      return 'JONGGIVERS';
    case 'jongverkenner':
      return 'JONGGIVERS';
    case 'giver':
      return 'GIVERS';
    case 'gidsen':
      return 'GIVERS';
    case 'jin':
      return 'JINS';
    case 'jins':
      return 'JINS';
    case 'groepsleiding':
      return 'GROEPSLEIDING';
    case 'admin':
      return 'ADMIN';
    default:
      return 'UNKNOWN';
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

export function generatePassword(length = 16): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()-_=+[]{}?';

  const allCharacters = lowercase + uppercase + numbers + special;

  if (length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  // Generate a cryptographically secure random number.
  const randomIndex = (max: number): number => {
    const array = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max;

    do {
      crypto.getRandomValues(array);
    } while (array[0] >= limit);

    return array[0] % max;
  };

  const pick = (characters: string) =>
    characters[randomIndex(characters.length)];

  // Guarantee all validation requirements.
  const password = [
    pick(lowercase),
    pick(uppercase),
    pick(numbers),
    pick(special),
  ];

  // Fill the remaining characters.
  while (password.length < length) {
    password.push(pick(allCharacters));
  }

  // Shuffle the password to randomize character positions.
  for (let i = password.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}
