
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Cpu, BrainCircuit, Workflow, Cloud, Database, HeartPulse, Clapperboard, Network, Shield, BarChart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const TechnologiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-quantum-cyan mb-2">Cutting-Edge Technologies</h1>
            <p className="text-xl text-muted-foreground">Driving Transformation in Customer Support</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <TechnologyCard
              title="Neuromorphic Computing"
              icon={<BrainCircuit />}
              products={["Intel Loihi 4"]}
              description="Brain-inspired computing architecture that mimics neural processes"
            />
            
            <TechnologyCard
              title="Quantum Computing"
              icon={<Cpu />}
              products={["D-Wave Systems", "IBM Quantum"]}
              description="Leverages quantum mechanics for exponentially faster processing"
            />
            
            <TechnologyCard
              title="Natural Language Processing"
              icon={<Workflow />}
              products={["BERT-XL", "Whisper v4", "AuditNLG v5"]}
              description="Advanced text and speech understanding capabilities"
            />
            
            <TechnologyCard
              title="Machine Learning"
              icon={<BarChart />}
              products={["Temporal Fusion Transformers", "Causal AI (DoWhy 3.0)"]}
              description="Sophisticated prediction and causal reasoning models"
            />
            
            <TechnologyCard
              title="Cloud Platform"
              icon={<Cloud />}
              products={["AWS GovCloud", "Azure Quantum"]}
              description="High-performance, secure cloud infrastructure"
            />
            
            <TechnologyCard
              title="Knowledge Graph"
              icon={<Database />}
              products={["Neo4j 6.0"]}
              description="Sophisticated data relationships mapping"
            />
            
            <TechnologyCard
              title="Emotion AI"
              icon={<HeartPulse />}
              products={["Beyond Verbal v3", "Affectiva v5"]}
              description="Sophisticated emotional intelligence capabilities"
            />
            
            <TechnologyCard
              title="Holographic Visualization"
              icon={<Clapperboard />}
              products={["Unity Sentis", "Microsoft Mesh 3.0"]}
              description="Advanced data visualization technologies"
            />
            
            <TechnologyCard
              title="Federated Learning"
              icon={<Network />}
              products={["PySyft 5.0"]}
              description="Collaborative machine learning across distributed systems"
            />
            
            <TechnologyCard
              title="Blockchain"
              icon={<Shield />}
              products={["Interledger Protocol"]}
              description="For secure skill transfer between agents"
            />
          </div>
          
          <div className="flex justify-center mt-8">
            <Button onClick={() => window.location.href = '/agents'} className="group">
              Explore Agent Interactions
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

interface TechnologyCardProps {
  title: string;
  icon: React.ReactNode;
  products: string[];
  description: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  title,
  icon,
  products,
  description
}) => {
  return (
    <Card className="quantum-panel overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted/20 flex items-center justify-center">
              {React.cloneElement(icon as React.ReactElement, { 
                className: "h-5 w-5 text-quantum-cyan" 
              })}
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {products.map((product, idx) => (
            <Badge key={idx} variant="outline" className="bg-muted/20">
              {product}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TechnologiesPage;
