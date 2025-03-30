import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Intrusions from "@/pages/intrusions";
import Education from "@/pages/education";
import Dataset from "@/pages/dataset";
import Assistant from "@/pages/assistant";
import ManualInput from "@/pages/manual-input";
import NotFound from "@/pages/not-found";

import TopNavigation from "@/components/layout/TopNavigation";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <TopNavigation />
      
      <main className="relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/intrusions" component={Intrusions} />
          <Route path="/education" component={Education} />
          <Route path="/dataset" component={Dataset} />
          <Route path="/assistant" component={Assistant} />
          <Route path="/manual-input" component={ManualInput} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
