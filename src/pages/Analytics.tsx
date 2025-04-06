
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Download, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with the latest information.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your analytics data is being prepared for download.",
    });
  };

  // Mock data for charts
  const barChartData = {
    data: [
      { name: 'Mon', value: 35 },
      { name: 'Tue', value: 28 },
      { name: 'Wed', value: 43 },
      { name: 'Thu', value: 39 },
      { name: 'Fri', value: 52 },
      { name: 'Sat', value: 24 },
      { name: 'Sun', value: 18 },
    ],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    colors: ['#64FFDA', '#A78BFA'],
  };

  const lineChartData = {
    data: [
      { name: 'Week 1', value: 74 },
      { name: 'Week 2', value: 85 },
      { name: 'Week 3', value: 79 },
      { name: 'Week 4', value: 92 },
      { name: 'Week 5', value: 87 },
      { name: 'Week 6', value: 96 },
      { name: 'Week 7', value: 88 },
    ],
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    colors: ['#64FFDA', '#A78BFA'],
  };

  const pieChartData = {
    data: [
      { name: 'Technical Issues', value: 35 },
      { name: 'Account Questions', value: 25 },
      { name: 'Billing Inquiries', value: 20 },
      { name: 'Feature Requests', value: 15 },
      { name: 'Other', value: 5 },
    ],
    colors: ['#64FFDA', '#A78BFA', '#1E2339', '#5D45A0', '#33C3F0'],
  };

  const kpiCards = [
    { title: 'Total Conversations', value: '2,846', change: '+12.3%', isPositive: true },
    { title: 'Avg. Resolution Time', value: '2.4m', change: '-18.7%', isPositive: true },
    { title: 'Customer Satisfaction', value: '94.2%', change: '+3.8%', isPositive: true },
    { title: 'Agent Efficiency', value: '87.5%', change: '+5.2%', isPositive: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 overflow-auto">
          <div className="responsive-container space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-wrap-balance">Analytics Dashboard</h1>
                <p className="subtitle">Track and analyze your customer support metrics</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[130px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className={`text-xs ${card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {card.change} from previous period
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-4">
              <Tabs defaultValue="conversations" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="conversations" className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Conversations</span>
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="flex items-center">
                      <LineChartIcon className="mr-2 h-4 w-4" />
                      <span>Performance</span>
                    </TabsTrigger>
                    <TabsTrigger value="categories" className="flex items-center">
                      <PieChartIcon className="mr-2 h-4 w-4" />
                      <span>Categories</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="conversations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversation Volume</CardTitle>
                      <CardDescription>Daily support conversations over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <BarChart data={barChartData} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resolution Rate</CardTitle>
                      <CardDescription>Weekly performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <LineChart data={lineChartData} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="categories" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversation Categories</CardTitle>
                      <CardDescription>Distribution of support topics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <PieChart data={pieChartData} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Agents</CardTitle>
                  <CardDescription>Ranked by customer satisfaction ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'NeuroNova', rating: 98, conversations: 342 },
                      { name: 'QuantumSolve', rating: 96, conversations: 287 },
                      { name: 'LogisticsSolver-7', rating: 93, conversations: 254 },
                    ].map((agent, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-quantum-cyan/20 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-xs text-muted-foreground">{agent.conversations} conversations</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{agent.rating}%</div>
                          <div className="text-xs text-muted-foreground">Satisfaction</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Trends</CardTitle>
                  <CardDescription>Average time to first response</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <LineChart 
                      data={{
                        data: [
                          { name: 'Mon', value: 1.8 },
                          { name: 'Tue', value: 1.7 },
                          { name: 'Wed', value: 1.4 },
                          { name: 'Thu', value: 1.3 },
                          { name: 'Fri', value: 1.2 },
                          { name: 'Sat', value: 1.5 },
                          { name: 'Sun', value: 1.6 },
                        ],
                        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        colors: ['#A78BFA'],
                      }} 
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Current average: 1.4s (20% faster than previous period)
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
