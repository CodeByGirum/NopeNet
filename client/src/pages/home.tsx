import HeroSection from '@/sections/hero/HeroSection';
import StatsSummary from '@/sections/stats/StatsSummary';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['/api/stats'],
  });

  // Prefetch dashboard data when landing on home page
  useEffect(() => {
    const prefetchDashboardData = async () => {
      await Promise.all([
        queryClient.prefetchQuery({ queryKey: ['/api/attacks/distribution'] }),
        queryClient.prefetchQuery({ queryKey: ['/api/attacks/recent'] }),
        queryClient.prefetchQuery({ queryKey: ['/api/intrusions'] }),
      ]);
    };
    
    prefetchDashboardData();
  }, []);
  
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
