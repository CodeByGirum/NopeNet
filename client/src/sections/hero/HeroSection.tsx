import { Link } from 'wouter';
import ASCIIText from '@/components/text/ASCIIText';
import ClickSpark from '@/components/effects/ClickSpark';

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center">
          {/* Hero Content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4 text-white relative">
              <ASCIIText className="inline-block px-1 relative">
                AI-POWERED
              </ASCIIText>
              <br />
              <span className="inline-block px-1 relative">INTRUSION</span>
              <br />
              <span className="inline-block px-1 relative">DETECTION</span>
            </h1>
            <p className="text-xl md:text-2xl my-8 text-gray-300">
              Real-time network security with advanced machine learning models that protect your infrastructure.
            </p>
            <ClickSpark>
              <Link href="/dashboard">
                <a className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-semibold bg-transparent border-2 border-neon-green text-neon-green rounded-md overflow-hidden transition-all duration-300 hover:bg-neon-green hover:text-cyber-black">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-neon-green/0 group-hover:bg-neon-green/100 transition-colors duration-300"></span>
                </a>
              </Link>
            </ClickSpark>
          </div>
          
          {/* Hero Visual/Animation */}
          <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Animated Security Shield Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-4 border-neon-green/30 flex items-center justify-center animate-pulse-slow relative">
                  <div className="w-48 h-48 rounded-full border-4 border-neon-lime/40 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-neon-yellow/50 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-green/60 to-neon-yellow/60 flex items-center justify-center text-cyber-black">
                        <i className="fas fa-shield-alt text-4xl"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbiting Elements */}
                  <div className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '8s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-neon-green rounded-full shadow-lg shadow-neon-green/50"></div>
                  </div>
                  <div className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
                    <div className="absolute top-1/4 right-0 w-3 h-3 bg-neon-yellow rounded-full shadow-lg shadow-neon-yellow/50"></div>
                  </div>
                  <div className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '15s' }}>
                    <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-neon-lime rounded-full shadow-lg shadow-neon-lime/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
