import { useState, useRef, useEffect } from 'react';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { Bot, User, Send, Mic, Loader2, BarChart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Security Assistant. I can help you understand various network attacks and provide advice on protecting your systems. What would you like to know about?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [sessionId, setSessionId] = useState<string>(Date.now().toString());
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Create a session ID on component mount
  useEffect(() => {
    setSessionId(Date.now().toString());
  }, []);
  
  // Add animation styles for chat messages
  useEffect(() => {
    // Create style element for animations
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSubmitting(true);
    
    try {
      // Determine if we should include contextual information
      // For example, if the message contains certain keywords
      const includeContext = 
        input.toLowerCase().includes('dashboard') || 
        input.toLowerCase().includes('scan') || 
        input.toLowerCase().includes('intrusion') || 
        input.toLowerCase().includes('attack') ||
        input.toLowerCase().includes('detect');
      
      // If including context, we'd fetch relevant data from other parts of the application
      // For this example, we'll use a simple contextual object
      const contextData = includeContext ? {
        dashboard: {
          attacks: { total: 250, prevented: 195, active: 55 },
          topAttackTypes: ['Probe', 'DoS', 'R2L'],
          recentActivity: 'Multiple probe attempts detected in the last 24 hours'
        }
      } : null;
      
      const response = await apiRequest('POST', '/api/chat', {
        message: userMessage.content,
        sessionId,
        context: contextData
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again later."
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleVoiceInput = () => {
    // This would require implementation of the Web Speech API
    setIsVoiceActive(!isVoiceActive);
    
    if (!isVoiceActive) {
      // Start voice recognition
      alert('Voice recognition would be activated here');
      
      // When recognition completes:
      // setInput(recognizedText);
      // setIsVoiceActive(false);
    } else {
      // Stop voice recognition
      alert('Voice recognition would be stopped here');
      setIsVoiceActive(false);
    }
  };
  
  interface ScanDevice {
    deviceIP: string;
    deviceType: string;
    vulnerabilities: {
      severity: string;
      description: string;
      affectedService: string;
    }[];
    recommendations: string[];
  }
  
  interface ScanResult {
    summary: {
      devicesScanned: number;
      vulnerabilitiesFound: number;
      criticalIssues: number;
      scanDuration: string;
    };
    findings: ScanDevice[];
  }
  
  const handleScanRequest = async () => {
    if (isSubmitting) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: "Scan my network for security vulnerabilities."
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsSubmitting(true);
    
    try {
      // Trigger the network scan API
      const scanResponse = await apiRequest('POST', '/api/scan/network');
      const scanData: ScanResult = await scanResponse.json();
      
      // Process scan results
      const vulnerabilitiesFound = scanData.summary.vulnerabilitiesFound || 0;
      const criticalIssues = scanData.summary.criticalIssues || 0;
      
      // Build a response with the scan results
      let responseContent = `### Network Scan Complete\n\n`;
      responseContent += `I've completed a scan of your network and found:\n\n`;
      responseContent += `- **${scanData.summary.devicesScanned}** devices on your network\n`;
      responseContent += `- **${vulnerabilitiesFound}** potential vulnerabilities\n`;
      responseContent += `- **${criticalIssues}** critical security issues\n\n`;
      
      if (criticalIssues > 0) {
        responseContent += `#### Critical Issues:\n\n`;
        const criticalFindings = scanData.findings
          .filter((finding: ScanDevice) => finding.vulnerabilities.some((v: {severity: string}) => v.severity === 'critical'))
          .map((finding: ScanDevice) => {
            const critVulns = finding.vulnerabilities.filter((v: {severity: string}) => v.severity === 'critical');
            return {
              device: `${finding.deviceType} (${finding.deviceIP})`,
              issues: critVulns.map((v: {description: string}) => v.description).join(', ')
            };
          });
        
        criticalFindings.forEach((item: {device: string, issues: string}) => {
          responseContent += `- **${item.device}**: ${item.issues}\n`;
        });
        
        responseContent += `\n#### Recommended Actions:\n\n`;
        const recommendations = new Set<string>();
        scanData.findings.forEach((finding: ScanDevice) => {
          finding.recommendations.forEach((rec: string) => recommendations.add(rec));
        });
        
        Array.from(recommendations).forEach(rec => {
          responseContent += `- ${rec}\n`;
        });
      } else {
        responseContent += `No critical issues were found, but I recommend regular security audits to maintain your network security posture.`;
      }
      
      // Add the assistant response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent
      }]);
    } catch (error) {
      console.error('Error performing network scan:', error);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while trying to scan your network. Please try again later."
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown
        components={{
          h3: ({ node, ...props }) => <h3 className="text-blue-400 font-medium mb-2 mt-3" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-blue-300 font-medium mb-1 mt-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          strong: ({ node, ...props }) => <strong className="text-white" {...props} />,
          code: ({ node, ...props }) => <code className="bg-[#222] px-1 py-0.5 rounded" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-gray-600 pl-3 italic my-2" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };
  
  return (
    <CyberCard>
      <CyberCardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-xl flex items-center justify-center text-blue-400 p-2 border border-blue-500/20 shadow-lg overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-10 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
              <Bot className="w-6 h-6 relative z-10" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-white">Security Assistant</h3>
              <p className="text-xs text-blue-400">Powered by OpenAI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs bg-gradient-to-r from-blue-500/10 to-indigo-600/10 hover:from-blue-500/20 hover:to-indigo-600/20 border-blue-500/20 shadow-md"
              onClick={handleScanRequest}
              disabled={isSubmitting}
            >
              <div className="relative mr-2">
                <BarChart className="w-4 h-4 relative z-10" />
                <div className="absolute -inset-1 bg-blue-500 rounded-full blur-sm opacity-30 animate-ping"></div>
              </div>
              Scan Now
            </Button>
          </div>
        </div>
        
        <div className="chat-area bg-gradient-to-b from-[#0a0a0a] to-[#111] rounded-xl p-4 h-[350px] overflow-y-auto mb-4 border border-[#333] shadow-inner flex flex-col space-y-4">
          <div className="flex-grow flex flex-col space-y-4">
            {messages.map((message) => (
              message.role === 'assistant' ? (
                // AI Message
                <div key={message.id} className="flex items-start animate-fadeIn">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl flex items-center justify-center text-blue-400 text-sm flex-shrink-0 border border-blue-500/20 shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="ml-3 bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-xl rounded-tl-none p-4 text-sm max-w-3xl text-gray-300 shadow-md border border-gray-700/30">
                    {renderMarkdown(message.content)}
                  </div>
                </div>
              ) : (
                // User Message
                <div key={message.id} className="flex items-start justify-end animate-fadeIn">
                  <div className="mr-3 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl rounded-tr-none p-4 text-sm max-w-3xl text-gray-200 shadow-md border border-blue-500/20">
                    <p>{message.content}</p>
                  </div>
                  <div className="h-10 w-10 bg-gradient-to-br from-[#222] to-[#333] rounded-xl flex items-center justify-center text-gray-300 text-sm flex-shrink-0 border border-gray-700/30 shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Modern Chatbot Input */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="relative bg-gradient-to-r from-[#1a1a1a]/90 to-[#222]/90 rounded-2xl p-1.5 shadow-xl border border-gray-700/30 backdrop-blur-sm">
            <div className="flex">
              <input 
                type="text" 
                placeholder={isSubmitting ? "Thinking..." : "Ask about security or request actions..."} 
                className="w-full py-3 px-4 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none font-light"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSubmitting}
              />
              
              <div className="flex items-center space-x-2 pr-2">
                <button 
                  type="button"
                  className={`p-2 rounded-full transition-all duration-300 ${isVoiceActive ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-blue-500/10 hover:text-blue-400'}`}
                  onClick={toggleVoiceInput}
                  disabled={isSubmitting}
                >
                  <Mic className={`w-5 h-5 ${isVoiceActive ? 'animate-pulse' : ''}`} />
                </button>
                
                <button 
                  type="submit" 
                  className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !input.trim()}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
        
        {/* Animation styles added via useEffect */}
        
        <div className="mt-3 text-xs text-center text-gray-500">
          Your AI assistant can analyze your security posture and take protective actions when requested
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
