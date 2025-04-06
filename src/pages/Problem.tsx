
import React from 'react';
import { ArrowUpRight, TrendingUp, Clock, Frown, ArrowUpCircle, AlertTriangle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const problemData = [
  { year: '2020', ticketVolume: 1000, satisfaction: 85 },
  { year: '2021', ticketVolume: 1500, satisfaction: 82 },
  { year: '2022', ticketVolume: 2200, satisfaction: 78 },
  { year: '2023', ticketVolume: 3200, satisfaction: 72 },
  { year: '2024', ticketVolume: 5500, satisfaction: 65 },
];

const ProblemPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-quantum-cyan mb-2">The Customer Support Crisis</h1>
            <p className="text-xl text-muted-foreground">Complexity, Delays, and Inconsistency</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="quantum-panel col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Support Ticket Volume vs. Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={problemData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[50, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="ticketVolume" 
                      name="Support Tickets"
                      stroke="#0ea5e9" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="satisfaction" 
                      name="Satisfaction Score"
                      stroke="#f43f5e" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="quantum-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Exploding Complexity</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-quantum-cyan" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  72% increase in customer query complexity since 2023.
                </p>
                <p className="text-xs text-muted-foreground/70">Source: Industry Report</p>
              </CardContent>
            </Card>
            
            <Card className="quantum-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Resolution Bottlenecks</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-quantum-cyan" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manual processes and siloed data lead to unacceptable resolution times.
                </p>
              </CardContent>
            </Card>
            
            <Card className="quantum-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Inconsistent Experiences</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
                    <Frown className="h-4 w-4 text-quantum-cyan" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lack of personalized support damages customer loyalty.
                </p>
              </CardContent>
            </Card>
            
            <Card className="quantum-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Escalation Overload</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
                    <ArrowUpCircle className="h-4 w-4 text-quantum-cyan" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  High escalation rates strain resources and increase costs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="quantum-panel">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Missed Proactive Opportunities</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-quantum-cyan" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reactive support fails to anticipate and prevent issues.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button onClick={() => window.location.href = '/solution'} className="group">
              View Proposed Solution 
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProblemPage;
