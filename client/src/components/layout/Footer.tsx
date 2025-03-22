import { Link } from 'wouter';
import { BookOpen, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 py-8 px-4 sm:px-6 lg:px-8 border-t border-[#222222] bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <Link href="/">
            <a className="font-medium text-xl text-white">
              CyberGuard
            </a>
          </Link>
          <p className="text-sm text-gray-500 mt-2">Real-time network intrusion detection powered by AI</p>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <span className="sr-only">Documentation</span>
            <BookOpen className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <span className="sr-only">Contact</span>
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#222222] text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} CyberGuard. All rights reserved.</p>
        <p className="mt-1">Developed using KDD Cup dataset for machine learning-based intrusion detection system.</p>
      </div>
    </footer>
  );
}
