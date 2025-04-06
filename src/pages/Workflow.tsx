
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare, FileSymlink, Orbit, HeartHandshake, Lightbulb, ShieldAlert, LineChart, RefreshCw, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const workflowSteps = [
  {
    id: '1',
    title: 'Ticket Ingestion',
    icon: <MessageSquare className="h-5 w-5" />,
    description: 'Customer query arrives through various channels (chat, email, voice, etc.)',
    color: 'bg-blue-500/10 border-blue-500/50 text-blue-500',
    iconColor: 'text-blue-500'
  },
  {
    id: '2',
    title: 'Context Architect',
    icon: <FileSymlink className="h-5 w-5" />,
    description: 'Builds 4D customer profile by analyzing historical data and current context',
    color: 'bg-cyan-500/10 border-cyan-500/50 text-cyan-500',
    iconColor: 'text-cyan-500'
  },
  {
    id: '3',
    title: 'Quantum Orchestrator',
    icon: <Orbit className="h-5 w-5" />,
    description: 'Routes ticket to optimal agent swarm based on complexity and expertise needed',
    color: 'bg-purple-500/10 border-purple-500/50 text-purple-500',
    iconColor: 'text-purple-500'
  },
  {
    id: '4',
    title: 'Empathic Storyteller',
    icon: <HeartHandshake className="h-5 w-5" />,
    description: 'Crafts personalized resolution narrative with appropriate emotional tone',
    color: 'bg-pink-500/10 border-pink-500/50 text-pink-500',
    iconColor: 'text-pink-500'
  },
  {
    id: '5',
    title: 'Quantum Resolver',
    icon: <Lightbulb className="h-5 w-5" />,
    description: 'Solves complex issues by leveraging neuromorphic computing capabilities',
    color: 'bg-orange-500/10 border-orange-500/50 text-orange-500',
    iconColor: 'text-orange-500'
  },
  {
    id: '6',
    title: 'Ethical Guardian',
    icon: <ShieldAlert className="h-5 w-5" />,
    description: 'Ensures fairness and compliance throughout the resolution process',
    color: 'bg-green-500/10 border-green-500/50 text-green-500',
    iconColor: 'text-green-500'
  },
  {
    id: '7',
    title: 'Anticipatory Support',
    icon: <LineChart className="h-5 w-5" />,
    description: 'Identifies and prevents potential future issues before they impact customers',
    color: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500',
    iconColor: 'text-yellow-500'
  },
  {
    id: '8',
    title: 'Feedback Loop',
    icon: <RefreshCw className="h-5 w-5" />,
    description: 'Continuously improves performance through federated learning across all agents',
    color: 'bg-indigo-500/10 border-indigo-500/50 text-indigo-500',
    iconColor: 'text-indigo-500'
  }
];

const keyImprovements = [
  { title: 'Real-time agent skill transfer', description: 'Agents share learned skills and expertise in real-time' },
  { title: 'Dynamic workload balancing', description: 'Optimal distribution of tasks based on current system load' },
  { title: 'Automated conflict resolution', description: 'AI-driven resolution of conflicting approaches to customer issues' },
  { title: 'Continuous performance optimization', description: 'System continuously improves based on outcome data' }
];

const WorkflowPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-quantum-cyan mb-2">Autonomous Collaboration</h1>
            <p className="text-xl text-muted-foreground">Intelligent Agent Symphony</p>
          </div>
          
          <Card className="quantum-panel mb-8">
            <CardHeader>
              <CardTitle>Workflow Process</CardTitle>
              <CardDescription>
                The seamless collaboration between specialized agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workflowSteps.map((step, idx) => (
                  <div key={step.id} className="flex flex-col md:flex-row gap-4">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center shrink-0 ${step.color}`}>
                      {React.cloneElement(step.icon, { className: step.iconColor })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">Step {idx + 1}</Badge>
                        <h3 className="text-lg font-medium">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                    {idx < workflowSteps.length - 1 && (
                      <div className="hidden md:flex items-center">
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mb-4">Key Improvements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {keyImprovements.map((item, idx) => (
              <Card key={idx} className="quantum-panel">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="quantum-panel mb-8">
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src="/lovable-uploads/c0730682-429c-4cff-9bb9-ff6badf3930b.png" 
                alt="Workflow Visualization" 
                className="w-full h-auto object-contain max-h-[400px] rounded-md"
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button onClick={() => window.location.href = '/'} className="group">
              Return to Dashboard
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkflowPage;
