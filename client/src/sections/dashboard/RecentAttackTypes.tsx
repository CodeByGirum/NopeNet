import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Skeleton } from '@/components/ui/skeleton';

interface AttackType {
  id: string;
  name: string;
  count: number;
  change: number;
  icon: string;
  color: string;
  borderColor: string;
}

interface RecentAttackTypesProps {
  data?: AttackType[];
  isLoading: boolean;
}

export default function RecentAttackTypes({ data, isLoading }: RecentAttackTypesProps) {
  // Placeholder data for loading state
  const skeletonItems = Array(4).fill(null);
  
  return (
    <CyberCard>
      <CyberCardContent>
        <h3 className="font-orbitron font-semibold text-xl mb-6">Recent Attack Types</h3>
        
        <div className="space-y-4">
          {isLoading ? (
            skeletonItems.map((_, index) => (
              <div key={index} className="p-3 bg-cyber-dark/60 rounded flex items-center">
                <Skeleton className="h-10 w-10 rounded-full bg-cyber-gray/20" />
                <div className="ml-4 flex-1">
                  <Skeleton className="h-4 w-24 bg-cyber-gray/20 mb-1" />
                  <Skeleton className="h-3 w-32 bg-cyber-gray/20" />
                </div>
                <Skeleton className="h-4 w-12 bg-cyber-gray/20" />
              </div>
            ))
          ) : (
            data?.map(attack => (
              <div 
                key={attack.id} 
                className={`p-3 bg-cyber-dark/60 rounded flex items-center border-l-4 ${attack.borderColor}`}
              >
                <div className={`flex-shrink-0 h-10 w-10 ${attack.color} rounded-full flex items-center justify-center`}>
                  <i className={`${attack.icon} ${attack.color.replace('bg-', 'text-')}`}></i>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{attack.name}</h4>
                  <p className="text-xs text-gray-400">{attack.count} instances detected</p>
                </div>
                <div className={`ml-auto ${attack.color.replace('bg-', 'text-')} text-sm`}>+{attack.change}%</div>
              </div>
            ))
          )}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
