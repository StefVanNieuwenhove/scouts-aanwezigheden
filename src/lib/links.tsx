import { Link } from '@/types/links';
import {
  CalendarPlus,
  CalendarCog,
  ChevronDown,
  List,
  UserRoundPlus,
  ChartLine,
} from 'lucide-react';
import {
  GiDutchBike,
  GiJesterHat,
  GiMorgueFeet,
  GiLightBackpack,
  GiKite,
  GiPerson,
  GiPineTree,
} from 'react-icons/gi';
import { FiActivity } from 'react-icons/fi';
import { hasAcces, getUserRole } from '@/lib/auth';

export async function GroupLinks(): Promise<Link[]> {
  const role = await getUserRole();
  return [
    {
      group: 'Kapoenen',
      cover: <GiJesterHat size={20} />,
      acces: hasAcces(role, 'KAPOENEN'),
      links: [
        {
          name: 'Overzicht',
          href: '/aanwezigheden/kapoenen',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe vergaring',
          href: '/aanwezigheden/kapoenen/create',
          icon: <CalendarPlus size={16} />,
        },
        {
          name: 'Update vergaringen',
          href: '/aanwezigheden/kapoenen/update',
          icon: <CalendarCog size={16} />,
        },
      ],
    },
    {
      group: 'Wouters',
      cover: <GiKite size={20} />,
      acces: hasAcces(role, 'WOUTERS'),
      links: [
        {
          name: 'Overzicht',
          href: '/aanwezigheden/wouters',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe vergaring',
          href: '/aanwezigheden/wouters/create',
          icon: <CalendarPlus size={16} />,
        },
        {
          name: 'Update vergaringen',
          href: '/aanwezigheden/wouters/update',
          icon: <CalendarCog size={16} />,
        },
      ],
    },
    {
      group: 'Jonggivers',
      cover: <GiLightBackpack size={20} />,
      acces: hasAcces(role, 'JONGGIVERS'),
      links: [
        {
          name: 'Overzicht',
          href: '/aanwezigheden/jonggivers',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe vergaring',
          href: '/aanwezigheden/jonggivers/create',
          icon: <CalendarPlus size={16} />,
        },
        {
          name: 'Update vergaringen',
          href: '/aanwezigheden/jonggivers/update',
          icon: <CalendarCog size={16} />,
        },
      ],
    },
    {
      group: 'Givers',
      cover: <GiDutchBike size={20} />,
      acces: hasAcces(role, 'GIVERS'),
      links: [
        {
          name: 'Overzicht',
          href: '/aanwezigheden/givers',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe vergaring',
          href: '/aanwezigheden/givers/create',
          icon: <CalendarPlus size={16} />,
        },
        {
          name: 'Update vergaringen',
          href: '/aanwezigheden/givers/update',
          icon: <CalendarCog size={16} />,
        },
      ],
    },
    {
      group: 'Jins',
      cover: <GiMorgueFeet size={20} />,
      acces: hasAcces(role, 'JINS'),
      links: [
        {
          name: 'Overzicht',
          href: '/aanwezigheden/jins',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe vergaring',
          href: '/aanwezigheden/jins/create',
          icon: <CalendarPlus size={16} />,
        },
        {
          name: 'Update vergaringen',
          href: '/aanwezigheden/jins/update',
          icon: <CalendarCog size={16} />,
        },
      ],
    },
  ];
}

function BeheerLinks(): Link[] {
  return [
    {
      group: 'Leden',
      cover: <GiPerson size={20} />,
      acces: true,
      links: [
        {
          name: 'Overzicht',
          href: '/management/leden',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe leden',
          href: '/management/leden/create',
          icon: <UserRoundPlus size={16} />,
        },
      ],
    },
    {
      group: 'Vergaderingen',
      cover: <FiActivity size={20} />,
      acces: true,
      links: [
        {
          name: 'Overzicht',
          href: '/management/vergaderingen',
          icon: <List size={16} />,
        },
        {
          name: 'Statistieken',
          href: '/management/vergaderingen/statistics',
          icon: <ChartLine size={16} />,
        },
      ],
    },
    {
      group: 'Leiding',
      cover: <GiPineTree size={20} />,
      acces: true,
      links: [
        {
          name: 'Overzicht',
          href: '/management/leiding',
          icon: <List size={16} />,
        },
        {
          name: 'Nieuwe leiding',
          href: '/management/leiding/create',
          icon: <UserRoundPlus size={16} />,
        },
      ],
    },
  ];
}

export { BeheerLinks };
