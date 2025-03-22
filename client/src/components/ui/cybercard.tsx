import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  highlightColor?: string;
  hoverEffect?: boolean;
}

export function CyberCard({ 
  children, 
  className, 
  highlightColor = "bg-neon-green",
  hoverEffect = true
}: CyberCardProps) {
  return (
    <div className={cn(
      "bg-cyber-black/60 border border-cyber-gray/30 rounded-lg shadow-lg", 
      hoverEffect && "transform hover:scale-105 transition-transform duration-300",
      className
    )}>
      {highlightColor && (
        <div className={`h-1 rounded-t-lg ${highlightColor}`}></div>
      )}
      {children}
    </div>
  );
}

export function CyberCardContent({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}

export function CyberCardFooter({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("pt-4 mt-4 border-t border-cyber-gray/30", className)}>
      {children}
    </div>
  );
}

export function CyberCardHeader({ 
  icon, 
  title, 
  iconClass,
  className 
}: { 
  icon: ReactNode, 
  title: string,
  iconClass?: string,
  className?: string 
}) {
  return (
    <div className={cn("flex items-center mb-4", className)}>
      <div className={cn("h-12 w-12 rounded-full flex items-center justify-center text-2xl", iconClass || "bg-neon-green/20 text-neon-green")}>
        {icon}
      </div>
      <h3 className="ml-4 font-orbitron font-semibold text-xl">{title}</h3>
    </div>
  );
}
