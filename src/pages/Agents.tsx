
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare, FileSymlink, Orbit, HeartHandshake, Lightbulb, ShieldAlert, LineChart, RefreshCw } from 'lucide-react';
import { Agent } from '@/components/agents/AgentCard';
import QuantumVisualizer from '@/components/visualizers/QuantumVisualizer';

const AGENT_TYPES = [
  {
    id: "1",
    name: "Context Architect",
    icon: <FileSymlink className="h-5 w-5 text-quantum-cyan" />,
    description: "Builds comprehensive 4D customer profiles by analyzing historical interactions, preferences, and metadata",
    step: 2
  },
  {
    id: "2",
    name: "Quantum Orchestrator",
    icon: <Orbit className="h-5 w-5 text-quantum-cyan" />,
    description: "Routes tickets to the optimal agent swarm using quantum computing algorithms",
    step: 3
  },
  {
    id: "3",
    name: "Empathic Storyteller",
    icon: <HeartHandshake className="h-5 w-5 text-quantum-cyan" />,
    description: "Crafts personalized resolution narratives with appropriate emotional tone",
    step: 4
  },
  {
    id: "4",
    name: "Quantum Resolver",
    icon: <Lightbulb className="h-5 w-5 text-quantum-cyan" />,
    description: "Solves complex technical issues through neuromorphic processing",
    step: 5
  },
  {
    id: "5",
    name: "Ethical Guardian",
    icon: <ShieldAlert className="h-5 w-5 text-quantum-cyan" />,
    description: "Ensures fairness, transparency, and regulatory compliance throughout interactions",
    step: 6
  },
  {
    id: "6",
    name: "Anticipatory Support",
    icon: <LineChart className="h-5 w-5 text-quantum-cyan" />,
    description: "Predicts and prevents future issues before they impact customers",
    step: 7
  },
  {
    id: "7",
    name: "Feedback Loop",
    icon: <RefreshCw className="h-5 w-5 text-quantum-cyan" />,
    description: "Continuously improves performance through federated learning across all agents",
    step: 8
  },
  {
    id: "8",
    name: "Ticket Processor",
    icon: <MessageSquare className="h-5 w-5 text-quantum-cyan" />,
    description: "Initial processing of customer query, extracting key information",
    step: 1
  }
];

const AgentsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(AGENT_TYPES[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-quantum-cyan mb-2">Agents' Interaction Design</h1>
            <p className="text-xl text-muted-foreground">Intelligent Agent Symphony</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card className="quantum-panel mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Agent Types</CardTitle>
                  <CardDescription>
                    Select an agent to learn more about its role
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-y-auto max-h-[600px]">
                  <div className="space-y-2">
                    {AGENT_TYPES.sort((a, b) => a.step - b.step).map((agent) => (
                      <Button 
                        key={agent.id}
                        variant={selectedAgent.id === agent.id ? "default" : "outline"}
                        className="w-full justify-start gap-2 mb-2"
                        onClick={() => setSelectedAgent(agent)}
                      >
                        <div className="bg-muted/20 p-1 rounded-full">
                          {agent.icon}
                        </div>
                        <span>{agent.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <Card className="quantum-panel mb-6 h-[300px]">
                <CardHeader className="pb-2">
                  <CardTitle>Agent Network Visualization</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  <QuantumVisualizer className="h-full" />
                </CardContent>
              </Card>
              
              <Card className="quantum-panel">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted/20 p-2 rounded-full">
                      {selectedAgent.icon}
                    </div>
                    <div>
                      <CardTitle>{selectedAgent.name}</CardTitle>
                      <CardDescription>Step {selectedAgent.step} in the workflow</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {selectedAgent.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Key Capabilities</h3>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                        <li>Real-time contextual analysis</li>
                        <li>Adaptive learning from interactions</li>
                        <li>Neural processing optimization</li>
                        <li>Cross-agent knowledge transfer</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Technologies</h3>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                        <li>Neuromorphic computing</li>
                        <li>Temporal fusion transformers</li>
                        <li>Federated learning modules</li>
                        <li>Quantum-enhanced processing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button onClick={() => window.location.href = '/workflow'} className="group">
              View Workflow Process
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentsPage;
