
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProblemPage from "./pages/Problem";
import SolutionPage from "./pages/Solution";
import TechnologiesPage from "./pages/Technologies";
import AgentsPage from "./pages/Agents";
import WorkflowPage from "./pages/Workflow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          {/* These routes will show the 404 page until they're implemented */}
          <Route path="/customers" element={<NotFound />} />
          <Route path="/chat" element={<NotFound />} />
          <Route path="/analytics" element={<NotFound />} />
          <Route path="/neural-net" element={<NotFound />} />
          <Route path="/agent-hub" element={<NotFound />} />
          <Route path="/knowledge" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
