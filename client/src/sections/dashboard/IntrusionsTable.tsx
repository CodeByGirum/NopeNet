import { useState } from 'react';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Intrusion {
  id: number;
  timestamp: string;
  sourceIp: string;
  attackType: string;
  attackTypeClass: string;
  confidence: number;
  status: string;
  statusClass: string;
  details?: string;
}

interface IntrusionsTableProps {
  data?: {
    intrusions: Intrusion[];
    total: number;
    page: number;
    pages: number;
  };
  isLoading: boolean;
  fullView?: boolean;
  onPageChange?: (page: number) => void;
  currentPage?: number;
}

export default function IntrusionsTable({ 
  data, 
  isLoading,
  fullView = false,
  onPageChange,
  currentPage = 1
}: IntrusionsTableProps) {
  const [selectedIntrusion, setSelectedIntrusion] = useState<Intrusion | null>(null);
  
  // Create placeholder rows for loading state
  const placeholderRows = Array(5).fill(null);
  
  // Handle click on "Details" button
  const handleDetailsClick = (intrusion: Intrusion) => {
    setSelectedIntrusion(intrusion);
  };
  
  return (
    <>
      <CyberCard className="mt-8">
        <CyberCardContent>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-orbitron font-semibold text-xl">Recent Intrusions</h3>
            {!fullView && (
              <Button 
                className="px-4 py-2 text-sm bg-cyber-dark border border-neon-green text-neon-green rounded hover:bg-neon-green hover:text-cyber-black transition-colors"
                onClick={() => window.location.href = '/intrusions'}  // Use wouter's navigate in a real implementation
              >
                View All
              </Button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cyber-gray/30">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attack Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-gray/30">
                {isLoading ? (
                  placeholderRows.map((_, index) => (
                    <tr key={index} className="hover:bg-cyber-dark/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-32 bg-cyber-gray/20" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-24 bg-cyber-gray/20" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-6 w-20 rounded-full bg-cyber-gray/20" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-2.5 w-full bg-cyber-gray/20 rounded-full mb-1" />
                        <Skeleton className="h-4 w-8 bg-cyber-gray/20" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-6 w-16 rounded-full bg-cyber-gray/20" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Skeleton className="h-4 w-12 bg-cyber-gray/20 ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : (
                  data?.intrusions.map((intrusion) => (
                    <tr key={intrusion.id} className="hover:bg-cyber-dark/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{intrusion.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{intrusion.sourceIp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${intrusion.attackTypeClass}`}>{intrusion.attackType}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-cyber-dark rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${getColorByConfidence(intrusion.confidence)}`} 
                            style={{ width: `${intrusion.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{intrusion.confidence}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${intrusion.statusClass}`}>{intrusion.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button 
                          className="text-neon-green hover:text-neon-lime"
                          onClick={() => handleDetailsClick(intrusion)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {isLoading ? (
                <Skeleton className="h-4 w-40 bg-cyber-gray/20" />
              ) : (
                `Showing ${data?.intrusions.length || 0} of ${data?.total || 0} intrusions`
              )}
            </div>
            <div className="flex space-x-2">
              {data && onPageChange && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="px-3 py-1 text-sm bg-cyber-dark rounded text-gray-300 hover:bg-neon-green hover:text-cyber-black transition-colors"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                  >
                    &laquo; Previous
                  </Button>
                  
                  {[...Array(Math.min(data.pages, 3))].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "secondary"}
                      size="sm"
                      className={`px-3 py-1 text-sm rounded ${
                        currentPage === i + 1
                          ? 'bg-neon-green text-cyber-black'
                          : 'bg-cyber-dark text-gray-300 hover:bg-neon-green hover:text-cyber-black transition-colors'
                      }`}
                      onClick={() => onPageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="px-3 py-1 text-sm bg-cyber-dark rounded text-gray-300 hover:bg-neon-green hover:text-cyber-black transition-colors"
                    disabled={currentPage >= (data.pages || 1)}
                    onClick={() => onPageChange(currentPage + 1)}
                  >
                    Next &raquo;
                  </Button>
                </>
              )}
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>
      
      {/* Details Dialog */}
      <Dialog open={!!selectedIntrusion} onOpenChange={(open) => !open && setSelectedIntrusion(null)}>
        <DialogContent className="bg-cyber-black border border-cyber-gray/30 text-white">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-neon-green">Intrusion Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed information about the selected intrusion event.
            </DialogDescription>
          </DialogHeader>
          
          {selectedIntrusion && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Timestamp</p>
                  <p className="font-medium">{selectedIntrusion.timestamp}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Source IP</p>
                  <p className="font-medium">{selectedIntrusion.sourceIp}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Attack Type</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${selectedIntrusion.attackTypeClass}`}>
                    {selectedIntrusion.attackType}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Status</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${selectedIntrusion.statusClass}`}>
                    {selectedIntrusion.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Confidence Score</p>
                <div className="w-full bg-cyber-dark rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getColorByConfidence(selectedIntrusion.confidence)}`}
                    style={{ width: `${selectedIntrusion.confidence}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{selectedIntrusion.confidence}%</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Details</p>
                <p className="text-sm bg-cyber-dark/50 p-3 rounded border border-cyber-gray/20">
                  {selectedIntrusion.details || "No additional details available for this intrusion."}
                </p>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  className="border-neon-green text-neon-green hover:bg-neon-green hover:text-cyber-black"
                >
                  Block IP
                </Button>
                <Button 
                  className="bg-neon-green text-cyber-black hover:bg-neon-lime"
                >
                  Mark as Resolved
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Helper function to determine color based on confidence
function getColorByConfidence(confidence: number): string {
  if (confidence >= 90) return 'bg-neon-green';
  if (confidence >= 75) return 'bg-neon-lime';
  if (confidence >= 60) return 'bg-neon-yellow';
  if (confidence >= 45) return 'bg-blue-500';
  return 'bg-purple-500';
}
