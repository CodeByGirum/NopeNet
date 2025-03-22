import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ASCIITextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function ASCIIText({ 
  children, 
  className, 
  as: Component = 'span' 
}: ASCIITextProps) {
  return (
    <Component
      className={cn(
        "font-orbitron tracking-wide font-bold relative text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-lime animate-shimmer",
        className
      )}
      style={{ 
        backgroundSize: '200% 100%',
        textShadow: '0 0 5px rgba(57, 255, 20, 0.5), 0 0 10px rgba(57, 255, 20, 0.3)'
      }}
    >
      {children}
    </Component>
  );
}
