import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { 
  BarChart, Radar, PieChart, RadialBarChart, 
  Bar, Pie, RadialBar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Cell, Legend, Tooltip, Sector
} from 'recharts';
import { 
  Bot, Cpu, Network, ShieldCheck, Zap, Activity, 
  Database, Search, AlertTriangle, Lock, Server, 
  FileText, ChevronRight, Grid, Shield
} from 'lucide-react';

// Custom Trees icon for Random Forest visualization
function Trees(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M10 10v.2A3 3 0 0 1 8.9 14v0H5v0h0a3 3 0 0 1-1-5.8V8a3 3 0 0 1 4-2.8" />
      <path d="M7 15v2" />
      <path d="M14 6v-.2A3 3 0 0 1 15.1 2v0H19v0h0a3 3 0 0 1 1 5.8V8a3 3 0 0 1-4 2.8" />
      <path d="M17 9v6" />
      <path d="M13 17v-2" />
      <path d="M13 14h1" />
      <path d="M7 11h1" />
      <path d="M19 11h1" />
      <path d="M17 15h4" />
      <path d="M7 19h10" />
    </svg>
  );
}

export default function Dataset() {
  const { data: datasetInfo, isLoading } = useQuery({
    queryKey: ['/api/dataset/info'],
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEnsembleDetails, setShowEnsembleDetails] = useState(false);
  
  // Animated radar chart for feature importance
  const featureImportance = [
    { feature: 'Connection Duration', score: 85, fullMark: 100 },
    { feature: 'Service Type', score: 70, fullMark: 100 },
    { feature: 'Protocol', score: 65, fullMark: 100 },
    { feature: 'SYN Flag Count', score: 90, fullMark: 100 },
    { feature: 'Error Rate', score: 80, fullMark: 100 },
    { feature: 'Login Attempts', score: 95, fullMark: 100 },
  ];
  
  // Data distribution for pie chart
  const dataDistribution = [
    { name: 'Normal', value: 60, color: '#10b981' },
    { name: 'DoS', value: 20, color: '#ef4444' },
    { name: 'Probe', value: 10, color: '#f59e0b' },
    { name: 'R2L', value: 7, color: '#84cc16' },
    { name: 'U2R', value: 3, color: '#3b82f6' },
  ];
  
  // Architecture flow steps
  const architectureSteps = [
    {
      title: "Data Preprocessing",
      description: "Raw network traffic is processed, normalized, and feature-engineered to create meaningful inputs for the models.",
      icon: <Database className="w-10 h-10 text-blue-500" />,
      details: "This step includes normalization, one-hot encoding for categorical features, and addressing class imbalance using SMOTE (Synthetic Minority Over-sampling Technique)."
    },
    {
      title: "Convolutional Neural Network (CNN)",
      description: "Specializes in identifying spatial patterns in the data, excellent for detecting structured attacks.",
      icon: <Network className="w-10 h-10 text-green-500" />,
      details: "Our CNN architecture uses 1D convolutions with multiple filter sizes to capture patterns at different scales within network traffic data."
    },
    {
      title: "Deep Neural Network (DNN)",
      description: "Excels at recognizing complex non-linear relationships across many features.",
      icon: <Cpu className="w-10 h-10 text-amber-500" />,
      details: "The DNN consists of multiple dense layers with dropout for regularization, utilizing advanced activation functions for improved performance."
    },
    {
      title: "Random Forest (RF)",
      description: "Provides robustness against overfitting and excellent performance on discrete features.",
      icon: <Search className="w-10 h-10 text-red-500" />,
      details: "Our Random Forest implementation uses 100 decision trees with entropy as the splitting criterion, providing both accuracy and explainability."
    },
    {
      title: "Ensemble Integration",
      description: "Combines predictions from all models through a weighted voting system.",
      icon: <ShieldCheck className="w-10 h-10 text-purple-500" />,
      details: "The ensemble uses a dynamic weighting mechanism based on each model's confidence score, giving more influence to models that have historically performed better on similar patterns."
    }
  ];
  
  // Ensemble animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Custom circle animation for radar
  const CustomizedDot = (props: any) => {
    const { cx, cy, value } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={5} 
        fill="#3b82f6" 
        stroke="#fff" 
        strokeWidth={2}
        className="animate-pulse"
      />
    );
  };
  
  // Animated pie chart active sector
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="drop-shadow-glow"
        />
      </g>
    );
  };
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              KDD Cup Dataset & Ensemble Model
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span>
          </h2>
          <p className="text-gray-400 max-w-3xl">
            How we leverage advanced machine learning techniques to detect network intrusions with high accuracy through an ensemble of CNN, DNN, and Random Forest models.
          </p>
        </div>
        
        {/* Dataset Overview & Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <CyberCard className="lg:col-span-2 overflow-hidden group relative hover:border-blue-500 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CyberCardContent>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="font-semibold text-xl">The KDD Cup Dataset</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                The KDD Cup 1999 dataset is the benchmark for network intrusion detection research, containing simulated network attacks in a military environment. 
                It features millions of connection records, each with 41 features including basic connection attributes, content-based features, and traffic-based features.
              </p>
              
              <h4 className="font-medium text-white mb-2 mt-6">Attack Categories:</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 p-3 rounded-lg border border-green-500/30 flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-10 w-10 rounded-full bg-green-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Server className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="font-medium text-green-400">Normal</span>
                  <span className="text-xs text-gray-400 mt-1">Legitimate traffic</span>
                  <div className="hidden group-hover:block absolute -bottom-1 left-0 right-0 bg-gradient-to-t from-green-500/30 to-transparent p-2 transform transition-transform duration-300 text-xs text-green-300 max-h-24 overflow-y-auto z-10">
                    Regular network traffic without malicious intent
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 p-3 rounded-lg border border-red-500/30 flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-10 w-10 rounded-full bg-red-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="font-medium text-red-400">DoS</span>
                  <span className="text-xs text-gray-400 mt-1">Denial of Service</span>
                  <div className="hidden group-hover:block absolute -bottom-1 left-0 right-0 bg-gradient-to-t from-red-500/30 to-transparent p-2 transform transition-transform duration-300 text-xs text-red-300 max-h-24 overflow-y-auto z-10">
                    Back, Land, Neptune, Pod, Smurf, Teardrop - Overwhelms systems and makes them unavailable
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-700/20 p-3 rounded-lg border border-amber-500/30 flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-10 w-10 rounded-full bg-amber-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="font-medium text-amber-400">Probe</span>
                  <span className="text-xs text-gray-400 mt-1">Surveillance</span>
                  <div className="hidden group-hover:block absolute -bottom-1 left-0 right-0 bg-gradient-to-t from-amber-500/30 to-transparent p-2 transform transition-transform duration-300 text-xs text-amber-300 max-h-24 overflow-y-auto z-10">
                    IPsweep, Nmap, Portsweep, Satan - Scans networks to identify vulnerabilities
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-lime-500/20 to-lime-700/20 p-3 rounded-lg border border-lime-500/30 flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-lime-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-10 w-10 rounded-full bg-lime-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Network className="w-5 h-5 text-lime-400" />
                  </div>
                  <span className="font-medium text-lime-400">R2L</span>
                  <span className="text-xs text-gray-400 mt-1">Remote to Local</span>
                  <div className="hidden group-hover:block absolute -bottom-1 left-0 right-0 bg-gradient-to-t from-lime-500/30 to-transparent p-2 transform transition-transform duration-300 text-xs text-lime-300 max-h-24 overflow-y-auto z-10">
                    FTP_write, Guess_passwd, Imap, Multihop, Phf, Spy, Warezclient, Warezmaster - Unauthorized access from remote machine
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 p-3 rounded-lg border border-blue-500/30 flex flex-col items-center text-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-10 w-10 rounded-full bg-blue-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="font-medium text-blue-400">U2R</span>
                  <span className="text-xs text-gray-400 mt-1">User to Root</span>
                  <div className="hidden group-hover:block absolute -bottom-1 left-0 right-0 bg-gradient-to-t from-blue-500/30 to-transparent p-2 transform transition-transform duration-300 text-xs text-blue-300 max-h-24 overflow-y-auto z-10">
                    Buffer_overflow, Loadmodule, Perl, Rootkit - Unauthorized access to local superuser privileges
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300">
                Our system processes this complex multi-class data through an ensemble of specialized models, each targeting different aspects of network behavior to achieve superior detection rates.
              </p>
            </CyberCardContent>
          </CyberCard>
          
          <CyberCard className="overflow-hidden group relative hover:border-purple-500 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CyberCardContent>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-purple-500 mr-3" />
                <h3 className="font-semibold text-xl">Key Statistics</h3>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#111]/60 to-[#222]/60 p-4 rounded-lg border border-blue-500/20 overflow-hidden relative">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                    <h4 className="text-sm text-gray-400 mb-1">Total Records</h4>
                    <p className="text-3xl font-bold text-white relative z-10">
                      <span className="text-blue-400">5,209,460</span>
                      <span className="text-xs text-gray-500 ml-2">connections</span>
                    </p>
                    <div className="w-full h-1 bg-[#333] mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#111]/60 to-[#222]/60 p-4 rounded-lg border border-purple-500/20 overflow-hidden relative">
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                    <h4 className="text-sm text-gray-400 mb-1">Attack Classes</h4>
                    <p className="text-3xl font-bold text-white relative z-10">
                      <span className="text-purple-400">23</span>
                      <span className="text-xs text-gray-500 ml-2">distinct types</span>
                    </p>
                    <div className="flex mt-3">
                      <div className="h-3 rounded-l-full bg-green-500 w-[60%]"></div>
                      <div className="h-3 bg-red-500 w-[20%]"></div>
                      <div className="h-3 bg-amber-500 w-[10%]"></div>
                      <div className="h-3 bg-lime-500 w-[7%]"></div>
                      <div className="h-3 rounded-r-full bg-blue-500 w-[3%]"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#111]/60 to-[#222]/60 p-4 rounded-lg border border-cyan-500/20 overflow-hidden relative">
                    <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
                    <h4 className="text-sm text-gray-400 mb-1">Features Used</h4>
                    <p className="text-3xl font-bold text-white relative z-10">
                      <span className="text-cyan-400">41</span>
                      <span className="text-xs text-gray-500 ml-2">parameters</span>
                    </p>
                    <div className="grid grid-cols-10 gap-1 mt-3">
                      {Array.from({ length: 41 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="h-2 rounded-full bg-cyan-500/70 animate-pulse" 
                          style={{ 
                            animationDelay: `${i * 50}ms`,
                            opacity: 0.3 + Math.random() * 0.7 
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CyberCardContent>
          </CyberCard>
        </div>
        
        {/* Data Distribution & Feature Importance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CyberCard className="overflow-hidden group relative hover:border-blue-500 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CyberCardContent>
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="font-semibold text-xl">Class Distribution</h3>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={dataDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {dataDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Proportion']}
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span className="text-sm text-gray-300">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <p className="text-gray-400 text-sm mt-2 text-center">
                The KDD dataset contains a significant class imbalance, especially for User-to-Root (U2R) attacks, 
                requiring special balancing techniques.
              </p>
            </CyberCardContent>
          </CyberCard>
          
          <CyberCard className="overflow-hidden group relative hover:border-purple-500 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CyberCardContent>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-purple-500 mr-3" />
                <h3 className="font-semibold text-xl">Feature Importance</h3>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={featureImportance}>
                    <PolarGrid strokeOpacity={0.3} />
                    <PolarAngleAxis 
                      dataKey="feature" 
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                    <Radar
                      name="Feature Significance"
                      dataKey="score"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                      dot={CustomizedDot}
                      className="animate-pulse"
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Importance']}
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <p className="text-gray-400 text-sm mt-2 text-center">
                Key network features like login attempts and SYN flag counts are critical indicators
                that our models use to identify potential attacks.
              </p>
            </CyberCardContent>
          </CyberCard>
        </div>
        
        {/* Ensemble Architecture */}
        <CyberCard className="mb-8 overflow-hidden group relative hover:border-cyan-500 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CyberCardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Cpu className="w-6 h-6 text-cyan-500 mr-3" />
                <h3 className="font-semibold text-xl">Ensemble Model Architecture</h3>
              </div>
              <button 
                onClick={() => setShowEnsembleDetails(!showEnsembleDetails)}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 flex items-center
                  ${showEnsembleDetails 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 border border-gray-700'}`}
              >
                {showEnsembleDetails ? 'Hide Details' : 'Show All Details'}
                <ChevronRight className={`w-3 h-3 ml-1 transition-transform duration-300 ${showEnsembleDetails ? 'rotate-90' : ''}`} />
              </button>
            </div>
            
            <div className="mb-6 bg-gradient-to-r from-[#111]/80 to-[#222]/80 p-4 rounded-lg border border-cyan-500/20">
              <p className="text-gray-300 text-sm">
                Our detection system integrates three specialized models in an ensemble architecture:
                <span className="text-green-400 font-medium"> CNN</span> for spatial pattern detection, 
                <span className="text-amber-400 font-medium"> DNN</span> for complex feature relationships, and 
                <span className="text-red-400 font-medium"> Random Forest</span> for robust classification.
                These models work in parallel and their predictions are combined to provide accurate intrusion detection.
              </p>
            </div>
            
            {/* Detection Pipeline Visualization */}
            <div className="flex flex-col items-center justify-center mb-10 overflow-hidden">
              <div className="w-full max-w-4xl relative py-8">
                {/* Pipeline Flow Backdrop */}
                <div className="absolute w-full h-16 top-1/2 -mt-8 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5 
                  rounded-full blur-md"></div>
                
                {/* Connection Lines */}
                <div className="absolute w-full h-1 top-1/2 left-0 right-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40"></div>
                
                {/* Animated Flow Indicators */}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute h-2 w-8 rounded-full bg-white/30 top-1/2 -mt-1 animate-flow-right"
                    style={{ 
                      left: `${(i * 20) - 10}%`, 
                      animationDelay: `${i * 0.7}s`,
                      opacity: 0.5
                    }}
                  ></div>
                ))}
                
                {/* Detection Pipeline Steps */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                  {/* Input Data */}
                  <div className={`bg-gradient-to-b from-blue-500/20 to-blue-600/10 p-4 rounded-lg border border-blue-500/30
                    flex flex-col items-center text-center transition-all duration-500 transform 
                    ${showEnsembleDetails ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                    <div className="h-12 w-12 rounded-full bg-blue-500/30 flex items-center justify-center mb-3">
                      <Database className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-medium text-blue-400 mb-2">Input</h4>
                    <div className="text-xs text-gray-300 mb-3">Network Traffic Data</div>
                    
                    {showEnsembleDetails && (
                      <div className="mt-2 animate-fade-in w-full">
                        <div className="space-y-1.5">
                          {['Protocol', 'Duration', 'Flags', 'Packets'].map((feature, i) => (
                            <div key={i} className="flex justify-between items-center">
                              <span className="text-[10px] text-gray-400">{feature}</span>
                              <div className="h-1.5 w-2/3 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500/60 rounded-full animate-pulse" 
                                  style={{ width: `${60 + Math.random() * 40}%`, animationDelay: `${i * 0.2}s` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CNN Model */}
                  <div className={`bg-gradient-to-b from-green-500/20 to-green-600/10 p-4 rounded-lg border border-green-500/30 
                    flex flex-col items-center text-center transition-all duration-500 transform 
                    ${showEnsembleDetails ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                    <div className="h-12 w-12 rounded-full bg-green-500/30 flex items-center justify-center mb-3">
                      <Grid className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-medium text-green-400 mb-2">CNN</h4>
                    <div className="text-xs text-gray-300 mb-3">Traffic Pattern Recognition</div>
                    
                    {showEnsembleDetails && (
                      <div className="flex flex-col items-center mt-2 animate-fade-in">
                        <div className="grid grid-cols-4 gap-0.5 mb-2">
                          {[...Array(16)].map((_, i) => (
                            <div 
                              key={i} 
                              className="w-3 h-3 bg-green-500/30 border border-green-500/20 rounded-sm"
                              style={{ 
                                opacity: 0.3 + Math.random() * 0.7,
                                animationDelay: `${i * 0.05}s`
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div className="w-6 h-1 bg-green-500/40"></div>
                              <div className="w-4 h-4 rounded-full bg-green-500/30 flex items-center justify-center mt-1">
                                <span className="text-[8px] text-green-300">C{i+1}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* DNN Model */}
                  <div className={`bg-gradient-to-b from-amber-500/20 to-amber-600/10 p-4 rounded-lg border border-amber-500/30 
                    flex flex-col items-center text-center transition-all duration-500 transform
                    ${showEnsembleDetails ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                    <div className="h-12 w-12 rounded-full bg-amber-500/30 flex items-center justify-center mb-3">
                      <Network className="w-6 h-6 text-amber-400" />
                    </div>
                    <h4 className="font-medium text-amber-400 mb-2">DNN</h4>
                    <div className="text-xs text-gray-300 mb-3">Feature Relationship Analysis</div>
                    
                    {showEnsembleDetails && (
                      <div className="mt-2 animate-fade-in">
                        <div className="relative h-16 w-full">
                          {/* Input layer nodes */}
                          <div className="absolute top-0 left-0 flex flex-col space-y-1">
                            {[...Array(3)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-3 h-3 rounded-full bg-amber-500/40 animate-pulse"
                                style={{ animationDelay: `${i * 0.3}s` }}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Hidden layer nodes */}
                          <div className="absolute top-0 left-1/3 flex flex-col space-y-1">
                            {[...Array(4)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-3 h-3 rounded-full bg-amber-500/30"
                              ></div>
                            ))}
                          </div>
                          
                          {/* Hidden layer 2 nodes */}
                          <div className="absolute top-0 left-2/3 flex flex-col space-y-1">
                            {[...Array(4)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-3 h-3 rounded-full bg-amber-500/30"
                              ></div>
                            ))}
                          </div>
                          
                          {/* Output layer nodes */}
                          <div className="absolute top-0 right-0 flex flex-col space-y-1">
                            {[...Array(2)].map((_, i) => (
                              <div 
                                key={i} 
                                className="w-3 h-3 rounded-full bg-amber-500/40 animate-pulse"
                                style={{ animationDelay: `${i * 0.3 + 0.2}s` }}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Connection lines */}
                          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                            <g opacity="0.2">
                              {/* Draw connections from input to first hidden layer */}
                              {[...Array(3)].map((_, i) => (
                                [...Array(4)].map((_, j) => (
                                  <line 
                                    key={`${i}-${j}-1`} 
                                    x1="3" 
                                    y1={i * 4 + 1.5} 
                                    x2={(1/3) * 100 - 3} 
                                    y2={j * 4 + 1.5} 
                                    stroke="#fbbf24" 
                                    strokeWidth="0.5" 
                                  />
                                ))
                              ))}
                              
                              {/* Draw connections from first to second hidden layer */}
                              {[...Array(4)].map((_, i) => (
                                [...Array(4)].map((_, j) => (
                                  <line 
                                    key={`${i}-${j}-2`} 
                                    x1={(1/3) * 100 + 3} 
                                    y1={i * 4 + 1.5} 
                                    x2={(2/3) * 100 - 3} 
                                    y2={j * 4 + 1.5} 
                                    stroke="#fbbf24" 
                                    strokeWidth="0.5" 
                                  />
                                ))
                              ))}
                              
                              {/* Draw connections from second hidden to output layer */}
                              {[...Array(4)].map((_, i) => (
                                [...Array(2)].map((_, j) => (
                                  <line 
                                    key={`${i}-${j}-3`} 
                                    x1={(2/3) * 100 + 3} 
                                    y1={i * 4 + 1.5} 
                                    x2="100%" 
                                    y2={j * 4 + 1.5} 
                                    stroke="#fbbf24" 
                                    strokeWidth="0.5" 
                                  />
                                ))
                              ))}
                            </g>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Random Forest Model */}
                  <div className={`bg-gradient-to-b from-red-500/20 to-red-600/10 p-4 rounded-lg border border-red-500/30 
                    flex flex-col items-center text-center transition-all duration-500 transform
                    ${showEnsembleDetails ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                    <div className="h-12 w-12 rounded-full bg-red-500/30 flex items-center justify-center mb-3">
                      <Trees className="w-6 h-6 text-red-400" />
                    </div>
                    <h4 className="font-medium text-red-400 mb-2">Random Forest</h4>
                    <div className="text-xs text-gray-300 mb-3">Decision Tree Ensemble</div>
                    
                    {showEnsembleDetails && (
                      <div className="mt-2 animate-fade-in">
                        <div className="flex space-x-2 justify-center">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-red-500/40 flex items-center justify-center">
                                <span className="text-[8px] text-red-200">T{i+1}</span>
                              </div>
                              
                              <div className="w-px h-2 bg-red-500/30 my-1"></div>
                              
                              <div className="flex space-x-2">
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-2 bg-red-500/30"></div>
                                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-2 bg-red-500/30"></div>
                                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Output - User Interface */}
                  <div className={`bg-gradient-to-b from-purple-500/20 to-purple-600/10 p-4 rounded-lg border border-purple-500/30 
                    flex flex-col items-center text-center transition-all duration-500 transform
                    ${showEnsembleDetails ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                    <div className="h-12 w-12 rounded-full bg-purple-500/30 flex items-center justify-center mb-3">
                      <Shield className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-medium text-purple-400 mb-2">User Interface</h4>
                    <div className="text-xs text-gray-300 mb-3">Intrusion Analysis Dashboard</div>
                    
                    {showEnsembleDetails && (
                      <div className="mt-2 animate-fade-in w-full">
                        <div className="w-full h-4 bg-gray-800 rounded-full mb-2 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 animate-pulse-slow rounded-full"
                            style={{ width: '75%' }}>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-green-400">Safe</span>
                          <span className="text-amber-400">Warning</span>
                          <span className="text-red-400">Alert</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ensemble model description */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
              style={{
                opacity: showEnsembleDetails ? 1 : 0,
                height: showEnsembleDetails ? 'auto' : '0',
                overflow: 'hidden',
                transition: 'opacity 0.5s ease, height 0.5s ease'
              }}
            >
              {/* CNN Details */}
              <div className="bg-gradient-to-r from-[#111]/60 to-[#222]/60 p-4 rounded-lg border border-green-500/20 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                    <Grid className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-green-400 font-medium">Convolutional Neural Network</h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Detects spatial patterns in network traffic by treating packets as images. 
                      Specialized in identifying DoS and Probe attacks through their distinctive traffic signatures.
                      Uses 1D and 2D convolutions with multiple filter sizes to capture patterns at different scales.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* DNN Details */}
              <div className="bg-gradient-to-r from-[#111]/60 to-[#222]/60 p-4 rounded-lg border border-amber-500/20 relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-amber-400 font-medium">Deep Neural Network</h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Analyzes complex relationships between features for nuanced intrusion detection.
                      Particularly strong at identifying U2R attacks which often appear as normal traffic but with subtle anomalies.
                      Features multiple hidden layers with dropout for regularization.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Random Forest Details */}
              <div className="bg-gradient-to-r from-[#111]/60 to-[#222]/60 p-4 rounded-lg border border-red-500/20 relative overflow-hidden">
                <div className="absolute -right-5 -bottom-5 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center flex-shrink-0">
                    <Trees className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-red-400 font-medium">Random Forest</h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Makes robust decisions through an ensemble of decision trees.
                      Excels at detecting R2L attacks by identifying unusual access patterns.
                      Handles imbalanced data well and provides interpretable feature importance
                      metrics for forensic analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                className={`px-4 py-2 rounded-lg flex items-center text-sm 
                  ${showEnsembleDetails 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'}`}
                onClick={() => setShowEnsembleDetails(!showEnsembleDetails)}
              >
                {showEnsembleDetails ? 'Hide Details' : 'Show All Details'}
                <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showEnsembleDetails ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </CyberCardContent>
        </CyberCard>
        
        {/* Detection Architecture */}
        <CyberCard className="overflow-hidden group relative hover:border-purple-500 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CyberCardContent>
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="font-semibold text-xl">Detection Architecture Workflow</h3>
            </div>
            
            {/* Input-CNN-DNN-RF-Output Pipeline */}
            <div className="bg-gradient-to-r from-[#111]/80 to-[#222]/80 p-6 rounded-lg border border-purple-500/20 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
                {/* Connection line */}
                <div className="absolute top-16 left-16 right-16 h-0.5 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 hidden lg:block"></div>
                
                {/* Flow indicators */}
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute h-1.5 w-6 rounded-full bg-white/30 top-16 animate-flow-right hidden lg:block"
                    style={{ 
                      left: `${(i * 25) + 15}%`, 
                      animationDelay: `${i * 0.7}s`,
                      opacity: 0.5
                    }}
                  ></div>
                ))}
                
                {/* Input */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-3">
                      <Database className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center animate-pulse">
                      <span className="text-xs font-medium text-blue-300">1</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-blue-400 mb-1">Input</h4>
                  <p className="text-xs text-gray-400">Network packet data with 41 feature parameters</p>
                </div>
                
                {/* CNN */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-3">
                      <Grid className="w-10 h-10 text-green-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center animate-pulse">
                      <span className="text-xs font-medium text-green-300">2</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-green-400 mb-1">CNN</h4>
                  <p className="text-xs text-gray-400">Pattern detection for DoS & Probe attacks</p>
                </div>
                
                {/* DNN */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-3">
                      <Network className="w-10 h-10 text-amber-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500/30 flex items-center justify-center animate-pulse">
                      <span className="text-xs font-medium text-amber-300">3</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-amber-400 mb-1">DNN</h4>
                  <p className="text-xs text-gray-400">Deep analysis for subtle U2R attacks</p>
                </div>
                
                {/* Random Forest */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3">
                      <Trees className="w-10 h-10 text-red-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center animate-pulse">
                      <span className="text-xs font-medium text-red-300">4</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-red-400 mb-1">Random Forest</h4>
                  <p className="text-xs text-gray-400">Decision trees for R2L attack detection</p>
                </div>
                
                {/* User Friendly System */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-3">
                      <div className="relative">
                        <Shield className="w-10 h-10 text-purple-400" />
                        <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center animate-pulse">
                      <span className="text-xs font-medium text-purple-300">5</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-purple-400 mb-1">User Friendly System</h4>
                  <p className="text-xs text-gray-400">Intuitive dashboard and alerts</p>
                </div>
              </div>
            </div>
            
            {/* Interactive Steps Explanation */}
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <h4 className="text-sm font-medium text-gray-300">Processing Steps:</h4>
              </div>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-blue-400">1</span>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-blue-400 text-sm font-medium">Network Traffic Processing</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Raw network packets are captured, transformed into 41-dimensional feature vectors, and normalized to prepare for model input. Features include protocol type, connection duration, source/destination bytes, and flag combinations.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-green-400">2</span>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-green-400 text-sm font-medium">Spatial Pattern Detection (CNN)</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Features are arranged in grid patterns and processed through convolutional layers to detect spatial relationships. This excels at identifying DoS attacks like SYN floods that have distinctive recurring patterns.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-amber-400">3</span>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-amber-400 text-sm font-medium">Deep Feature Analysis (DNN)</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Deep neural networks extract complex non-linear relationships between features through multiple stacked hidden layers. This approach is particularly effective for catching subtle User-to-Root attacks that manipulate legitimate access patterns.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-red-400">4</span>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-red-400 text-sm font-medium">Decision Tree Ensemble (Random Forest)</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Multiple decision trees vote on intrusion classifications, handling the categorical nature of many network features. This method provides interpretable results and performs exceptionally well on Remote-to-Local attacks like password guessing and unauthorized data transfers.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-purple-400">5</span>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-purple-400 text-sm font-medium">User-Friendly Dashboard</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Model predictions are combined through weighted ensemble methods and presented in an intuitive dashboard. The interface provides real-time alerts, risk assessments, and automated response recommendations to protect network resources.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>
    </section>
  );
}
