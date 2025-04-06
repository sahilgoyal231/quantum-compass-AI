
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'idle' | 'offline';
  specialty: string[];
  efficiency: number;
  responseTime: string;
  successRate: number;
}

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <Card 
      className={cn(
        "quantum-panel cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover" />
              </div>
              <div className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                agent.status === 'active' ? 'bg-green-500' : 
                agent.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
              )} />
            </div>
            <div>
              <CardTitle className="text-sm">{agent.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{agent.role}</p>
            </div>
          </div>
          <div>
            <Badge 
              variant="outline" 
              className={cn(
                "text-[10px] h-5",
                agent.status === 'active' ? 'border-green-500 text-green-500' : 
                agent.status === 'idle' ? 'border-yellow-500 text-yellow-500' : 'border-gray-500 text-gray-500'
              )}
            >
              {agent.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mt-1 mb-3">
          {agent.specialty.map((spec, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px] h-5">
              {spec}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Efficiency</span>
              <span className="text-xs font-medium">{agent.efficiency}%</span>
            </div>
            <Progress value={agent.efficiency} className="h-1" />
          </div>
          
          <div className="flex justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Response Time</span>
              <p className="font-medium">{agent.responseTime}</p>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground">Success Rate</span>
              <p className="font-medium">{agent.successRate}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
