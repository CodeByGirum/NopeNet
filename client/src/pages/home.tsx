import HeroSection from '@/sections/hero/HeroSection';
import StatsSummary from '@/sections/stats/StatsSummary';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface StatsData {
  id: number;
  totalRequests: number;
  attacksDetected: number;
  modelAccuracy: number;
  requestIncrease: number;
  attackIncrease: number;
  accuracyImprovement: number;
}

export default function Home() {
  const queryClient = useQueryClient();
  const { data: stats, isLoading: isStatsLoading } = useQuery<StatsData>({
    queryKey: ['/api/stats'],
  });

  // Prefetch dashboard data when landing on home page
  useEffect(() => {
    const prefetchDashboardData = async () => {
      if (queryClient) {
        await Promise.all([
          queryClient.prefetchQuery({ queryKey: ['/api/attacks/distribution'] }),
          queryClient.prefetchQuery({ queryKey: ['/api/attacks/recent'] }),
          queryClient.prefetchQuery({ queryKey: ['/api/intrusions'] }),
        ]);
      }
    };
    
    prefetchDashboardData();
  }, [queryClient]);
  
  return (
    <>
      <HeroSection />
      
      <StatsSummary 
        stats={{
          totalRequests: stats?.totalRequests || 0,
          attacksDetected: stats?.attacksDetected || 0,
          modelAccuracy: stats?.modelAccuracy || 0,
          requestIncrease: stats?.requestIncrease || 0,
          attackIncrease: stats?.attackIncrease || 0,
          accuracyImprovement: stats?.accuracyImprovement || 0,
        }}
        isLoading={isStatsLoading}
      />
    </>
  );
}
