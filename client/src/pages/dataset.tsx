import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { useQuery } from '@tanstack/react-query';

export default function Dataset() {
  const { data: datasetInfo, isLoading } = useQuery({
    queryKey: ['/api/dataset/info'],
  });
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-orbitron font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">KDD Cup Dataset</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-neon-yellow"></span>
          </h2>
          <p className="text-gray-400 max-w-3xl">Information about the dataset used to train our intrusion detection models.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <CyberCard className="lg:col-span-2">
            <CyberCardContent>
              <h3 className="font-orbitron font-semibold text-xl mb-4">About the KDD Cup Dataset</h3>
              <p className="text-gray-300 mb-4">
                The KDD Cup 1999 dataset is a benchmark dataset for network intrusion detection systems. 
                It contains a standard set of data that includes a wide variety of intrusions simulated in a military network environment.
              </p>
              <p className="text-gray-300 mb-4">
                The dataset contains 41 features and classifies network connections into five main categories:
              </p>
              <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                <li><span className="font-medium text-neon-green">Normal:</span> Regular network traffic without malicious intent</li>
                <li><span className="font-medium text-red-400">DoS (Denial of Service):</span> Attacks designed to shut down a machine or network</li>
                <li><span className="font-medium text-amber-400">Probe:</span> Surveillance and scanning activities</li>
                <li><span className="font-medium text-neon-lime">R2L (Remote to Local):</span> Unauthorized access from a remote machine</li>
                <li><span className="font-medium text-blue-400">U2R (User to Root):</span> Unauthorized access to local superuser privileges</li>
              </ul>
              <p className="text-gray-300">
                Our models have been trained on this dataset to identify and classify these various attack types with high accuracy.
              </p>
            </CyberCardContent>
          </CyberCard>
          
          <CyberCard>
            <CyberCardContent>
              <h3 className="font-orbitron font-semibold text-xl mb-4">Dataset Statistics</h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin h-8 w-8 border-4 border-neon-green border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-cyber-dark/60 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400">Total Records</h4>
                    <p className="text-2xl font-orbitron font-bold text-neon-green">{datasetInfo?.totalRecords.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-cyber-dark/60 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400">Attack Classes</h4>
                    <p className="text-2xl font-orbitron font-bold text-neon-yellow">{datasetInfo?.attackClasses}</p>
                  </div>
                  
                  <div className="bg-cyber-dark/60 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400">Features</h4>
                    <p className="text-2xl font-orbitron font-bold text-neon-lime">{datasetInfo?.features}</p>
                  </div>
                </div>
              )}
            </CyberCardContent>
          </CyberCard>
        </div>
        
        <CyberCard>
          <CyberCardContent>
            <h3 className="font-orbitron font-semibold text-xl mb-4">Model Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-cyber-gray/30">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Accuracy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Precision</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Recall</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">F1 Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-gray/30">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4">
                        <div className="flex justify-center">
                          <div className="animate-spin h-5 w-5 border-2 border-neon-green border-t-transparent rounded-full"></div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    datasetInfo?.models.map((model, index) => (
                      <tr key={index} className="hover:bg-cyber-dark/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{model.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-cyber-dark rounded-full h-2.5">
                            <div 
                              className="bg-neon-green h-2.5 rounded-full" 
                              style={{ width: `${model.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{model.accuracy}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-cyber-dark rounded-full h-2.5">
                            <div 
                              className="bg-neon-yellow h-2.5 rounded-full" 
                              style={{ width: `${model.precision}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{model.precision}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-cyber-dark rounded-full h-2.5">
                            <div 
                              className="bg-neon-lime h-2.5 rounded-full" 
                              style={{ width: `${model.recall}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{model.recall}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-cyber-dark rounded-full h-2.5">
                            <div 
                              className="bg-blue-500 h-2.5 rounded-full" 
                              style={{ width: `${model.f1Score}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{model.f1Score}%</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>
    </section>
  );
}
