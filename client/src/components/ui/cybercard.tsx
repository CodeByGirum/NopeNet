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
  highlightColor = "bg-blue-500",
  hoverEffect = true
}: CyberCardProps) {
  return (
    <div className={cn(
      "bg-[#111111] border border-[#222222] rounded-xl shadow-lg backdrop-blur-sm", 
      hoverEffect && "transition-all duration-300 hover:border-[#333333]",
      className
    )}>
      {highlightColor && (
        <div className={`h-0.5 rounded-t-xl ${highlightColor}`}></div>
      )}
      {children}
    </div>
  );
}

export function CyberCardContent({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("p-5", className)}>
      {children}
    </div>
  );
}

export function CyberCardFooter({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("pt-4 mt-4 border-t border-[#222222]", className)}>
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
      <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-xl", iconClass || "bg-blue-500/10 text-blue-400")}>
        {icon}
      </div>
      <h3 className="ml-3 font-medium text-base">{title}</h3>
    </div>
  );
}
