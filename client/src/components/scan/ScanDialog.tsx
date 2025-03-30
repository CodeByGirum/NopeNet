import { useState } from 'react';
import { useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Laptop, 
  FileText, 
  ChevronRight 
} from 'lucide-react';

interface ScanDialogProps {
  triggerElement?: React.ReactNode;
}

export default function ScanDialog({ triggerElement }: ScanDialogProps) {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  const handleAutomatedScan = () => {
    setOpen(false);
    navigate('/intrusions');
  };

  const handleManualInput = () => {
    setOpen(false);
    navigate('/manual-input');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerElement || (
          <Button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 ml-4">
            <Shield className="mr-2 w-5 h-5" />
            <span>Scan Now</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-gray-800 bg-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">
            Network Scan Options
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a scan method to analyze your network for potential intrusions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            variant="outline" 
            className="w-full p-6 flex items-start border-gray-700 hover:bg-gray-900 hover:border-blue-500 transition-all group"
            onClick={handleAutomatedScan}
          >
            <div className="p-3 rounded-full bg-blue-500/20 mr-4 group-hover:bg-blue-500/30 transition-colors">
              <Laptop className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium mb-1">Automated Scan</h3>
              <p className="text-sm text-gray-400">
                Run a comprehensive scan using predefined security rules
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full p-6 flex items-start border-gray-700 hover:bg-gray-900 hover:border-purple-500 transition-all group"
            onClick={handleManualInput}
          >
            <div className="p-3 rounded-full bg-purple-500/20 mr-4 group-hover:bg-purple-500/30 transition-colors">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium mb-1">Manual Analysis</h3>
              <p className="text-sm text-gray-400">
                Paste raw network traffic data in KDD Cup 1999 format for analysis
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}