export type Link = {
  group: string;
  cover: React.ReactNode;
  acces: boolean;
  links: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
};
