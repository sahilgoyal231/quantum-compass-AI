
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Brain, Cpu, SmilePlus, Lightbulb, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const SolutionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-quantum-cyan mb-2">Autonomous Multi-Agent Ecosystem</h1>
            <p className="text-xl text-muted-foreground">A Cognitive Revolution in Customer Support</p>
          </div>
          
          <Card className="quantum-panel mb-8">
            <CardHeader>
              <CardTitle>Solution Overview</CardTitle>
              <CardDescription>
                A self-evolving, quantum-enhanced multi-agent ecosystem that autonomously addresses 
                customer needs with superior speed, accuracy, and empathy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/lovable-uploads/889c674a-b405-4aa6-b27c-0b9e6357e445.png" 
                alt="Multi-Agent Ecosystem Diagram" 
                className="w-full h-auto object-contain max-h-[400px] rounded-md"
              />
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mb-6">Key Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SolutionComponent
              title="Neuromorphic Agent Swarms"
              icon={<Brain />}
              description="Real-time collective intelligence via Intel Loihi 4"
              index={1}
            />
            
            <SolutionComponent
              title="Quantum-Enhanced Routing"
              icon={<Cpu />}
              description="Optimal ticket distribution using D-Wave annealing"
              index={2}
            />
            
            <SolutionComponent
              title="Emotionally Intelligent Interactions"
              icon={<SmilePlus />}
              description="Personalized support through advanced sentiment analysis and tone modulation"
              index={3}
            />
            
            <SolutionComponent
              title="Predictive Issue Resolution"
              icon={<Lightbulb />}
              description="Anticipate and resolve problems before they impact customers"
              index={4}
            />
            
            <SolutionComponent
              title="Self-Evolving Architecture"
              icon={<RefreshCw />}
              description="Adapts and improves continuously through federated learning"
              index={5}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <Button onClick={() => window.location.href = '/technologies'} variant="outline" className="group">
              View Technologies 
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            
            <Button onClick={() => window.location.href = '/agents'} variant="outline" className="group">
              Explore Agents 
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            
            <Button onClick={() => window.location.href = '/workflow'} variant="default" className="group">
              See Workflow 
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

interface SolutionComponentProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  index: number;
}

const SolutionComponent: React.FC<SolutionComponentProps> = ({
  title,
  icon,
  description,
  index
}) => {
  return (
    <Card className={cn(
      "quantum-panel overflow-hidden transition-all hover:shadow-lg",
      "border-l-4 hover:-translate-y-1"
    )}
    style={{ borderLeftColor: `hsl(${180 + index * 30}, 70%, 60%)` }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted/20 flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, { 
              className: "h-5 w-5 text-quantum-cyan" 
            })}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default SolutionPage;
