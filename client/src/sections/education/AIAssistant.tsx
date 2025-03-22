import { useState, useRef, useEffect } from 'react';
import { CyberCard, CyberCardContent } from '@/components/ui/cybercard';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';

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
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 bg-neon-green/20 rounded-full flex items-center justify-center text-neon-green">
            <i className="fas fa-robot text-2xl"></i>
          </div>
          <h3 className="ml-4 font-orbitron font-semibold text-xl">AI Security Assistant</h3>
        </div>
        
        <div className="bg-cyber-dark/60 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              message.role === 'assistant' ? (
                // AI Message
                <div key={message.id} className="flex items-start">
                  <div className="h-8 w-8 bg-neon-green/20 rounded-full flex items-center justify-center text-neon-green text-sm">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="ml-3 bg-cyber-gray/30 rounded-lg rounded-tl-none p-3 text-sm max-w-3xl">
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
                  <div className="mr-3 bg-neon-green/20 rounded-lg rounded-tr-none p-3 text-sm max-w-3xl">
                    <p>{message.content}</p>
                  </div>
                  <div className="h-8 w-8 bg-cyber-gray/50 rounded-full flex items-center justify-center text-white text-sm">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Chatbot Input */}
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              type="text" 
              placeholder={isSubmitting ? "Thinking..." : "Ask me about network security..."} 
              className="w-full py-3 px-4 pr-12 bg-cyber-dark/60 border border-cyber-gray/30 rounded-lg focus:outline-none focus:border-neon-green text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-green hover:text-neon-lime transition-colors"
              disabled={isSubmitting || !input.trim()}
            >
              {isSubmitting ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </div>
        </form>
        
        {/* Voice Input Button */}
        <div className="mt-3 flex justify-end">
          <button 
            className={`flex items-center text-sm ${isVoiceActive ? 'text-neon-green' : 'text-gray-400 hover:text-neon-green'} transition-colors`}
            onClick={toggleVoiceInput}
            disabled={isSubmitting}
          >
            <i className={`fas fa-microphone mr-2 ${isVoiceActive ? 'animate-pulse' : ''}`}></i>
            <span>{isVoiceActive ? 'Listening...' : 'Ask with voice'}</span>
          </button>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
