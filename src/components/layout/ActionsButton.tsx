import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ReactNode } from 'react';

export type ActionsButtonProps = {
  actions: {
    icon?: ReactNode;
    label: string;
    onClick: () => void;
    isDestructive?: boolean;
  }[];
};

const ActionsButton = ({ actions }: ActionsButtonProps) => {
  const handleActionClick = (action: () => void) => {
    action();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <BsThreeDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleActionClick(action.onClick)}
            className={`flex items-center gap-2 ${action.isDestructive ? 'text-destructive' : ''}`}>
            {action.icon && <span>{action.icon}</span>}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsButton;
