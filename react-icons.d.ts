import { IconType } from 'react-icons';

declare module 'react-icons' {
  interface IconBaseProps extends React.SVGProps<SVGElement> {
    className?: string;
  }
}