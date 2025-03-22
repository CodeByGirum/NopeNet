import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="relative border-b border-[#222222] backdrop-blur-xl bg-black/80 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <a className="font-medium text-xl">
                CyberGuard
              </a>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/dashboard">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'}`}>
                Dashboard
              </a>
            </Link>
            <Link href="/intrusions">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/intrusions') ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'}`}>
                Intrusions
              </a>
            </Link>
            <Link href="/education">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/education') ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'}`}>
                Education
              </a>
            </Link>
            <Link href="/dataset">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${isActive('/dataset') ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-blue-400'}`}>
                Dataset
              </a>
            </Link>
            
            <button className="ml-4 px-5 py-2 text-sm font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Scan Now</span>
            </button>
          </div>
          
          <div className="flex items-center md:hidden">
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
            <Link href="/dashboard">
              <a className={`block px-4 py-3 text-base font-medium ${isActive('/dashboard') ? 'text-blue-400' : 'hover:text-blue-400'}`}>
                Dashboard
              </a>
            </Link>
            <Link href="/intrusions">
              <a className={`block px-4 py-3 text-base font-medium ${isActive('/intrusions') ? 'text-blue-400' : 'hover:text-blue-400'}`}>
                Intrusions
              </a>
            </Link>
            <Link href="/education">
              <a className={`block px-4 py-3 text-base font-medium ${isActive('/education') ? 'text-blue-400' : 'hover:text-blue-400'}`}>
                Education
              </a>
            </Link>
            <Link href="/dataset">
              <a className={`block px-4 py-3 text-base font-medium ${isActive('/dataset') ? 'text-blue-400' : 'hover:text-blue-400'}`}>
                Dataset
              </a>
            </Link>
            <div className="px-4 py-3">
              <button className="w-full px-5 py-2 text-sm font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Scan Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
