import React, { useState } from 'react';
import { ArrowUpRight, BrainCircuit, Clock, MessageSquare, Smile, UserCheck, Zap } from 'lucide-react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import AnalyticsCard from '@/components/dashboard/AnalyticsCard';
import AgentCard from '@/components/agents/AgentCard';
import QuantumVisualizer from '@/components/visualizers/QuantumVisualizer';
import ChatInterface from '@/components/chat/ChatInterface';
import { Button } from '@/components/ui/button';

const MOCK_AGENTS = [
  {
    id: '1',
    name: 'NeuroNova',
    role: 'Customer Engagement Lead',
    avatar: '/lovable-uploads/04036a14-dacd-496b-9e60-16b01d30aeec.png',
    status: 'active',
    specialty: ['Sentiment Analysis', 'Empathetic Response'],
    efficiency: 94,
    responseTime: '1.2s',
    successRate: 97
  },
  {
    id: '2',
    name: 'QuantumSolve',
    role: 'Technical Support Specialist',
    avatar: '/lovable-uploads/bbee9dda-1cfa-450e-a15f-d214b7666360.png',
    status: 'active',
    specialty: ['Troubleshooting', 'Technical Solutions'],
    efficiency: 92,
    responseTime: '1.5s',
    successRate: 95
  },
  {
    id: '3',
    name: 'LogisticsSolver-7',
    role: 'Logistics & Order Management',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=logistics',
    status: 'idle',
    specialty: ['Order Tracking', 'Supply Chain'],
    efficiency: 89,
    responseTime: '1.8s',
    successRate: 93
  }
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <h1 className="text-2xl font-bold mb-6">Quantum Customer Compass</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AnalyticsCard 
              title="Resolution Rate" 
              value="94.2%" 
              description="Customer queries successfully resolved"
              icon={<Smile className="h-4 w-4 text-quantum-cyan" />}
              change="+2.1%"
              changeDirection="up"
            />
            <AnalyticsCard 
              title="Average Response Time" 
              value="1.4s" 
              description="Time to first meaningful response"
              icon={<Clock className="h-4 w-4 text-quantum-cyan" />}
              change="-0.3s"
              changeDirection="up"
            />
            <AnalyticsCard 
              title="Customer Satisfaction" 
              value="92%" 
              description="Based on post-interaction surveys"
              icon={<UserCheck className="h-4 w-4 text-quantum-cyan" />}
              change="+5%"
              changeDirection="up"
            />
            <AnalyticsCard 
              title="Neural Processing" 
              value="46.8M" 
              description="Neural connections per second"
              icon={<BrainCircuit className="h-4 w-4 text-quantum-cyan" />}
              change="+12.4%"
              changeDirection="up"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Multi-Agent Network</h2>
                  <Button size="sm" variant="outline" className="text-xs">
                    View All <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MOCK_AGENTS.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Quantum Neural Network</h2>
                </div>
                <QuantumVisualizer className="h-[300px]" />
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Live Support Interface</h2>
              </div>
              <ChatInterface className="h-[600px]" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
