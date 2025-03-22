import { useQuery } from '@tanstack/react-query';
import SecurityCards from '@/sections/education/SecurityCards';
import AIAssistant from '@/sections/education/AIAssistant';

export default function Education() {
  const { data: securityInfo, isLoading: isSecurityInfoLoading } = useQuery({
    queryKey: ['/api/education/attacks'],
  });
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-cyber-dark/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-orbitron font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">Security Education</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-neon-yellow"></span>
          </h2>
          <p className="text-gray-400 max-w-3xl">Learn about different types of network attacks and how to protect your infrastructure.</p>
        </div>
        
        {/* Security Info Cards */}
        <SecurityCards 
          attackTypes={securityInfo || []}
          isLoading={isSecurityInfoLoading}
        />
        
        {/* AI Security Assistant */}
        <AIAssistant />
      </div>
    </section>
  );
}
