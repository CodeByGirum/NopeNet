import { Link } from 'wouter';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-6">
              <span className="block text-white mb-2">Intelligent</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Intrusion Detection
              </span>
            </h1>
            <p className="text-lg md:text-xl my-8 text-gray-300 max-w-xl">
              Real-time network security with advanced machine learning models that protect your infrastructure from emerging threats.
            </p>
            <Link href="/dashboard">
              <a className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200">
                <span>Get Started</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </Link>
          </div>
          
          {/* Hero Visual/Animation */}
          <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Modern Security Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  {/* Background circle */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/10"></div>
                  
                  {/* Middle circle */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    {/* Inner circle */}
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                      <Shield className="w-20 h-20 text-blue-400" />
                    </div>
                  </div>
                  
                  {/* Floating security icons */}
                  <div className="absolute top-4 right-8 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                    <ShieldCheck className="w-8 h-8 text-green-400" />
                  </div>
                  
                  <div className="absolute bottom-12 left-4 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                    <ShieldAlert className="w-8 h-8 text-red-400" />
                  </div>
                  
                  {/* Data stream visualization */}
                  <div className="absolute top-20 right-0 h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse-slow"></div>
                  <div className="absolute bottom-32 left-0 h-px w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
