import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function SecurityCards({ attackTypes, isLoading }: SecurityCardsProps) {
  // Placeholder cards for loading state
  const placeholderCards = Array(3).fill(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {isLoading ? (
        placeholderCards.map((_, index) => (
          <CyberCard key={index}>
            <div className="h-3 rounded-t-lg">
              <Skeleton className="w-full h-full rounded-t-lg" />
            </div>
            <CyberCardContent>
              <div className="flex items-center mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="ml-4 h-6 w-32" />
              </div>
              <Skeleton className="h-20 w-full mb-4" />
              <div className="pt-4 border-t border-cyber-gray/30">
                <Skeleton className="h-4 w-32 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <Skeleton className="mt-6 h-8 w-full rounded" />
            </CyberCardContent>
          </CyberCard>
        ))
      ) : (
        attackTypes.map(attack => (
          <CyberCard key={attack.id} highlightColor={attack.gradient}>
            <CyberCardContent>
              <div className="flex items-center mb-4">
                <div className={`h-12 w-12 ${attack.iconClass} rounded-full flex items-center justify-center text-2xl`}>
                  <i className={attack.icon}></i>
                </div>
                <h3 className="ml-4 font-orbitron font-semibold text-xl">{attack.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{attack.description}</p>
              <div className="pt-4 border-t border-cyber-gray/30">
                <h4 className="font-medium mb-2">Protection Tips:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {attack.tips.map(tip => (
                    <li key={tip.id} className="flex items-start">
                      <i className="fas fa-check-circle text-neon-green mt-1 mr-2"></i>
                      <span>{tip.tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                className={`mt-6 w-full py-2 bg-cyber-dark text-${attack.color}-400 border border-${attack.color}-500/30 rounded hover:bg-${attack.color}-500/20 transition-colors`}
              >
                Learn More
              </button>
            </CyberCardContent>
          </CyberCard>
        ))
      )}
    </div>
  );
}
