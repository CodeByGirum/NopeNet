import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import CountUp from '@/components/text/CountUp';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, ShieldAlert, BarChart3 } from 'lucide-react';

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <CyberCard>
            <CyberCardContent>
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-blue-500/10">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-2">Total Requests</h3>
                <div className="text-3xl font-medium text-white mb-1">
                  {isLoading ? (
                    <Skeleton className="h-10 w-24 bg-gray-800" />
                  ) : (
                    <CountUp 
                      end={stats.totalRequests} 
                      formatFn={(value) => value.toLocaleString()}
                    />
                  )}
                </div>
                <p className="text-gray-500 text-xs">Past 24 hours</p>
                
                <div className="mt-6 pt-4 border-t border-gray-800 w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Increase rate</span>
                    <span className="text-green-400 text-sm font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                      </svg>
                      {isLoading ? (
                        <Skeleton className="h-4 w-8 bg-gray-800" />
                      ) : (
                        `${stats.requestIncrease}%`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CyberCardContent>
          </CyberCard>

          {/* Stat Card 2 */}
          <CyberCard>
            <CyberCardContent>
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-red-500/10">
                  <ShieldAlert className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-2">Attacks Detected</h3>
                <div className="text-3xl font-medium text-white mb-1">
                  {isLoading ? (
                    <Skeleton className="h-10 w-24 bg-gray-800" />
                  ) : (
                    <CountUp 
                      end={stats.attacksDetected} 
                      formatFn={(value) => value.toLocaleString()}
                    />
                  )}
                </div>
                <p className="text-gray-500 text-xs">Past 24 hours</p>
                
                <div className="mt-6 pt-4 border-t border-gray-800 w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Attack rate</span>
                    <span className="text-red-400 text-sm font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                      </svg>
                      {isLoading ? (
                        <Skeleton className="h-4 w-8 bg-gray-800" />
                      ) : (
                        `${stats.attackIncrease}%`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CyberCardContent>
          </CyberCard>

          {/* Stat Card 3 */}
          <CyberCard>
            <CyberCardContent>
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-purple-500/10">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-2">Model Accuracy</h3>
                <div className="text-3xl font-medium text-white mb-1">
                  {isLoading ? (
                    <Skeleton className="h-10 w-24 bg-gray-800" />
                  ) : (
                    <CountUp 
                      end={stats.modelAccuracy} 
                      suffix="%" 
                    />
                  )}
                </div>
                <p className="text-gray-500 text-xs">Overall performance</p>
                
                <div className="mt-6 pt-4 border-t border-gray-800 w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">Improvement</span>
                    <span className="text-green-400 text-sm font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                      </svg>
                      {isLoading ? (
                        <Skeleton className="h-4 w-8 bg-gray-800" />
                      ) : (
                        `${stats.accuracyImprovement}%`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CyberCardContent>
          </CyberCard>
        </div>
      </div>
    </section>
  );
}
