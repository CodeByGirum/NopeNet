import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, ArrowRight, ShieldAlert, ShieldCheck, Database, Server, Lock, Wifi } from 'lucide-react';

interface SecurityTip {
  id: string;
  tip: string;
}

interface AttackType {
  id: string;
  name: string;
  description: string;
  tips: SecurityTip[];
  color: string;
  gradient: string;
  icon: string;
  iconClass: string;
}

interface SecurityCardsProps {
  attackTypes: AttackType[];
  isLoading: boolean;
}

// Map icons based on attack type
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'fa-shield-alt':
      return <ShieldAlert />;
    case 'fa-shield-check':
      return <ShieldCheck />;
    case 'fa-database':
      return <Database />;
    case 'fa-server':
      return <Server />;
    case 'fa-lock':
      return <Lock />;
    case 'fa-wifi':
      return <Wifi />;
    default:
      return <ShieldAlert />;
  }
};

// Map colors to Tailwind classes
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string, text: string, border: string }> = {
    'blue': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    'purple': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    'red': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
    'green': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    'yellow': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    'teal': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
    'neon-green': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    'neon-yellow': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    'neon-lime': { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/30' }
  };
  
  return colorMap[color] || { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
};

export default function SecurityCards({ attackTypes, isLoading }: SecurityCardsProps) {
  // Placeholder cards for loading state
  const placeholderCards = Array(3).fill(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {isLoading ? (
        placeholderCards.map((_, index) => (
          <CyberCard key={index}>
            <CyberCardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="pt-4 border-t border-[#222222]">
                <Skeleton className="h-5 w-32 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <Skeleton className="mt-6 h-10 w-full rounded-full" />
            </CyberCardContent>
          </CyberCard>
        ))
      ) : (
        attackTypes.map(attack => {
          const colorClasses = getColorClasses(attack.color);
          return (
            <CyberCard key={attack.id}>
              <CyberCardContent>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className={`h-16 w-16 ${colorClasses.bg} rounded-xl flex items-center justify-center text-xl mb-4`}>
                    {getIconComponent(attack.icon)}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{attack.name}</h3>
                  <p className="text-sm text-gray-400">{attack.description}</p>
                </div>
                <div className="pt-4 border-t border-[#222222]">
                  <h4 className="font-medium text-sm text-gray-300 mb-3">Protection Tips</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    {attack.tips.map(tip => (
                      <li key={tip.id} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{tip.tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className={`mt-6 w-full py-2.5 px-4 rounded-full ${colorClasses.bg} ${colorClasses.text} ${colorClasses.border} border hover:bg-opacity-20 transition-colors flex items-center justify-center`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </CyberCardContent>
            </CyberCard>
          );
        })
      )}
    </div>
  );
}
