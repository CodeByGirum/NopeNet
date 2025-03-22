import { useState } from 'react';
import AIAssistant from '@/sections/education/AIAssistant';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Activity, Shield, ShieldAlert, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';

interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'resolved';
  timestamp: string;
}

interface SecurityScore {
  overall: number;
  network: number;
  data: number;
  authentication: number;
  monitoring: number;
}

export default function Assistant() {
  // Simulated security alerts
  const [securityAlerts] = useState<SecurityAlert[]>([
    {
      id: '1',
      title: 'Unusual authentication pattern detected',
      description: 'Multiple failed login attempts from IP 192.168.1.105',
      severity: 'high',
      status: 'active',
      timestamp: '2023-03-21T14:32:00Z'
    },
    {
      id: '2',
      title: 'Outbound connection to suspicious domain',
      description: 'Connection attempt to known malicious domain detected',
      severity: 'medium',
      status: 'active',
      timestamp: '2023-03-21T10:15:00Z'
    },
    {
      id: '3',
      title: 'Unpatched software vulnerability',
      description: 'System contains software with known CVE-2023-15642',
      severity: 'medium',
      status: 'active',
      timestamp: '2023-03-20T22:47:00Z'
    },
    {
      id: '4',
      title: 'Unusual port scan activity',
      description: 'Port scanning detected from external network',
      severity: 'low',
      status: 'resolved',
      timestamp: '2023-03-19T08:12:00Z'
    }
  ]);

  // Security score data
  const [securityScore] = useState<SecurityScore>({
    overall: 72,
    network: 85,
    data: 65,
    authentication: 80,
    monitoring: 60
  });

  // Helper function to get severity styling
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      case 'medium':
        return { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
      case 'low':
        return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30' };
    }
  };

  // Helper function to get status styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'text-red-400', icon: <AlertCircle className="w-4 h-4" /> };
      case 'resolved':
        return { color: 'text-green-400', icon: <CheckCircle className="w-4 h-4" /> };
      default:
        return { color: 'text-gray-400', icon: <AlertCircle className="w-4 h-4" /> };
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-medium mb-4 text-white">
            Security Assistant
          </h2>
          <p className="text-gray-400 max-w-3xl">
            Your AI-powered security companion that analyzes your system's protection status, 
            explains vulnerabilities in simple language, and takes protective actions on your behalf.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Security status */}
          <div className="lg:col-span-7">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                <TabsTrigger value="alerts" className="text-sm">Alerts</TabsTrigger>
                <TabsTrigger value="recommendations" className="text-sm">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <CyberCard>
                  <CyberCardContent>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-white">Security Score</h3>
                      <div className="text-sm text-gray-400">Last updated: Today, 09:45 AM</div>
                    </div>
                    
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative h-40 w-40 flex items-center justify-center">
                        {/* Score circle */}
                        <div className="absolute inset-0 rounded-full border-8 border-[#222222]" />
                        <div 
                          className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500"
                          style={{ transform: `rotate(${securityScore.overall * 3.6}deg)` }}
                        />
                        <div className="text-center">
                          <div className="text-4xl font-semibold text-white">{securityScore.overall}</div>
                          <div className="text-sm text-gray-400">out of 100</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[#111111] rounded-xl border border-[#222222]">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-blue-400 mr-2" />
                          <div className="text-sm font-medium text-gray-300">Network</div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-medium text-white">{securityScore.network}%</div>
                          <div className="h-1 w-full max-w-[100px] bg-[#333333] rounded-full overflow-hidden ml-4">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${securityScore.network}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-[#111111] rounded-xl border border-[#222222]">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-purple-400 mr-2" />
                          <div className="text-sm font-medium text-gray-300">Data</div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-medium text-white">{securityScore.data}%</div>
                          <div className="h-1 w-full max-w-[100px] bg-[#333333] rounded-full overflow-hidden ml-4">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${securityScore.data}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-[#111111] rounded-xl border border-[#222222]">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-green-400 mr-2" />
                          <div className="text-sm font-medium text-gray-300">Authentication</div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-medium text-white">{securityScore.authentication}%</div>
                          <div className="h-1 w-full max-w-[100px] bg-[#333333] rounded-full overflow-hidden ml-4">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${securityScore.authentication}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-[#111111] rounded-xl border border-[#222222]">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-amber-400 mr-2" />
                          <div className="text-sm font-medium text-gray-300">Monitoring</div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-2xl font-medium text-white">{securityScore.monitoring}%</div>
                          <div className="h-1 w-full max-w-[100px] bg-[#333333] rounded-full overflow-hidden ml-4">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${securityScore.monitoring}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CyberCardContent>
                </CyberCard>
              </TabsContent>
              
              <TabsContent value="alerts">
                <CyberCard>
                  <CyberCardContent>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-white">Security Alerts</h3>
                      <div className="text-sm px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                        {securityAlerts.filter(a => a.status === 'active').length} Active
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {securityAlerts.map(alert => {
                        const severityStyles = getSeverityStyles(alert.severity);
                        const statusStyles = getStatusStyles(alert.status);
                        
                        return (
                          <div 
                            key={alert.id} 
                            className="p-4 bg-[#111111] border border-[#222222] rounded-xl"
                          >
                            <div className="flex items-start">
                              <div className={`p-2 ${severityStyles.bg} ${severityStyles.border} border rounded-lg mr-3 flex-shrink-0`}>
                                <ShieldAlert className={`w-5 h-5 ${severityStyles.color}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-white">{alert.title}</h4>
                                  <div className={`flex items-center ${statusStyles.color} text-xs`}>
                                    {statusStyles.icon}
                                    <span className="ml-1">{alert.status === 'active' ? 'Active' : 'Resolved'}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-400">{alert.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className={`text-xs ${severityStyles.color} px-2 py-0.5 ${severityStyles.bg} ${severityStyles.border} border rounded-full`}>
                                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Priority
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(alert.timestamp).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CyberCardContent>
                </CyberCard>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <CyberCard>
                  <CyberCardContent>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium text-white">Recommendations</h3>
                      <div className="text-sm px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        3 Critical Items
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">Enable Multi-Factor Authentication</h4>
                          <div className="text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-full">
                            Critical
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          MFA adds an essential layer of protection against unauthorized access to your systems.
                        </p>
                        <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                          View Implementation Steps
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      <div className="p-4 border border-orange-500/30 bg-orange-500/5 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">Update Firewall Rules</h4>
                          <div className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full">
                            Important
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          Current firewall configuration allows access from overly permissive IP ranges.
                        </p>
                        <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                          View Recommended Rules
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      <div className="p-4 border border-blue-500/30 bg-blue-500/5 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">Implement Regular Backups</h4>
                          <div className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                            Recommended
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          Set up automated, encrypted backups to protect against ransomware and data loss.
                        </p>
                        <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                          View Backup Solutions
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </CyberCardContent>
                </CyberCard>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column - AI Assistant */}
          <div className="lg:col-span-5">
            <AIAssistant />
          </div>
        </div>
      </div>
    </section>
  );
}