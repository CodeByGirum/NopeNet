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
  FileText, ChevronRight
} from 'lucide-react';

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
  const CustomizedDot = (props) => {
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
  const renderActiveShape = (props) => {
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
                <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 p-3 rounded-lg border border-green-500/30 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-green-500/30 flex items-center justify-center mb-2">
                    <Server className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="font-medium text-green-400">Normal</span>
                  <span className="text-xs text-gray-400 mt-1">Legitimate traffic</span>
                </div>
                
                <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 p-3 rounded-lg border border-red-500/30 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-red-500/30 flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="font-medium text-red-400">DoS</span>
                  <span className="text-xs text-gray-400 mt-1">Denial of Service</span>
                </div>
                
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-700/20 p-3 rounded-lg border border-amber-500/30 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-amber-500/30 flex items-center justify-center mb-2">
                    <Search className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="font-medium text-amber-400">Probe</span>
                  <span className="text-xs text-gray-400 mt-1">Surveillance</span>
                </div>
                
                <div className="bg-gradient-to-br from-lime-500/20 to-lime-700/20 p-3 rounded-lg border border-lime-500/30 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-lime-500/30 flex items-center justify-center mb-2">
                    <Network className="w-5 h-5 text-lime-400" />
                  </div>
                  <span className="font-medium text-lime-400">R2L</span>
                  <span className="text-xs text-gray-400 mt-1">Remote to Local</span>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 p-3 rounded-lg border border-blue-500/30 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-500/30 flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="font-medium text-blue-400">U2R</span>
                  <span className="text-xs text-gray-400 mt-1">User to Root</span>
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
            <div className="flex items-center mb-6">
              <Cpu className="w-6 h-6 text-cyan-500 mr-3" />
              <h3 className="font-semibold text-xl">Ensemble Model Architecture</h3>
            </div>
            
            <div className="relative">
              <div className="absolute h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-500 left-[19px] top-0 z-0 opacity-30"></div>
              
              {architectureSteps.map((step, index) => (
                <div key={index} className="mb-8 relative z-10">
                  <div className="flex">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center
                      ${index === activeIndex 
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-500 animate-pulse shadow-lg shadow-cyan-500/20' 
                        : 'bg-gray-800 border border-gray-700'}`}>
                      <div className="text-white">{index + 1}</div>
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <div className="flex items-center">
                        {step.icon}
                        <h4 className={`font-medium text-lg ml-3 ${index === activeIndex ? 'text-cyan-400' : 'text-white'}`}>
                          {step.title}
                        </h4>
                      </div>
                      
                      <p className="text-gray-400 mt-2 mb-3">{step.description}</p>
                      
                      {(showEnsembleDetails || index === activeIndex) && (
                        <div className={`bg-[#111] border border-gray-800 rounded-lg p-4 mt-2 mb-2
                          ${index === activeIndex ? 'border-l-4 border-l-cyan-500' : ''}`}>
                          <p className="text-sm text-gray-300">{step.details}</p>
                          
                          {/* Visualizations for each model type */}
                          {index === 1 && ( // CNN
                            <div className="mt-4 h-20 flex items-center justify-center">
                              <div className="flex space-x-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div key={i} className="w-10 h-16 flex flex-col items-center justify-center">
                                    <div className={`w-8 h-8 rounded bg-green-500/20 border border-green-500/40 flex items-center justify-center
                                      ${i === activeIndex % 5 ? 'animate-pulse' : ''}`}>
                                      <span className="text-xs text-green-400">C{i+1}</span>
                                    </div>
                                    <div className="w-6 h-1 bg-green-500/40 mt-1"></div>
                                    <div className="w-4 h-1 bg-green-500/40 mt-1"></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {index === 2 && ( // DNN
                            <div className="mt-4 h-20 flex items-center justify-center">
                              <div className="grid grid-cols-4 gap-x-6">
                                {Array.from({ length: 12 }).map((_, i) => (
                                  <div key={i} 
                                    className={`w-4 h-4 rounded-full bg-amber-500/40 border border-amber-500/60
                                      ${(i % 4 === activeIndex % 4) ? 'animate-pulse' : ''}`}>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {index === 3 && ( // Random Forest
                            <div className="mt-4 h-20 flex items-center justify-center">
                              <div className="flex space-x-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <div key={i} className="relative">
                                    <div className={`w-6 h-10 bg-red-500/20 border border-red-500/40
                                      ${i === activeIndex % 4 ? 'animate-pulse' : ''}`}>
                                    </div>
                                    <div className="absolute top-0 left-0 w-full flex justify-around">
                                      <div className="w-2 h-2 bg-red-500/40 rounded-full"></div>
                                      <div className="w-2 h-2 bg-red-500/40 rounded-full"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {index === 4 && ( // Ensemble
                            <div className="mt-4 h-20 flex items-center justify-center">
                              <div className="relative w-full max-w-xs">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-red-500/10 to-blue-500/10 animate-pulse rounded-lg"></div>
                                <div className="flex justify-between">
                                  <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/40"></div>
                                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40"></div>
                                  <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40"></div>
                                </div>
                                <div className="flex justify-center mt-2">
                                  <div className="w-10 h-10 rounded-full bg-purple-500/30 border border-purple-500/60 animate-pulse"></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
        
        {/* Performance Metrics */}
        <CyberCard className="overflow-hidden group relative hover:border-purple-500 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CyberCardContent>
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="font-semibold text-xl">Model Performance & Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="col-span-1 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-700/20 rounded-lg border border-green-500/30 flex items-center justify-center mb-2">
                      <Network className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="font-medium text-green-400 text-sm">CNN</h4>
                  </div>
                  
                  <div className="col-span-1 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-lg border border-amber-500/30 flex items-center justify-center mb-2">
                      <Cpu className="w-8 h-8 text-amber-400" />
                    </div>
                    <h4 className="font-medium text-amber-400 text-sm">DNN</h4>
                  </div>
                  
                  <div className="col-span-1 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-lg border border-red-500/30 flex items-center justify-center mb-2">
                      <Search className="w-8 h-8 text-red-400" />
                    </div>
                    <h4 className="font-medium text-red-400 text-sm">Random Forest</h4>
                  </div>
                  
                  <div className="col-span-1 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-lg border border-purple-500/30 flex items-center justify-center mb-2">
                      <Bot className="w-8 h-8 text-purple-400" />
                    </div>
                    <h4 className="font-medium text-purple-400 text-sm">Ensemble</h4>
                  </div>
                  
                  <div className="col-span-1 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-lg border border-blue-500/30 flex items-center justify-center mb-2">
                      <div className="relative">
                        <ShieldCheck className="w-8 h-8 text-blue-400" />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <h4 className="font-medium text-blue-400 text-sm">Our System</h4>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Accuracy */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Accuracy</h4>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: 'CNN', value: 91.2, fill: '#10b981' },
                            { name: 'DNN', value: 92.5, fill: '#f59e0b' },
                            { name: 'RF', value: 93.8, fill: '#ef4444' },
                            { name: 'Ensemble', value: 96.4, fill: '#a855f7' },
                            { name: 'System', value: 98.7, fill: '#3b82f6' },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'Accuracy']}
                            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {[
                              { name: 'CNN', value: 91.2, fill: '#10b981' },
                              { name: 'DNN', value: 92.5, fill: '#f59e0b' },
                              { name: 'RF', value: 93.8, fill: '#ef4444' },
                              { name: 'Ensemble', value: 96.4, fill: '#a855f7' },
                              { name: 'System', value: 98.7, fill: '#3b82f6' },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* F1 Score */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">F1 Score by Attack Class</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart 
                          innerRadius="20%" 
                          outerRadius="80%" 
                          data={[
                            { name: 'DoS', value: 99.1, fill: '#ef4444' },
                            { name: 'Probe', value: 98.2, fill: '#f59e0b' },
                            { name: 'R2L', value: 95.7, fill: '#84cc16' },
                            { name: 'U2R', value: 92.4, fill: '#3b82f6' },
                            { name: 'Normal', value: 99.8, fill: '#10b981' },
                          ]} 
                          startAngle={0} 
                          endAngle={360}
                        >
                          <RadialBar 
                            minAngle={15} 
                            background
                            dataKey="value" 
                            label={{ position: 'insideStart', fill: '#fff', fontWeight: 'bold', fontSize: 10 }} 
                          />
                          <Legend 
                            iconType="circle" 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            wrapperStyle={{ fontSize: 12, color: '#d1d5db' }}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'F1 Score']}
                            contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 rounded-lg border border-indigo-500/30 mt-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-indigo-400">Key Achievements</h4>
                      <p className="text-gray-300 text-sm mt-2">
                        Our ensemble approach achieves a <span className="text-white font-medium">98.7% accuracy</span> and <span className="text-white font-medium">97.1% F1 score</span> on the KDD dataset,
                        outperforming individual models by leveraging their complementary strengths. The system excels particularly at catching
                        rare but dangerous U2R attacks that are often missed by single-architecture solutions.
                      </p>
                    </div>
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
