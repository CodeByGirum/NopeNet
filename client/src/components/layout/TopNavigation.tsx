import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import GradientText from '../text/GradientText';
import ClickSpark from '../effects/ClickSpark';

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="relative border-b border-cyber-gray/30 backdrop-blur-md bg-cyber-black/80 z-50 shadow-lg shadow-neon-green/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <a className="font-orbitron font-bold text-2xl">
                <GradientText
                  from="from-neon-green"
                  via="via-neon-lime"
                  to="to-neon-yellow"
                  animated
                >
                  CYBERGUARD
                </GradientText>
              </a>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Dashboard
              </a>
            </Link>
            <Link href="/intrusions">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/intrusions') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Intrusions
              </a>
            </Link>
            <Link href="/education">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/education') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Education
              </a>
            </Link>
            <Link href="/dataset">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/dataset') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Dataset
              </a>
            </Link>
            
            <ClickSpark>
              <button className="ml-4 px-5 py-2 text-sm font-medium bg-cyber-dark border border-neon-green text-neon-green rounded-md hover:bg-neon-green hover:text-cyber-black transition-all duration-300">
                <span className="flex items-center">
                  <i className="fas fa-shield-alt mr-2"></i>
                  <span>Scan Now</span>
                </span>
              </button>
            </ClickSpark>
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyber-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neon-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 bg-cyber-black/95 backdrop-blur-md border-b border-cyber-gray/30 shadow-lg">
            <Link href="/dashboard">
              <a className={`block px-4 py-2 text-base font-medium ${isActive('/dashboard') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Dashboard
              </a>
            </Link>
            <Link href="/intrusions">
              <a className={`block px-4 py-2 text-base font-medium ${isActive('/intrusions') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Intrusions
              </a>
            </Link>
            <Link href="/education">
              <a className={`block px-4 py-2 text-base font-medium ${isActive('/education') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Education
              </a>
            </Link>
            <Link href="/dataset">
              <a className={`block px-4 py-2 text-base font-medium ${isActive('/dataset') ? 'text-neon-green' : 'hover:text-neon-green'}`}>
                Dataset
              </a>
            </Link>
            <div className="px-4 py-2">
              <button className="w-full px-5 py-2 text-sm font-medium bg-cyber-dark border border-neon-green text-neon-green rounded-md hover:bg-neon-green hover:text-cyber-black transition-all duration-300">
                <span className="flex items-center justify-center">
                  <i className="fas fa-shield-alt mr-2"></i>
                  <span>Scan Now</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
