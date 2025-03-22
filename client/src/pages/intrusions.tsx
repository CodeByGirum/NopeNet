import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import IntrusionsTable from '@/sections/dashboard/IntrusionsTable';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Button } from '@/components/ui/button';

export default function Intrusions() {
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { data: intrusions, isLoading } = useQuery({
    queryKey: ['/api/intrusions', page, filterType, filterStatus],
  });
  
  const attackTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'dos', name: 'DoS Attack' },
    { id: 'probe', name: 'Probe Attack' },
    { id: 'r2l', name: 'R2L Attack' },
    { id: 'u2r', name: 'U2R Attack' },
    { id: 'unknown', name: 'Unknown' }
  ];
  
  const statusTypes = [
    { id: 'all', name: 'All Status' },
    { id: 'blocked', name: 'Blocked' },
    { id: 'monitoring', name: 'Monitoring' },
    { id: 'resolved', name: 'Resolved' },
    { id: 'investigating', name: 'Investigating' }
  ];
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-orbitron font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">Intrusion Log</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-neon-yellow"></span>
          </h2>
          <p className="text-gray-400 max-w-3xl">Detailed view of all detected intrusions with advanced filtering options.</p>
        </div>
        
        {/* Filters */}
        <CyberCard className="mb-8">
          <CyberCardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-2">Filter by Attack Type</h3>
                <div className="flex flex-wrap gap-2">
                  {attackTypes.map(type => (
                    <Button
                      key={type.id}
                      variant={filterType === type.id ? "default" : "secondary"}
                      className={`px-3 py-1 text-xs ${filterType === type.id ? 'bg-neon-green text-cyber-black' : 'bg-cyber-dark text-gray-300 hover:bg-neon-green hover:text-cyber-black'}`}
                      onClick={() => setFilterType(type.id)}
                    >
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-2">Filter by Status</h3>
                <div className="flex flex-wrap gap-2">
                  {statusTypes.map(status => (
                    <Button
                      key={status.id}
                      variant={filterStatus === status.id ? "default" : "secondary"}
                      className={`px-3 py-1 text-xs ${filterStatus === status.id ? 'bg-neon-green text-cyber-black' : 'bg-cyber-dark text-gray-300 hover:bg-neon-green hover:text-cyber-black'}`}
                      onClick={() => setFilterStatus(status.id)}
                    >
                      {status.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
        
        {/* Intrusions Table */}
        <IntrusionsTable 
          data={intrusions} 
          isLoading={isLoading}
          fullView={true}
          onPageChange={setPage}
          currentPage={page}
        />
      </div>
    </section>
  );
}
