import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../ui/card';
import { H3, P } from '../typography';

type DefaultCardProps = {
  text: string;
  link: {
    href: string;
    text: string;
  };
};

export const DefaultCard = ({ text, link }: DefaultCardProps) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='w-full border-b'>
        <H3>Geen resultaten gevonden</H3>
      </CardHeader>
      <CardContent className='w-full py-4 flex flex-col items-center justify-center gap-2'>
        <P>{text}</P>
      </CardContent>
      <CardFooter className='w-full border-t flex justify-center py-2'>
        <Button className='w-full hover:underline'>
          <Link href={link.href}>{link.text}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DefaultCard;
