import { useQuery } from '@tanstack/react-query';
import SecurityCards from '@/sections/education/SecurityCards';
import { Link } from 'wouter';
import { MessageSquare } from 'lucide-react';

export default function Education() {
  const { data: securityInfo, isLoading: isSecurityInfoLoading } = useQuery({
    queryKey: ['/api/education/attacks'],
  });
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-medium mb-4">
            <span className="text-white">Security Education</span>
          </h2>
          <p className="text-gray-400 max-w-3xl">Learn about different types of network attacks and how to protect your infrastructure from emerging threats.</p>
        </div>
        
        {/* Security Info Cards */}
        <SecurityCards 
          attackTypes={securityInfo || []}
          isLoading={isSecurityInfoLoading}
        />
        
        {/* Link to AI Security Assistant */}
        <div className="mt-16 py-12 px-8 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-[#333333]">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-medium text-white mb-2">Need personalized security advice?</h3>
              <p className="text-gray-400 max-w-xl">Chat with our AI assistant to analyze your system's security posture and get actionable recommendations for your specific needs.</p>
            </div>
            <Link href="/assistant">
              <a className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200">
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Chat with Assistant</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
