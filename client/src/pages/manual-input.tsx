import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle, 
  AlignJustify, 
  Search, 
  Loader2, 
  ShieldAlert, 
  ShieldCheck, 
  Shield,
  ChevronRight,
  InfoIcon,
  ExternalLink
} from 'lucide-react';

const formSchema = z.object({
  networkData: z.string().min(1, 'Network data is required')
});

interface AnalysisResult {
  isAttack: boolean;
  attackType: string;
  confidence: number;
  features: {
    name: string;
    value: string;
    significance: number;
  }[];
  explanation: string;
  recommendations: string[];
}

export default function ManualInputPage() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      networkData: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const response = await apiRequest('/api/analyze/traffic', {
        method: 'POST',
        body: JSON.stringify({ trafficData: values.networkData })
      });
      
      setResult(response);
      setActiveTab('result');
      
      toast({
        title: response.isAttack ? "Potential threat detected!" : "Analysis complete",
        description: response.isAttack 
          ? `Detected ${response.attackType} with ${Math.round(response.confidence * 100)}% confidence` 
          : "No threats detected in the traffic data",
        variant: response.isAttack ? "destructive" : "default",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze the provided network data. Please check the format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manual Traffic Analysis</h1>
        <p className="text-gray-400">
          Paste raw network traffic data in KDD Cup 1999 format for analysis by our ML ensemble
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input" disabled={isAnalyzing}>
            <AlignJustify className="mr-2 h-4 w-4" />
            Input Data
          </TabsTrigger>
          <TabsTrigger value="result" disabled={!result && !isAnalyzing}>
            <Search className="mr-2 h-4 w-4" />
            Analysis Results
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Traffic Data</CardTitle>
              <CardDescription>
                Enter network traffic data in KDD Cup 1999 format. Each line should represent one network connection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Format Information</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">
                    Data should be in comma-separated format with features like duration, protocol_type, service, flag, etc.
                  </p>
                  <p className="text-xs text-gray-400">
                    Example: 0,tcp,http,SF,181,5450,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,8,8,0,0,0,0,1,0,0,9,9,1,0,0.11,0,0,0,0,0
                  </p>
                </AlertDescription>
              </Alert>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="networkData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Raw Network Data</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your network data here..."
                            className="min-h-[200px] font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can paste multiple lines for batch analysis
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Analyze Traffic
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500">
              <p>
                <InfoIcon className="inline-block mr-1 h-3 w-3" />
                Uses ML ensemble trained on KDD Cup 1999 dataset
              </p>
              <a 
                href="https://kdd.ics.uci.edu/databases/kddcup99/kddcup99.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                Dataset info
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="result" className="mt-6">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="h-16 w-16 animate-spin text-blue-500 mb-6" />
              <h3 className="text-xl font-medium mb-2">Analyzing Network Traffic</h3>
              <p className="text-gray-400 text-center max-w-md">
                Our ML ensemble is examining the provided data for potential security threats...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <Card className={result.isAttack ? "border-red-500/50" : "border-green-500/50"}>
                <CardHeader className={result.isAttack ? "bg-red-500/10" : "bg-green-500/10"}>
                  <div className="flex items-center">
                    {result.isAttack ? (
                      <ShieldAlert className="h-8 w-8 text-red-500 mr-3" />
                    ) : (
                      <ShieldCheck className="h-8 w-8 text-green-500 mr-3" />
                    )}
                    <div>
                      <CardTitle className={result.isAttack ? "text-red-500" : "text-green-500"}>
                        {result.isAttack ? "Threat Detected" : "No Threats Detected"}
                      </CardTitle>
                      <CardDescription>
                        {result.isAttack 
                          ? `Identified as ${result.attackType} with ${Math.round(result.confidence * 100)}% confidence`
                          : "The analyzed traffic appears to be benign"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-3">Analysis Explanation</h3>
                  <p className="text-gray-300 mb-6">{result.explanation}</p>
                  
                  {result.isAttack && result.recommendations && result.recommendations.length > 0 && (
                    <>
                      <h3 className="text-lg font-medium mb-3">Recommended Actions</h3>
                      <ul className="space-y-2 mb-6">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex">
                            <ChevronRight className="h-5 w-5 text-blue-400 flex-shrink-0 mr-2" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <h3 className="text-lg font-medium mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.features.map((feature, i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                        <div className="mr-3">
                          <div 
                            className="w-2 h-10 rounded-full" 
                            style={{ 
                              background: `linear-gradient(to top, ${
                                feature.significance > 0.6 ? 'red' : feature.significance > 0.3 ? 'orange' : 'green'
                              } ${feature.significance * 100}%, transparent ${feature.significance * 100}%)` 
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          <p className="text-sm text-gray-400">{feature.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('input')}
                  className="mr-2"
                >
                  Analyze Another Sample
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Analysis Results</h3>
              <p className="text-gray-400 text-center max-w-md">
                Submit network traffic data to see analysis results here
              </p>
              <Button 
                variant="link" 
                onClick={() => setActiveTab('input')}
                className="mt-4"
              >
                Go to Input Form
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}