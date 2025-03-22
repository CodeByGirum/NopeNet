import { useQuery } from '@tanstack/react-query';
import AttackDistribution from '@/sections/dashboard/AttackDistribution';
import RecentAttackTypes from '@/sections/dashboard/RecentAttackTypes';
import IntrusionsTable from '@/sections/dashboard/IntrusionsTable';

export default function Dashboard() {
  const { data: attackDistribution, isLoading: isAttackDistLoading } = useQuery({
    queryKey: ['/api/attacks/distribution'],
  });
  
  const { data: recentAttacks, isLoading: isRecentAttacksLoading } = useQuery({
    queryKey: ['/api/attacks/recent'],
  });
  
  const { data: intrusions, isLoading: isIntrusionsLoading } = useQuery({
    queryKey: ['/api/intrusions'],
  });
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-orbitron font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">Real-Time Dashboard</span>
            {/* Underline for heading */}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-neon-yellow"></span>
          </h2>
          <p className="text-gray-400 max-w-3xl">Monitor network activity and detected intrusions with our advanced visualization tools.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attack Distribution Chart */}
          <AttackDistribution 
            data={attackDistribution}
            isLoading={isAttackDistLoading}
          />
          
          {/* Recent Attack Types */}
          <RecentAttackTypes 
            data={recentAttacks}
            isLoading={isRecentAttacksLoading}
          />
        </div>

        {/* Recent Intrusions Table */}
        <IntrusionsTable 
          data={intrusions}
          isLoading={isIntrusionsLoading}
        />
      </div>
    </section>
  );
}
