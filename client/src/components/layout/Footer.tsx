import { Link } from 'wouter';
import GradientText from '@/components/text/GradientText';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 px-4 sm:px-6 lg:px-8 border-t border-cyber-gray/30 bg-cyber-black/90">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <a className="font-orbitron font-bold text-xl">
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
          <p className="text-sm text-gray-400 mt-2">Real-time network intrusion detection powered by AI</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
            <span className="sr-only">Documentation</span>
            <i className="fas fa-book"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
            <span className="sr-only">GitHub</span>
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
            <span className="sr-only">Contact</span>
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-cyber-gray/30 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} CyberGuard. All rights reserved. Developed using KDD Cup dataset for intrusion detection.</p>
      </div>
    </footer>
  );
}
