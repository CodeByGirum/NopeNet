import { useEffect, useRef } from 'react';

export default function GlitchBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const generateMatrix = () => {
      if (!containerRef.current) return;
      
      const characters = '01';
      let matrix = '';
      
      // Generate 50 lines of random binary
      for (let i = 0; i < 50; i++) {
        let line = '';
        for (let j = 0; j < 100; j++) {
          line += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        matrix += line + '\n';
      }
      
      return matrix;
    };
    
    if (containerRef.current) {
      containerRef.current.textContent = generateMatrix();
    }
    
    // Update the matrix occasionally
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.textContent = generateMatrix();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="grid grid-cols-12 gap-4 w-screen h-screen overflow-hidden">
        <div className="col-span-12 animate-glitch overflow-hidden text-xs tracking-wide opacity-30">
          <div className="whitespace-pre font-mono">
            <span ref={containerRef}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
