
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Video, 
  FileText, 
  HelpCircle, 
  LifeBuoy, 
  Headphones,
  ChevronRight,
  ChevronDown,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const HelpPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Showing results for '${searchQuery}'`,
    });
  };
  
  const handleFeedback = (helpful: boolean) => {
    toast({
      title: helpful ? "Thank You" : "We're Sorry",
      description: helpful 
        ? "Thank you for your positive feedback!" 
        : "We'll work to improve this documentation.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-quantum-cyan mb-2">Help Center</h1>
            <p className="text-xl text-muted-foreground">Get support and learn about Quantum Customer Compass</p>
          </div>
          
          {/* Search */}
          <Card className="quantum-panel mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search for help topics..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Quick Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <QuickHelpCard
              icon={<BookOpen size={20} />}
              title="Documentation"
              description="Browse comprehensive guides and tutorials"
              onClick={() => toast({ title: "Documentation", description: "Opening documentation..." })}
            />
            <QuickHelpCard
              icon={<MessageSquare size={20} />}
              title="Live Chat Support"
              description="Talk to our support team in real time"
              onClick={() => toast({ title: "Live Chat", description: "Connecting to support agent..." })}
            />
            <QuickHelpCard
              icon={<Video size={20} />}
              title="Video Tutorials"
              description="Watch step-by-step instructional videos"
              onClick={() => toast({ title: "Video Tutorials", description: "Loading video library..." })}
            />
          </div>
          
          {/* Tabbed Help Content */}
          <Tabs defaultValue="faq" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="guides">Quick Start Guides</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq">
              <Card className="quantum-panel">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about Quantum Customer Compass</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">How does the multi-agent system route customer inquiries?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-3">
                          Quantum Customer Compass uses a sophisticated routing algorithm powered by quantum computing principles. Each inquiry is analyzed for:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Content complexity and sentiment</li>
                          <li>Customer history and preferences</li>
                          <li>Current system load and agent availability</li>
                          <li>Required expertise and specialization</li>
                        </ul>
                        <p className="text-muted-foreground mt-3">
                          This ensures that each customer inquiry is routed to the optimal agent or agent collaboration network for resolution.
                        </p>
                        <div className="flex justify-end mt-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8" onClick={() => handleFeedback(true)}>
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="outline" size="sm" className="h-8" onClick={() => handleFeedback(false)}>
                              <ThumbsDown className="mr-1 h-4 w-4" />
                              Not Helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">Can I customize agent behaviors for my specific business needs?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-3">
                          Yes, Quantum Customer Compass offers extensive customization options for agent behaviors and specializations:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Tone and communication style adjustments</li>
                          <li>Industry-specific knowledge integration</li>
                          <li>Custom resolution workflows and escalation paths</li>
                          <li>Business rule implementation and enforcement</li>
                        </ul>
                        <p className="text-muted-foreground mt-3">
                          These customizations can be implemented through the Settings panel under Agent Configuration.
                        </p>
                        <div className="flex justify-end mt-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8" onClick={() => handleFeedback(true)}>
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="outline" size="sm" className="h-8" onClick={() => handleFeedback(false)}>
                              <ThumbsDown className="mr-1 h-4 w-4" />
                              Not Helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">How secure is my customer data in the system?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-3">
                          Quantum Customer Compass employs state-of-the-art security measures:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>End-to-end encryption for all communications</li>
                          <li>Zero-knowledge proofs for sensitive operations</li>
                          <li>Regular security audits and compliance checks</li>
                          <li>Data minimization and automatic purging policies</li>
                          <li>Role-based access controls and audit logging</li>
                        </ul>
                        <p className="text-muted-foreground mt-3">
                          You can adjust privacy settings in the Settings panel under Privacy & Security.
                        </p>
                        <div className="flex justify-end mt-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8" onClick={() => handleFeedback(true)}>
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="outline" size="sm" className="h-8" onClick={() => handleFeedback(false)}>
                              <ThumbsDown className="mr-1 h-4 w-4" />
                              Not Helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="quantum-panel">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-quantum-cyan" />
                      Getting Started Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">1</div>
                        <span>System overview and setup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">2</div>
                        <span>Configure your first agent</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">3</div>
                        <span>Setting up customer workflows</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">4</div>
                        <span>Managing agent interactions</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      View Full Guide
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="quantum-panel">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-quantum-cyan" />
                      Advanced Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">1</div>
                        <span>Custom agent training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">2</div>
                        <span>API integration options</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">3</div>
                        <span>Analytics and reporting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">4</div>
                        <span>Performance optimization</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      View Full Guide
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="contact">
              <Card className="quantum-panel">
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 border border-border rounded-lg text-center">
                      <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center mb-3">
                        <MessageSquare className="h-6 w-6 text-quantum-cyan" />
                      </div>
                      <h3 className="font-medium mb-1">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">Available 24/7 for immediate assistance</p>
                      <Button variant="outline" size="sm" onClick={() => toast({ title: "Live Chat", description: "Connecting to support agent..." })}>
                        Start Chat
                      </Button>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 border border-border rounded-lg text-center">
                      <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center mb-3">
                        <Headphones className="h-6 w-6 text-quantum-cyan" />
                      </div>
                      <h3 className="font-medium mb-1">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">Call us at +1 (800) 555-QUANTUM</p>
                      <Button variant="outline" size="sm" onClick={() => toast({ title: "Phone Support", description: "Our hours: 8am-8pm EST Mon-Fri" })}>
                        View Hours
                      </Button>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 border border-border rounded-lg text-center">
                      <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center mb-3">
                        <LifeBuoy className="h-6 w-6 text-quantum-cyan" />
                      </div>
                      <h3 className="font-medium mb-1">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">support@quantumcs.tech</p>
                      <Button variant="outline" size="sm" onClick={() => toast({ title: "Email Support", description: "Opening email client..." })}>
                        Send Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

interface QuickHelpCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const QuickHelpCard: React.FC<QuickHelpCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <Card className="quantum-panel hover:shadow-lg transition-all cursor-pointer" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-muted/20 flex items-center justify-center text-quantum-cyan">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpPage;
