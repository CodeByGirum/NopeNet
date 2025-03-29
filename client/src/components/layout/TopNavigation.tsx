import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { Shield, Bot, AlertOctagon } from 'lucide-react';
import TextPressure from '@/components/text/TextPressure';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQueryClient } from '@tanstack/react-query';

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isActive = (path: string) => location === path;
  
  // Handler for network scan button
  const handleNetworkScan = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    toast({
      title: "Network Scan Initiated",
      description: "Scanning your network for potential security threats...",
      duration: 3000,
    });
    
    try {
      const response = await apiRequest('POST', '/api/scan/network');
      const result = await response.json();
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/attacks/distribution'] });
      queryClient.invalidateQueries({ queryKey: ['/api/attacks/recent'] });
      queryClient.invalidateQueries({ queryKey: ['/api/intrusions'] });
      
      const criticalCount = result.summary.criticalIssues || 0;
      
      if (criticalCount > 0) {
        toast({
          title: "Critical Issues Detected!",
          description: `Found ${criticalCount} critical security issues that require attention.`,
          variant: "destructive",
          duration: 5000,
        });
      } else {
        toast({
          title: "Scan Complete",
          description: `Scanned ${result.summary.devicesScanned} devices. No critical issues found.`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error during network scan:', error);
      toast({
        title: "Scan Failed",
        description: "There was an error performing the network scan. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <header className="relative border-b border-[#222222] backdrop-blur-xl bg-black/80 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <TextPressure 
                text="NopeNet" 
                fontSize={24} 
                color="#ffffff" 
                hoverColor="#00f5ff" 
                textShadowColor="rgba(0, 245, 255, 0.8)"
                className="font-bold"
                duration={0.2}
              />
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard" className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Dashboard
            </Link>
            <Link href="/intrusions" className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/intrusions') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Intrusions
            </Link>
            <Link href="/education" className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/education') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Education
            </Link>
            <Link href="/dataset" className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/dataset') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Dataset
            </Link>
            <Link href="/assistant" className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/assistant') ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Assistant
            </Link>
            
            <button
              onClick={handleNetworkScan}
              disabled={isScanning}
              className={`ml-3 px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-200 flex items-center ${
                isScanning 
                  ? 'bg-blue-700 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <Shield className={`w-4 h-4 mr-2 ${isScanning ? 'animate-pulse' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Scan Now'}</span>
            </button>
          </div>
          
          <div className="flex items-center md:hidden">
            <Link href="/assistant" className={`p-2 rounded-full mr-4 ${isActive('/assistant') ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}>
              <Bot className="w-5 h-5" />
            </Link>
            
            <button 
              type="button" 
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 bg-black/95 backdrop-blur-xl border-b border-[#222222]">
            <Link href="/dashboard" className={`block px-4 py-3 text-base font-medium ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Dashboard
            </Link>
            <Link href="/intrusions" className={`block px-4 py-3 text-base font-medium ${isActive('/intrusions') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Intrusions
            </Link>
            <Link href="/education" className={`block px-4 py-3 text-base font-medium ${isActive('/education') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Education
            </Link>
            <Link href="/dataset" className={`block px-4 py-3 text-base font-medium ${isActive('/dataset') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Dataset
            </Link>
            <Link href="/assistant" className={`block px-4 py-3 text-base font-medium ${isActive('/assistant') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
              Assistant
            </Link>
            <div className="px-4 py-3">
              <button
                onClick={handleNetworkScan}
                disabled={isScanning}
                className={`w-full px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-200 flex items-center justify-center ${
                  isScanning 
                    ? 'bg-blue-700 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <Shield className={`w-4 h-4 mr-2 ${isScanning ? 'animate-pulse' : ''}`} />
                <span>{isScanning ? 'Scanning...' : 'Scan Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
