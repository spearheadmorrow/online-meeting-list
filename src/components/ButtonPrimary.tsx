import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import {
  LinkIcon,
  EmailIcon,
  PhoneIcon,
  CloseIcon,
  ViewIcon
} from '@chakra-ui/icons';

export type ButtonPrimaryProps = {
  icon: 'link' | 'email' | 'phone' | 'small-close' | 'video';
  onClick: () => void;
  text: string;
  title?: string;
};

export function ButtonPrimary({
  icon,
  text,
  title,
  onClick
}: ButtonPrimaryProps) {
  return (
    <Button
      bg="blue.600"
      color="white"
      onClick={onClick}
      title={title}
      _hover={{ bg: 'blue.800' }}
    >
      {icon === 'link' && <LinkIcon mr={2} />}
      {icon === 'email' && <EmailIcon mr={2} />}
      {icon === 'phone' && <PhoneIcon mr={2} />}
      {icon === 'small-close' && <CloseIcon mr={2} />}
      {icon === 'video' && <ViewIcon mr={2} />}
      {text}
    </Button>
  );
}
