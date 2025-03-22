import { useState } from 'react';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Define our attack type interface
interface AttackData {
  name: string;
  count: number;
  color: string;
}

interface AttackDistributionProps {
  data?: {
    timeRange: string;
    distribution: AttackData[];
  };
  isLoading: boolean;
}

export default function AttackDistribution({ data, isLoading }: AttackDistributionProps) {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for the skeleton state
  const skeletonData = [
    { name: 'DoS', count: 0, color: '#39FF14' },
    { name: 'Probe', count: 0, color: '#FFFF00' },
    { name: 'R2L', count: 0, color: '#BFFF00' },
    { name: 'U2R', count: 0, color: '#3B82F6' },
    { name: 'Other', count: 0, color: '#A855F7' }
  ];
  
  const displayData = isLoading || !data ? skeletonData : data.distribution;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cyber-black/90 border border-cyber-gray/30 p-2 text-xs rounded">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-neon-green">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="lg:col-span-2 bg-cyber-black/60 border border-cyber-gray/30 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron font-semibold text-xl">Attack Distribution</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs rounded ${timeRange === 'day' ? 'bg-neon-green text-cyber-black' : 'bg-cyber-dark text-gray-300 hover:bg-neon-green hover:text-cyber-black transition-colors'}`}
            onClick={() => setTimeRange('day')}
          >
            Day
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${timeRange === 'week' ? 'bg-neon-green text-cyber-black' : 'bg-cyber-dark text-gray-300 hover:bg-neon-green hover:text-cyber-black transition-colors'}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${timeRange === 'month' ? 'bg-neon-green text-cyber-black' : 'bg-cyber-dark text-gray-300 hover:bg-neon-green hover:text-cyber-black transition-colors'}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 relative">
        {isLoading ? (
          <Skeleton className="w-full h-full bg-cyber-gray/10 rounded-md" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.3)" />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#39FF14" radius={[4, 4, 0, 0]}>
                {displayData.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="count" fill={entry.color} radius={[4, 4, 0, 0]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
