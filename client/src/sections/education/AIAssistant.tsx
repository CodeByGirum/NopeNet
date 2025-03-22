import { useState, useRef, useEffect } from 'react';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { Bot, User, Send, Mic, Loader2 } from 'lucide-react';

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
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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
      const response = await apiRequest('POST', '/api/chat', { message: userMessage.content });
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
  
  return (
    <CyberCard>
      <CyberCardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="ml-3 font-medium text-white">Security Assistant</h3>
          </div>
          <div className="text-xs text-gray-500">AI-powered analytics and advice</div>
        </div>
        
        <div className="bg-[#111111] rounded-xl p-4 h-[350px] overflow-y-auto mb-4 border border-[#222222]">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              message.role === 'assistant' ? (
                // AI Message
                <div key={message.id} className="flex items-start">
                  <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-sm flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="ml-3 bg-[#1a1a1a] rounded-xl rounded-tl-none p-3 text-sm max-w-3xl text-gray-300">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                // User Message
                <div key={message.id} className="flex items-start justify-end">
                  <div className="mr-3 bg-blue-500/10 rounded-xl rounded-tr-none p-3 text-sm max-w-3xl text-gray-200">
                    <p>{message.content}</p>
                  </div>
                  <div className="h-8 w-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-gray-300 text-sm flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Chatbot Input */}
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder={isSubmitting ? "Thinking..." : "Ask about security or request actions..."} 
              className="w-full py-3 px-4 pr-20 bg-[#111111] border border-[#333333] rounded-full focus:outline-none focus:border-blue-500 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
              <button 
                type="button"
                className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors mr-1"
                onClick={toggleVoiceInput}
                disabled={isSubmitting}
              >
                <Mic className={`w-4 h-4 ${isVoiceActive ? 'text-blue-400 animate-pulse' : ''}`} />
              </button>
              <button 
                type="submit" 
                className="p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
                disabled={isSubmitting || !input.trim()}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </form>
        
        <div className="mt-3 text-xs text-center text-gray-500">
          Your AI assistant can analyze your security posture and take protective actions when requested
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
