
import React, { useState, useRef, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Paperclip, MoreVertical, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for different agents
const agents = [
  {
    id: 'neuronova',
    name: 'NeuroNova',
    role: 'Customer Engagement Lead',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=neuronova&backgroundColor=b6e3f4&scale=90',
  },
  {
    id: 'quantumsolve',
    name: 'QuantumSolve',
    role: 'Technical Support Specialist',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=quantumsolve&backgroundColor=c0aede&scale=90',
  },
  {
    id: 'logisticssolver',
    name: 'LogisticsSolver-7',
    role: 'Logistics & Order Management',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=logistics&backgroundColor=d1d4f9&scale=90',
  }
];

interface Message {
  id: string;
  sender: 'user' | 'agent';
  agentId?: string;
  text: string;
  timestamp: Date;
}

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState('support');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      agentId: 'neuronova',
      text: 'Hello! I\'m NeuroNova, your customer support assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate agent response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'help': "I'd be happy to help! Could you please provide more details about what you need assistance with?",
        'pricing': "Our pricing plans start at $29/month for the Basic plan, which includes access to all essential features. The Pro plan is $79/month and includes advanced analytics and priority support. Would you like more details about what each plan includes?",
        'account': "I can definitely help with account-related issues. Could you specify what you're experiencing? Common issues include login problems, account settings, or subscription management.",
        'error': "I'm sorry to hear you're encountering an error. To better assist you, could you share what error message you're seeing and what you were doing when it occurred?",
        'feature': "Thank you for your interest in our features! We offer a wide range of capabilities including AI-powered analytics, multi-agent support, and quantum-enhanced routing. Is there a specific feature you'd like to learn more about?",
      };
      
      // Determine which response to use based on keywords in the user's message
      let responseText = "Thank you for your message. I'll help you with that request. Could you provide more details so I can better assist you?";
      
      const lowerInput = input.toLowerCase();
      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerInput.includes(keyword)) {
          responseText = response;
          break;
        }
      }
      
      // Choose a random agent to respond
      const randomAgentId = agents[Math.floor(Math.random() * agents.length)].id;
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentId: randomAgentId,
        text: responseText,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied to your clipboard.",
    });
  };

  const getAgentInfo = (agentId: string) => {
    return agents.find(agent => agent.id === agentId) || agents[0];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 lg:ml-64 flex flex-col">
          <Tabs value={activeConversation} onValueChange={setActiveConversation} className="w-full">
            <div className="border-b">
              <div className="px-4 sm:px-6">
                <TabsList className="h-12">
                  <TabsTrigger value="support" className="data-[state=active]:text-quantum-cyan">
                    Support
                  </TabsTrigger>
                  <TabsTrigger value="sales" className="data-[state=active]:text-quantum-cyan">
                    Sales
                  </TabsTrigger>
                  <TabsTrigger value="technical" className="data-[state=active]:text-quantum-cyan">
                    Technical
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="support" className="flex-1 flex flex-col">
              <div className="flex-1 overflow-auto">
                <ScrollArea className="h-[calc(100vh-180px)]">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={cn(
                          "flex gap-3 max-w-[85%]",
                          message.sender === 'user' ? 'ml-auto' : ''
                        )}
                      >
                        {message.sender === 'agent' && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={getAgentInfo(message.agentId!).avatar} />
                            <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={cn(
                          "relative group rounded-lg py-2 px-3",
                          message.sender === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        )}>
                          {message.sender === 'agent' && (
                            <div className="text-xs font-semibold mb-1">
                              {getAgentInfo(message.agentId!).name}
                            </div>
                          )}
                          
                          <div className="text-wrap-pretty">
                            {message.text}
                          </div>
                          
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          
                          <div className={cn(
                            "absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity",
                            "flex gap-1"
                          )}>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyMessage(message.text)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            
                            {message.sender === 'agent' && (
                              <>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" />
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="relative flex-1">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="pr-10"
                    />
                    <Button 
                      size="sm" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0" 
                      onClick={handleSendMessage}
                      disabled={!input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
                  <div>Powered by Quantum AI technology</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <MoreVertical className="h-3 w-3 mr-1" />
                        <span>Options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Start new conversation</DropdownMenuItem>
                      <DropdownMenuItem>Clear chat history</DropdownMenuItem>
                      <DropdownMenuItem>Request human agent</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sales" className="flex-1 flex items-center justify-center">
              <div className="text-center p-4">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-lg font-semibold mb-2">Sales Support</h2>
                <p className="text-muted-foreground max-w-md text-wrap-balance">
                  This chat channel will connect you with our sales team to answer questions about pricing, plans, and purchasing.
                </p>
                <Button className="mt-4" onClick={() => setActiveConversation('support')}>
                  Start Conversation
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="flex-1 flex items-center justify-center">
              <div className="text-center p-4">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-lg font-semibold mb-2">Technical Support</h2>
                <p className="text-muted-foreground max-w-md text-wrap-balance">
                  Get specialized technical assistance with product features, troubleshooting, and integration support.
                </p>
                <Button className="mt-4" onClick={() => setActiveConversation('support')}>
                  Start Conversation
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Chat;
