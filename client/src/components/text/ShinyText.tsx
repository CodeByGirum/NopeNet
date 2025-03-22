import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function ShinyText({ 
  children, 
  className, 
  as: Component = 'span' 
}: ShinyTextProps) {
  return (
    <Component
      className={cn(
        "inline-block relative text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-lime animate-shimmer",
        className
      )}
      style={{ backgroundSize: '200% 100%' }}
    >
      {children}
    </Component>
  );
}
