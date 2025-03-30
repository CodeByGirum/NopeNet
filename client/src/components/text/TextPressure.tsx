import { useState, useEffect, useRef } from 'react';

interface TextPressureProps {
  text: string;
  className?: string;
  fontSize?: number;
  color?: string;
  hoverColor?: string;
  textShadowColor?: string;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
}

// Using function declaration instead of arrow function to avoid React hooks error
function TextPressure({
  text,
  className = '',
  fontSize = 36,
  color = 'white',
  hoverColor = '#00f5ff',
  textShadowColor = 'rgba(0, 245, 255, 0.8)',
  duration = 0.3,
  delay = 0,
  staggerDelay = 0.03,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [characters, setCharacters] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const chars = text.split('').map((char, index) => {
      const charDelay = delay + index * staggerDelay;
      
      return (
        <span
          key={index}
          className="inline-block transition-all"
          style={{
            transitionDuration: `${duration}s`,
            transitionDelay: `${charDelay}s`,
            color: isHovered ? hoverColor : color,
            textShadow: isHovered 
              ? `0 0 10px ${textShadowColor}, 0 0 20px ${textShadowColor}, 0 0 30px ${textShadowColor}`
              : 'none',
            transform: isHovered ? 'translateY(0)' : 'translateY(0)',
            opacity: 1,
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
            fontWeight: isHovered ? 'bold' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
    
    setCharacters(chars);
  }, [text, isHovered, color, hoverColor, textShadowColor, duration, delay, staggerDelay]);

  return (
    <div 
      ref={containerRef}
      className={`cursor-pointer font-bold inline-block ${className}`}
      style={{ fontSize: `${fontSize}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters}
    </div>
  );
}

export default TextPressure;