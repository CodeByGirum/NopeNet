import { useRef, useEffect } from 'react';

interface StarBorderProps {
  color?: string;
  speed?: string;
  size?: number;
  className?: string;
}

export default function StarBorder({ 
  color = 'rgba(57, 255, 20, 0.7)', 
  speed = '6s',
  size = 2,
  className = ''
}: StarBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Parse color to RGB
    let rgb = [57, 255, 20]; // Default neon green fallback
    if (color.includes('rgba')) {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
      if (match) {
        rgb = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
    }
    
    // Creates dots around the border
    const totalDots = Math.floor(2 * (width + height) / 15);
    const dots: { x: number; y: number; size: number; direction: number }[] = [];
    
    // Distribute dots along the perimeter
    for (let i = 0; i < totalDots; i++) {
      const perimeterPos = i / totalDots * 2 * (width + height);
      let x, y;
      
      if (perimeterPos < width) {
        // Top edge
        x = perimeterPos;
        y = 0;
      } else if (perimeterPos < width + height) {
        // Right edge
        x = width;
        y = perimeterPos - width;
      } else if (perimeterPos < 2 * width + height) {
        // Bottom edge
        x = width - (perimeterPos - (width + height));
        y = height;
      } else {
        // Left edge
        x = 0;
        y = height - (perimeterPos - (2 * width + height));
      }
      
      dots.push({
        x,
        y,
        size: Math.random() * size + 1,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
    
    let animationFrameId: number;
    let startTime = Date.now();
    
    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const elapsed = (Date.now() - startTime) / 1000;
      const speedFactor = parseFloat(speed) || 6; // Default 6s
      
      dots.forEach(dot => {
        const pulseSize = dot.size + Math.sin(elapsed * Math.PI / (speedFactor / 2) * dot.direction) * dot.size * 0.5;
        
        const alpha = 0.3 + Math.sin(elapsed * Math.PI / (speedFactor / 2) * dot.direction) * 0.7;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        ctx.fill();
        
        // Add glow effect
        const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, pulseSize * 2);
        glow.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha * 0.5})`);
        glow.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed, size]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
