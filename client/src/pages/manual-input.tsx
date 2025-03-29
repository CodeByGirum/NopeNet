import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { 
  AlertTriangle, Database, FileText, Upload, RefreshCw, CheckCircle2, 
  Shield, Activity, Network, Lock, Server
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

export default function ManualInput() {
  const [trafficData, setTrafficData] = useState<string>('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('form');
  const [sampleDataType, setSampleDataType] = useState<string>('normal');
  const [featureValues, setFeatureValues] = useState<Record<string, number>>({
    src_bytes: 500,
    dst_bytes: 2000,
    count: 5,
    srv_count: 3,
    same_srv_rate: 0.8,
    diff_srv_rate: 0.2,
    dst_host_count: 15,
    dst_host_srv_count: 8
  });

  // Sample template data
  const sampleTemplates = {
    normal: {
      src: "192.168.1.100",
      dst: "10.0.0.1",
      protocol_type: "tcp",
      service: "http",
      flag: "SF",
      src_bytes: 500,
      dst_bytes: 2000,
      land: 0,
      wrong_fragment: 0,
      urgent: 0,
      hot: 0,
      num_failed_logins: 0,
      logged_in: 1,
      num_compromised: 0,
      root_shell: 0,
      su_attempted: 0,
      num_root: 0,
      num_file_creations: 0,
      num_shells: 0,
      num_access_files: 0,
      num_outbound_cmds: 0,
      is_host_login: 0,
      is_guest_login: 0,
      count: 5,
      srv_count: 3,
      serror_rate: 0,
      srv_serror_rate: 0,
      rerror_rate: 0,
      srv_rerror_rate: 0,
      same_srv_rate: 0.8,
      diff_srv_rate: 0.2,
      srv_diff_host_rate: 0.1,
      dst_host_count: 15,
      dst_host_srv_count: 8,
      dst_host_same_srv_rate: 0.9,
      dst_host_diff_srv_rate: 0.1,
      dst_host_same_src_port_rate: 0.1,
      dst_host_srv_diff_host_rate: 0.1,
      dst_host_serror_rate: 0,
      dst_host_srv_serror_rate: 0,
      dst_host_rerror_rate: 0,
      dst_host_srv_rerror_rate: 0,
      timestamp: new Date().toISOString()
    },
    dos: {
      src: "192.168.1.100",
      dst: "10.0.0.1",
      protocol_type: "tcp",
      service: "http",
      flag: "S0",
      src_bytes: 250,
      dst_bytes: 0,
      land: 0,
      wrong_fragment: 0,
      urgent: 0,
      hot: 0,
      num_failed_logins: 0,
      logged_in: 0,
      num_compromised: 0,
      root_shell: 0,
      su_attempted: 0,
      num_root: 0,
      num_file_creations: 0,
      num_shells: 0,
      num_access_files: 0,
      num_outbound_cmds: 0,
      is_host_login: 0,
      is_guest_login: 0,
      count: 150,
      srv_count: 150,
      serror_rate: 1.0,
      srv_serror_rate: 1.0,
      rerror_rate: 0,
      srv_rerror_rate: 0,
      same_srv_rate: 1.0,
      diff_srv_rate: 0,
      srv_diff_host_rate: 0,
      dst_host_count: 255,
      dst_host_srv_count: 255,
      dst_host_same_srv_rate: 1.0,
      dst_host_diff_srv_rate: 0,
      dst_host_same_src_port_rate: 1.0,
      dst_host_srv_diff_host_rate: 0,
      dst_host_serror_rate: 1.0,
      dst_host_srv_serror_rate: 1.0,
      dst_host_rerror_rate: 0,
      dst_host_srv_rerror_rate: 0,
      timestamp: new Date().toISOString()
    },
    probe: {
      src: "192.168.1.100",
      dst: "10.0.0.1",
      protocol_type: "tcp",
      service: "private",
      flag: "REJ",
      src_bytes: 0,
      dst_bytes: 0,
      land: 0,
      wrong_fragment: 0,
      urgent: 0,
      hot: 0,
      num_failed_logins: 0,
      logged_in: 0,
      num_compromised: 0,
      root_shell: 0,
      su_attempted: 0,
      num_root: 0,
      num_file_creations: 0,
      num_shells: 0,
      num_access_files: 0,
      num_outbound_cmds: 0,
      is_host_login: 0,
      is_guest_login: 0,
      count: 3,
      srv_count: 3,
      serror_rate: 0,
      srv_serror_rate: 0,
      rerror_rate: 1.0,
      srv_rerror_rate: 1.0,
      same_srv_rate: 1.0,
      diff_srv_rate: 0,
      srv_diff_host_rate: 1.0,
      dst_host_count: 115,
      dst_host_srv_count: 25,
      dst_host_same_srv_rate: 0.22,
      dst_host_diff_srv_rate: 0.78,
      dst_host_same_src_port_rate: 0.01,
      dst_host_srv_diff_host_rate: 1.0,
      dst_host_serror_rate: 0,
      dst_host_srv_serror_rate: 0,
      dst_host_rerror_rate: 0.99,
      dst_host_srv_rerror_rate: 0.99,
      timestamp: new Date().toISOString()
    }
  };

  const generateTemplate = (type: string) => {
    setSampleDataType(type);
    const template = { ...sampleTemplates[type as keyof typeof sampleTemplates] };
    // Update with current slider values
    setTrafficData(JSON.stringify({ traffic: [template] }, null, 2));
  };

  const updateFeature = (feature: string, value: number) => {
    setFeatureValues(prev => ({
      ...prev,
      [feature]: value
    }));
    
    // Update the traffic data JSON with new value
    try {
      const data = JSON.parse(trafficData);
      if (data.traffic && data.traffic.length > 0) {
        data.traffic[0][feature] = value;
        setTrafficData(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      // If parsing fails, don't update
    }
  };

  const analyzeTraffic = async () => {
    setLoading(true);
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(trafficData);
      } catch (error) {
        toast({
          title: "Invalid JSON",
          description: "Please provide valid JSON data",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Validate the data format
      if (!parsedData.traffic || !Array.isArray(parsedData.traffic) || parsedData.traffic.length === 0) {
        toast({
          title: "Invalid data format",
          description: "Please provide data in the format: { traffic: [...] }",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      const response: any = await apiRequest('/api/analyze/traffic', {
        method: 'POST',
        body: parsedData
      });

      setAnalysisData(response);
      setActiveTab('results');
      toast({
        title: "Analysis Complete",
        description: `Found ${response.summary.attacks} potential threats`,
        variant: response.summary.attacks > 0 ? "destructive" : "default"
      });
    } catch (error) {
      console.error("Error analyzing traffic:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze traffic data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for visualization
  const prepareChartData = () => {
    if (!analysisData || !analysisData.results || analysisData.results.length === 0) {
      return [];
    }

    // Count occurrences of each attack type
    const attackTypes: Record<string, number> = {};
    analysisData.results.forEach((result: any) => {
      const type = result.attackType;
      attackTypes[type] = (attackTypes[type] || 0) + 1;
    });

    // Convert to array for chart
    return Object.keys(attackTypes).map(type => ({
      name: type,
      value: attackTypes[type],
      color: getColorForAttackType(type)
    }));
  };

  const getColorForAttackType = (type: string) => {
    switch (type) {
      case 'normal':
        return '#10b981'; // green
      case 'DoS':
        return '#ef4444'; // red
      case 'Probe':
        return '#f59e0b'; // amber
      case 'R2L':
        return '#84cc16'; // lime
      case 'U2R':
        return '#3b82f6'; // blue
      default:
        return '#8b5cf6'; // purple
    }
  };

  const getIconForAttackType = (type: string) => {
    switch (type) {
      case 'normal':
        return <Server className="w-5 h-5 text-green-400" />;
      case 'DoS':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'Probe':
        return <Activity className="w-5 h-5 text-amber-400" />;
      case 'R2L':
        return <Network className="w-5 h-5 text-lime-400" />;
      case 'U2R':
        return <Lock className="w-5 h-5 text-blue-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Manual Traffic Analysis
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span>
          </h2>
          <p className="text-gray-400 max-w-3xl">
            Analyze network traffic data by manually inputting connection details. Our ML ensemble will detect potential intrusions and identify the attack type.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black border border-gray-800">
            <TabsTrigger value="form" className="data-[state=active]:bg-gray-800">
              <FileText className="w-4 h-4 mr-2" />
              Input Data
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-gray-800" disabled={!analysisData}>
              <Database className="w-4 h-4 mr-2" />
              Analysis Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CyberCard className="overflow-hidden group relative hover:border-blue-500 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CyberCardContent>
                    <div className="flex items-center mb-4">
                      <FileText className="w-6 h-6 text-blue-500 mr-3" />
                      <h3 className="font-semibold text-xl">Network Traffic Data</h3>
                    </div>
                    
                    <Textarea 
                      className="min-h-[400px] font-mono text-sm bg-black border-gray-800 focus:border-blue-500 mb-4"
                      placeholder="Enter network traffic data in JSON format..."
                      value={trafficData}
                      onChange={(e) => setTrafficData(e.target.value)}
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <Button 
                        variant="outline"
                        onClick={() => setTrafficData(JSON.stringify({ traffic: [{}] }, null, 2))}
                        className="bg-transparent border-gray-700 hover:bg-gray-900 hover:text-white"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                      <Button 
                        onClick={analyzeTraffic}
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Analyze Traffic
                          </>
                        )}
                      </Button>
                    </div>
                  </CyberCardContent>
                </CyberCard>
              </div>
              
              <div>
                <CyberCard className="overflow-hidden group relative hover:border-purple-500 transition-colors duration-300 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CyberCardContent>
                    <div className="flex items-center mb-4">
                      <Upload className="w-6 h-6 text-purple-500 mr-3" />
                      <h3 className="font-semibold text-xl">Templates</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      Use these templates as starting points for different traffic types
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => generateTemplate('normal')}
                        className={`justify-start border ${sampleDataType === 'normal' ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-transparent'} hover:bg-gray-900 hover:text-white`}
                      >
                        <Server className="w-4 h-4 mr-2 text-green-400" />
                        Normal Traffic
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => generateTemplate('dos')}
                        className={`justify-start border ${sampleDataType === 'dos' ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-transparent'} hover:bg-gray-900 hover:text-white`}
                      >
                        <Shield className="w-4 h-4 mr-2 text-red-400" />
                        DoS Attack
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => generateTemplate('probe')}
                        className={`justify-start border ${sampleDataType === 'probe' ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 bg-transparent'} hover:bg-gray-900 hover:text-white`}
                      >
                        <Activity className="w-4 h-4 mr-2 text-amber-400" />
                        Probe Attack
                      </Button>
                    </div>
                  </CyberCardContent>
                </CyberCard>
                
                <CyberCard className="overflow-hidden group relative hover:border-blue-500 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CyberCardContent>
                    <div className="flex items-center mb-4">
                      <Database className="w-6 h-6 text-blue-500 mr-3" />
                      <h3 className="font-semibold text-xl">Adjust Features</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      Modify key features to see how they affect detection
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Source Bytes: {featureValues.src_bytes}</label>
                        <Slider 
                          value={[featureValues.src_bytes]}
                          min={0} 
                          max={10000} 
                          step={100}
                          onValueChange={(value) => updateFeature('src_bytes', value[0])}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Destination Bytes: {featureValues.dst_bytes}</label>
                        <Slider 
                          value={[featureValues.dst_bytes]}
                          min={0} 
                          max={10000} 
                          step={100}
                          onValueChange={(value) => updateFeature('dst_bytes', value[0])}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Connection Count: {featureValues.count}</label>
                        <Slider 
                          value={[featureValues.count]}
                          min={1} 
                          max={500} 
                          step={1}
                          onValueChange={(value) => updateFeature('count', value[0])}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Same Service Rate: {featureValues.same_srv_rate.toFixed(2)}</label>
                        <Slider 
                          value={[featureValues.same_srv_rate]}
                          min={0} 
                          max={1} 
                          step={0.01}
                          onValueChange={(value) => updateFeature('same_srv_rate', value[0])}
                          className="mb-4"
                        />
                      </div>
                    </div>
                  </CyberCardContent>
                </CyberCard>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {analysisData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <CyberCard className="lg:col-span-2 overflow-hidden group relative hover:border-blue-500 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CyberCardContent>
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-blue-500 mr-3" />
                      <h3 className="font-semibold text-xl">Detection Results</h3>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <div className={`px-3 py-1 rounded-full flex items-center ${
                          analysisData.summary.attacks > 0 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {analysisData.summary.attacks > 0 
                            ? <AlertTriangle className="w-4 h-4 mr-1" /> 
                            : <CheckCircle2 className="w-4 h-4 mr-1" />
                          }
                          <span className="font-medium">
                            {analysisData.summary.attacks > 0 
                              ? `${analysisData.summary.attacks} potential threats detected` 
                              : 'No threats detected'
                            }
                          </span>
                        </div>
                        <div className="ml-auto text-sm text-gray-400">
                          Confidence: {(analysisData.summary.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border border-gray-800 overflow-hidden">
                      <div className="bg-gray-900 px-4 py-3 border-b border-gray-800">
                        <h4 className="font-medium text-white">Traffic Analysis</h4>
                      </div>
                      <ScrollArea className="h-[320px]">
                        <div className="divide-y divide-gray-800">
                          {analysisData.results.length > 0 ? (
                            analysisData.results.map((result: any, index: number) => (
                              <div key={index} className="p-4 hover:bg-gray-900/50 transition-colors">
                                <div className="flex items-start">
                                  <div className={`p-2 rounded-lg mr-3 ${
                                    result.attackType === 'normal' 
                                      ? 'bg-green-500/20' 
                                      : 'bg-red-500/20'
                                  }`}>
                                    {getIconForAttackType(result.attackType)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <h5 className="font-medium">{result.sourceIp}</h5>
                                      <div className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                        result.attackType === 'normal' 
                                          ? 'bg-green-500/20 text-green-400' 
                                          : 'bg-red-500/20 text-red-400'
                                      }`}>
                                        {result.attackType}
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">
                                      Confidence: {(result.confidence * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {new Date(result.timestamp).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-400">
                              No data to display
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </CyberCardContent>
                </CyberCard>
                
                <CyberCard className="overflow-hidden group relative hover:border-purple-500 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CyberCardContent>
                    <div className="flex items-center mb-4">
                      <Activity className="w-6 h-6 text-purple-500 mr-3" />
                      <h3 className="font-semibold text-xl">Attack Distribution</h3>
                    </div>
                    
                    <div className="h-64 mb-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={prepareChartData()}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {prepareChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [value, 'Count']}
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
                    
                    <div className="space-y-2 mt-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800">
                        <div className="text-xs text-gray-400 mb-1">Average Confidence</div>
                        <div className="text-lg font-medium">{(analysisData.summary.confidence * 100).toFixed(1)}%</div>
                        <div className="w-full h-1 bg-gray-800 mt-1 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                            style={{ width: `${analysisData.summary.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800">
                        <div className="text-xs text-gray-400 mb-1">Total Records</div>
                        <div className="text-lg font-medium">{analysisData.summary.total}</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setActiveTab('form')}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Analyze New Data
                    </Button>
                  </CyberCardContent>
                </CyberCard>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}