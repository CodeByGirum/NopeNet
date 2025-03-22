import { CyberCard, CyberCardContent, CyberCardFooter } from '@/components/ui/cybercard';
import CountUp from '@/components/text/CountUp';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsSummaryProps {
  stats: {
    totalRequests: number;
    attacksDetected: number;
    modelAccuracy: number;
    requestIncrease: number;
    attackIncrease: number;
    accuracyImprovement: number;
  };
  isLoading: boolean;
}

export default function StatsSummary({ stats, isLoading }: StatsSummaryProps) {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-cyber-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat Card 1 */}
          <CyberCard>
            <CyberCardContent>
              <div className="text-center">
                <h3 className="text-gray-400 mb-2 font-medium">Total Requests</h3>
                <div className="text-4xl md:text-5xl font-orbitron font-bold text-neon-green mb-1">
                  {isLoading ? (
                    <Skeleton className="h-12 w-32 mx-auto bg-cyber-gray/20" />
                  ) : (
                    <CountUp 
                      end={stats.totalRequests} 
                      formatFn={(value) => value.toLocaleString()}
                    />
                  )}
                </div>
                <p className="text-gray-400 text-sm">Past 24 hours</p>
              </div>
              <CyberCardFooter>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Increase rate</span>
                  <span className="text-neon-lime font-medium flex items-center">
                    <i className="fas fa-arrow-up mr-1 text-xs"></i>
                    {isLoading ? (
                      <Skeleton className="h-4 w-8 bg-cyber-gray/20" />
                    ) : (
                      `${stats.requestIncrease}%`
                    )}
                  </span>
                </div>
              </CyberCardFooter>
            </CyberCardContent>
          </CyberCard>

          {/* Stat Card 2 */}
          <CyberCard>
            <CyberCardContent>
              <div className="text-center">
                <h3 className="text-gray-400 mb-2 font-medium">Attacks Detected</h3>
                <div className="text-4xl md:text-5xl font-orbitron font-bold text-neon-yellow mb-1">
                  {isLoading ? (
                    <Skeleton className="h-12 w-32 mx-auto bg-cyber-gray/20" />
                  ) : (
                    <CountUp 
                      end={stats.attacksDetected} 
                      formatFn={(value) => value.toLocaleString()}
                    />
                  )}
                </div>
                <p className="text-gray-400 text-sm">Past 24 hours</p>
              </div>
              <CyberCardFooter>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Attack rate</span>
                  <span className="text-neon-yellow font-medium flex items-center">
                    <i className="fas fa-arrow-up mr-1 text-xs"></i>
                    {isLoading ? (
                      <Skeleton className="h-4 w-8 bg-cyber-gray/20" />
                    ) : (
                      `${stats.attackIncrease}%`
                    )}
                  </span>
                </div>
              </CyberCardFooter>
            </CyberCardContent>
          </CyberCard>

          {/* Stat Card 3 */}
          <CyberCard>
            <CyberCardContent>
              <div className="text-center">
                <h3 className="text-gray-400 mb-2 font-medium">Model Accuracy</h3>
                <div className="text-4xl md:text-5xl font-orbitron font-bold text-neon-green mb-1">
                  {isLoading ? (
                    <Skeleton className="h-12 w-32 mx-auto bg-cyber-gray/20" />
                  ) : (
                    <CountUp 
                      end={stats.modelAccuracy} 
                      suffix="%" 
                    />
                  )}
                </div>
                <p className="text-gray-400 text-sm">Overall performance</p>
              </div>
              <CyberCardFooter>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Improvement</span>
                  <span className="text-neon-lime font-medium flex items-center">
                    <i className="fas fa-arrow-up mr-1 text-xs"></i>
                    {isLoading ? (
                      <Skeleton className="h-4 w-8 bg-cyber-gray/20" />
                    ) : (
                      `${stats.accuracyImprovement}%`
                    )}
                  </span>
                </div>
              </CyberCardFooter>
            </CyberCardContent>
          </CyberCard>
        </div>
      </div>
    </section>
  );
}
