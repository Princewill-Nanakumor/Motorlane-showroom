import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'main' | 'section';
}

export function Container({
  children,
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return <Tag className={`container ${className}`.trim()}>{children}</Tag>;
}
