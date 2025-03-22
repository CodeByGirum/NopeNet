import { ReactNode, useRef, useState } from 'react';

interface SparkProps {
  x: number;
  y: number;
  onComplete: () => void;
}

function Spark({ x, y, onComplete }: SparkProps) {
  const sparkRef = useRef<HTMLSpanElement>(null);
  
  return (
    <span
      ref={sparkRef}
      className="absolute w-0.5 h-0.5 rounded-full bg-white pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
        animation: 'spark 500ms ease-out forwards'
      }}
      onAnimationEnd={onComplete}
    />
  );
}

interface ClickSparkProps {
  children: ReactNode;
  color?: string;
}

export default function ClickSpark({ children, color = 'white' }: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  let nextId = useRef(0);
  
  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSparks(prev => [...prev, { id: nextId.current, x, y }]);
    nextId.current += 1;
  };
  
  const removeSpark = (id: number) => {
    setSparks(prev => prev.filter(spark => spark.id !== id));
  };
  
  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden inline-block"
      onClick={handleClick}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
      {sparks.map(spark => (
        <Spark
          key={spark.id}
          x={spark.x}
          y={spark.y}
          onComplete={() => removeSpark(spark.id)}
        />
      ))}
      
      <style jsx>{`
        @keyframes spark {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(50);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
