import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  to?: string;
  animated?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export default function GradientText({ 
  children, 
  className, 
  from = "from-neon-green", 
  to = "to-neon-yellow", 
  animated = true,
  as: Component = 'span' 
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        to,
        animated && "animate-gradient-x",
        className
      )}
    >
      {children}
    </Component>
  );
}
