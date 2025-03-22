import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  end: number;
  duration?: number;
  decimalPlaces?: number;
  suffix?: string;
  className?: string;
  formatFn?: (value: number) => string;
}

export default function CountUp({ 
  end, 
  duration = 2000, 
  decimalPlaces = 0,
  suffix = '',
  className,
  formatFn,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    startTimeRef.current = Date.now();
    const updateCount = () => {
      if (!startTimeRef.current) return;
      
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: cubic-bezier
      const easeOutCubic = (x: number): number => {
        return 1 - Math.pow(1 - x, 3);
      };
      
      const easedProgress = easeOutCubic(progress);
      const nextCount = Math.min(easedProgress * end, end);
      
      countRef.current = nextCount;
      setCount(nextCount);
      
      if (progress < 1) {
        timerRef.current = window.requestAnimationFrame(updateCount);
      }
    };
    
    timerRef.current = window.requestAnimationFrame(updateCount);
    
    return () => {
      if (timerRef.current) {
        window.cancelAnimationFrame(timerRef.current);
      }
    };
  }, [end, duration]);
  
  const formatNumber = (num: number): string => {
    if (formatFn) {
      return formatFn(num);
    }
    
    const fixed = num.toFixed(decimalPlaces);
    return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  return (
    <span className={cn("animate-count-up", className)}>
      {formatNumber(count)}{suffix}
    </span>
  );
}
